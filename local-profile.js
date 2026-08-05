(() => {
  const STORAGE_KEY = 'rmc_local_distance_km_v1';

  const copy = {
    'en-GB': { nearby: 'Near you', distance: (value) => `about ${value} mi away` },
    'en-US': { nearby: 'Near you', distance: (value) => `about ${value} mi away` },
    'en-SG': { nearby: 'Near you', distance: (value) => `about ${value} km away` },
    de: { nearby: 'In deiner Nähe', distance: (value) => `etwa ${value} km entfernt` },
    nl: { nearby: 'Bij jou in de buurt', distance: (value) => `ongeveer ${value} km bij je vandaan` },
    fr: { nearby: 'Près de chez vous', distance: (value) => `à environ ${value} km` },
    it: { nearby: 'Nelle tue vicinanze', distance: (value) => `a circa ${value} km` },
    es: { nearby: 'Cerca de ti', distance: (value) => `a unos ${value} km` },
    pt: { nearby: 'Perto de ti', distance: (value) => `a cerca de ${value} km` },
    pl: { nearby: 'W Twojej okolicy', distance: (value) => `około ${value} km od Ciebie` },
    sv: { nearby: 'Nära dig', distance: (value) => `cirka ${value} km bort` },
    no: { nearby: 'I nærheten av deg', distance: (value) => `omtrent ${value} km unna` },
    da: { nearby: 'I nærheden af dig', distance: (value) => `ca. ${value} km væk` },
    fi: { nearby: 'Lähellä sinua', distance: (value) => `noin ${value} km päässä` },
    el: { nearby: 'Κοντά σου', distance: (value) => `περίπου ${value} χλμ. μακριά` },
    hr: { nearby: 'U tvojoj blizini', distance: (value) => `oko ${value} km od tebe` },
    sl: { nearby: 'V tvoji bližini', distance: (value) => `približno ${value} km stran` },
    sk: { nearby: 'V tvojom okolí', distance: (value) => `približne ${value} km od teba` },
    cs: { nearby: 'Ve vašem okolí', distance: (value) => `přibližně ${value} km od vás` },
    hu: { nearby: 'A közeledben', distance: (value) => `körülbelül ${value} km-re` },
    he: { nearby: 'באזור שלך', distance: (value) => `במרחק של כ־${value} ק״מ ממך` }
  };

  const normaliseLocale = (value = '') => {
    if (copy[value]) return value;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return copy[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const randomDistanceKm = () => {
    try {
      const saved = Number.parseInt(localStorage.getItem(STORAGE_KEY) || '', 10);
      if (Number.isInteger(saved) && saved >= 4 && saved <= 12) return saved;

      let value;
      if (window.crypto?.getRandomValues) {
        const buffer = new Uint32Array(1);
        window.crypto.getRandomValues(buffer);
        value = 4 + (buffer[0] % 9);
      } else {
        value = 4 + Math.floor(Math.random() * 9);
      }
      localStorage.setItem(STORAGE_KEY, String(value));
      return value;
    } catch (_) {
      return 4 + Math.floor(Math.random() * 9);
    }
  };

  const state = {
    city: '',
    country: '',
    distanceKm: randomDistanceKm()
  };

  const formatDistance = () => {
    const locale = getLocale();
    const text = copy[locale] || copy['en-GB'];
    const useMiles = state.country === 'US' || state.country === 'GB' || locale === 'en-US' || locale === 'en-GB';
    const value = useMiles ? Math.max(2, Math.round(state.distanceKm * 0.621371)) : state.distanceKm;
    return text.distance(value);
  };

  const injectStyles = () => {
    if (document.getElementById('rmc-local-profile-styles')) return;
    const style = document.createElement('style');
    style.id = 'rmc-local-profile-styles';
    style.textContent = `
      .featured-profile .rmc-main-distance{white-space:nowrap}
      @media(max-width:420px){.featured-profile .profile-overlay p{display:flex;flex-wrap:wrap;align-items:center;gap:0}.featured-profile .rmc-main-distance{white-space:normal}}
    `;
    document.head.appendChild(style);
  };

  const render = () => {
    const line = document.querySelector('.hero-invite .featured-profile .profile-overlay p');
    const cityNode = line?.querySelector('[data-profile="0-city"]');
    const onlineNode = line?.querySelector('[data-i18n="online"]');
    if (!line || !cityNode || !onlineNode) return false;

    const locale = getLocale();
    const text = copy[locale] || copy['en-GB'];
    cityNode.textContent = state.city || text.nearby;

    let separator = line.querySelector('[data-rmc-distance-separator]');
    let distanceNode = line.querySelector('.rmc-main-distance');

    if (!separator) {
      separator = document.createElement('span');
      separator.dataset.rmcDistanceSeparator = '1';
      separator.textContent = ' · ';
      cityNode.insertAdjacentElement('afterend', separator);
    }

    if (!distanceNode) {
      distanceNode = document.createElement('span');
      distanceNode.className = 'rmc-main-distance';
      separator.insertAdjacentElement('afterend', distanceNode);
    }

    distanceNode.textContent = formatDistance();
    return true;
  };

  const loadGeo = async () => {
    try {
      const response = await fetch('/api/geo', { cache: 'no-store', credentials: 'same-origin' });
      if (!response.ok) throw new Error(`Geo request failed: ${response.status}`);
      const data = await response.json();
      state.city = typeof data.city === 'string' ? data.city.trim() : '';
      state.country = typeof data.country === 'string' ? data.country.toUpperCase() : '';
    } catch (_) {
      state.city = '';
      state.country = '';
    }
    render();
  };

  const initialise = () => {
    injectStyles();
    render();
    loadGeo();

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(render, 0);
      window.setTimeout(render, 250);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
