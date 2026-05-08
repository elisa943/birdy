Birdy Project

## Description
Birdy is a browser extension that injects custom UI styling and behavior into X (formally X). It uses a content script and stylesheet to modify the page at runtime, and includes packaged assets under images/.

## Usage
1. Open your browser's extension manager (Chrome: chrome://extensions, Edge: edge://extensions).
2. Enable Developer Mode.
3. Click "Load unpacked" and select this folder.
4. Visit a page that matches the extension's content script rules from manifest.json.
5. Verify the changes are applied.

## Files
- manifest.json: Extension manifest and permissions.
- content.js: Content script that runs on matching pages.
- style.css: Styles injected by the extension.
- images/: Extension assets.
