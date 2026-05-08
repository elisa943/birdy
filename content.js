const HIDE_SELECTORS = [
  'a[href="/i/grok"]',
  'a[aria-label="Grok"]',
  'div[data-testid="GrokDrawerHeader"]',
  'div[data-testid="GrokDrawerHeader"] button',
  'aside[aria-label="Subscribe to Premium"]',
  'a[href="/i/jf/creators/studio"]',
  'a[aria-label="Creator Studio"]',
  'a[href="/i/premium_sign_up"]',
  'a[aria-label="Premium"]',
  'a[data-testid="premium-signup-tab"]',
  'button[aria-label="Grok actions"]',
  'button[data-testid="grokImgGen"]',
  'button[aria-label="Generate image"]',
  'div[data-testid="GrokDrawer"]',
  'button[data-testid="GrokDrawerHeader"]',
  'button[aria-label="Grok"]',
  'div[data-testid="news_sidebar"]'
];

const LOGO_SELECTOR = 'a[aria-label="X"]';
const MORE_BUTTON_SELECTOR = 'button[data-testid="AppTabBar_More_Menu"]';
const LOGO_FILENAME = 'twitter_logo2.png';
const LOGO_URL = chrome.runtime.getURL(`images/${LOGO_FILENAME}`);
const FAVICON_URL = chrome.runtime.getURL('images/twitter_logo2.png');
const LOGO_BG_DARK = '#a8d8ff';
const SEARCH_BG = '#a8d8ff';
const SETTINGS_LABEL = 'Settings';

const applyLogoSwap = () => {
  const logoLink = document.querySelector(LOGO_SELECTOR);
  if (!(logoLink instanceof HTMLElement)) {
    return;
  }

  const currentBg = logoLink.style.backgroundImage || '';
  if (!currentBg.includes(LOGO_FILENAME)) {
    logoLink.style.backgroundImage = `url("${LOGO_URL}")`;
  }

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark) {
    logoLink.style.backgroundColor = LOGO_BG_DARK;
    logoLink.style.borderRadius = '9999px';
  } else {
    logoLink.style.backgroundColor = '';
  }
};

const applyFaviconSwap = () => {
  if (location.hostname !== 'x.com') {
    return;
  }

  const head = document.head;
  if (!head) {
    return;
  }

  const icons = head.querySelectorAll('link[rel~="icon"]');
  if (icons.length === 0) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = FAVICON_URL;
    head.appendChild(link);
    return;
  }

  icons.forEach((icon) => {
    if (icon instanceof HTMLLinkElement && icon.href !== FAVICON_URL) {
      icon.href = FAVICON_URL;
    }
  });
};

const applySearchStyling = () => {
  const form = document.querySelector('form[aria-label="Search"]');
  if (!(form instanceof HTMLElement)) {
    return;
  }

  const targets = [form, form.parentElement, form.parentElement?.parentElement];
  targets.forEach((node) => {
    if (node instanceof HTMLElement) {
      node.style.backgroundColor = SEARCH_BG;
      node.style.borderColor = SEARCH_BG;
      node.style.boxShadow = 'none';
    }
  });
};

const applyMoreToSettings = () => {
  const button = document.querySelector(MORE_BUTTON_SELECTOR);
  if (!(button instanceof HTMLElement)) {
    return;
  }

  if (button.dataset.fgrokConverted === 'true') {
    return;
  }

  button.dataset.fgrokConverted = 'true';
  button.setAttribute('aria-label', SETTINGS_LABEL);

  const spans = button.querySelectorAll('span');
  spans.forEach((span) => {
    if (span.textContent && span.textContent.trim().toLowerCase() === 'more') {
      span.textContent = SETTINGS_LABEL;
    }
  });

  button.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = '/settings';
    },
    true
  );
};

const hideGrok = () => {
  const nodes = document.querySelectorAll(HIDE_SELECTORS.join(','));
  nodes.forEach((node) => {
    if (node instanceof HTMLElement && node.style.display !== 'none') {
      node.style.setProperty('display', 'none', 'important');
    }
  });

  applyLogoSwap();
  applyFaviconSwap();
  applySearchStyling();
  applyMoreToSettings();
};

const startObserver = () => {
  hideGrok();

  const observer = new MutationObserver(() => {
    hideGrok();
  });

  const target = document.body || document.documentElement;
  if (!target) {
    return;
  }

  observer.observe(target, {
    childList: true,
    subtree: true
  });
};

if (document.body) {
  startObserver();
} else {
  window.addEventListener('DOMContentLoaded', startObserver, { once: true });
}
