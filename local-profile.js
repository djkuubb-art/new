(() => {
  const STORAGE_KEY = 'rmc_local_distance_km_v1';

  const copy = {
    'en-GB': { nearby: 'Near you', distance: (value) => `about ${value} mi` },
    'en-US': { nearby: 'Near you', distance: (value) => `about ${value} mi` },
    'en-SG': { nearby: 'Near you', distance: (value) => `about ${value} km` },
    de: { nearby: 'In deiner Nähe', distance: (value) => `ca. ${value} km` },
    nl: { nearby: 'Bij jou in de buurt', distance: (value) => `ongeveer ${value} km` },
    fr: { nearby: 'Près de chez vous', distance: (value) => `environ ${value} km` },
    it: { nearby: 'Nelle tue vicinanze', distance: (value) => `circa ${value} km` },
    es: { nearby: 'Cerca de ti', distance: (value) => `unos ${value} km` },
    pt: { nearby: 'Perto de ti', distance: (value) => `cerca de ${value} km` },
    pl: { nearby: 'W Twojej okolicy', distance: (value) => `około ${value} km` },
    sv: { nearby: 'Nära dig', distance: (value) => `cirka ${value} km` },
    no: { nearby: 'I nærheten av deg', distance: (value) => `omtrent ${value} km` },
    da: { nearby: 'I nærheden af dig', distance: (value) => `ca. ${value} km` },
    fi: { nearby: 'Lähellä sinua', distance: (value) => `noin ${value} km` },
    el: { nearby: 'Κοντά σου', distance: (value) => `περίπου ${value} χλμ.` },
    hr: { nearby: 'U tvojoj blizini', distance: (value) => `oko ${value} km` },
    sl: { nearby: 'V tvoji bližini', distance: (value) => `približno ${value} km` },
    sk: { nearby: 'V tvojom okolí', distance: (value) => `približne ${value} km` },
    cs: { nearby: 'Ve vašem okolí', distance: (value) => `přibližně ${value} km` },
    hu: { nearby: 'A közeledben', distance: (value) => `kb. ${value} km` },
    he: { nearby: 'באזור שלך', distance: (value) => `כ־${value} ק״מ` }
  };

  const countryCityLocale = {
    GB: 'en-GB', IE: 'en-GB', AU: 'en-GB', NZ: 'en-GB',
    US: 'en-US', CA: 'en-US', SG: 'en-SG',
    DE: 'de', AT: 'de', CH: 'de', NL: 'nl', BE: 'nl',
    FR: 'fr', IT: 'it', ES: 'es', PT: 'pt', PL: 'pl',
    SE: 'sv', NO: 'no', DK: 'da', FI: 'fi', GR: 'el', CY: 'el',
    HR: 'hr', SI: 'sl', SK: 'sk', CZ: 'cs', HU: 'hu', IL: 'he'
  };

  const cityNames = {
    pl: {
      warsaw: 'Warszawa', cracow: 'Kraków', krakow: 'Kraków',
      wroclaw: 'Wrocław', poznan: 'Poznań', gdansk: 'Gdańsk',
      lodz: 'Łódź', bialystok: 'Białystok', rzeszow: 'Rzeszów',
      czestochowa: 'Częstochowa', torun: 'Toruń', 'zielona gora': 'Zielona Góra'
    },
    de: {
      munich: 'München', munchen: 'München', cologne: 'Köln', koln: 'Köln',
      nuremberg: 'Nürnberg', nurnberg: 'Nürnberg', dusseldorf: 'Düsseldorf',
      duesseldorf: 'Düsseldorf', hanover: 'Hannover', vienna: 'Wien',
      zurich: 'Zürich', geneva: 'Genf', lucerne: 'Luzern'
    },
    nl: {
      'the hague': 'Den Haag', hague: 'Den Haag', brussels: 'Brussel',
      antwerp: 'Antwerpen', ghent: 'Gent', bruges: 'Brugge', liege: 'Luik'
    },
    fr: {
      brussels: 'Bruxelles', antwerp: 'Anvers', ghent: 'Gand',
      geneva: 'Genève', liege: 'Liège', marseilles: 'Marseille'
    },
    it: {
      rome: 'Roma', milan: 'Milano', naples: 'Napoli', florence: 'Firenze',
      turin: 'Torino', venice: 'Venezia', genoa: 'Genova', padua: 'Padova'
    },
    es: {
      seville: 'Sevilla', malaga: 'Málaga', corunna: 'A Coruña',
      'a coruna': 'A Coruña', 'palma de mallorca': 'Palma'
    },
    pt: { lisbon: 'Lisboa', oporto: 'Porto' },
    sv: { gothenburg: 'Göteborg', malmo: 'Malmö' },
    no: { tromso: 'Tromsø' },
    da: { copenhagen: 'København' },
    fi: { hyvinkaa: 'Hyvinkää', hameenlinna: 'Hämeenlinna', jarvenpaa: 'Järvenpää' },
    el: {
      athens: 'Αθήνα', thessaloniki: 'Θεσσαλονίκη', patras: 'Πάτρα',
      heraklion: 'Ηράκλειο', larissa: 'Λάρισα', volos: 'Βόλος',
      rhodes: 'Ρόδος', chania: 'Χανιά'
    },
    hr: { 'slavonski brod': 'Slavonski Brod' },
    sl: { 'nova gorica': 'Nova Gorica' },
    sk: {
      kosice: 'Košice', presov: 'Prešov', zilina: 'Žilina',
      'banska bystrica': 'Banská Bystrica', trencin: 'Trenčín'
    },
    cs: {
      prague: 'Praha', pilsen: 'Plzeň', plzen: 'Plzeň',
      'ceske budejovice': 'České Budějovice', 'hradec kralove': 'Hradec Králové'
    },
    hu: {
      pecs: 'Pécs', gyor: 'Győr', szekesfehervar: 'Székesfehérvár',
      nyiregyhaza: 'Nyíregyháza', bekescsaba: 'Békéscsaba'
    },
    he: {
      'tel aviv': 'תל אביב', 'tel aviv yafo': 'תל אביב-יפו',
      jerusalem: 'ירושלים', haifa: 'חיפה', beersheba: 'באר שבע',
      'beer sheva': 'באר שבע', netanya: 'נתניה', ashdod: 'אשדוד',
      asqelon: 'אשקלון', ashkelon: 'אשקלון', 'petah tikva': 'פתח תקווה',
      'rishon lezion': 'ראשון לציון', holon: 'חולון', eilat: 'אילת'
    }
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

  const normaliseCityKey = (value = '') => String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/[-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const localiseCity = (city) => {
    const raw = String(city || '').trim();
    if (!raw) return '';
    const locale = countryCityLocale[state.country] || getLocale();
    const names = cityNames[locale] || {};
    return names[normaliseCityKey(raw)] || raw;
  };

  const getStableDistanceKm = () => {
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
    distanceKm: getStableDistanceKm()
  };

  const getMarketFallbackCity = () => {
    try {
      if (typeof locales === 'undefined') return '';
      const profile = locales[getLocale()]?.profiles?.[0];
      return Array.isArray(profile) && typeof profile[1] === 'string' ? profile[1].trim() : '';
    } catch (_) {
      return '';
    }
  };

  const getDisplayCity = () => {
    const text = copy[getLocale()] || copy['en-GB'];
    const source = state.city || getMarketFallbackCity();
    return localiseCity(source) || text.nearby;
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
      .featured-profile .rmc-main-location-line{display:flex;align-items:center;gap:5px;min-width:0;line-height:1.35}
      .featured-profile .rmc-main-location-pin{flex:0 0 auto;font-size:.78rem}
      .featured-profile .rmc-main-city{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      .featured-profile .rmc-main-location-separator,.featured-profile .rmc-main-distance{flex:0 0 auto;white-space:nowrap}
      @media(max-width:420px){
        .featured-profile .rmc-main-location-line{gap:4px;font-size:.82rem}
        .featured-profile .rmc-main-city{max-width:48vw}
      }
    `;
    document.head.appendChild(style);
  };

  const render = () => {
    const line = document.querySelector('.hero-invite .featured-profile .profile-overlay p');
    if (!line) return false;

    const pin = document.createElement('span');
    pin.className = 'rmc-main-location-pin';
    pin.setAttribute('aria-hidden', 'true');
    pin.textContent = '📍';

    const cityNode = document.createElement('span');
    cityNode.className = 'rmc-main-city';
    cityNode.textContent = getDisplayCity();

    const separator = document.createElement('span');
    separator.className = 'rmc-main-location-separator';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '·';

    const distanceNode = document.createElement('span');
    distanceNode.className = 'rmc-main-distance';
    distanceNode.textContent = formatDistance();

    line.className = `${line.className || ''} rmc-main-location-line`.trim();
    line.removeAttribute('data-i18n');
    line.replaceChildren(pin, cityNode, separator, distanceNode);
    line.setAttribute('aria-label', `${cityNode.textContent}, ${distanceNode.textContent}`);
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
      window.setTimeout(render, 150);
      window.setTimeout(render, 500);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();

window.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const cta = target.closest('.js-affiliate');
  if (!cta || typeof window.rmcTrack !== 'function') return;
  const slot = cta.dataset.slot || cta.getAttribute('data-slot') || 'unknown';
  window.rmcTrack('cta_click', { slot });
  window.rmcTrack('age_gate_open', { slot });
}, true);
