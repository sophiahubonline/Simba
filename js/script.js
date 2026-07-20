// THEMES DATA
const themesData = {
    'relationships': [
        {
            name: 'Attachment',
            description: 'Understanding the bonds we form and how they shape our emotional well-being.',
            link: 'attachment.html'
        },
        {
            name: 'Family Conflict',
            description: 'Navigate complex family dynamics and improve communication with loved ones.',
            link: 'family-conflict.html'
        },
        {
            name: '"Unfairness" in Relationships',
            description: 'Recognizing and addressing imbalances in your relationships.',
            link: 'unfairness-relationships.html'
        },
        {
            name: 'Social Anxiety',
            description: 'Overcome the fear and worry that comes with social interactions.',
            link: 'social-anxiety.html'
        },
        {
            name: 'FOMO',
            description: 'Break free from the fear of missing out and find contentment in the present.',
            link: 'fomo.html'
        }
    ],
    'mental-health': [
        {
            name: 'OCD',
            description: 'Understanding obsessive-compulsive disorder and breaking the cycle of anxiety.',
            link: 'ocd.html'
        },
        {
            name: 'PTSD',
            description: 'Healing from trauma and reclaiming your sense of safety.',
            link: 'ptsd.html'
        },
        {
            name: 'Burnout',
            description: 'Recognize exhaustion and restore balance to your life.',
            link: 'burnout.html'
        },
        {
            name: 'Dissociation',
            description: 'Understanding detachment from reality and grounding techniques.',
            link: 'dissociation.html'
        },
        {
            name: 'Binge Eating Disorder',
            description: 'Address unhealthy eating patterns and develop a healthier relationship with food.',
            link: 'binge-eating-disorder.html'
        },
        {
            name: 'Insomnia',
            description: 'Improve your sleep quality and establish better sleep habits.',
            link: 'insomnia.html'
        }
    ],
    'personal-growth': [
        {
            name: 'Resilience',
            description: 'Build inner strength and bounce back from life\'s challenges.',
            link: 'resilience.html'
        },
        {
            name: 'Imposter Syndrome',
            description: 'Overcome self-doubt and recognize your true worth and achievements.',
            link: 'imposter-syndrome.html'
        },
        {
            name: 'Procrastination',
            description: 'Understand why you delay and develop productive habits.',
            link: 'procrastination.html'
        },
        {
            name: 'Helplessness',
            description: 'Regain agency and control over your life circumstances.',
            link: 'helplessness.html'
        },
        {
            name: 'The Feedback Circuit',
            description: 'Learn to give and receive feedback for continuous personal growth.',
            link: 'feedback-circuit.html'
        }
    ],
    'neurodiversity': [
        {
            name: 'ADHD',
            description: 'Understand attention and executive function challenges and find strategies that work for you.',
            link: 'adhd.html'
        }
    ],
    'mind-body': [
        {
            name: 'Dreams',
            description: 'Explore the meaning and significance of your dreams.',
            link: 'dreams.html'
        },
        {
            name: 'PMS',
            description: 'Manage premenstrual symptoms and understand hormonal changes.',
            link: 'pms.html'
        },
        {
            name: 'Mental Load',
            description: 'Reduce cognitive overwhelm and manage your mental energy effectively.',
            link: 'mental-load.html'
        }
    ]
};

const THEME_VISIBILITY_STORAGE_KEY = 'simba_theme_visibility';
const THEME_VISIBILITY_SYNC_EVENT = 'simba-theme-visibility-changed';
const THEME_PAGE_KEYS = Object.values(themesData).flat().map((theme) => String(theme.link || '').replace(/\.html$/i, '')).filter(Boolean);
const SIMBA_API_BASE_STORAGE_KEY = 'simba_api_base';
let themeVisibilityCache = null;

function getSimbaApiBase() {
    try {
        if (typeof window !== 'undefined' && typeof window.SIMBA_API_BASE === 'string' && window.SIMBA_API_BASE.trim()) {
            return window.SIMBA_API_BASE.trim().replace(/\/$/, '');
        }
        const stored = localStorage.getItem(SIMBA_API_BASE_STORAGE_KEY);
        if (stored && stored.trim()) {
            return stored.trim().replace(/\/$/, '');
        }
    } catch (error) {}

    if (typeof window !== 'undefined') {
        const host = String(window.location.hostname || '').toLowerCase();
        const port = String(window.location.port || '');
        if ((host === '127.0.0.1' || host === 'localhost') && port === '5500') {
            return `${window.location.protocol}//${window.location.hostname}:3000`;
        }
    }
    return '';
}

const SIMBA_API_BASE = getSimbaApiBase();

function simbaApiUrl(url) {
    if (typeof url !== 'string' || !SIMBA_API_BASE) return url;
    if (/^https?:\/\//i.test(url)) return url;
    if (!url.startsWith('/api/')) return url;
    return `${SIMBA_API_BASE}${url}`;
}

function simbaApiFetch(url, options) {
    return fetch(simbaApiUrl(url), options);
}

if (typeof window !== 'undefined') {
    window.SIMBA_API_BASE = SIMBA_API_BASE;
    window.simbaApiUrl = simbaApiUrl;
    window.simbaApiFetch = simbaApiFetch;
}

function getThemeVisibilityDefaults() {
    return THEME_PAGE_KEYS.reduce((accumulator, key) => {
        accumulator[key] = true;
        return accumulator;
    }, {});
}

function normalizeThemeVisibilitySettings(settings) {
    const defaults = getThemeVisibilityDefaults();
    const source = settings && typeof settings === 'object' ? settings : {};

    Object.keys(defaults).forEach((key) => {
        defaults[key] = source[key] !== false;
    });

    return defaults;
}

function readStoredThemeVisibilitySettings() {
    try {
        return normalizeThemeVisibilitySettings(JSON.parse(localStorage.getItem(THEME_VISIBILITY_STORAGE_KEY) || '{}'));
    } catch (error) {
        return getThemeVisibilityDefaults();
    }
}

function saveStoredThemeVisibilitySettings(settings) {
    const nextSettings = normalizeThemeVisibilitySettings(settings);
    themeVisibilityCache = nextSettings;
    localStorage.setItem(THEME_VISIBILITY_STORAGE_KEY, JSON.stringify(nextSettings));
    return nextSettings;
}

function getCurrentThemeVisibilitySettings() {
    if (themeVisibilityCache) return themeVisibilityCache;
    themeVisibilityCache = readStoredThemeVisibilitySettings();
    return themeVisibilityCache;
}

async function syncThemeVisibilitySettings() {
    try {
        const response = await simbaApiFetch('/api/theme-visibility', { credentials: 'include' });
        if (!response.ok) return getCurrentThemeVisibilitySettings();
        const data = await response.json();
        const nextSettings = saveStoredThemeVisibilitySettings(data && data.visibility ? data.visibility : data);
        try {
            window.dispatchEvent(new CustomEvent(THEME_VISIBILITY_SYNC_EVENT, { detail: { visibility: nextSettings } }));
        } catch (error) {}
        return nextSettings;
    } catch (error) {
        return getCurrentThemeVisibilitySettings();
    }
}

async function saveThemeVisibilitySettings(settings) {
    const nextSettings = saveStoredThemeVisibilitySettings(settings);
    try {
        const currentUser = typeof getCurrentSessionUser === 'function' ? getCurrentSessionUser() : null;
        if (currentUser && currentUser.email && isPrimaryAdminAccount(currentUser.email)) {
            const response = await simbaApiFetch('/api/theme-visibility', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ visibility: nextSettings })
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.visibility) {
                    const savedSettings = saveStoredThemeVisibilitySettings(data.visibility);
                    try {
                        window.dispatchEvent(new CustomEvent(THEME_VISIBILITY_SYNC_EVENT, { detail: { visibility: savedSettings } }));
                    } catch (error) {}
                    return savedSettings;
                }
            }
        }
    } catch (error) {}

    try {
        window.dispatchEvent(new CustomEvent(THEME_VISIBILITY_SYNC_EVENT, { detail: { visibility: nextSettings } }));
    } catch (error) {}
    return nextSettings;
}

function getThemeSlugFromLink(link) {
    return String(link || '').replace(/\.html$/i, '');
}

function isThemeVisible(theme, userEmail) {
    const themeKey = typeof theme === 'string' ? theme : getThemeSlugFromLink(theme && theme.link);
    if (!themeKey) return true;
    if (typeof userEmail === 'string' && isPrimaryAdminAccount(userEmail)) return true;
    const visibility = getCurrentThemeVisibilitySettings();
    return visibility[themeKey] !== false;
}

function getVisibleThemesForCategory(category, userEmail) {
    return (themesData[category] || []).filter((theme) => isThemeVisible(theme, userEmail));
}

function applyThemeAccessGate() {
    const page = window.location.pathname.split('/').pop() || '';
    const themeKey = getThemeSlugFromLink(page);
    if (!themeKey || THEME_PAGE_KEYS.indexOf(themeKey) === -1) return;

    const currentUser = typeof getCurrentSessionUser === 'function' ? getCurrentSessionUser() : null;
    const hiddenForCurrentUser = !isThemeVisible(themeKey, currentUser && currentUser.email);
    const existingOverlay = document.querySelector('.theme-access-overlay');

    if (!hiddenForCurrentUser) {
        document.body.classList.remove('theme-page--locked');
        if (existingOverlay) existingOverlay.remove();
        return;
    }

    if (document.body.classList.contains('theme-page--locked') && existingOverlay) return;
    document.body.classList.add('theme-page--locked');

    if (existingOverlay) existingOverlay.remove();
    const overlay = document.createElement('div');
    overlay.className = 'theme-access-overlay';
    overlay.innerHTML = `
        <div class="theme-access-card">
            <span class="theme-access-card__badge">${simbaT('theme.privateBadge', 'Private theme')}</span>
            <h2>${simbaT('theme.privateTitle', 'This theme is not public yet')}</h2>
            <p>${simbaT('theme.privateBody', 'An administrator can still open and review this page. Public access will appear once the theme is marked visible.')}</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

// RENDER THEMES
function renderThemes(category) {
    const grid = document.getElementById('themesGrid');
    if (!grid) return;
    const currentUser = typeof getCurrentSessionUser === 'function' ? getCurrentSessionUser() : null;
    const themes = getVisibleThemesForCategory(category, currentUser && currentUser.email);
    const getThemeCopy = (theme) => (window.SimbaI18n && typeof window.SimbaI18n.getThemeCard === 'function') ? window.SimbaI18n.getThemeCard(theme) : theme;
    const learnMoreLabel = simbaT('theme.learnMore', 'Learn more about it');

    if (!themes.length) {
        grid.innerHTML = `
            <div class="theme-card theme-card--empty">
                <h3>${simbaT('theme.noPublicThemesTitle', 'No public themes yet')}</h3>
                <p>${simbaT('theme.noPublicThemesBody', 'This category is waiting for an admin to publish at least one theme.')}</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = themes.map(theme => `
        <div class="theme-card">
            <h3>${getThemeCopy(theme).name}</h3>
            <p>${getThemeCopy(theme).description}</p>
            <a href="${theme.link}" class="learn-more-btn">
                ${learnMoreLabel} <span class="arrow">→</span>
            </a>
        </div>
    `).join('');
}

function getDefaultProfileAvatar() {
    return '../content/img/profil.png';
}

function simbaT(key, fallback = '') {
    if (window.SimbaI18n && typeof window.SimbaI18n.getTranslation === 'function') {
        return window.SimbaI18n.getTranslation(key, fallback);
    }
    return fallback;
}

