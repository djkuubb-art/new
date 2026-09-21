// Market bootstrap: resolve one shared geo response before localized content becomes visible.
(() => {
  const COUNTRY_LOCALE = {
    GB: 'en-GB', IE: 'en-GB', AU: 'en-GB', NZ: 'en-GB',
    US: 'en-US', CA: 'en-US', SG: 'en-SG',
    DE: 'de', AT: 'de', CH: 'de', NL: 'nl', BE: 'nl',
    FR: 'fr', IT: 'it', ES: 'es', PT: 'pt', PL: 'pl',
    SE: 'sv', NO: 'no', DK: 'da', FI: 'fi', GR: 'el', CY: 'el',
    HR: 'hr', SI: 'sl', SK: 'sk', CZ: 'cs', HU: 'hu', BG: 'bg', RO: 'ro', EE: 'et', LT: 'lt', LV: 'lv', UA: 'uk', IL: 'he'
  };

  const LOCALE_ALIAS = {
    en: 'en-GB', 'en-gb': 'en-GB', 'en-us': 'en-US', 'en-sg': 'en-SG',
    de: 'de', nl: 'nl', fr: 'fr', it: 'it', es: 'es', pt: 'pt', pl: 'pl',
    sv: 'sv', no: 'no', nb: 'no', nn: 'no', da: 'da', fi: 'fi', el: 'el',
    hr: 'hr', sl: 'sl', sk: 'sk', cs: 'cs', hu: 'hu', bg: 'bg', ro: 'ro', et: 'et', lt: 'lt', lv: 'lv', uk: 'uk', ua: 'uk', he: 'he', iw: 'he'
  };

  const normaliseLocale = (value) => {
    if (!value) return null;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (LOCALE_ALIAS[raw]) return LOCALE_ALIAS[raw];
    return LOCALE_ALIAS[raw.split('-')[0]] || null;
  };

  const reveal = (() => {
    let done = false;
    return () => {
      if (done) return;
      done = true;
      document.documentElement.classList.remove('rmc-market-pending');
      const style = document.getElementById('rmc-market-bootstrap-style');
      if (style) style.remove();
    };
  })();

  const style = document.createElement('style');
  style.id = 'rmc-market-bootstrap-style';
  style.textContent = `
    html.rmc-market-pending{background:#050506}
    html.rmc-market-pending body{opacity:0!important}
    body{transition:opacity .12s ease}
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add('rmc-market-pending');

  const originalFetch = window.fetch.bind(window);
  const isGeoRequest = (input) => {
    try {
      const raw = typeof input === 'string' ? input : input?.url;
      if (!raw) return false;
      const url = new URL(raw, location.origin);
      return url.origin === location.origin && url.pathname === '/api/geo';
    } catch (_) {
      return false;
    }
  };

  // Start geo immediately and share exactly the same response with app.js and local-profile.js.
  const geoResponsePromise = originalFetch('/api/geo', {
    headers: { accept: 'application/json' },
    cache: 'no-store',
    credentials: 'same-origin'
  });

  window.__rmcGeoResponsePromise = geoResponsePromise;
  window.fetch = (input, init) => {
    if (!isGeoRequest(input)) return originalFetch(input, init);
    return geoResponsePromise.then((response) => response.clone());
  };

  const waitForLocale = (target) => {
    if (!target) {
      window.setTimeout(reveal, 0);
      return;
    }

    const matches = () => normaliseLocale(document.documentElement.lang) === target;
    if (matches()) {
      reveal();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!matches()) return;
      observer.disconnect();
      reveal();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    // Never leave the page hidden if geo or another script unexpectedly stalls.
    window.setTimeout(() => {
      observer.disconnect();
      reveal();
    }, 1600);
  };

  const queryLocale = normaliseLocale(new URLSearchParams(location.search).get('lang'));
  let storedLocale = null;
  try {
    storedLocale = normaliseLocale(localStorage.getItem('heartmatch-language'));
  } catch (_) {}

  if (queryLocale || storedLocale) {
    // Explicit URL/manual language remains intentional and keeps priority.
    waitForLocale(queryLocale || storedLocale);
  } else {
    geoResponsePromise
      .then((response) => response.clone().json())
      .then((data) => waitForLocale(COUNTRY_LOCALE[String(data?.country || '').toUpperCase()] || normaliseLocale(navigator.language) || 'en-GB'))
      .catch(() => waitForLocale(normaliseLocale(navigator.language) || 'en-GB'));
  }

  window.setTimeout(reveal, 1800);
})();

// Load the exit-intent recovery module without changing the established script order in index.html.
(() => {
  if (document.querySelector('script[data-rmc-exit-intent]')) return;
  const script = document.createElement('script');
  script.src = '/exit-intent.js?v=20260921-milf3';
  script.async = true;
  script.dataset.rmcExitIntent = '1';
  document.head.appendChild(script);
})();

// Replace unreliable IP-city labels with the detected country while keeping the existing distance.
(() => {
  if (document.querySelector('script[data-rmc-country-location]')) return;
  const script = document.createElement('script');
  script.src = '/country-location.js?v=20260810-1';
  script.async = true;
  script.dataset.rmcCountryLocation = '1';
  document.head.appendChild(script);
})();

// Keep the first profile in the lower gallery clearly separate from the main Anna profile.
(() => {
  const LOWER_PROFILE = {
    'en-GB': ['Natalie', 47],
    'en-US': ['Jessica', 47],
    'en-SG': ['Diana', 47],
    de: ['Sabine', 47],
    nl: ['Saskia', 47],
    fr: ['Nathalie', 47],
    it: ['Giulia', 47],
    es: ['Lucía', 47],
    pt: ['Marta', 47],
    pl: ['Karolina', 47],
    sv: ['Johanna', 47],
    no: ['Silje', 47],
    da: ['Mette', 47],
    fi: ['Sari', 47],
    el: ['Αλεξάνδρα', 47],
    hr: ['Kristina', 47],
    sl: ['Katarina', 47],
    sk: ['Jana', 47],
    cs: ['Jana', 47],
    hu: ['Katalin', 47],
    bg: ['Елена', 47],
    ro: ['Andreea', 47],
    et: ['Kadri', 47],
    lt: ['Ieva', 47],
    lv: ['Laura', 47],
    uk: ['Олена', 47],
    he: ['דנה', 47]
  };

  const normaliseLocale = (value = '') => {
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return LOWER_PROFILE[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  let queued = false;
  const sync = () => {
    const card = document.querySelector('#profileSwipeTrack .profile-card-premium:first-child');
    if (!card) return;

    const [profileName, profileAge] = LOWER_PROFILE[getLocale()] || LOWER_PROFILE['en-GB'];
    const name = card.querySelector('[data-gallery-name], [data-profile="0-name"]');
    if (name && name.textContent !== profileName) name.textContent = profileName;

    const age = card.querySelector('[data-gallery-age]');
    if (age) {
      if (age.textContent !== String(profileAge)) age.textContent = String(profileAge);
    } else {
      const heading = card.querySelector('h3');
      if (heading) {
        [...heading.childNodes]
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .forEach((node) => {
            const next = node.textContent.replace(/\b41\b/g, String(profileAge));
            if (next !== node.textContent) node.textContent = next;
          });
      }
    }

    const image = card.querySelector('.image-wrap > img');
    if (image instanceof HTMLImageElement) image.alt = 'Profile photo';
  };

  const queueSync = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      sync();
    });
  };

  const initialise = () => {
    sync();
    const track = document.getElementById('profileSwipeTrack');
    if (track) {
      new MutationObserver(queueSync).observe(track, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    document.getElementById('languageSelect')?.addEventListener('change', queueSync);
    new MutationObserver(queueSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    [0, 250, 900, 1900, 2600].forEach((delay) => window.setTimeout(sync, delay));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();

// Native main message from Anna for each supported locale.
(() => {
  const MESSAGE = {
    'en-GB': 'I cried last night. Am I really so ugly that you won’t even say hi to me?',
    'en-US': 'I cried last night. Am I really so ugly that you won’t even say hi to me?',
    'en-SG': 'I cried last night. Am I really so ugly that you won’t even say hi to me?',
    de: 'Ich habe letzte Nacht geweint. Bin ich wirklich so hässlich, dass du mir nicht mal Hallo schreibst?',
    nl: 'Ik heb vannacht gehuild. Ben ik echt zo lelijk dat je me niet eens hallo schrijft?',
    fr: 'J’ai pleuré cette nuit. Je suis vraiment si moche que tu ne peux même pas me dire bonjour ?',
    it: 'Ho pianto stanotte. Sono davvero così brutta che non mi scrivi neanche ciao?',
    es: 'Anoche lloré. ¿De verdad soy tan fea que ni siquiera me dices hola?',
    pt: 'Chorei esta noite. Sou assim tão feia que nem sequer me dizes olá?',
    pl: 'Płakałam w nocy. Jestem tak brzydka, że nawet nie napiszesz mi cześć?',
    sv: 'Jag grät i natt. Är jag verkligen så ful att du inte ens skriver hej till mig?',
    no: 'Jeg gråt i natt. Er jeg virkelig så stygg at du ikke engang skriver hei til meg?',
    da: 'Jeg græd i nat. Er jeg virkelig så grim, at du ikke engang skriver hej til mig?',
    fi: 'Itkin viime yönä. Olenko oikeasti niin ruma, ettet edes kirjoita minulle hei?',
    el: 'Έκλαψα χθες το βράδυ. Είμαι στ’ αλήθεια τόσο άσχημη που δεν μου γράφεις ούτε ένα «γεια»;',
    hr: 'Plakala sam noćas. Zar sam stvarno toliko ružna da mi nećeš ni napisati bok?',
    sl: 'Ponoči sem jokala. Sem res tako grda, da mi ne napišeš niti živjo?',
    sk: 'V noci som plakala. Som naozaj taká škaredá, že mi nenapíšeš ani ahoj?',
    cs: 'V noci jsem plakala. Jsem opravdu tak ošklivá, že mi nenapíšeš ani ahoj?',
    hu: 'Éjjel sírtam. Tényleg olyan csúnya vagyok, hogy még annyit sem írsz nekem, hogy szia?',
    bg: 'Плаках през нощта. Наистина ли съм толкова грозна, че дори няма да ми напишеш „здрасти“?',
    ro: 'Am plâns azi-noapte. Sunt chiar atât de urâtă încât nici măcar nu-mi scrii „bună”?',
    et: 'Nutsin öösel. Kas ma olen tõesti nii kole, et sa ei kirjuta mulle isegi „tere“?',
    lt: 'Naktį verkiau. Ar tikrai esu tokia negraži, kad net neparašysi man „labas“?',
    lv: 'Naktī raudāju. Vai tiešām esmu tik neglīta, ka tu man pat neuzrakstīsi “sveika”?',
    uk: 'Я плакала вночі. Невже я настільки негарна, що ти навіть не напишеш мені «привіт»?',
    he: 'בכיתי בלילה. אני באמת כל כך מכוערת שאתה אפילו לא כותב לי היי?'
  };

  const normaliseLocale = (value = '') => {
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return MESSAGE[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  let queued = false;
  let textObserver = null;

  const sync = () => {
    const node = document.querySelector('.invite-preview [data-i18n="invitePreview"], .invite-preview [data-role="anna-main-message"], .invite-preview p');
    if (!node) return false;

    const message = MESSAGE[getLocale()] || MESSAGE['en-GB'];
    if (node.textContent !== message) node.textContent = message;
    node.removeAttribute('data-i18n');
    node.setAttribute('data-role', 'anna-main-message');

    if (!textObserver) {
      textObserver = new MutationObserver(queueSync);
      textObserver.observe(node, { childList: true, subtree: true, characterData: true });
    }
    return true;
  };

  const queueSync = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      sync();
    });
  };

  const initialise = () => {
    sync();
    document.getElementById('languageSelect')?.addEventListener('change', queueSync);
    new MutationObserver(queueSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
    [0, 100, 300, 900, 1800].forEach((delay) => window.setTimeout(sync, delay));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
