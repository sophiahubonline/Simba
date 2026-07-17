Server environment variables

Set these in your environment before running the server (recommended for production):

- `JWT_SECRET` - secret key for signing JWT tokens (default used for dev: 'dev_secret_replace_in_prod')
- `SMTP_HOST` - SMTP host for sending confirmation/reset emails
- `SMTP_PORT` - SMTP port (default 587)
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `SMTP_SECURE` - 'true' if using TLS
- `FROM_EMAIL` - optional From address for outgoing mails

Start server:

```
cd server
npm install
npm start
```

If SMTP is not configured, emails will be logged to the server console (useful for development).

Cross-device data sync
- To keep profiles, forum threads, and private messages across devices, all devices must use the same backend server and same data files.
- Frontend pages can call a remote API base via:
	- `window.SIMBA_API_BASE` (set before scripts load), or
	- `localStorage.setItem('simba_api_base', 'https://your-backend-host')`
- In local development, when pages are served from `http://127.0.0.1:5500`, the frontend auto-targets `http://127.0.0.1:3000` for `/api/*` requests.

Simple file-based user store
- Users are stored in `server/users.json` for this development phase. Passwords are hashed using `bcrypt`.
- To reset users, delete `server/users.json` and restart the server.