function ensureLanguageSwitcher(authSection) {
    const section = authSection || document.querySelector('.auth-section');
    if (!section) return;

    let switcher = section.querySelector('.language-switcher');
    if (!switcher) {
        switcher = document.createElement('label');
        switcher.className = 'language-switcher';
        switcher.innerHTML = '<span class="language-switcher__label">Language</span><select id="simba-language-select"></select>';
        section.appendChild(switcher);
    }

    const label = switcher.querySelector('.language-switcher__label');
    const select = switcher.querySelector('select');
    const languageOptions = (window.SimbaI18n && window.SimbaI18n.languages)
        ? window.SimbaI18n.languages
        : { en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', zh: '中文' };

    if (label) label.textContent = simbaT('language.label', 'Language');
    if (select) {
        select.innerHTML = Object.entries(languageOptions).map(([code, name]) => `<option value="${code}">${name}</option>`).join('');
        select.value = (window.SimbaI18n && typeof window.SimbaI18n.getCurrentLanguage === 'function') ? window.SimbaI18n.getCurrentLanguage() : (localStorage.getItem('simba_language') || 'en');
        select.setAttribute('aria-label', simbaT('language.aria', 'Choose website language'));
        if (!select.dataset.languageBound) {
            select.addEventListener('change', (event) => {
                if (window.SimbaI18n && typeof window.SimbaI18n.setCurrentLanguage === 'function') {
                    window.SimbaI18n.setCurrentLanguage(event.target.value);
                } else {
                    localStorage.setItem('simba_language', event.target.value);
                    window.location.reload();
                }
            });
            select.dataset.languageBound = 'true';
        }
    }
}

function getHeaderProfileDisplayName(email) {
    const targetEmail = String(email || '').trim();
    if (!targetEmail) return simbaT('profile.yourName', 'Profile');
    const profile = getStoredProfile(targetEmail);
    const profileName = profile && typeof profile.name === 'string' ? profile.name.trim() : '';
    if (profileName) return profileName;
    const localPart = targetEmail.split('@')[0] || '';
    return localPart || simbaT('profile.yourName', 'Profile');
}

function renderAuthenticatedHeader(authSection, userLike) {
    if (!authSection || !userLike || !userLike.email) return;
    const userEmail = String(userLike.email || '').trim();
    authSection.innerHTML = `<button class="logout-btn">${simbaT('auth.signout', 'Sign out')}</button><span class="auth-profile-group"><button class="profile-btn" aria-label="${simbaT('nav.profile', 'Profile')}" type="button"><img class="profile-thumb" src="${getDefaultProfileAvatar()}" alt="${simbaT('nav.profile', 'Profile')}"/></button><span class="auth-user-card" role="tooltip"><span class="auth-user-card__label">${simbaT('profile.yourName', 'Profile')}</span><span class="auth-user-card__name"></span></span></span>`;

    const nameNode = authSection.querySelector('.auth-user-card__name');
    if (nameNode) nameNode.textContent = getHeaderProfileDisplayName(userEmail);
}

function refreshNavbarDropdownLabels() {
    document.querySelectorAll('.nav-dropdown-link strong[data-theme-key]').forEach((node) => {
        const themeKey = node.getAttribute('data-theme-key');
        if (!themeKey) return;
        if (window.SimbaI18n && typeof window.SimbaI18n.getThemeCard === 'function') {
            const localized = window.SimbaI18n.getThemeCard({ link: `${themeKey}.html` });
            node.textContent = localized.name || node.textContent;
        }
    });
}

if (typeof window !== 'undefined' && !window.SimbaI18n) {
    const i18nScript = document.createElement('script');
    i18nScript.src = '../js/i18n.js';
    i18nScript.addEventListener('load', () => {
        if (typeof window.updateAuthUI === 'function') {
            window.updateAuthUI();
        }
        if (window.SimbaI18n && typeof window.SimbaI18n.applyLanguage === 'function') {
            window.SimbaI18n.applyLanguage();
        }
    });
    document.head.appendChild(i18nScript);
}

function getStoredProfile(email) {
    if (!email) return {};
    try {
        return JSON.parse(localStorage.getItem('simba_profile_' + email) || '{}');
    } catch (e) {
        return {};
    }
}

function normalizeProfileEmail(email) {
    return String(email || '').trim().toLowerCase();
}

const PROFILE_SYNC_DELAY_MS = 500;
const profileSyncTimers = {};

function sanitizeProfileForSync(profile) {
    const source = profile && typeof profile === 'object' ? profile : {};
    const next = {
        ...source,
        name: String(source.name || '').slice(0, 120),
        bio: String(source.bio || '').slice(0, 4000),
        avatar: String(source.avatar || '').slice(0, 2_000_000)
    };

    if (!Array.isArray(next.scores)) {
        next.scores = [];
    } else {
        next.scores = next.scores.slice(0, 50);
    }

    return next;
}

async function syncStoredProfileToServer(email, profile) {
    const currentUser = getCurrentSessionUser();
    if (!currentUser || !currentUser.email) return false;
    if (normalizeProfileEmail(currentUser.email) !== normalizeProfileEmail(email)) return false;

    try {
        const response = await simbaApiFetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ profile: sanitizeProfileForSync(profile) })
        });
        return !!(response && response.ok);
    } catch (error) {
        return false;
    }
}

function scheduleProfileSync(email, profile) {
    const targetEmail = normalizeProfileEmail(email);
    if (!targetEmail) return;

    if (profileSyncTimers[targetEmail]) {
        clearTimeout(profileSyncTimers[targetEmail]);
    }

    profileSyncTimers[targetEmail] = setTimeout(() => {
        delete profileSyncTimers[targetEmail];
        void syncStoredProfileToServer(targetEmail, profile);
    }, PROFILE_SYNC_DELAY_MS);
}

function setStoredProfile(email, profile, options = {}) {
    if (!email) return profile || {};
    const nextProfile = sanitizeProfileForSync(profile || {});
    if (!Array.isArray(nextProfile.scores)) {
        nextProfile.scores = [];
    }
    localStorage.setItem('simba_profile_' + email, JSON.stringify(nextProfile));

    if (options.sync !== false) {
        scheduleProfileSync(email, nextProfile);
    }

    return nextProfile;
}

function mergeStoredProfile(email, patch, options = {}) {
    const currentProfile = getStoredProfile(email);
    const nextProfile = { ...currentProfile, ...(patch || {}) };
    if (!Array.isArray(nextProfile.scores)) {
        nextProfile.scores = Array.isArray(currentProfile.scores) ? currentProfile.scores : [];
    }
    return setStoredProfile(email, nextProfile, { sync: options.sync });
}

function appendProfileScore(scoreEntry) {
    const currentUser = (() => {
        try { return JSON.parse(localStorage.getItem('simba_user') || 'null'); } catch (e) { return null; }
    })();
    if (!currentUser || !currentUser.email) return null;

    const currentProfile = getStoredProfile(currentUser.email);
    const nextScores = Array.isArray(currentProfile.scores) ? currentProfile.scores.slice() : [];
    nextScores.unshift(scoreEntry);

    const nextProfile = {
        ...currentProfile,
        scores: nextScores.slice(0, 50)
    };

    setStoredProfile(currentUser.email, nextProfile, { sync: true });
    return nextProfile;
}

const SIMBA_ADMIN_ACCOUNT = {
    email: 'createwithus@simbajourney.com',
    password: 'Bruno!Momo_Antonella'
};

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function getLocalUsers() {
    try { return JSON.parse(localStorage.getItem('simba_local_users') || '[]'); } catch { return []; }
}

function saveLocalUsers(list) {
    localStorage.setItem('simba_local_users', JSON.stringify(Array.isArray(list) ? list : []));
}

function findLocalUserByEmail(email) {
    const targetEmail = normalizeEmail(email);
    return getLocalUsers().find((user) => normalizeEmail(user && user.email) === targetEmail);
}

function getLocalUserRole(email) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) return 'user';
    if (targetEmail === normalizeEmail(SIMBA_ADMIN_ACCOUNT.email)) return 'admin';
    const localUser = findLocalUserByEmail(targetEmail);
    if (localUser && localUser.role) return localUser.role;
    try {
        const profile = JSON.parse(localStorage.getItem('simba_profile_' + targetEmail) || '{}');
        if (profile && profile.role) return profile.role;
    } catch (error) {}
    return 'user';
}

function isAdminUser(email) {
    return getLocalUserRole(email) === 'admin';
}

function isPrimaryAdminAccount(email) {
    return normalizeEmail(email) === normalizeEmail(SIMBA_ADMIN_ACCOUNT.email);
}

function canManageAdminAccess(email) {
    return isPrimaryAdminAccount(email);
}

function getCurrentSessionUser() {
    try {
        const current = JSON.parse(localStorage.getItem('simba_user') || 'null');
        if (!current || !current.email) return null;
        return {
            ...current,
            role: current.role || getLocalUserRole(current.email)
        };
    } catch (error) {
        return null;
    }
}

function setCurrentSessionUser(email, extra = {}) {
    const nextUser = {
        email,
        role: extra.role || getLocalUserRole(email),
        ...extra
    };
    localStorage.setItem('simba_user', JSON.stringify(nextUser));
    return nextUser;
}

function ensureAdminAccount() {
    const users = getLocalUsers();
    const targetEmail = normalizeEmail(SIMBA_ADMIN_ACCOUNT.email);
    const existingIndex = users.findIndex((user) => normalizeEmail(user && user.email) === targetEmail);
    const adminUser = {
        email: SIMBA_ADMIN_ACCOUNT.email,
        password: SIMBA_ADMIN_ACCOUNT.password,
        role: 'admin',
        profile: {
            name: 'SIMBA Admin',
            role: 'admin'
        }
    };

    if (existingIndex === -1) {
        users.unshift(adminUser);
    } else {
        users[existingIndex] = {
            ...users[existingIndex],
            email: SIMBA_ADMIN_ACCOUNT.email,
            password: SIMBA_ADMIN_ACCOUNT.password,
            role: 'admin',
            profile: {
                ...(users[existingIndex].profile || {}),
                name: (users[existingIndex].profile && users[existingIndex].profile.name) || 'SIMBA Admin',
                role: 'admin'
            }
        };
    }

    saveLocalUsers(users);
}

function promoteLocalUserToAdmin(email) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) return { ok: false, reason: 'missing' };
    if (targetEmail === normalizeEmail(SIMBA_ADMIN_ACCOUNT.email)) return { ok: false, reason: 'primary' };

    const currentSession = getCurrentSessionUser();
    if (!currentSession || !canManageAdminAccess(currentSession.email)) {
        return { ok: false, reason: 'forbidden' };
    }

    const users = getLocalUsers();
    const userIndex = users.findIndex((user) => normalizeEmail(user && user.email) === targetEmail);
    if (userIndex === -1) return { ok: false, reason: 'not-found' };

    users[userIndex] = {
        ...users[userIndex],
        role: 'admin',
        profile: {
            ...(users[userIndex].profile || {}),
            role: 'admin'
        }
    };
    saveLocalUsers(users);

    if (currentSession && normalizeEmail(currentSession.email) === targetEmail) {
        setCurrentSessionUser(currentSession.email, { ...currentSession, role: 'admin' });
    }

    try { if (typeof window.updateAuthUI === 'function') window.updateAuthUI(); } catch (error) {}
    try { window.dispatchEvent(new CustomEvent('simba-admin-role-changed', { detail: { email: targetEmail, role: 'admin' } })); } catch (error) {}
    return { ok: true };
}

function revokeLocalUserAdmin(email) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) return { ok: false, reason: 'missing' };
    if (targetEmail === normalizeEmail(SIMBA_ADMIN_ACCOUNT.email)) return { ok: false, reason: 'primary' };

    const currentSession = getCurrentSessionUser();
    if (!currentSession || !canManageAdminAccess(currentSession.email)) {
        return { ok: false, reason: 'forbidden' };
    }

    const users = getLocalUsers();
    const userIndex = users.findIndex((user) => normalizeEmail(user && user.email) === targetEmail);
    if (userIndex === -1) return { ok: false, reason: 'not-found' };

    users[userIndex] = {
        ...users[userIndex],
        role: 'user',
        profile: {
            ...(users[userIndex].profile || {}),
            role: 'user'
        }
    };
    saveLocalUsers(users);

    if (currentSession && normalizeEmail(currentSession.email) === targetEmail) {
        setCurrentSessionUser(currentSession.email, { ...currentSession, role: 'user' });
    }

    try { if (typeof window.updateAuthUI === 'function') window.updateAuthUI(); } catch (error) {}
    try { window.dispatchEvent(new CustomEvent('simba-admin-role-changed', { detail: { email: targetEmail, role: 'user' } })); } catch (error) {}
    return { ok: true };
}

const SIMBA_FORUM_THREADS_KEY = 'simba_forum_threads';
const SIMBA_NOTIFICATION_KEY_PREFIX = 'simba_notifications_';

