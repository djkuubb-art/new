(() => {
  const JULIE_IMAGE = '/julie-main.jpg?v=20260903-1';
  const JULIE_NAME = 'Julie';
  const JULIE_AGE = '41';

  const replacements = [
    [/Anna’s/g, 'Julie’s'],
    [/Anna's/g, "Julie's"],
    [/Annas/g, 'Julies'],
    [/Annalta/g, 'Julielta'],
    [/Annan/g, 'Julien'],
    [/Anny/g, 'Julie'],
    [/Annin/g, 'Julien'],
    [/d’Anna/g, 'de Julie'],
    [/d'Anna/g, 'de Julie'],
    [/di Anna/g, 'di Julie'],
    [/de Anna/g, 'de Julie'],
    [/da Anna/g, 'da Julie'],
    [/Άννας/g, 'Τζούλι'],
    [/Άννα/g, 'Τζούλι'],
    [/אנה/g, "ג'ולי"],
    [/\bAnna\b/g, JULIE_NAME]
  ];

  const replaceName = (value = '') => {
    let next = String(value);
    for (const [pattern, replacement] of replacements) next = next.replace(pattern, replacement);
    return next;
  };

  const setImage = (img, alt = '') => {
    if (!(img instanceof HTMLImageElement)) return;
    if (img.getAttribute('src') !== JULIE_IMAGE) img.setAttribute('src', JULIE_IMAGE);
    if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
    if (img.hasAttribute('sizes')) img.removeAttribute('sizes');
    if (alt) img.alt = alt;
  };

  const replaceVisibleText = () => {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const current = node.nodeValue || '';
      const next = replaceName(current);
      if (next !== current) node.nodeValue = next;
    }
  };

  const enforceHeroTitle = () => {
    const heading = document.querySelector('.hero-invite .featured-profile .profile-overlay h2');
    if (!heading) return;
    const name = heading.querySelector('[data-profile="0-name"]');
    if (name && name.textContent !== JULIE_NAME) name.textContent = JULIE_NAME;

    const textNodes = [...heading.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE);
    let ageFound = false;
    for (const node of textNodes) {
      if (/\d+/.test(node.nodeValue || '')) {
        ageFound = true;
        const next = (node.nodeValue || '').replace(/,?\s*\d+/, `, ${JULIE_AGE}`);
        if (next !== node.nodeValue) node.nodeValue = next;
      }
    }
    if (!ageFound) heading.append(document.createTextNode(`, ${JULIE_AGE}`));
  };

  const enforce = () => {
    replaceVisibleText();

    document.querySelectorAll('[data-profile="0-name"]').forEach((el) => {
      if (el.textContent !== JULIE_NAME) el.textContent = JULIE_NAME;
    });

    const inviteName = document.querySelector('.invite-preview strong');
    if (inviteName && inviteName.textContent !== `${JULIE_NAME}, ${JULIE_AGE}`) {
      inviteName.textContent = `${JULIE_NAME}, ${JULIE_AGE}`;
    }

    const messageName = document.querySelector('.mini-message strong');
    if (messageName && messageName.textContent !== JULIE_NAME) messageName.textContent = JULIE_NAME;

    enforceHeroTitle();

    setImage(document.querySelector('.invite-avatar img'), JULIE_NAME);
    setImage(document.querySelector('.featured-profile > img'), `${JULIE_NAME} profile`);
    setImage(document.querySelector('.mini-message .avatar-small img'));
    setImage(document.querySelector('[data-slot="card-1"] img'), `${JULIE_NAME} profile`);
    setImage(document.querySelector('.anna-notification-avatar img'), JULIE_NAME);
    setImage(document.querySelector('.profile-preview-photo'), `${JULIE_NAME} profile`);

    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      if (src.includes('/api/anna-image') || /\/anna\.jpg(?:\?|$)/i.test(src) || /anna/i.test(alt)) {
        setImage(img, alt ? replaceName(alt) : '');
      }
    });

    document.querySelectorAll('[aria-label]').forEach((el) => {
      const current = el.getAttribute('aria-label') || '';
      const next = replaceName(current);
      if (next !== current) el.setAttribute('aria-label', next);
    });

    document.title = 'RealMeetClub — Julie';
    document.getElementById('julie-prepaint')?.remove();
    if (document.body) document.body.style.visibility = 'visible';
  };

  let queued = false;
  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      enforce();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', queue, { once: true });
  } else {
    queue();
  }

  window.addEventListener('load', queue, { once: true });
  document.addEventListener('change', (event) => {
    if (event.target?.id === 'languageSelect') {
      setTimeout(queue, 0);
      setTimeout(queue, 150);
      setTimeout(queue, 500);
    }
  });

  const observer = new MutationObserver(queue);
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['src', 'srcset', 'sizes', 'alt', 'aria-label']
  });

  [50, 150, 400, 900, 1800, 3500, 9000].forEach((delay) => setTimeout(queue, delay));
})();
