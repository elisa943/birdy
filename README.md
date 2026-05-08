# 🐦 Birdy

Birdy is a lightweight browser extension that reshapes parts of the X/Twitter interface to feel cleaner, simpler, and a bit more nostalgic.

## ✨ Why Birdy?

If you want a less cluttered experience on X, Birdy helps by removing distracting UI elements and applying a softer visual style.  
The goal is straightforward: make the interface calmer and easier to navigate.

## 🔧 What Birdy changes

Birdy runs on:
- `https://x.com/*`
- `https://twitter.com/*`

It currently:
- Hides selected UI elements (including several Grok/Premium-related surfaces).
- Replaces the X logo/favicon with the included Twitter-style icon asset.
- Applies background and search-area styling tweaks.
- Adjusts the “More” button behavior to point to Settings.
- Continuously reapplies changes as the page updates dynamically.

## 🚀 Installation (Developer Mode)

1. Open your browser extension manager:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
2. Enable **Developer Mode**.
3. Click **Load unpacked**.
4. Select this repository folder.
5. Open X/Twitter and confirm the UI changes are active.

## 📁 Project structure

- `manifest.json` — Extension manifest (MV3), matches, and web-accessible resources.
- `content.js` — Runtime behavior and DOM mutation handling.
- `style.css` — CSS-based UI overrides and hiding rules.
- `images/` — Logo/favicon image assets used by the extension.

## 📝 Notes

- Birdy relies on page selectors that may change as X updates its UI.
- If something stops working, selectors in `content.js` and `style.css` may need a refresh.