function getForumThreads() {
    try {
        const items = JSON.parse(localStorage.getItem(SIMBA_FORUM_THREADS_KEY) || '[]');
        return Array.isArray(items) ? items : [];
    } catch (error) {
        return [];
    }
}

async function saveForumThreads(threads) {
    const nextThreads = Array.isArray(threads) ? threads.slice(0, 100) : [];
    localStorage.setItem(SIMBA_FORUM_THREADS_KEY, JSON.stringify(nextThreads));
    try {
        await fetchWithTimeout('/api/forum/threads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ threads: nextThreads }),
            credentials: 'include',
            timeout: 5000
        });
    } catch (error) {}
}

function getUserNotifications(email) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) return [];
    try {
        const items = JSON.parse(localStorage.getItem(SIMBA_NOTIFICATION_KEY_PREFIX + targetEmail) || '[]');
        return Array.isArray(items) ? items : [];
    } catch (error) {
        return [];
    }
}

function saveUserNotifications(email, notifications) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) return;
    localStorage.setItem(SIMBA_NOTIFICATION_KEY_PREFIX + targetEmail, JSON.stringify(Array.isArray(notifications) ? notifications.slice(0, 50) : []));
}

function markUserNotificationsRead(email, predicate) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) return 0;

    const matcher = typeof predicate === 'function' ? predicate : () => true;
    const notifications = getUserNotifications(targetEmail);
    let updatedCount = 0;

    const nextNotifications = notifications.map((notification) => {
        if (!notification || notification.read || !matcher(notification)) {
            return notification;
        }

        updatedCount += 1;
        return { ...notification, read: true };
    });

    if (updatedCount > 0) {
        saveUserNotifications(targetEmail, nextNotifications);
        try {
            window.dispatchEvent(new CustomEvent('simba-notifications-updated', { detail: { email: targetEmail } }));
        } catch (error) {}
    }

    return updatedCount;
}

function addUserNotification(email, notification) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) return null;

    const nextNotifications = getUserNotifications(targetEmail);
    nextNotifications.unshift({
        id: 'notif_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8),
        createdAt: new Date().toISOString(),
        read: false,
        ...notification
    });
    saveUserNotifications(targetEmail, nextNotifications);
    return nextNotifications[0];
}

function getForumActivityForEmail(email) {
    const targetEmail = normalizeEmail(email);
    if (!targetEmail) {
        return { activePosts: [], deletedPosts: [] };
    }

    const threads = getForumThreads();
    const activePosts = [];
    const deletedPosts = [];

    threads.forEach((thread) => {
        if (normalizeEmail(thread && thread.email) === targetEmail) {
            const post = {
                type: 'thread',
                id: thread.id,
                title: thread.title,
                body: thread.body,
                category: thread.category,
                createdAt: thread.createdAt,
                deleted: !!thread.deleted,
                deletionReason: thread.deletionReason || '',
                deletedAt: thread.deletedAt || '',
                deletedBy: thread.deletedBy || ''
            };
            (thread.deleted ? deletedPosts : activePosts).push(post);
        }

        (Array.isArray(thread.replies) ? thread.replies : []).forEach((reply) => {
            if (normalizeEmail(reply && reply.email) !== targetEmail) return;
            const post = {
                type: 'reply',
                id: reply.id,
                title: thread.title,
                body: reply.body,
                category: thread.category,
                createdAt: reply.createdAt,
                deleted: !!reply.deleted,
                deletionReason: reply.deletionReason || '',
                deletedAt: reply.deletedAt || '',
                deletedBy: reply.deletedBy || ''
            };
            (reply.deleted ? deletedPosts : activePosts).push(post);
        });
    });

    activePosts.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
    deletedPosts.sort((left, right) => new Date(right.deletedAt || right.createdAt) - new Date(left.deletedAt || left.createdAt));

    return { activePosts, deletedPosts };
}

ensureAdminAccount();

function bindLogoToHome() {
    const logo = document.querySelector('.logo-section img.logo');
    if (!logo || logo.dataset.homeLinkBound === 'true') return;

    const goHome = () => {
        window.location.href = 'index.html';
    };

    logo.style.cursor = 'pointer';
    logo.setAttribute('role', 'link');
    logo.setAttribute('tabindex', '0');
    logo.setAttribute('aria-label', 'Go to homepage');
    logo.addEventListener('click', goHome);
    logo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goHome();
        }
    });
    logo.dataset.homeLinkBound = 'true';
}

function buildNavbarDropdowns(force = false) {
    const navList = document.querySelector('.nav-list');
    if (!navList) return;
    if (force) {
        navList.querySelectorAll('.nav-dropdown').forEach((node) => node.remove());
        navList.querySelectorAll('.nav-menu-item.has-dropdown').forEach((item) => {
            item.classList.remove('nav-menu-item', 'has-dropdown', 'is-open');
        });
        navList.querySelectorAll('.nav-link--dropdown').forEach((link) => link.classList.remove('nav-link--dropdown'));
        navList.dataset.dropdownReady = '';
    } else if (navList.dataset.dropdownReady === 'true') {
        return;
    }

    const t = (key, fallback) => simbaT(key, fallback);
    const currentUser = typeof getCurrentSessionUser === 'function' ? getCurrentSessionUser() : null;

    const thematicsItems = Object.values(themesData).flat().filter((theme) => isThemeVisible(theme, currentUser && currentUser.email)).map((theme) => ({
        label: window.SimbaI18n && typeof window.SimbaI18n.getThemeCard === 'function' ? window.SimbaI18n.getThemeCard(theme).name : theme.name,
        themeKey: String(theme.link || '').replace(/\.html$/i, ''),
        href: theme.link
    }));

    const testItems = [
        { label: t('dropdown.allTests', 'All tests'), labelKey: 'dropdown.allTests', href: 'test.html' },
        { label: t('dropdown.relationships', 'Relationships'), labelKey: 'dropdown.relationships', href: 'test.html#relationships' },
        { label: t('dropdown.mentalHealth', 'Mental Health'), labelKey: 'dropdown.mentalHealth', href: 'test.html#mental-health' },
        { label: t('dropdown.personalGrowth', 'Personal Growth'), labelKey: 'dropdown.personalGrowth', href: 'test.html#personal-growth' },
        { label: t('dropdown.neurodiversity', 'Neurodiversity'), labelKey: 'dropdown.neurodiversity', href: 'test.html#neurodiversity' },
        { label: t('dropdown.mindBody', 'Mind & Body'), labelKey: 'dropdown.mindBody', href: 'test.html#mind-body' }
    ];

    const buildSimpleLinks = (links) => `
        <div class="nav-dropdown-links nav-dropdown-links--plain">
            ${links.length ? '' : `<span class="nav-dropdown-empty">${simbaT('theme.noPublicThemesTitle', 'No public themes yet')}</span>`}
            ${links.map((link) => `
                <a href="${link.href}" class="nav-dropdown-link">
                    <strong${link.labelKey ? ` data-i18n="${link.labelKey}"` : ''}${link.themeKey ? ` data-theme-key="${link.themeKey}"` : ''}>${link.label}</strong>
                </a>
            `).join('')}
        </div>
    `;

    const thematicsLink = navList.querySelector('a[href="index.html"]');
    if (thematicsLink) {
        thematicsLink.classList.add('nav-link--dropdown');
        const thematicsItem = thematicsLink.closest('li');
        if (thematicsItem && !thematicsItem.querySelector('.nav-dropdown')) {
            thematicsItem.classList.add('nav-menu-item', 'has-dropdown');
            thematicsItem.insertAdjacentHTML('beforeend', `
                <div class="nav-dropdown nav-dropdown--thematics">
                    ${buildSimpleLinks(thematicsItems)}
                </div>
            `);
        }
    }

    const testLink = navList.querySelector('a[href="test.html"]');
    if (testLink) {
        testLink.classList.add('nav-link--dropdown');
        const testItem = testLink.closest('li');
        if (testItem && !testItem.querySelector('.nav-dropdown')) {
            testItem.classList.add('nav-menu-item', 'has-dropdown');
            testItem.insertAdjacentHTML('beforeend', `
                <div class="nav-dropdown nav-dropdown--test">
                    ${buildSimpleLinks(testItems)}
                </div>
            `);
        }
    }

    if (!navList.querySelector('a[href="forum.html"]')) {
        const forumItem = document.createElement('li');
        forumItem.innerHTML = `<a href="forum.html" class="nav-link">${t('nav.forum', 'Forum')}</a>`;

        const contactItem = navList.querySelector('a[href="contact.html"]')?.closest('li');
        if (contactItem && contactItem.parentNode === navList) {
            navList.insertBefore(forumItem, contactItem);
        } else {
            navList.appendChild(forumItem);
        }
    }

    if (!navList.querySelector('a[href="visios.html"]')) {
        const visiosItem = document.createElement('li');
        visiosItem.innerHTML = `<a href="visios.html" class="nav-link">${t('nav.visios', 'Visios')}</a>`;

        const contactItem = navList.querySelector('a[href="contact.html"]')?.closest('li');
        if (contactItem && contactItem.parentNode === navList) {
            navList.insertBefore(visiosItem, contactItem);
        } else {
            navList.appendChild(visiosItem);
        }
    }

    const closeAllDropdownMenus = () => {
        navList.querySelectorAll('.nav-menu-item.has-dropdown.is-open').forEach((openItem) => {
            openItem.classList.remove('is-open');
        });
    };

    navList.querySelectorAll('.nav-menu-item.has-dropdown').forEach((item) => {
        if (item.dataset.dropdownBound === 'true') return;
        let closeTimer = null;

        const openMenu = () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            item.classList.add('is-open');
        };

        const closeMenu = () => {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = window.setTimeout(() => {
                item.classList.remove('is-open');
            }, 140);
        };

        item.addEventListener('mouseenter', openMenu);
        item.addEventListener('mouseleave', closeMenu);
        item.addEventListener('focusin', openMenu);
        item.addEventListener('focusout', closeMenu);

        const triggerLink = item.querySelector(':scope > .nav-link--dropdown');
        if (triggerLink && triggerLink.dataset.dropdownTapBound !== 'true') {
            triggerLink.addEventListener('click', (event) => {
                const isCompactLayout = window.matchMedia('(max-width: 1024px)').matches;
                if (!isCompactLayout) return;

                if (!item.classList.contains('is-open')) {
                    event.preventDefault();
                    closeAllDropdownMenus();
                    openMenu();
                    return;
                }

                closeMenu();
            });
            triggerLink.dataset.dropdownTapBound = 'true';
        }

        item.dataset.dropdownBound = 'true';
    });

    if (navList.dataset.dropdownGlobalBound !== 'true') {
        document.addEventListener('click', (event) => {
            if (!navList.contains(event.target)) {
                closeAllDropdownMenus();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeAllDropdownMenus();
            }
        });

        navList.dataset.dropdownGlobalBound = 'true';
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activePage = currentPage === 'visio-room.html' ? 'visios.html' : currentPage;
    const activeNav = Array.from(navList.querySelectorAll(':scope > li > a')).find((link) => link.getAttribute('href') === activePage);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    navList.dataset.dropdownReady = 'true';
}

// Global auth header sync for every page.
// This is intentionally outside DOMContentLoaded so it exists in the console
// and can update the header even when called manually.
function updateAuthUI() {
    const authSection = document.querySelector('.auth-section');
    if (!authSection) return;

    const local = typeof getCurrentSessionUser === 'function'
        ? getCurrentSessionUser()
        : (() => { try { return JSON.parse(localStorage.getItem('simba_user') || 'null'); } catch (e) { return null; } })();

    if (local && local.email) {
        renderAuthenticatedHeader(authSection, local);
    } else {
        authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
    }

    ensureLanguageSwitcher(authSection);

    if (local && local.email && typeof window.flushPendingQuizScores === 'function') {
        window.flushPendingQuizScores();
    }

    const profileBtn = authSection.querySelector('.profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html';
        });
    }

    const adminPanelBtn = authSection.querySelector('.admin-panel-btn');
    if (adminPanelBtn) {
        adminPanelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'profile.html#admin';
        });
    }

    const logoutBtn = authSection.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('simba_user');
            updateAuthUI();
        });
    }

    const signUpBtn = authSection.querySelector('.sign-up-btn');
    if (signUpBtn) {
        signUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.showAuthModal === 'function') window.showAuthModal('signup');
        });
    }

    const loginBtn = authSection.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.showAuthModal === 'function') window.showAuthModal('login');
        });
    }

    // Keep the avatar preview in sync when a profile is saved elsewhere.
    if (typeof window.refreshProfileButton === 'function') {
        window.refreshProfileButton();
    }

    try {
        window.dispatchEvent(new CustomEvent(THEME_VISIBILITY_SYNC_EVENT, { detail: { visibility: getCurrentThemeVisibilitySettings() } }));
    } catch (error) {}
}

