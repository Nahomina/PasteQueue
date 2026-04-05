# PasteQueue Chrome Extension

## Load in Chrome (dev mode)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select this `extension/` folder

## Auth Setup

After signing in on the web app, the extension uses your session token.
To connect the extension to your account, open the web app dashboard, open
DevTools → Application → Local Storage, copy the Supabase access token, then
paste it in the extension's storage via the popup (or via the web app's
"Connect Extension" button, coming soon).

## File Overview

| File | Purpose |
|---|---|
| `manifest.json` | Extension config, permissions, entry points |
| `background.js` | Service worker: receives copy events, POSTs to API |
| `content.js` | Runs on every page, listens for copy events |
| `popup.html/js` | Extension popup UI showing last 15 items |
