(() => {
  const JULIE_IMAGE = '/julie/ChatGPT%20Image%203%20wrz%202026%2C%2020_48_36.png?v=20260903-6';
  const JULIE_NAME = 'Julie';

  const replyLabels = {
    'en-GB': 'Reply to Julie',
    'en-US': 'Reply to Julie',
    'en-SG': 'Reply to Julie',
    de: 'Julie antworten',
    nl: 'Julie antwoorden',
    fr: 'Répondre à Julie',
    it: 'Rispondi a Julie',
    es: 'Responder a Julie',
    pt: 'Responder à Julie',
    pl: 'Odpowiedz Julii',
    sv: 'Svara Julie',
    no: 'Svar Julie',
    da: 'Svar Julie',
    fi: 'Vastaa Julielle',
    el: 'Απάντησε στην Τζούλι',
    hr: 'Odgovori Julie',
    sl: 'Odgovori Julie',
    sk: 'Odpíš Julie',
    cs: 'Odepiš Julii',
    hu: 'Válaszolj Julie-nak',
    he: "השב לג'ולי"
  };

  const replacements = [
    [/\bJulie\s*,\s*\d+\b/g, JULIE_NAME],
    [/\bAnna\s*,\s*\d+\b/g, JULIE_NAME],
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

  const normaliseLocale = (value = '') => {
    if (replyLabels[value]) return value;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return replyLabels[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

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

  const ensureCropStyle = () => {
    if (document.getElementById('julie-crop-style')) return;
    const style = document.createElement('style');
    style.id = 'julie-crop-style';
    style.textContent = `
      .hero-invite .featured-profile > img {
        object-fit: cover !important;
        object-position: center top !important;
      }
    `;
    document.head.appendChild(style);
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

    [...heading.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && /\d+/.test(node.nodeValue || '')) {
        node.nodeValue = (node.nodeValue || '').replace(/,?\s*\d+/g, '');
      }
    });

    heading.querySelectorAll('[data-profile="0-age"]').forEach((el) => el.remove());
  };

  const enforceReplyCta = () => {
    const cta = document.querySelector('.hero-invite .phone-card .phone-cta');
    if (!(cta instanceof HTMLAnchorElement)) return;
    const locale = getLocale();
    const label = replyLabels[locale] || replyLabels['en-GB'];

    cta.classList.add('notranslate', 'rmc-generated-label');
    cta.setAttribute('translate', 'no');
    cta.setAttribute('lang', locale);
    cta.setAttribute('aria-label', label);
    cta.dataset.rmcLabel = label;
    cta.dataset.rmcCtaOwner = 'reply-julie';

    const copy = cta.querySelector('.phone-cta-copy');
    if (copy) copy.textContent = '';
  };

  const enforce = () => {
    ensureCropStyle();
    replaceVisibleText();

    document.querySelectorAll('[data-profile="0-name"]').forEach((el) => {
      if (el.textContent !== JULIE_NAME) el.textContent = JULIE_NAME;
    });

    document.querySelectorAll('[data-profile="0-age"]').forEach((el) => el.remove());

    const inviteName = document.querySelector('.invite-preview strong');
    if (inviteName && inviteName.textContent !== JULIE_NAME) inviteName.textContent = JULIE_NAME;

    const messageName = document.querySelector('.mini-message strong');
    if (messageName && messageName.textContent !== JULIE_NAME) messageName.textContent = JULIE_NAME;

    enforceHeroTitle();
    enforceReplyCta();

    setImage(document.querySelector('.invite-avatar img'), JULIE_NAME);
    setImage(document.querySelector('.featured-profile > img'), `${JULIE_NAME} profile`);
    setImage(document.querySelector('.mini-message .avatar-small img'));
    setImage(document.querySelector('[data-slot="card-1"] img'), `${JULIE_NAME} profile`);
    setImage(document.querySelector('.anna-notification-avatar img'), JULIE_NAME);
    setImage(document.querySelector('.profile-preview-photo'), `${JULIE_NAME} profile`);

    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      const alt = img.getAttribute('alt') || '';
      if (
        src.includes('/api/anna-image') ||
        /\/anna\.jpg(?:\?|$)/i.test(src) ||
        /\/julie-main\.(?:jpg|png)(?:\?|$)/i.test(src) ||
        /anna/i.test(alt)
      ) {
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
      setTimeout(queue, 1200);
    }
  });

  const observer = new MutationObserver(queue);
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['src', 'srcset', 'sizes', 'alt', 'aria-label', 'data-rmc-label', 'lang']
  });

  [50, 150, 400, 900, 1200, 1800, 3500, 9000].forEach((delay) => setTimeout(queue, delay));
})();