document.addEventListener('DOMContentLoaded', function() {
    // CATEGORY TABS
    const categoryTabs = document.querySelectorAll('.category-tab');
    let activeCategory = 'relationships';
    window.__simbaActiveThemeCategory = activeCategory;
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            activeCategory = category;
            window.__simbaActiveThemeCategory = activeCategory;
            
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Render themes for selected category
            renderThemes(category);
        });
    });

    // Initialize with first category
    renderThemes('relationships');
    activeCategory = 'relationships';
    window.__simbaActiveThemeCategory = activeCategory;

    window.addEventListener('simba-language-changed', function() {
        renderThemes(activeCategory);
    });

    window.addEventListener(THEME_VISIBILITY_SYNC_EVENT, function() {
        buildNavbarDropdowns(true);
        const currentCategory = window.__simbaActiveThemeCategory || activeCategory || 'relationships';
        renderThemes(currentCategory);
        applyThemeAccessGate();
    });

    applyThemeAccessGate();
    void syncThemeVisibilitySettings();

    // NAV LINK ACTIVE STATE
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // AUTH UI
    // helper: fetch with timeout to avoid long hangs when server is offline
    async function fetchWithTimeout(resource, opts = {}) {
        const timeout = typeof opts.timeout === 'number' ? opts.timeout : 3000;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const merged = { ...opts, signal: controller.signal };
            const res = await simbaApiFetch(resource, merged);
            clearTimeout(id);
            return res;
        } catch (e) {
            clearTimeout(id);
            throw e;
        }
    }

    // If set to true, the app will not attempt any network/API calls and will use localStorage only.
    const SIMBA_FORCE_LOCAL = false;

    function attachAuthHandlers() {

           const signUpBtn = document.querySelector('.sign-up-btn');
           if (signUpBtn) signUpBtn.addEventListener('click', (e) => { e.preventDefault(); showAuthModal('signup'); });

           const loginBtn = document.querySelector('.login-btn');
           if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); showAuthModal('login'); });

               const logoutBtn = document.querySelector('.logout-btn');
            if (logoutBtn) logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                    try { await fetchWithTimeout('/api/logout', { method: 'POST', credentials: 'include', timeout: 3000 }); } catch (err) { }
                localStorage.removeItem('simba_user');
                updateAuthUI();
                window.location.href = 'index.html';
            });
            const profileBtn = document.querySelector('.profile-btn');
            if (profileBtn) profileBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'profile.html'; });
        }

        // ---------- Simple local fallback store for prototype ----------
        function loadLocalUsers() {
                try { return JSON.parse(localStorage.getItem('simba_local_users')||'[]'); } catch { return []; }
        }
        function saveLocalUsers(list) { localStorage.setItem('simba_local_users', JSON.stringify(list)); }
        function findLocalUserByEmail(email){ return loadLocalUsers().find(u=>u.email===email); }

        // ---------- Modal UI ----------
        function showAuthModal(tab){
                // remove existing
                const existing = document.getElementById('simbaAuthModal');
                if (existing) existing.remove();
                const div = document.createElement('div');
                div.id = 'simbaAuthModal';
                div.innerHTML = `
                <div class="simba-modal-backdrop">
                    <div class="simba-modal">
                        <button class="simba-modal-close">×</button>
                        <div class="simba-modal-tabs">
                            <button data-tab="login" class="tab-btn">${simbaT('modal.loginTitle', 'Login')}</button>
                            <button data-tab="signup" class="tab-btn">${simbaT('modal.signupTitle', 'Sign Up')}</button>
                            <button data-tab="profile" class="tab-btn" style="display:none;">${simbaT('modal.profileTitle', 'Profile')}</button>
                        </div>
                        <div class="simba-modal-body">
                            <div class="tab-content" data-tab="login">
                                <h3>${simbaT('modal.loginTitle', 'Login')}</h3>
                                <input id="simba_email" placeholder="${simbaT('modal.email', 'Email')}" />
                                <div class="simba-password-field">
                                    <input id="simba_password" type="password" placeholder="${simbaT('modal.password', 'Password')}" />
                                    <button type="button" class="simba-password-toggle" data-target="simba_password" aria-pressed="false">${simbaT('modal.showPassword', 'Show')}</button>
                                </div>
                                <div style="margin-top:0.7rem"><button id="simba_login_btn" class="btn">${simbaT('modal.loginButton', 'Login')}</button></div>
                                <div id="simba_msg" style="margin-top:0.8rem;color:red"></div>
                            </div>
                            <div class="tab-content" data-tab="signup" style="display:none;">
                                <h3>${simbaT('modal.signupTitle', 'Sign Up')}</h3>
                                <input id="simba_s_email" placeholder="${simbaT('modal.email', 'Email')}" />
                                <div class="simba-password-field">
                                    <input id="simba_s_password" type="password" placeholder="${simbaT('modal.password', 'Password')}" />
                                    <button type="button" class="simba-password-toggle" data-target="simba_s_password" aria-pressed="false">${simbaT('modal.showPassword', 'Show')}</button>
                                </div>
                                <div style="margin-top:0.7rem"><button id="simba_signup_btn" class="btn">${simbaT('modal.signupButton', 'Sign Up')}</button></div>
                                <div id="simba_s_msg" style="margin-top:0.8rem;color:red"></div>
                            </div>
                            <div class="tab-content" data-tab="profile" style="display:none;">
                                <h3>${simbaT('modal.profileTitle', 'Your Profile')}</h3>
                                <div id="simba_profile_area"></div>
                                <div style="margin-top:0.7rem"><button id="simba_logout_btn" class="btn">${simbaT('auth.signout', 'Log out')}</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                document.body.appendChild(div);

                // styles
                const style = document.createElement('style');
                style.innerHTML = `
                    .simba-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:20000}
                    .simba-modal{background:white;border-radius:12px;padding:1rem;width:360px;max-width:95%}
                    .simba-modal-close{position:absolute;right:12px;top:8px;background:none;border:none;font-size:20px}
                    .simba-modal-tabs{display:flex;gap:8px;margin-bottom:8px}
                    .tab-btn{flex:1;padding:0.5rem;border-radius:8px;border:1px solid #eee;background:#f7f7f7}
                    .tab-content input{width:100%;padding:0.6rem;border-radius:8px;border:1px solid #ddd;margin-top:0.5rem}
                    .simba-password-field{display:flex;gap:0.5rem;align-items:stretch;margin-top:0.5rem}
                    .simba-password-field input{flex:1 1 auto;margin-top:0}
                    .simba-password-toggle{flex:0 0 auto;border:1px solid rgba(31,46,68,0.14);background:#fff;color:#1f2e44;padding:0.6rem 0.85rem;border-radius:8px;cursor:pointer;font:inherit;font-weight:600;white-space:nowrap}
                    .simba-password-toggle:hover{border-color:rgba(196,114,26,0.45);color:#b8651c}
                `;
                div.appendChild(style);

                const closeBtn = div.querySelector('.simba-modal-close');
                closeBtn.addEventListener('click', ()=>div.remove());
                // close modal on backdrop click
                const backdropEl = div.querySelector('.simba-modal-backdrop');
                if (backdropEl) backdropEl.addEventListener('click', (ev) => { if (ev.target === backdropEl) div.remove(); });
                const tabBtns = div.querySelectorAll('.tab-btn');
                tabBtns.forEach(b=>b.addEventListener('click', ()=>{
                    const t=b.getAttribute('data-tab');
                    switchTab(t,div);
                }));

                const passwordToggleButtons = div.querySelectorAll('.simba-password-toggle');
                passwordToggleButtons.forEach(button => button.addEventListener('click', () => {
                    const targetId = button.getAttribute('data-target');
                    const input = div.querySelector(`#${targetId}`);
                    if (!input) return;
                    const shouldShow = input.type === 'password';
                    input.type = shouldShow ? 'text' : 'password';
                    button.textContent = shouldShow ? simbaT('modal.hidePassword', 'Hide') : simbaT('modal.showPassword', 'Show');
                    button.setAttribute('aria-pressed', String(shouldShow));
                }));

                function switchTab(t,container){
                    container.querySelectorAll('.tab-content').forEach(tc=>tc.style.display = tc.getAttribute('data-tab')===t?'block':'none');
                    container.querySelectorAll('.tab-btn').forEach(b=>b.style.background = b.getAttribute('data-tab')===t? '#fff':'#f7f7f7');
                    if (t==='profile') populateProfile(container);
                }

                function populateProfile(container){
                    const area = container.querySelector('#simba_profile_area');
                    if (!area) return;
                    area.innerHTML = '';
                    let current = null;
                    try { current = JSON.parse(localStorage.getItem('simba_user')); } catch {}
                    const email = current && current.email;
                    if (!email){ area.innerHTML = `<p>${simbaT('modal.pleaseLogin', 'Please login first.')}</p>`; return; }
                    // load profile from localStorage
                    const key = 'simba_profile_'+email;
                    let profile = {};
                    try { profile = JSON.parse(localStorage.getItem(key)||'{}'); } catch {}
                                        const img = profile.avatar ? `<img id="simba_profile_preview" src="${profile.avatar}" style="width:80px;height:80px;border-radius:50%"/>` : `<img id="simba_profile_preview" src="${getDefaultProfileAvatar()}" style="width:80px;height:80px;border-radius:50%"/>`;
                                        // add preset avatar choices (profil1.png..profil6.png)
                                        let choicesHtml = '<div style="display:flex;gap:8px;margin-top:0.6rem">';
                                        for (let i=1;i<=6;i++) {
                                                choicesHtml += `<img class="simba-avatar-choice" data-src="../content/img/profil${i}.png" src="../content/img/profil${i}.png" style="width:48px;height:48px;border-radius:8px;cursor:pointer;border:2px solid transparent"/>`;
                                        }
                                        choicesHtml += '</div>';
                                        area.innerHTML = `
                                            <div>${img}</div>
                                            <div style="margin-top:0.6rem">${choicesHtml}</div>
                                            <div style="margin-top:0.6rem"><label>${simbaT('modal.displayName', 'Display name')}</label><input id="simba_dispname" value="${profile.name||''}" /></div>
                                            <div style="margin-top:0.6rem"><label>${simbaT('modal.bio', 'Bio')}</label><textarea id="simba_bio">${profile.bio||''}</textarea></div>
                                            <div style="margin-top:0.6rem"><label>${simbaT('modal.uploadAvatar', 'Custom Avatar (upload)')}</label><input id="simba_avatar_file" type="file" accept="image/*" /></div>
                                            ${current && current.email && current.role === 'admin' ? `
                                                <div class="simba-admin-panel">
                                                    <h4>${simbaT('profile.adminTools', 'Admin tools')}</h4>
                                                    <p>${simbaT('profile.adminToolsDescription', 'Promote or revoke admin access for existing accounts.')}</p>
                                                    <input id="simba_admin_email" type="email" placeholder="${simbaT('profile.adminEmailPlaceholder', 'Email address')}" />
                                                    <button id="simba_promote_admin" class="btn" type="button">${simbaT('profile.makeAdmin', 'Make admin')}</button>
                                                    <div id="simba_admin_msg" style="margin-top:0.5rem"></div>
                                                </div>
                                            ` : ''}
                                            <div style="margin-top:0.6rem"><button id="simba_save_profile" class="btn">${simbaT('modal.saveProfile', 'Save profile')}</button></div>
                                        `;
                                        // mark selected if preset matches
                                        area.querySelectorAll('.simba-avatar-choice').forEach(imgEl=>{
                                                if (profile.avatar && profile.avatar.indexOf(imgEl.dataset.src)!==-1) imgEl.style.borderColor = '#007bff';
                                                imgEl.addEventListener('click', ()=>{
                                                        // select this choice
                                                        area.querySelectorAll('.simba-avatar-choice').forEach(x=>x.style.borderColor='transparent');
                                                        imgEl.style.borderColor = '#007bff';
                                                        area.querySelector('#simba_profile_preview').src = imgEl.dataset.src;
                                                        area.dataset.pendingAvatar = imgEl.dataset.src;
                                                });
                                        });
                    container.querySelector('#simba_avatar_file').addEventListener('change', function(e){
                        const f = e.target.files && e.target.files[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = function(){
                            const data = reader.result;
                            // preview
                            const preview = area.querySelector('#simba_profile_preview');
                            if (preview) preview.setAttribute('src', data);
                            // store temporarily in dataset (custom uploaded avatar)
                            area.dataset.pendingAvatar = data;
                        };
                        reader.readAsDataURL(f);
                    });
                    container.querySelector('#simba_save_profile').addEventListener('click', async ()=>{
                        const name = container.querySelector('#simba_dispname').value;
                        const bio = container.querySelector('#simba_bio').value;
                        const avatar = area.dataset.pendingAvatar || profile.avatar || '';
                        const newProfile = { name, bio, avatar };
                            // try to save to server (with timeout) unless forced local-only
                            let saved = false;
                            if (!SIMBA_FORCE_LOCAL) {
                                try {
                                    const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                                    if (ping && ping.ok) {
                                        const res = await fetchWithTimeout('/api/profile', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(newProfile), credentials: 'include', timeout: 5000 });
                                        if (res && res.ok) saved = true;
                                    }
                                } catch(e){}
                            }
                        // always save locally as fallback
                        localStorage.setItem(key, JSON.stringify(newProfile));
                        alert(saved ? simbaT('modal.profileSavedServer', 'Profile saved (server)') : simbaT('modal.profileSavedLocal', 'Profile saved (local)'));
                        // update header avatar
                        refreshProfileButton();
                        // notify other parts of the app (profile page) to update
                        try { window.dispatchEvent(new CustomEvent('simba-profile-updated', { detail: newProfile })); } catch(e){}
                    });

                    const promoteBtn = container.querySelector('#simba_promote_admin');
                    if (promoteBtn) {
                        promoteBtn.addEventListener('click', () => {
                            const adminMsg = container.querySelector('#simba_admin_msg');
                            const targetEmail = (container.querySelector('#simba_admin_email')?.value || '').trim();
                            if (!targetEmail) {
                                if (adminMsg) adminMsg.textContent = simbaT('profile.enterEmailFirst', 'Enter an account email first.');
                                return;
                            }
                            const result = typeof promoteLocalUserToAdmin === 'function'
                                ? promoteLocalUserToAdmin(targetEmail)
                                : { ok: false, reason: 'unavailable' };
                            if (!result.ok) {
                                if (adminMsg) adminMsg.textContent = result.reason === 'not-found' ? 'Account not found.' : 'Unable to promote this account.';
                                return;
                            }
                            if (adminMsg) adminMsg.textContent = 'Admin role granted.';
                            updateAuthUI();
                        });
                    }
                }

                switchTab(tab,div);

                // wire buttons
                div.querySelector('#simba_login_btn').addEventListener('click', async ()=>{
                    const email = div.querySelector('#simba_email').value.trim();
                    const pw = div.querySelector('#simba_password').value;
                    const msg = div.querySelector('#simba_msg'); msg.innerText='';
                    if (!email || !pw){ msg.innerText=simbaT('modal.enterCredentials', 'Enter email and password'); return; }
                    // try server (skip if forced local-only)
                    if (!SIMBA_FORCE_LOCAL) {
                        try {
                            const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                            if (ping && ping.ok){
                                const res = await fetchWithTimeout('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pw}),credentials:'include', timeout: 5000});
                                const data = await res.json();
                                if (!res.ok) { msg.innerText = data.error || simbaT('modal.invalidCredentials', 'Login failed'); return; }
                                setCurrentSessionUser(email, { role: getLocalUserRole(email) });
                                updateAuthUI();
                                if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                                div.remove();
                                return;
                            }
                        } catch(e){ /* fallback */ }
                    }
                    // fallback to local store
                    let u = findLocalUserByEmail(email);
                    if (!u) { msg.innerText=simbaT('modal.noSuchUser', 'No such user (server offline)'); return; }
                    if (u.password !== pw) { msg.innerText=simbaT('modal.invalidCredentials', 'Invalid credentials'); return; }
                    setCurrentSessionUser(email, { role: getLocalUserRole(email) });
                    updateAuthUI();
                    if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                    div.remove();
                });

                div.querySelector('#simba_signup_btn').addEventListener('click', async ()=>{
                    const email = div.querySelector('#simba_s_email').value.trim();
                    const pw = div.querySelector('#simba_s_password').value;
                    const msg = div.querySelector('#simba_s_msg'); msg.innerText='';
                    if (!email || !pw){ msg.innerText=simbaT('modal.enterCredentials', 'Enter email and password'); return; }
                    if (!SIMBA_FORCE_LOCAL) {
                        try {
                            const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                            if (ping && ping.ok){
                                const res = await fetchWithTimeout('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pw}),credentials:'include', timeout: 5000});
                                const data = await res.json();
                                if (!res.ok) { msg.innerText = data.error || 'Signup failed'; return; }
                                setCurrentSessionUser(email, { role: getLocalUserRole(email) });
                                updateAuthUI();
                                if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                                div.remove();
                                return;
                            }
                        } catch(e){ /* fallback */ }
                    }
                    // fallback local store
                    if (findLocalUserByEmail(email)){ msg.innerText=simbaT('modal.emailExists', 'Email already exists (local)'); return; }
                    const users = loadLocalUsers(); users.push({ email, password: pw, role: 'user', profile: {} }); saveLocalUsers(users);
                    setCurrentSessionUser(email, { role: 'user' });
                    updateAuthUI();
                    if (typeof window.flushPendingQuizScores === 'function') window.flushPendingQuizScores();
                    div.remove();
                });

                // profile logout
                div.querySelector('#simba_logout_btn')?.addEventListener('click', async ()=>{ try { if (!SIMBA_FORCE_LOCAL) await fetchWithTimeout('/api/logout', { method: 'POST', credentials: 'include', timeout: 3000 }); } catch(e){} localStorage.removeItem('simba_user'); updateAuthUI(); div.remove(); });
            }

    function updateAuthUI() {
        const authSection = document.querySelector('.auth-section');
        console.debug('updateAuthUI called on', window.location.pathname, 'authSection?', !!authSection);
        if (!authSection) return;
        // ask server for current user (with timeout) unless forced local-only
        if (SIMBA_FORCE_LOCAL) {
            const local = (()=>{ try { return JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){ return null; } })();
            console.debug('SIMBA_FORCE_LOCAL local user:', local);
            if (local && local.email) {
                renderAuthenticatedHeader(authSection, local);
            } else {
                authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
            }
            attachAuthHandlers();
            ensureLanguageSwitcher(authSection);
            refreshProfileButton();
        } else {
            fetchWithTimeout('/api/me', { credentials: 'include', timeout: 3000 }).then(r => r.json()).then(data => {
                const user = data && data.user ? data.user : null;
                if (user && user.email) {
                    setCurrentSessionUser(user.email, { role: user.role || getLocalUserRole(user.email) });
                    void loadProfileForCurrentUser();
                    renderAuthenticatedHeader(authSection, user);
                } else {
                    // fallback to localStorage user if present
                    const local = (()=>{ try { return JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){ return null; } })();
                        if (local && local.email) {
                        renderAuthenticatedHeader(authSection, local);
                    } else {
                        authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
                    }
                }
                attachAuthHandlers();
                ensureLanguageSwitcher(authSection);
                // refresh header avatar if present
                refreshProfileButton();
            }).catch(() => {
                // API unreachable — use localStorage fallback
                const local = (()=>{ try { return JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){ return null; } })();
                if (local && local.email) {
                    renderAuthenticatedHeader(authSection, local);
                } else {
                    authSection.innerHTML = `<button class="sign-up-btn">${simbaT('auth.signup', 'Sign Up')}</button><button class="login-btn">${simbaT('auth.login', 'Login')}</button>`;
                }
                attachAuthHandlers();
                ensureLanguageSwitcher(authSection);
                refreshProfileButton();
            });
        }
    }

    // load profile either from API (if authenticated) or localStorage
    async function loadProfileForCurrentUser() {
        let current = null;
        try { current = JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){}
        // try API first (skip if forced local-only)
        if (!SIMBA_FORCE_LOCAL) {
            try {
                const ping = await fetchWithTimeout('/api/ping', { timeout: 3000 });
                if (ping && ping.ok) {
                    const res = await fetchWithTimeout('/api/profile', { credentials: 'include', timeout: 5000 });
                    if (res && res.ok) {
                        const data = await res.json();
                        const profile = data.profile || {};
                        if (current && current.email) {
                            setStoredProfile(current.email, profile, { sync: false });
                        }
                        return profile;
                    }
                }
            } catch(e) { /* ignore */ }
        }
        // fallback to local
        if (current && current.email) {
            try { return JSON.parse(localStorage.getItem('simba_profile_'+current.email)||'{}'); } catch(e){}
        }
        return {};
    }

    async function refreshProfileButton() {
        const btn = document.querySelector('.profile-btn');
        if (!btn) return;
        const img = btn.querySelector('img.profile-thumb');
        if (!img) return;
        const profile = await loadProfileForCurrentUser();
        const current = (()=>{ try { return JSON.parse(localStorage.getItem('simba_user')||'null'); } catch(e){ return null; } })();
        if (profile && profile.avatar) {
            // avatar may be a data URL or a relative path
            img.src = profile.avatar;
        } else {
            img.src = getDefaultProfileAvatar();
        }
        const nameNode = document.querySelector('.auth-user-card__name');
        if (nameNode && current && current.email) {
            const profileName = profile && typeof profile.name === 'string' ? profile.name.trim() : '';
            nameNode.textContent = profileName || getHeaderProfileDisplayName(current.email);
        }
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ADD ACTIVE CLASS TO CURRENT NAV ITEM
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentNav = document.querySelector(`a[href="${currentPage}"]`);
    if (currentNav) {
        currentNav.classList.add('active');
    }

    buildNavbarDropdowns();

    // Initialize auth UI
    // expose functions to window so pages loaded later can call them
    try {
        if (typeof window !== 'undefined') {
            window.updateAuthUI = updateAuthUI;
            window.showAuthModal = showAuthModal;
            window.refreshProfileButton = refreshProfileButton;
            window.getStoredProfile = getStoredProfile;
            window.setStoredProfile = setStoredProfile;
            window.mergeStoredProfile = mergeStoredProfile;
            window.appendProfileScore = appendProfileScore;
            window.getCurrentSessionUser = getCurrentSessionUser;
            window.getLocalUserRole = getLocalUserRole;
            window.getUserRoleByEmail = getLocalUserRole;
            window.isAdminUser = isAdminUser;
            window.isPrimaryAdminAccount = isPrimaryAdminAccount;
            window.canManageAdminAccess = canManageAdminAccess;
            window.ensureAdminAccount = ensureAdminAccount;
            window.promoteLocalUserToAdmin = promoteLocalUserToAdmin;
            window.revokeLocalUserAdmin = revokeLocalUserAdmin;
            window.getForumThreads = getForumThreads;
            window.saveForumThreads = saveForumThreads;
            window.getUserNotifications = getUserNotifications;
            window.markUserNotificationsRead = markUserNotificationsRead;
            window.addUserNotification = addUserNotification;
            window.getForumActivityForEmail = getForumActivityForEmail;
            window.setCurrentSessionUser = setCurrentSessionUser;
            window.getLocalUsers = getLocalUsers;
            window.saveLocalUsers = saveLocalUsers;
            window.findLocalUserByEmail = findLocalUserByEmail;
            window.getCurrentThemeVisibilitySettings = getCurrentThemeVisibilitySettings;
            window.saveThemeVisibilitySettings = saveThemeVisibilitySettings;
            window.syncThemeVisibilitySettings = syncThemeVisibilitySettings;
            window.isThemeVisible = isThemeVisible;
            window.flushPendingQuizScores = flushPendingQuizScores;
            window.openProfileEditor = function() {
                if (typeof window.showAuthModal === 'function') {
                    window.showAuthModal('profile');
                }
            };
        }
    } catch (e) {}
    bindLogoToHome();
    updateAuthUI();
});

// (global exposure handled inside DOMContentLoaded)

// SMOOTH HOVER ANIMATIONS
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.theme-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// COOKIE CONSENT
function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    const consent = localStorage.getItem('simba_cookie_consent');
    if (!consent) {
        banner.hidden = false;
    }

    const accept = document.getElementById('acceptCookies');
    const reject = document.getElementById('rejectCookies');
    const manage = document.getElementById('manageCookies');

    if (accept) accept.textContent = simbaT('cookie.accept', 'Accept all');
    if (reject) reject.textContent = simbaT('cookie.reject', 'Reject');
    if (manage) manage.textContent = simbaT('cookie.manage', 'Manage settings');

    if (accept) accept.addEventListener('click', function() {
        localStorage.setItem('simba_cookie_consent', 'all');
        banner.hidden = true;
    });

    if (reject) reject.addEventListener('click', function() {
        localStorage.setItem('simba_cookie_consent', 'essential');
        banner.hidden = true;
    });

    if (manage) manage.addEventListener('click', function() {
        window.location.href = 'datenschutz.html#cookie-settings';
    });
}

