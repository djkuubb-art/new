// Market bootstrap: resolve one shared geo response before localized content becomes visible.
(() => {
  const COUNTRY_LOCALE = {
    GB: 'en-GB', IE: 'en-GB', AU: 'en-GB', NZ: 'en-GB',
    US: 'en-US', CA: 'en-US', SG: 'en-SG',
    DE: 'de', AT: 'de', CH: 'de', NL: 'nl', BE: 'nl',
    FR: 'fr', IT: 'it', ES: 'es', PT: 'pt', PL: 'pl',
    SE: 'sv', NO: 'no', DK: 'da', FI: 'fi', GR: 'el', CY: 'el',
    HR: 'hr', SI: 'sl', SK: 'sk', CZ: 'cs', HU: 'hu', IL: 'he'
  };

  const LOCALE_ALIAS = {
    en: 'en-GB', 'en-gb': 'en-GB', 'en-us': 'en-US', 'en-sg': 'en-SG',
    de: 'de', nl: 'nl', fr: 'fr', it: 'it', es: 'es', pt: 'pt', pl: 'pl',
    sv: 'sv', no: 'no', nb: 'no', nn: 'no', da: 'da', fi: 'fi', el: 'el',
    hr: 'hr', sl: 'sl', sk: 'sk', cs: 'cs', hu: 'hu', he: 'he', iw: 'he'
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
  script.src = '/exit-intent.js?v=20260808-1';
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
    'en-GB': 'Fancy meeting up sometime this week? I’m starting to think you’re not interested since you haven’t messaged me…',
    'en-US': 'How about meeting up sometime this week? I’m starting to think you’re not interested since you haven’t messaged me…',
    'en-SG': 'How about meeting up sometime this week? I’m starting to think you’re not interested since you haven’t messaged me…',
    de: 'Wie wäre es, wenn wir uns diese Woche treffen? Ich glaube langsam, du hast kein Interesse, weil du dich gar nicht meldest …',
    nl: 'Zullen we deze week afspreken? Ik begin te denken dat je niet geïnteresseerd bent, want je laat helemaal niets van je horen…',
    fr: 'Ça te dirait qu’on se voie cette semaine ? Je commence à croire que ça ne t’intéresse pas, puisque tu ne m’écris pas…',
    it: 'Che ne dici di vederci questa settimana? Comincio a pensare che non ti interessi, visto che non mi scrivi…',
    es: '¿Qué te parece si nos vemos esta semana? Empiezo a pensar que no te interesa, porque no me escribes…',
    pt: 'Que tal encontrarmo-nos esta semana? Já começo a achar que não estás interessado, porque não me escreves…',
    pl: 'Co powiesz na spotkanie w tym tygodniu? Chyba nie jesteś zainteresowany, bo nie piszesz…',
    sv: 'Vad säger du om att ses någon gång den här veckan? Jag börjar tro att du inte är intresserad eftersom du inte skriver…',
    no: 'Hva sier du til å møtes en gang denne uka? Jeg begynner å tro at du ikke er interessert siden du ikke skriver…',
    da: 'Hvad siger du til, at vi ses en dag i denne uge? Jeg begynder at tro, at du ikke er interesseret, når du ikke skriver…',
    fi: 'Mitä jos nähtäisiin tällä viikolla? Alan jo ajatella, ettet ole kiinnostunut, kun et kirjoita…',
    el: 'Τι λες να βρεθούμε κάποια μέρα αυτή την εβδομάδα; Αρχίζω να πιστεύω ότι δεν ενδιαφέρεσαι, αφού δεν μου γράφεις…',
    hr: 'Što kažeš da se vidimo ovaj tjedan? Počinjem misliti da nisi zainteresiran jer mi se uopće ne javljaš…',
    sl: 'Kaj praviš, da se dobiva enkrat ta teden? Začenjam misliti, da te ne zanima, ker mi nič ne pišeš…',
    sk: 'Čo povieš na to, keby sme sa niekedy tento týždeň stretli? Začínam si myslieť, že nemáš záujem, keď mi vôbec nepíšeš…',
    cs: 'Co říkáš na to, že bychom se někdy tento týden potkali? Začínám si myslet, že nemáš zájem, když mi vůbec nepíšeš…',
    hu: 'Mit szólnál, ha találkoznánk valamikor a héten? Kezdem azt hinni, hogy nem is érdekellek, mert egyáltalán nem írsz…',
    he: 'מה דעתך שניפגש השבוע? אני מתחילה לחשוב שאתה לא באמת בעניין, כי אתה בכלל לא כותב לי…'
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
