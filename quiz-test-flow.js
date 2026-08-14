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