document.addEventListener('DOMContentLoaded', initCookieBanner);

// If the script was loaded after DOMContentLoaded, ensure header is updated now
try {
    if (typeof updateAuthUI === 'function' && document.readyState !== 'loading') {
        updateAuthUI();
    }
} catch (e) {}

// Keep the header in sync when navigating with the browser back/forward cache
// or when the localStorage session changes in another tab.
try {
    window.addEventListener('pageshow', function() {
        if (typeof updateAuthUI === 'function') updateAuthUI();
    });
    window.addEventListener('storage', function(event) {
        if (event && event.key === 'simba_user' && typeof updateAuthUI === 'function') {
            updateAuthUI();
        }
    });
} catch (e) {}

// Theme pages: shared video + exercises block.
function initThemePracticeSections() {
    const content = document.querySelector('.theme-page-content');
    if (!content || document.querySelector('.theme-practice-root')) return;
    if (content.classList.contains('theme-page-content--coming-soon')) return;

    const pageKey = (window.location.pathname.split('/').pop() || '').replace(/\.html$/i, '');
    if (!pageKey) return;

    const themePracticeData = {
        attachment: {
            name: 'Attachment',
            exercises: [
                { type: 'slider', title: 'Closeness Thermometer', prompt: 'How close or distant does the relationship feel right now?', content: { min: 0, max: 10, labels: ['distant', 'balanced', 'close'] } },
                { type: 'scenario_multiple_choice', title: 'Need vs. Fear', prompt: 'Pick the response that fits the moment without overexplaining.', content: { scenario: 'A friend is slow to reply and you start assuming the worst.', choices: ['Wait and check the facts later', 'Send several follow-up messages', 'Assume they no longer care'] } },
                { type: 'journal/reflection', title: 'What I Need', prompt: 'Name one small, clear request you could make.', content: { prompts: ['What helps me feel safe?', 'What do I wish others knew?', 'What can I ask for directly?'] } }
            ]
        },
        'family-conflict': {
            name: 'Family Conflict',
            exercises: [
                { type: 'scenario_multiple_choice', title: 'De-escalate the Moment', prompt: 'Choose the option that keeps the conversation grounded.', content: { scenario: 'A family discussion starts to get loud.', choices: ['Pause and suggest a break', 'Match the tone to be heard', 'Bring up every past issue'] } },
                { type: 'checklist/tracker', title: 'Repair Steps', prompt: 'Track one action that supports a calmer next conversation.', content: { items: ['Take a break', 'Write the main point', 'Use one I statement', 'Pick a better time'] } },
                { type: 'timer/countdown', title: 'Reset Break', prompt: 'Use a short pause before rejoining the conversation.', content: { durationSec: 90, label: 'Pause and breathe, then return' } }
            ]
        },
        'unfairness-relationships': {
            name: 'Unfairness in Relationships',
            exercises: [
                { type: 'journal/reflection', title: 'Fairness Check', prompt: 'Notice what feels uneven without deciding everything at once.', content: { prompts: ['What feels unequal?', 'What do I need more of?', 'What can I ask for plainly?'] } },
                { type: 'scenario_multiple_choice', title: 'Boundary or Resentment', prompt: 'Pick the response that protects your energy.', content: { scenario: 'You keep giving more than you get back.', choices: ['Name the pattern once clearly', 'Keep doing extra to avoid conflict', 'Withdraw without saying anything'] } },
                { type: 'slider', title: 'Balance Meter', prompt: 'How balanced does this relationship feel today?', content: { min: 0, max: 10, labels: ['uneven', 'mixed', 'balanced'] } }
            ]
        },
        'social-anxiety': {
            name: 'Social Anxiety',
            exercises: [
                { type: 'scenario_multiple_choice', title: 'In-the-Moment Choice', prompt: 'Choose a low-pressure response for a social situation.', content: { scenario: 'You arrive somewhere and worry everyone is judging you.', choices: ['Use one simple greeting', 'Disappear immediately', 'Perform perfectly'] } },
                { type: 'flip cards', title: 'Reality Check Cards', prompt: 'Flip each card to compare fear with a more grounded thought.', content: { cards: [{ front: 'They noticed my nerves', back: 'Most people are focused on themselves' }, { front: 'I need the perfect line', back: 'A short greeting is enough' }, { front: 'Awkward means failure', back: 'Awkward moments pass' }] } },
                { type: 'journal/reflection', title: 'After the Event', prompt: 'Capture one thing that went okay.', content: { prompts: ['What did I handle?', 'What felt harder than expected?', 'What would I repeat next time?'] } }
            ]
        },
        fomo: {
            name: 'FOMO',
            exercises: [
                { type: 'slider', title: 'Pull Toward the Feed', prompt: 'How strong is the urge to check what others are doing?', content: { min: 0, max: 10, labels: ['low', 'medium', 'high'] } },
                { type: 'random prompt', title: 'Choose Your Focus', prompt: 'Get one alternative to scrolling.', content: { prompts: ['Message one person directly', 'Step outside for five minutes', 'Save one idea for later', 'Do one offline task'] } },
                { type: 'checklist/tracker', title: 'Offline Wins', prompt: 'Track small actions that make the moment feel fuller.', content: { items: ['Mute one app', 'Set a check-in time', 'Do one local plan', 'Notice one comparison trigger'] } }
            ]
        },
        ocd: {
            name: 'OCD',
            exercises: [
                { type: 'scenario_multiple_choice', title: 'Uncertainty Practice', prompt: 'Pick the response that avoids feeding the loop.', content: { scenario: 'You want to re-check something again to feel sure.', choices: ['Delay the check and move on', 'Check until it feels perfect', 'Ask for repeated reassurance'] } },
                { type: 'timer/countdown', title: 'Delay Window', prompt: 'Wait a short time before acting on the urge.', content: { durationSec: 120, label: 'Pause before the next check' } },
                { type: 'checklist/tracker', title: 'Loop Interruptors', prompt: 'Mark the supports you can use when the urge spikes.', content: { items: ['Name the urge', 'Postpone once', 'Shift attention', 'Return to the task'] } }
            ]
        },
        ptsd: {
            name: 'PTSD',
            exercises: [
                { type: 'slider', title: 'Current Safety', prompt: 'How safe does the present moment feel right now?', content: { min: 0, max: 10, labels: ['unsafe', 'steady', 'safe'] } },
                { type: 'journal/reflection', title: 'Now vs. Then', prompt: 'Separate the present moment from the past in a gentle way.', content: { prompts: ['What is different now?', 'What helps me orient?', 'What is one grounding fact?'] } },
                { type: 'random prompt', title: 'Grounding Cue', prompt: 'Pick one neutral anchor for the next minute.', content: { prompts: ['Name 3 colors you see', 'Feel your feet on the floor', 'Hold a cold drink', 'Look for a straight line'] } }
            ]
        },
        burnout: {
            name: 'Burnout',
            exercises: [
                { type: 'slider', title: 'Energy Check', prompt: 'How much usable energy do you have right now?', content: { min: 0, max: 10, labels: ['empty', 'some', 'steady'] } },
                { type: 'checklist/tracker', title: 'Minimum Viable Day', prompt: 'Choose the smallest steps that still count.', content: { items: ['One priority', 'One break', 'One basic meal', 'One shutdown time'] } },
                { type: 'timer/countdown', title: 'Micro-Recovery', prompt: 'Take a short reset without trying to solve everything.', content: { durationSec: 180, label: 'Rest, stretch, or step away' } }
            ]
        },
        dissociation: {
            name: 'Dissociation',
            exercises: [
                { type: 'scenario_multiple_choice', title: 'Orient First', prompt: 'Choose the grounding step that brings attention back to the room.', content: { scenario: 'You feel spaced out and less connected to the moment.', choices: ['Name where you are and the date', 'Push harder to think clearly', 'Ignore it and keep rushing'] } },
                { type: 'flip cards', title: 'Orientation Cards', prompt: 'Flip to match a cue with a grounding action.', content: { cards: [{ front: 'Feel floaty', back: 'Press feet into the floor' }, { front: 'Hard to focus', back: 'Say 5 things you can see' }, { front: 'Numb or distant', back: 'Hold something textured' }] } },
                { type: 'random prompt', title: '5-4-3-2-1 Start', prompt: 'Pick one sense to begin grounding.', content: { prompts: ['Find 5 things you see', 'Notice 4 things you feel', 'Name 3 sounds', 'Take 2 slow breaths'] } }
            ]
        },
        'binge-eating-disorder': {
            name: 'Binge Eating Disorder',
            exercises: [
                { type: 'journal/reflection', title: 'Trigger Snapshot', prompt: 'Notice what was happening before the urge showed up.', content: { prompts: ['What happened before the urge?', 'What feeling was present?', 'What support could help next time?'] } },
                { type: 'checklist/tracker', title: 'Gentle Regulation', prompt: 'Track non-food supports you can try first.', content: { items: ['Drink water', 'Pause and name the urge', 'Leave the trigger space', 'Reach out for support'] } },
                { type: 'scenario_multiple_choice', title: 'Next-Small-Step', prompt: 'Choose the response that lowers shame.', content: { scenario: 'You feel like you already messed up and want to keep going.', choices: ['Reset with the next small choice', 'Skip the rest of the day', 'Judge yourself until it passes'] } }
            ]
        },
        insomnia: {
            name: 'Insomnia',
            exercises: [
                { type: 'slider', title: 'Sleep Pressure', prompt: 'How awake do you feel right now?', content: { min: 0, max: 10, labels: ['drowsy', 'restless', 'wide awake'] } },
                { type: 'checklist/tracker', title: 'Wind-Down List', prompt: 'Mark the things that make nights calmer.', content: { items: ['Dim lights', 'Put phone away', 'Short stretch', 'Quiet reading', 'Consistent wake time'] } },
                { type: 'random prompt', title: "If Sleep Won't Come", prompt: 'Pick one calm activity for the next 10 minutes.', content: { prompts: ['Sit somewhere dim', 'Listen to soft audio', 'Do a boring task', 'Write tomorrow\'s first step'] } }
            ]
        },
        resilience: {
            name: 'Resilience',
            exercises: [
                { type: 'flip cards', title: 'Strength in Action', prompt: 'Flip to match a challenge with a coping move.', content: { cards: [{ front: 'Things change fast', back: 'Focus on one controllable step' }, { front: 'Energy dips', back: 'Use a smaller goal' }, { front: 'Setback happens', back: 'Name what still worked' }] } },
                { type: 'journal/reflection', title: 'What Carried Me', prompt: 'Notice evidence that you have gotten through hard moments before.', content: { prompts: ['What helped before?', 'Who or what supports me?', 'What does persistence look like today?'] } },
                { type: 'checklist/tracker', title: 'Build-Back Behaviors', prompt: 'Track one small action that rebuilds momentum.', content: { items: ['Start small', 'Ask for help', 'Take a break', 'Finish one task'] } }
            ]
        },
        'imposter-syndrome': {
            name: 'Imposter Syndrome',
            exercises: [
                { type: 'scenario_multiple_choice', title: "Credit Where It's Due", prompt: 'Choose the response that keeps achievements grounded.', content: { scenario: 'Someone praises your work and you feel like you fooled them.', choices: ['Accept the praise and move on', 'Reject it immediately', 'List every possible flaw'] } },
                { type: 'slider', title: 'Confidence vs. Doubt', prompt: 'Where are you on the confidence spectrum right now?', content: { min: 0, max: 10, labels: ['doubt', 'mixed', 'confident'] } },
                { type: 'journal/reflection', title: 'Proof File', prompt: 'Write one factual reason you belong in the room.', content: { prompts: ['What did I learn?', 'What did I finish?', 'What evidence would I show a friend?'] } }
            ]
        },
        procrastination: {
            name: 'Procrastination',
            exercises: [
                { type: 'timer/countdown', title: 'Start Timer', prompt: 'Begin with a very short work burst.', content: { durationSec: 300, label: 'Work for 5 minutes only' } },
                { type: 'scenario_multiple_choice', title: 'Make It Smaller', prompt: 'Pick the response that reduces task friction.', content: { scenario: 'A task feels too big to start.', choices: ['Define the next tiny step', 'Wait for motivation to appear', 'Open ten tabs first'] } },
                { type: 'checklist/tracker', title: 'Task Unfreeze', prompt: 'Track the steps that make starting easier.', content: { items: ['Open file', 'Set timer', 'Remove one distraction', 'Do one tiny action'] } }
            ]
        },
        helplessness: {
            name: 'Helplessness',
            exercises: [
                { type: 'slider', title: 'Control Range', prompt: 'How much influence do you have over this situation?', content: { min: 0, max: 10, labels: ['none', 'some', 'a lot'] } },
                { type: 'journal/reflection', title: 'One Small Influence', prompt: 'Identify one part you can still affect.', content: { prompts: ['What is outside my control?', 'What is one action I can take?', 'What support could I request?'] } },
                { type: 'random prompt', title: 'Next Possible Step', prompt: 'Choose one action that is realistic today.', content: { prompts: ['Send one message', 'Gather one resource', 'Pause and rest', 'Ask one question'] } }
            ]
        },
        'feedback-circuit': {
            name: 'The Feedback Circuit',
            exercises: [
                { type: 'scenario_multiple_choice', title: 'Break the Loop', prompt: 'Choose the response that reduces overchecking feedback.', content: { scenario: 'You keep rereading a message to see if it sounded okay.', choices: ['Review once, then stop', 'Keep tweaking the tone', 'Ask for repeated reassurance'] } },
                { type: 'checklist/tracker', title: 'Signal vs. Noise', prompt: 'Mark the habits that help you respond once and step back.', content: { items: ['Draft before sending', 'Set one review pass', 'Turn off alerts', 'Wait before checking'] } },
                { type: 'timer/countdown', title: 'One-Pass Timer', prompt: 'Use a short limit for review so the loop does not grow.', content: { durationSec: 90, label: 'Review once, then send or move on' } }
            ]
        },
        adhd: {
            name: 'ADHD',
            exercises: [
                { type: 'checklist/tracker', title: 'Focus Supports', prompt: 'Choose the supports that make attention easier.', content: { items: ['Single task', 'Visible reminder', 'Short timer', 'Body reset', 'Reduce clutter'] } },
                { type: 'scenario_multiple_choice', title: 'Attention Shift', prompt: 'Pick the next move when your mind jumps away.', content: { scenario: 'You start a task, then notice five other things to do.', choices: ['Park the extras and return to one task', 'Chase every new idea immediately', 'Quit because focus slipped'] } },
                { type: 'timer/countdown', title: 'Focus Sprint', prompt: 'Work in a short, bounded burst.', content: { durationSec: 600, label: '10-minute sprint' } }
            ]
        },
        dreams: {
            name: 'Dreams',
            exercises: [
                { type: 'journal/reflection', title: 'Dream Snapshot', prompt: 'Capture the dream before it fades.', content: { prompts: ['What stood out?', 'What emotion was present?', 'What image or symbol stayed with me?'] } },
                { type: 'flip cards', title: 'Dream Themes', prompt: 'Flip cards to explore possible meanings without forcing certainty.', content: { cards: [{ front: 'Falling', back: 'Loss of control or stress' }, { front: 'Being chased', back: 'Avoidance or pressure' }, { front: 'Lost place', back: 'Transition or uncertainty' }] } },
                { type: 'random prompt', title: 'Dream Detail', prompt: 'Pull one detail to reflect on.', content: { prompts: ['What color was most vivid?', 'Who was there?', 'What action repeated?', 'What felt unfamiliar?'] } }
            ]
        },
        pms: {
            name: 'PMS',
            exercises: [
                { type: 'slider', title: 'Symptom Intensity', prompt: 'How strong are the symptoms today?', content: { min: 0, max: 10, labels: ['mild', 'moderate', 'strong'] } },
                { type: 'checklist/tracker', title: 'Cycle Support', prompt: 'Track the supports that help you ride out the week.', content: { items: ['Sleep more', 'Lower demands', 'Hydrate', 'Track triggers', 'Ask for flexibility'] } },
                { type: 'journal/reflection', title: 'Needs Right Now', prompt: 'Name one need you can meet more kindly.', content: { prompts: ['What is harder today?', 'What helps a little?', 'What can I let be simpler?'] } }
            ]
        },
        'mental-load': {
            name: 'Mental Load',
            exercises: [
                { type: 'checklist/tracker', title: 'Invisible Tasks', prompt: 'List the behind-the-scenes work you are carrying.', content: { items: ['Remember appointments', 'Plan meals', 'Follow up', 'Track supplies', 'Coordinate schedules'] } },
                { type: 'scenario_multiple_choice', title: 'Share the Load', prompt: 'Pick the response that makes responsibilities visible.', content: { scenario: 'You notice you are the only one tracking everything.', choices: ['Spell out the task list', 'Keep absorbing it silently', 'Wait until you burn out'] } },
                { type: 'journal/reflection', title: 'What Needs a System', prompt: 'Identify one recurring task that could be simplified.', content: { prompts: ['What do I keep remembering?', 'What could be shared?', 'What could be automated or scheduled?'] } }
            ]
        }
    };

    const data = themePracticeData[pageKey];
    if (!data) return;

    const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));

    const getAnchor = () => (pageKey === 'attachment' ? document.querySelector('.video-section') || content : content);
    const anchor = getAnchor();
    if (!anchor) return;

    const videoTitle = pageKey === 'attachment' ? '3 minutes to understand your attachment style' : `3 minutes to explore ${data.name}`;
    const videoDesc = pageKey === 'attachment'
        ? 'A short explainer to help you recognize the patterns behind your reactions in close relationships, before you move into the exercises below.'
        : `A short explainer that opens the topic before you try the exercises below.`;
    const intro = `Three interactive exercises to explore ${data.name.toLowerCase()} from a different angle.`;
    const completionCopy = `You completed the three exercises on ${data.name}. Come back anytime to try them again.`;

    const typeLabels = {
        slider: 'Check in',
        scenario_multiple_choice: 'Choose a move',
        'checklist/tracker': 'Build a habit',
        'timer/countdown': 'Try a pause',
        'flip cards': 'Reframe',
        'journal/reflection': 'Write it down',
        'random prompt': 'Spin a cue'
    };

    const typeSummaries = {
        slider: 'Move the scale to see where you are.',
        scenario_multiple_choice: 'Pick the response that protects your energy.',
        'checklist/tracker': 'Use the checklist to make the next step concrete.',
        'timer/countdown': 'Let the timer carry the pause for you.',
        'flip cards': 'Flip each card to interrupt the old story.',
        'journal/reflection': 'Capture the useful part before it disappears.',
        'random prompt': 'Pull one prompt and use it right away.'
    };

    const section = document.createElement('div');
    section.className = 'theme-practice-root';
    section.innerHTML = `
        ${pageKey === 'attachment' ? '' : `
        <section class="theme-practice-video">
            <div class="theme-practice-card">
                <p class="theme-practice-kicker">Watch</p>
                <h2>${escapeHtml(videoTitle)}</h2>
                <p>${escapeHtml(videoDesc)}</p>
                <div class="theme-practice-video-frame">
                    <video controls preload="metadata">
                        <source src="../content/video/introduction_video.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        </section>`}
        <section class="theme-practice-exercises">
            <div class="theme-practice-wrap">
                <div class="theme-practice-heading">
                    <div class="theme-practice-heading-copy">
                        <p class="theme-practice-kicker">Practice</p>
                        <h2>Try it for yourself</h2>
                        <p>${escapeHtml(intro)}</p>
                    </div>
                    <div class="theme-practice-progress">
                        <div class="theme-practice-progress-top">
                            <span>Your progress</span>
                            <span><span class="theme-practice-progress-count">0</span>/3 completed</span>
                        </div>
                        <div class="theme-practice-progress-track">
                            <div class="theme-practice-progress-fill"></div>
                        </div>
                    </div>
                </div>
                <div class="theme-practice-grid">
                    ${data.exercises.map((exercise, index) => renderPracticeExercise(exercise, index + 1)).join('')}
                </div>
                <div class="theme-practice-completion">
                    <h3>Nice work</h3>
                    <p>${escapeHtml(completionCopy)}</p>
                </div>
            </div>
        </section>
    `;

    anchor.insertAdjacentElement('afterend', section);

    const completed = [false, false, false];
    const progressCount = section.querySelector('.theme-practice-progress-count');
    const progressFill = section.querySelector('.theme-practice-progress-fill');
    const completion = section.querySelector('.theme-practice-completion');

    function updateProgress() {
        const total = completed.filter(Boolean).length;
        if (progressCount) progressCount.textContent = String(total);
        if (progressFill) progressFill.style.width = `${(total / 3) * 100}%`;
        if (completion) completion.classList.toggle('is-visible', total === 3);
    }

    function markDone(index) {
        if (completed[index]) return;
        completed[index] = true;
        const card = section.querySelector(`[data-exercise-index="${index}"]`);
        if (card) card.classList.add('is-complete');
        updateProgress();
    }

    function renderPracticeExercise(exercise, index) {
        const title = escapeHtml(exercise.title);
        const prompt = escapeHtml(exercise.prompt);
        const typeKey = exercise.type;
        const typeLabel = escapeHtml(typeLabels[typeKey] || 'Exercise');
        const typeSummary = escapeHtml(typeSummaries[typeKey] || 'A small interactive step.');

        if (exercise.type === 'slider') {
            const labels = exercise.content.labels || [];
            return `
                <article class="theme-practice-exercise" data-exercise-index="${index - 1}" data-exercise-type="slider">
                    <div class="theme-practice-exercise-top">
                        <div class="theme-practice-icon">${index}</div>
                        <div>
                            <h3>${title}</h3>
                            <span class="theme-practice-chip">${typeLabel}</span>
                        </div>
                        <div class="theme-practice-check">✓</div>
                    </div>
                    <p>${prompt}</p>
                    <p class="theme-practice-live-copy" data-slider-copy>${escapeHtml(typeSummary)}</p>
                    <div class="theme-practice-slider">
                        <input type="range" min="${exercise.content.min}" max="${exercise.content.max}" value="${Math.round((exercise.content.min + exercise.content.max) / 2)}" data-slider>
                        <div class="theme-practice-slider-meta">
                            <span>${escapeHtml(labels[0] || String(exercise.content.min))}</span>
                            <span data-slider-value>5</span>
                            <span>${escapeHtml(labels[2] || String(exercise.content.max))}</span>
                        </div>
                    </div>
                    <div class="theme-practice-actions"><button class="theme-practice-btn" type="button" data-action-done>Mark as done</button></div>
                </article>
            `;
        }

        if (exercise.type === 'scenario_multiple_choice') {
            return `
                <article class="theme-practice-exercise" data-exercise-index="${index - 1}" data-exercise-type="scenario">
                    <div class="theme-practice-exercise-top">
                        <div class="theme-practice-icon">${index}</div>
                        <div>
                            <h3>${title}</h3>
                            <span class="theme-practice-chip">${typeLabel}</span>
                        </div>
                        <div class="theme-practice-check">✓</div>
                    </div>
                    <p>${prompt}</p>
                    <p class="theme-practice-live-copy">${escapeHtml(typeSummary)}</p>
                    <div class="theme-practice-scenario">${escapeHtml(exercise.content.scenario)}</div>
                    <div class="theme-practice-choice-grid">
                        ${exercise.content.choices.map((choice, choiceIndex) => `<button type="button" class="theme-practice-choice" data-choice="${choiceIndex}">${escapeHtml(choice)}</button>`).join('')}
                    </div>
                    <p class="theme-practice-feedback" data-feedback>Choose one option to see a quick read.</p>
                </article>
            `;
        }

        if (exercise.type === 'checklist/tracker') {
            return `
                <article class="theme-practice-exercise" data-exercise-index="${index - 1}" data-exercise-type="checklist">
                    <div class="theme-practice-exercise-top">
                        <div class="theme-practice-icon">${index}</div>
                        <div>
                            <h3>${title}</h3>
                            <span class="theme-practice-chip">${typeLabel}</span>
                        </div>
                        <div class="theme-practice-check">✓</div>
                    </div>
                    <p>${prompt}</p>
                    <p class="theme-practice-live-copy">${escapeHtml(typeSummary)}</p>
                    <div class="theme-practice-checklist">
                        ${exercise.content.items.map((item) => `<label class="theme-practice-checklist-item"><input type="checkbox" data-check-item><span>${escapeHtml(item)}</span></label>`).join('')}
                    </div>
                    <p class="theme-practice-feedback" data-check-feedback>0 of ${exercise.content.items.length} checked.</p>
                    <div class="theme-practice-actions"><button class="theme-practice-btn" type="button" data-action-done>Lock it in</button></div>
                </article>
            `;
        }

        if (exercise.type === 'timer/countdown') {
            return `
                <article class="theme-practice-exercise" data-exercise-index="${index - 1}" data-exercise-type="timer">
                    <div class="theme-practice-exercise-top">
                        <div class="theme-practice-icon">${index}</div>
                        <div>
                            <h3>${title}</h3>
                            <span class="theme-practice-chip">${typeLabel}</span>
                        </div>
                        <div class="theme-practice-check">✓</div>
                    </div>
                    <p>${prompt}</p>
                    <p class="theme-practice-live-copy">${escapeHtml(typeSummary)}</p>
                    <div class="theme-practice-timer">
                        <div class="theme-practice-timer-ring" data-timer-display>${Math.floor(exercise.content.durationSec / 60)}:${String(exercise.content.durationSec % 60).padStart(2, '0')}</div>
                        <p data-timer-status>${escapeHtml(exercise.content.label)}</p>
                        <div class="theme-practice-mini-track"><span data-timer-progress></span></div>
                        <div class="theme-practice-actions">
                            <button class="theme-practice-btn" type="button" data-timer-start>Start pause</button>
                            <button class="theme-practice-btn secondary" type="button" data-action-done>Save this pause</button>
                        </div>
                    </div>
                </article>
            `;
        }

        if (exercise.type === 'flip cards') {
            return `
                <article class="theme-practice-exercise" data-exercise-index="${index - 1}" data-exercise-type="flip">
                    <div class="theme-practice-exercise-top">
                        <div class="theme-practice-icon">${index}</div>
                        <div>
                            <h3>${title}</h3>
                            <span class="theme-practice-chip">${typeLabel}</span>
                        </div>
                        <div class="theme-practice-check">✓</div>
                    </div>
                    <p>${prompt}</p>
                    <p class="theme-practice-live-copy">${escapeHtml(typeSummary)}</p>
                    <div class="theme-practice-flip-grid">
                        ${exercise.content.cards.map((card) => `<button class="theme-practice-flip" type="button" data-front="${escapeHtml(card.front)}" data-back="${escapeHtml(card.back)}">${escapeHtml(card.front)}</button>`).join('')}
                    </div>
                    <p class="theme-practice-hint">Flip all cards to complete this exercise.</p>
                </article>
            `;
        }

        if (exercise.type === 'journal/reflection') {
            return `
                <article class="theme-practice-exercise theme-practice-journal" data-exercise-index="${index - 1}" data-exercise-type="journal">
                    <div class="theme-practice-exercise-top">
                        <div class="theme-practice-icon">${index}</div>
                        <div>
                            <h3>${title}</h3>
                            <span class="theme-practice-chip">${typeLabel}</span>
                        </div>
                        <div class="theme-practice-check">✓</div>
                    </div>
                    <p>${prompt}</p>
                    <p class="theme-practice-live-copy">${escapeHtml(typeSummary)}</p>
                    <div class="theme-practice-prompt-pills">
                        ${exercise.content.prompts.map((item) => `<button type="button" class="theme-practice-pill" data-prompt>${escapeHtml(item)}</button>`).join('')}
                    </div>
                    <textarea placeholder="Write a short reflection..."></textarea>
                    <div class="theme-practice-journal-footer">
                        <span class="theme-practice-note">Stays on this page only.</span>
                        <button class="theme-practice-btn" type="button" data-action-done>Save reflection</button>
                    </div>
                </article>
            `;
        }

        if (exercise.type === 'random prompt') {
            return `
                <article class="theme-practice-exercise" data-exercise-index="${index - 1}" data-exercise-type="random">
                    <div class="theme-practice-exercise-top">
                        <div class="theme-practice-icon">${index}</div>
                        <div>
                            <h3>${title}</h3>
                            <span class="theme-practice-chip">${typeLabel}</span>
                        </div>
                        <div class="theme-practice-check">✓</div>
                    </div>
                    <p>${prompt}</p>
                    <p class="theme-practice-live-copy">${escapeHtml(typeSummary)}</p>
                    <div class="theme-practice-random">
                        <button class="theme-practice-btn" type="button" data-random-pick>Roll a cue</button>
                        <p class="theme-practice-random-result" data-random-result>${escapeHtml(exercise.content.prompts[0] || '')}</p>
                    </div>
                    <div class="theme-practice-actions"><button class="theme-practice-btn secondary" type="button" data-action-done>Use this cue</button></div>
                </article>
            `;
        }

        return '';
    }

    const sliderCards = Array.from(section.querySelectorAll('[data-exercise-type="slider"]'));
    sliderCards.forEach((card, index) => {
        const slider = card.querySelector('[data-slider]');
        const value = card.querySelector('[data-slider-value]');
        const copy = card.querySelector('[data-slider-copy]');
        const done = card.querySelector('[data-action-done]');
        if (slider && value) {
            value.textContent = slider.value;
            const updateSlider = () => {
                const nextValue = Number(slider.value);
                value.textContent = slider.value;
                if (copy) {
                    const low = exerciseBandLabel(nextValue, slider.min, slider.max, 'low');
                    copy.textContent = low;
                }
            };
            slider.addEventListener('input', updateSlider);
            updateSlider();
        }
        if (done) done.addEventListener('click', () => markDone(index));
    });

    Array.from(section.querySelectorAll('[data-exercise-type="scenario"]')).forEach((card, index) => {
        const feedback = card.querySelector('[data-feedback]');
        const choices = Array.from(card.querySelectorAll('[data-choice]'));
        choices.forEach((choice, choiceIndex) => {
            choice.addEventListener('click', () => {
                const messages = [
                    'Best fit: this keeps the situation small and readable.',
                    'This usually feeds the loop instead of settling it.',
                    'This makes the next step harder to see clearly.'
                ];
                if (feedback) feedback.textContent = choiceIndex === 0 ? messages[0] : messages[choiceIndex] || messages[2];
                markDone(index);
            });
        });
    });

    Array.from(section.querySelectorAll('[data-exercise-type="checklist"]')).forEach((card, index) => {
        const done = card.querySelector('[data-action-done]');
        const items = Array.from(card.querySelectorAll('[data-check-item]'));
        const feedback = card.querySelector('[data-check-feedback]');
        const maybeComplete = () => {
            const count = items.filter((item) => item.checked).length;
            if (feedback) {
                feedback.textContent = `${count} of ${items.length} checked.`;
            }
            if (items.every((item) => item.checked)) {
                if (feedback) feedback.textContent = 'Complete. Keep what matters and leave the rest.';
                markDone(index);
            }
        };
        items.forEach((item) => item.addEventListener('change', maybeComplete));
        maybeComplete();
        if (done) done.addEventListener('click', () => markDone(index));
    });

    Array.from(section.querySelectorAll('[data-exercise-type="timer"]')).forEach((card, index) => {
        const display = card.querySelector('[data-timer-display]');
        const status = card.querySelector('[data-timer-status]');
        const start = card.querySelector('[data-timer-start]');
        const done = card.querySelector('[data-action-done]');
        const progress = card.querySelector('[data-timer-progress]');
        const duration = data.exercises[index].content.durationSec;
        let remaining = duration;
        let timerId = null;

        const renderTime = () => {
            const minutes = Math.floor(remaining / 60);
            const seconds = String(remaining % 60).padStart(2, '0');
            if (display) display.textContent = `${minutes}:${seconds}`;
            if (progress) progress.style.width = `${((duration - remaining) / duration) * 100}%`;
        };

        if (start) {
            start.addEventListener('click', () => {
                if (timerId) window.clearInterval(timerId);
                remaining = duration;
                renderTime();
                if (status) status.textContent = 'Timer started. Stay with the pause.';
                timerId = window.setInterval(() => {
                    remaining -= 1;
                    if (remaining <= 0) {
                        window.clearInterval(timerId);
                        timerId = null;
                        remaining = 0;
                        renderTime();
                        if (status) status.textContent = 'Pause complete. Take the calmer next step.';
                        markDone(index);
                        return;
                    }
                    renderTime();
                }, 1000);
            });
        }
        renderTime();
        if (done) done.addEventListener('click', () => markDone(index));
    });

    Array.from(section.querySelectorAll('[data-exercise-type="flip"]')).forEach((card, index) => {
        const buttons = Array.from(card.querySelectorAll('.theme-practice-flip'));
        buttons.forEach((button) => {
            button.addEventListener('click', function() {
                const flipped = button.classList.toggle('is-flipped');
                button.textContent = flipped ? button.dataset.back : button.dataset.front;
                if (buttons.every((item) => item.classList.contains('is-flipped'))) {
                    markDone(index);
                }
            });
        });
    });

    Array.from(section.querySelectorAll('[data-exercise-type="journal"]')).forEach((card, index) => {
        const textarea = card.querySelector('textarea');
        const prompts = Array.from(card.querySelectorAll('[data-prompt]'));
        const done = card.querySelector('[data-action-done]');
        prompts.forEach((button) => {
            button.addEventListener('click', () => {
                if (textarea) {
                    textarea.value = textarea.value ? `${textarea.value}\n${button.textContent}` : button.textContent;
                }
            });
        });
        if (done) {
            done.addEventListener('click', () => {
                if (!textarea || textarea.value.trim().length < 3) {
                    if (textarea) textarea.focus();
                    return;
                }
                markDone(index);
            });
        }
    });

    Array.from(section.querySelectorAll('[data-exercise-type="random"]')).forEach((card, index) => {
        const button = card.querySelector('[data-random-pick]');
        const result = card.querySelector('[data-random-result]');
        const prompts = data.exercises[index].content.prompts || [];
        const done = card.querySelector('[data-action-done]');
        if (button && result && prompts.length) {
            button.addEventListener('click', () => {
                const next = prompts[Math.floor(Math.random() * prompts.length)];
                result.textContent = next;
                button.textContent = 'Roll again';
            });
        }
        if (done) done.addEventListener('click', () => markDone(index));
    });

    function exerciseBandLabel(value, min, max, fallback) {
        const low = Number(min);
        const high = Number(max);
        const span = Math.max(high - low, 1);
        const ratio = (Number(value) - low) / span;
        if (ratio < 0.34) return fallback === 'low' ? 'This sits closer to the lower end right now.' : 'low';
        if (ratio < 0.67) return fallback === 'low' ? 'This feels somewhere in the middle.' : 'middle';
        return fallback === 'low' ? 'This is strongly present right now.' : 'high';
    }

    updateProgress();
}

document.addEventListener('DOMContentLoaded', initThemePracticeSections);
if (document.readyState !== 'loading') initThemePracticeSections();
