const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// simple file-based user store (for initial dev as requested)
const fs = require('fs').promises;
const usersFile = path.join(__dirname, 'users.json');
const forumThreadsFile = path.join(__dirname, 'forum-threads.json');
const privateMessagesFile = path.join(__dirname, 'private-messages.json');
const themeVisibilityFile = path.join(__dirname, 'theme-visibility.json');

const SERVER_ADMIN_EMAIL = 'createwithus@simbajourney.com';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function isAdminEmail(email) {
  return normalizeEmail(email) === normalizeEmail(SERVER_ADMIN_EMAIL);
}

async function readJsonFile(filePath, fallback) {
  try {
    const txt = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(txt || 'null');
    return parsed == null ? fallback : parsed;
  } catch (e) {
    return fallback;
  }
}

async function writeJsonFile(filePath, value) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), 'utf8');
}

function getProfileDisplayName(user) {
  if (!user) return '';
  return String((user.profile && user.profile.name) || user.display_name || user.email || '').trim();
}

function searchUsersByQuery(users, query) {
  const normalizedQuery = normalizeEmail(query);
  if (!normalizedQuery) return [];

  return users
    .map((user) => ({
      email: normalizeEmail(user && user.email),
      name: getProfileDisplayName(user),
      avatar: (user && user.profile && user.profile.avatar) || '',
      role: (user && user.profile && user.profile.role) || user.role || 'user'
    }))
    .filter((item, index, array) => item.email && array.findIndex((candidate) => candidate.email === item.email) === index)
    .filter((item) => item.email.includes(normalizedQuery) || normalizeEmail(item.name).includes(normalizedQuery))
    .sort((left, right) => {
      const leftExact = left.email.startsWith(normalizedQuery) || normalizeEmail(left.name).startsWith(normalizedQuery) ? 0 : 1;
      const rightExact = right.email.startsWith(normalizedQuery) || normalizeEmail(right.name).startsWith(normalizedQuery) ? 0 : 1;
      if (leftExact !== rightExact) return leftExact - rightExact;
      return left.email.localeCompare(right.email);
    })
    .slice(0, 5);
}

async function loadUsers() {
  try {
    const txt = await fs.readFile(usersFile, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (e) {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf8');
}

async function getUserByEmail(email) {
  const users = await loadUsers();
  return users.find(u => u.email === email);
}

async function getUserById(id) {
  const users = await loadUsers();
  return users.find(u => u.id === id);
}

async function insertUser(email, password_hash) {
  const users = await loadUsers();
  const id = (users.reduce((m, u) => Math.max(m, u.id || 0), 0) + 1);
  const user = { id, email, password_hash, created_at: Date.now(), email_confirmed: 0, confirm_token: null, reset_token: null, reset_expires: null, profile: {} };
  users.push(user);
  await saveUsers(users);
  return user;
}

async function updateUser(id, fields) {
  const users = await loadUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...fields };
  await saveUsers(users);
  return users[idx];
}

async function findByConfirmToken(token) {
  const users = await loadUsers();
  return users.find(u => u.confirm_token === token);
}

async function findByResetToken(token) {
  const users = await loadUsers();
  return users.find(u => u.reset_token === token);
}
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_replace_in_prod';

app.use(express.json());
app.use(cookieParser());

// Serve static site (from parent folder)
app.use(express.static(path.join(__dirname, '..', 'html')));

// Allow CORS for local development (adjust origin in prod)
app.use(cors({ origin: true, credentials: true }));

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

// Mailer setup (configure via env)
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT,10) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
} else {
  console.log('SMTP not configured; emails will be logged to console.');
}

function sendMail(to, subject, html) {
  if (!transporter) {
    console.log('Email to:', to);
    console.log('Subject:', subject);
    console.log('HTML:', html);
    return Promise.resolve();
  }
  return transporter.sendMail({ from: process.env.FROM_EMAIL || process.env.SMTP_USER, to, subject, html });
}

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
  // basic validation
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
  if (password.length < 6) return res.status(400).json({ error: 'Password too short' });
  try {
    const existing = await getUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await insertUser(email, hash);
    // create email confirmation token
    const confirmToken = crypto.randomBytes(24).toString('hex');
    await updateUser(user.id, { confirm_token: confirmToken });
    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    // send confirmation email (link to /confirm-email.html?token=...)
    const link = `${req.protocol}://${req.get('host')}/confirm-email.html?token=${confirmToken}`;
    sendMail(email, 'Bitte bestätigen Sie Ihre E-Mail', `<p>Bitte bestätigen Sie Ihre E-Mail durch Klick auf den Link: <a href="${link}">${link}</a></p>`).catch(()=>{});
    res.json({ ok: true, email, note: 'confirmation_sent' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });
  try {
    const row = await getUserByEmail(email);
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, row.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = createToken({ id: row.id, email: row.email });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ ok: true, email: row.email });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

app.get('/api/me', (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.json({ user: null });
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.json({ user: null });
    // fetch email_confirmed status
    getUserById(payload.id).then(row => {
      if (!row) return res.json({ user: { id: payload.id, email: payload.email } });
      res.json({ user: { id: payload.id, email: payload.email, email_confirmed: !!row.email_confirmed } });
    }).catch(()=>res.json({ user: { id: payload.id, email: payload.email } }));
  });
});

// health check
app.get('/api/ping', (req, res) => {
  res.json({ ok: true });
});

