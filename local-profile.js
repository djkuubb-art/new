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

(() => {
  const PHOTOS = [
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785864718/a2da64a7-ee33-4baf-a2d6-e20504f45b50_ekpe66.png',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785864718/2d4b618b-607f-454d-b3f5-daf793df0644_dzkv1u.png',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785864718/1gb_le1u9j.png',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785981205/013_Liebe_kennt_kein_Alter_reel_source_rxzx1f.jpg',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785981205/025_Liebe_kennt_kein_Alter_reel_source_hvq5pi.jpg',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785981205/023_Liebe_kennt_kein_Alter_reel_source_bxx7nc.jpg',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785981205/014_Liebe_kennt_kein_Alter_reel_source_x1vp0y.jpg',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785981205/011_Liebe_kennt_kein_Alter_reel_source_lb20vs.jpg',
    'https://res.cloudinary.com/r8lomm2b/image/upload/v1785981205/004_Liebe_kennt_kein_Alter_reel_source_xisg7k.jpg'
  ];

  const AGES = [41, 44, 42, 47, 52, 43, 49, 46, 54];
  const FALLBACK_NAMES = ['Anna', 'Claire', 'Emma', 'Laura', 'Sophie', 'Julia', 'Maria', 'Nicole', 'Elena'];

  const EXTRA_PROFILES = {
    'en-GB': [['Laura', 'Bristol'], ['Sophie', 'Leeds'], ['Julia', 'Liverpool'], ['Maria', 'Glasgow'], ['Nicole', 'Sheffield'], ['Elena', 'Nottingham']],
    'en-US': [['Laura', 'Phoenix'], ['Sophie', 'Seattle'], ['Julia', 'Denver'], ['Maria', 'Orlando'], ['Nicole', 'San Diego'], ['Elena', 'Boston']],
    'en-SG': [['Laura', 'Woodlands'], ['Sophie', 'Bedok'], ['Julia', 'Punggol'], ['Maria', 'Clementi'], ['Nicole', 'Bishan'], ['Elena', 'Toa Payoh']],
    de: [['Laura', 'München'], ['Sophie', 'Frankfurt'], ['Julia', 'Düsseldorf'], ['Maria', 'Stuttgart'], ['Nicole', 'Leipzig'], ['Elena', 'Dortmund']],
    nl: [['Laura', 'Eindhoven'], ['Sophie', 'Groningen'], ['Julia', 'Haarlem'], ['Maria', 'Breda'], ['Nicole', 'Nijmegen'], ['Elena', 'Maastricht']],
    fr: [['Laura', 'Toulouse'], ['Sophie', 'Nice'], ['Julia', 'Lille'], ['Maria', 'Nantes'], ['Nicole', 'Strasbourg'], ['Elena', 'Montpellier']],
    it: [['Laura', 'Milano'], ['Sofia', 'Torino'], ['Giulia', 'Bologna'], ['Maria', 'Firenze'], ['Nicole', 'Genova'], ['Elena', 'Verona']],
    es: [['Laura', 'Madrid'], ['Sofía', 'Barcelona'], ['Julia', 'Valencia'], ['María', 'Sevilla'], ['Nicole', 'Málaga'], ['Elena', 'Bilbao']],
    pt: [['Laura', 'Lisboa'], ['Sofia', 'Porto'], ['Júlia', 'Braga'], ['Maria', 'Coimbra'], ['Nicole', 'Faro'], ['Elena', 'Aveiro']],
    pl: [['Laura', 'Warszawa'], ['Zofia', 'Kraków'], ['Julia', 'Wrocław'], ['Maria', 'Poznań'], ['Natalia', 'Gdańsk'], ['Elżbieta', 'Łódź']],
    sv: [['Laura', 'Stockholm'], ['Sofia', 'Göteborg'], ['Julia', 'Malmö'], ['Maria', 'Uppsala'], ['Nicole', 'Västerås'], ['Elena', 'Örebro']],
    no: [['Laura', 'Oslo'], ['Sofia', 'Bergen'], ['Julia', 'Trondheim'], ['Maria', 'Stavanger'], ['Nicole', 'Tromsø'], ['Elena', 'Kristiansand']],
    da: [['Laura', 'København'], ['Sofie', 'Aarhus'], ['Julia', 'Odense'], ['Maria', 'Aalborg'], ['Nicole', 'Esbjerg'], ['Elena', 'Randers']],
    fi: [['Laura', 'Helsinki'], ['Sofia', 'Tampere'], ['Julia', 'Turku'], ['Maria', 'Oulu'], ['Nicole', 'Espoo'], ['Elena', 'Jyväskylä']],
    el: [['Λάουρα', 'Αθήνα'], ['Σοφία', 'Θεσσαλονίκη'], ['Τζούλια', 'Πάτρα'], ['Μαρία', 'Ηράκλειο'], ['Νικόλ', 'Λάρισα'], ['Έλενα', 'Βόλος']],
    hr: [['Laura', 'Zagreb'], ['Sofija', 'Split'], ['Julija', 'Rijeka'], ['Marija', 'Osijek'], ['Nikolina', 'Zadar'], ['Elena', 'Pula']],
    sl: [['Laura', 'Ljubljana'], ['Sofija', 'Maribor'], ['Julija', 'Koper'], ['Marija', 'Celje'], ['Nikolina', 'Kranj'], ['Elena', 'Novo mesto']],
    sk: [['Laura', 'Bratislava'], ['Sofia', 'Košice'], ['Júlia', 'Prešov'], ['Mária', 'Žilina'], ['Nikola', 'Nitra'], ['Elena', 'Banská Bystrica']],
    cs: [['Laura', 'Praha'], ['Sofie', 'Brno'], ['Julie', 'Ostrava'], ['Marie', 'Plzeň'], ['Nikola', 'Olomouc'], ['Elena', 'Liberec']],
    hu: [['Laura', 'Budapest'], ['Zsófia', 'Debrecen'], ['Júlia', 'Szeged'], ['Mária', 'Pécs'], ['Nikolett', 'Győr'], ['Elena', 'Miskolc']],
    he: [['לאורה', 'תל אביב'], ['סופיה', 'ירושלים'], ['יוליה', 'חיפה'], ['מרים', 'ראשון לציון'], ['ניקול', 'נתניה'], ['אלנה', 'באר שבע']]
  };

  const transformed = (url, width) => url.replace('/upload/', `/upload/f_auto,q_auto:good,c_fill,g_auto,ar_3:4,w_${width}/`);

  const extendLocaleProfiles = () => {
    if (typeof locales === 'undefined') return;
    Object.entries(EXTRA_PROFILES).forEach(([localeCode, extras]) => {
      const dictionary = locales[localeCode];
      if (!dictionary || !Array.isArray(dictionary.profiles)) return;
      dictionary.profiles = dictionary.profiles.slice(0, 3).concat(extras);
    });
  };

  const updateCard = (card, index) => {
    card.dataset.slot = `card-${index + 1}`;
    card.removeAttribute('data-profile-index');
    card.removeAttribute('data-lower-profile-ready');

    const image = card.querySelector('.image-wrap > img');
    if (image) {
      image.src = transformed(PHOTOS[index], 480);
      image.srcset = `${transformed(PHOTOS[index], 320)} 320w, ${transformed(PHOTOS[index], 480)} 480w, ${transformed(PHOTOS[index], 720)} 720w`;
      image.alt = `Profile ${index + 1}`;
      image.width = 480;
      image.height = 640;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.fetchPriority = 'low';
    }

    const heading = card.querySelector('h3');
    const oldName = heading?.querySelector('[data-profile]');
    if (heading && oldName) {
      const name = oldName.cloneNode(false);
      name.dataset.profile = `${index}-name`;
      name.textContent = FALLBACK_NAMES[index];
      heading.replaceChildren(name, document.createTextNode(`, ${AGES[index]}`));
    }

    const distance = card.querySelector('[data-profile-distance]');
    if (distance) distance.dataset.profileDistance = String(index);

    const bio = card.querySelector('[data-profile-bio]');
    if (bio) bio.dataset.profileBio = String(index);
  };

  const buildNineCards = () => {
    const track = document.getElementById('profileSwipeTrack');
    if (!track) return;

    const existing = [...track.querySelectorAll('.profile-card-premium')];
    if (existing.length < 3) return;

    existing.slice(3).forEach((card) => card.remove());
    const templates = existing.slice(0, 3);

    for (let index = 0; index < 9; index += 1) {
      const card = index < 3 ? templates[index] : templates[index % 3].cloneNode(true);
      updateCard(card, index);
      if (index >= 3) track.appendChild(card);
    }

    const dots = document.querySelector('.profile-swipe-dots');
    if (dots) {
      dots.replaceChildren(...Array.from({ length: 9 }, (_, index) => {
        const dot = document.createElement('button');
        dot.className = `profile-swipe-dot${index === 0 ? ' is-active' : ''}`;
        dot.type = 'button';
        dot.setAttribute('aria-label', `Profile ${index + 1}`);
        return dot;
      }));
    }
  };

  const refreshNames = () => {
    try {
      if (typeof setLocale === 'function') {
        setLocale(document.documentElement.lang || 'en-GB', { persist: false });
      }

      const inviteName = document.querySelector('.invite-preview strong')?.textContent?.split(',')[0]?.trim() || 'Anna';
      const heroHeading = document.querySelector('.featured-profile .profile-overlay h2');
      if (heroHeading) heroHeading.textContent = `${inviteName}, 41`;
    } catch (_) {}
  };

  extendLocaleProfiles();
  buildNineCards();
  refreshNames();
})();
