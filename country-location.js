(() => {
  const DEFAULT_COUNTRY = {
    'en-GB': 'GB', 'en-US': 'US', 'en-SG': 'SG',
    de: 'DE', nl: 'NL', fr: 'FR', it: 'IT', es: 'ES', pt: 'PT', pl: 'PL',
    sv: 'SE', no: 'NO', da: 'DK', fi: 'FI', el: 'GR', hr: 'HR', sl: 'SI',
    sk: 'SK', cs: 'CZ', hu: 'HU', he: 'IL'
  };

  const normaliseLocale = (value = '') => {
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return DEFAULT_COUNTRY[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  let geoCountry = '';
  let applyQueued = false;

  const getCountryCode = () => String(
    geoCountry ||
    window.rmcLocalLocation?.country ||
    DEFAULT_COUNTRY[getLocale()] ||
    'GB'
  ).toUpperCase();

  const getCountryName = () => {
    const code = getCountryCode();
    try {
      const names = new Intl.DisplayNames([getLocale()], { type: 'region' });
      return names.of(code) || code;
    } catch (_) {
      return code;
    }
  };

  const apply = () => {
    applyQueued = false;
    const countryName = getCountryName();
    const cityNode = document.querySelector('.hero-invite .featured-profile .rmc-main-city');
    const distanceNode = document.querySelector('.hero-invite .featured-profile .rmc-main-distance');
    const line = document.querySelector('.hero-invite .featured-profile .rmc-main-location-line');
    const distance = distanceNode?.textContent?.trim() || window.rmcLocalLocation?.distance || '';

    if (cityNode && cityNode.textContent !== countryName) cityNode.textContent = countryName;
    if (line && distance) line.setAttribute('aria-label', `${countryName}, ${distance}`);

    const preview = document.querySelector('.profile-preview-location');
    if (preview && distance) {
      const desired = `${countryName} · ${distance}`;
      if (preview.textContent !== desired) preview.textContent = desired;
    }

    if (window.rmcLocalLocation) {
      window.rmcLocalLocation.countryName = countryName;
      window.rmcLocalLocation.displayLocation = countryName;
    }
  };

  const scheduleApply = () => {
    if (applyQueued) return;
    applyQueued = true;
    window.requestAnimationFrame(apply);
  };

  const resolveGeo = () => {
    const shared = window.__rmcGeoResponsePromise;
    const promise = shared?.then
      ? shared.then((response) => response.clone().json())
      : fetch('/api/geo', { cache: 'no-store', credentials: 'same-origin' }).then((response) => response.json());

    promise
      .then((data) => {
        geoCountry = String(data?.country || '').toUpperCase();
        scheduleApply();
      })
      .catch(() => scheduleApply());
  };

  const initialise = () => {
    resolveGeo();
    [0, 80, 220, 650].forEach((delay) => window.setTimeout(scheduleApply, delay));

    const locationLine = document.querySelector('.hero-invite .featured-profile .profile-overlay p');
    if (locationLine) {
      new MutationObserver(scheduleApply).observe(locationLine, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      [20, 160, 320].forEach((delay) => window.setTimeout(scheduleApply, delay));
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('.profile-preview-trigger, .featured-profile')) return;
      [20, 80, 180].forEach((delay) => window.setTimeout(scheduleApply, delay));
    }, true);

    window.addEventListener('pageshow', () => window.setTimeout(scheduleApply, 80));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