// get or update profile for current user
app.get('/api/profile', async (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const requestedEmail = normalizeEmail(req.query && req.query.email);
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    const currentEmail = normalizeEmail(payload.email);
    if (requestedEmail && requestedEmail !== currentEmail && !isAdminEmail(currentEmail)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const user = requestedEmail ? await getUserByEmail(requestedEmail) : await getUserById(payload.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json({ profile: user.profile || {} });
  });
});

app.post('/api/profile', async (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const { name, bio, avatar } = req.body || {};
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    const user = await getUserById(payload.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const updated = await updateUser(user.id, { profile: { ...(user.profile||{}), name: name||'', bio: bio||'', avatar: avatar||'' } });
    return res.json({ ok: true, profile: updated.profile });
  });
});

app.get('/api/profiles/search', async (req, res) => {
  const query = String(req.query && req.query.q ? req.query.q : '').trim();
  const users = await loadUsers();
  const results = searchUsersByQuery(users, query);
  return res.json({ profiles: results });
});

app.get('/api/forum/threads', async (req, res) => {
  const threads = await readJsonFile(forumThreadsFile, []);
  return res.json({ threads: Array.isArray(threads) ? threads : [] });
});

app.post('/api/forum/threads', async (req, res) => {
  const threads = Array.isArray(req.body && req.body.threads) ? req.body.threads : (Array.isArray(req.body) ? req.body : []);
  const nextThreads = threads.slice(0, 100);
  await writeJsonFile(forumThreadsFile, nextThreads);
  return res.json({ ok: true, threads: nextThreads });
});

app.get('/api/private-messages', async (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    const currentEmail = normalizeEmail(payload.email);
    const threads = await readJsonFile(privateMessagesFile, []);
    if (isAdminEmail(currentEmail)) {
      return res.json({ threads: Array.isArray(threads) ? threads : [] });
    }

    const filtered = (Array.isArray(threads) ? threads : []).filter((thread) => normalizeEmail(thread && thread.userEmail) === currentEmail);
    return res.json({ threads: filtered });
  });
});

app.post('/api/private-messages', async (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    const currentEmail = normalizeEmail(payload.email);
    const incomingThreads = Array.isArray(req.body && req.body.threads) ? req.body.threads : (Array.isArray(req.body) ? req.body : []);
    const existingThreads = await readJsonFile(privateMessagesFile, []);

    let nextThreads;
    if (isAdminEmail(currentEmail)) {
      nextThreads = incomingThreads;
    } else {
      const ownThreads = incomingThreads.filter((thread) => normalizeEmail(thread && thread.userEmail) === currentEmail);
      const preservedThreads = (Array.isArray(existingThreads) ? existingThreads : []).filter((thread) => normalizeEmail(thread && thread.userEmail) !== currentEmail);
      nextThreads = [...ownThreads, ...preservedThreads];
    }

    await writeJsonFile(privateMessagesFile, nextThreads.slice(0, 200));
    return res.json({ ok: true, threads: nextThreads });
  });
});

app.get('/api/theme-visibility', async (req, res) => {
  const visibility = await readJsonFile(themeVisibilityFile, {});
  return res.json({ visibility: visibility && typeof visibility === 'object' ? visibility : {} });
});

app.post('/api/theme-visibility', async (req, res) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    if (!isAdminEmail(payload.email)) return res.status(403).json({ error: 'Forbidden' });

    const incoming = req.body && typeof req.body.visibility === 'object' ? req.body.visibility : {};
    const nextVisibility = Object.keys(incoming).reduce((accumulator, key) => {
      accumulator[key] = incoming[key] !== false;
      return accumulator;
    }, {});

    await writeJsonFile(themeVisibilityFile, nextVisibility);
    return res.json({ ok: true, visibility: nextVisibility });
  });
});

// confirm email
app.get('/api/confirm-email', (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).json({ error: 'Missing token' });
  findByConfirmToken(token).then(row => {
    if (!row) return res.status(400).json({ error: 'Invalid token' });
    updateUser(row.id, { email_confirmed: 1, confirm_token: null }).then(()=>res.json({ ok: true })).catch(()=>res.status(500).json({ error:'DB error' }));
  }).catch(()=>res.status(400).json({ error: 'Invalid token' }));
});

// request password reset
app.post('/api/request-password-reset', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Missing email' });
  getUserByEmail(email).then(row => {
    if (!row) return res.json({ ok: true });
    const resetToken = crypto.randomBytes(24).toString('hex');
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour
    updateUser(row.id, { reset_token: resetToken, reset_expires: expires }).then(()=>{
      const link = `${req.protocol}://${req.get('host')}/reset-password.html?token=${resetToken}`;
      sendMail(email, 'Password reset', `<p>Reset your password: <a href="${link}">${link}</a></p>`).catch(()=>{});
      return res.json({ ok: true });
    }).catch(()=>res.json({ ok: true }));
  }).catch(()=>res.json({ ok: true }));
});

// perform password reset
app.post('/api/reset-password', async (req, res) => {
  const { token, password } = req.body || {};
  if (!token || !password) return res.status(400).json({ error: 'Missing token or password' });
  if (password.length < 6) return res.status(400).json({ error: 'Password too short' });
  try {
    const row = await findByResetToken(token);
    if (!row) return res.status(400).json({ error: 'Invalid token' });
    if (!row.reset_expires || Date.now() > row.reset_expires) return res.status(400).json({ error: 'Token expired' });
    const hash = await bcrypt.hash(password, 10);
    await updateUser(row.id, { password_hash: hash, reset_token: null, reset_expires: null });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`SIMBA server listening on port ${PORT}`);
});
