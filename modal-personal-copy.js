(() => {
  const localeCopy = {
    'en-GB': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', accountCta: 'Create account' },
    'en-US': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', accountCta: 'Create account' },
    'en-SG': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', accountCta: 'Create account' },
    de: { title: 'Du bist ganz nah dran.', text: 'Wähle deine Altersgruppe. Im nächsten Schritt meldest du dich kurz an und kannst anschließend mit Anna chatten.', accountCta: 'Konto erstellen' },
    nl: { title: 'Je bent er bijna.', text: 'Kies je leeftijdsgroep. Daarna maak je snel een account aan en kun je verder naar het gesprek met Anna.', accountCta: 'Account aanmaken' },
    fr: { title: 'Vous y êtes presque.', text: 'Choisissez votre tranche d’âge. Vous passerez ensuite par une inscription rapide avant de poursuivre la conversation avec Anna.', accountCta: 'Créer un compte' },
    it: { title: 'Ci sei quasi.', text: 'Scegli la tua fascia d’età. Nel passaggio successivo completerai una registrazione rapida e potrai continuare la conversazione con Anna.', accountCta: 'Crea un account' },
    es: { title: 'Ya estás muy cerca.', text: 'Elige tu franja de edad. En el siguiente paso completarás un registro rápido y podrás continuar la conversación con Anna.', accountCta: 'Crear una cuenta' },
    pt: { title: 'Estás quase lá.', text: 'Escolhe a tua faixa etária. No passo seguinte farás um registo rápido e poderás continuar a conversa com a Anna.', accountCta: 'Criar conta' },
    pl: { title: 'Jesteś bardzo blisko.', text: 'Wybierz swój przedział wiekowy, a w następnym kroku przejdziesz do szybkiej rejestracji i rozmowy z Anną.', accountCta: 'Załóż konto' },
    sv: { title: 'Du är nästan framme.', text: 'Välj din åldersgrupp. Därefter gör du en snabb registrering och kan fortsätta till samtalet med Anna.', accountCta: 'Skapa konto' },
    no: { title: 'Du er nesten fremme.', text: 'Velg aldersgruppen din. Deretter fullfører du en rask registrering og kan fortsette til samtalen med Anna.', accountCta: 'Opprett konto' },
    da: { title: 'Du er næsten fremme.', text: 'Vælg din aldersgruppe. Derefter gennemfører du en hurtig oprettelse og kan fortsætte til samtalen med Anna.', accountCta: 'Opret konto' },
    fi: { title: 'Olet aivan lähellä.', text: 'Valitse ikäryhmäsi. Seuraavaksi teet nopean rekisteröitymisen ja voit jatkaa keskusteluun Annan kanssa.', accountCta: 'Luo tili' },
    el: { title: 'Είσαι πολύ κοντά.', text: 'Επίλεξε την ηλικιακή σου ομάδα. Στο επόμενο βήμα θα κάνεις μια γρήγορη εγγραφή και θα συνεχίσεις στη συζήτηση με την Άννα.', accountCta: 'Δημιούργησε λογαριασμό' },
    hr: { title: 'Još si samo korak do cilja.', text: 'Odaberi svoju dobnu skupinu. U sljedećem koraku brzo ćeš otvoriti račun i nastaviti razgovor s Annom.', accountCta: 'Otvori račun' },
    sl: { title: 'Skoraj si že tam.', text: 'Izberi svojo starostno skupino. V naslednjem koraku se hitro registriraš in nadaljuješ pogovor z Anno.', accountCta: 'Ustvari račun' },
    sk: { title: 'Si už veľmi blízko.', text: 'Vyber svoju vekovú skupinu. V ďalšom kroku sa rýchlo zaregistruješ a budeš môcť pokračovať v rozhovore s Annou.', accountCta: 'Vytvoriť účet' },
    cs: { title: 'Jsi už velmi blízko.', text: 'Vyber svou věkovou skupinu. V dalším kroku se rychle zaregistruješ a budeš moci pokračovat v rozhovoru s Annou.', accountCta: 'Vytvořit účet' },
    hu: { title: 'Már nagyon közel vagy.', text: 'Válaszd ki a korcsoportodat. A következő lépésben gyorsan regisztrálsz, majd folytathatod a beszélgetést Annával.', accountCta: 'Fiók létrehozása' },
    he: { title: 'אתה ממש קרוב.', text: 'בחר את קבוצת הגיל שלך. בשלב הבא תבצע הרשמה מהירה ותוכל להמשיך לשיחה עם אנה.', accountCta: 'פתיחת חשבון' }
  };

  const normaliseLocale = (value = '') => {
    if (localeCopy[value]) return value;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return localeCopy[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const setText = (node, value) => {
    if (node && node.textContent !== value) node.textContent = value;
  };

  const applyPersonalCopy = () => {
    const current = localeCopy[getLocale()] || localeCopy['en-GB'];
    const modal = document.getElementById('ageGateModal');

    if (modal) {
      setText(modal.querySelector('.age-gate-title'), current.title);
      setText(modal.querySelector('.age-gate-text'), current.text);
    }

    const stickyCopy = document.querySelector('.mobile-sticky [data-role="sticky-account-copy"], .mobile-sticky span:first-child');
    if (stickyCopy) {
      stickyCopy.removeAttribute('data-i18n');
      stickyCopy.setAttribute('data-role', 'sticky-account-copy');
      setText(stickyCopy, current.accountCta);
    }
  };

  const initialise = () => {
    applyPersonalCopy();

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.js-affiliate')) return;
      window.setTimeout(applyPersonalCopy, 0);
    }, true);

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      window.setTimeout(applyPersonalCopy, 0);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();

(() => {
  const ENDPOINT = '/api/track';
  const SESSION_KEY = 'rmc_analytics_session_v1';
  const VOICE_EVENTS = new Set([
    'voice_message_visible',
    'voice_message_play',
    'voice_message_complete',
    'voice_cta_play',
    'voice_notification_open_main_profile'
  ]);

  const makeUuid = () => {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    const bytes = new Uint8Array(16);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  };

  const getSessionId = () => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) return saved;
      const value = makeUuid();
      sessionStorage.setItem(SESSION_KEY, value);
      return value;
    } catch (_) {
      return makeUuid();
    }
  };

  const getLocale = () => String(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language ||
    'en-GB'
  ).slice(0, 12);

  const getReferrerHost = () => {
    if (!document.referrer) return '';
    try { return new URL(document.referrer).hostname; }
    catch (_) { return ''; }
  };

  const query = new URLSearchParams(location.search);
  const sessionId = getSessionId();

  const basePayload = () => ({
    event_id: makeUuid(),
    session_id: sessionId,
    locale: getLocale(),
    device: window.matchMedia('(max-width: 760px)').matches ? 'mobile' : 'desktop',
    path: location.pathname.slice(0, 240),
    referrer_host: getReferrerHost(),
    source: (query.get('utm_source') || '').slice(0, 120),
    medium: (query.get('utm_medium') || '').slice(0, 120),
    campaign: (query.get('utm_campaign') || '').slice(0, 160),
    term: (query.get('utm_term') || '').slice(0, 160),
    content: (query.get('utm_content') || '').slice(0, 160),
    sub1: (query.get('sub1') || '').slice(0, 160),
    sub2: (query.get('sub2') || '').slice(0, 160),
    sub3: (query.get('sub3') || '').slice(0, 160)
  });

  const send = (eventName, details = {}, immediate = false) => {
    const metadata = { ...details };
    const slot = typeof metadata.slot === 'string' ? metadata.slot : '';
    delete metadata.slot;

    const payload = {
      ...basePayload(),
      event_name: eventName,
      slot: slot.slice(0, 64),
      metadata
    };

    const body = JSON.stringify(payload);
    if (immediate && navigator.sendBeacon) {
      const queued = navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      if (queued) return;
    }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      credentials: 'same-origin',
      keepalive: true
    }).catch(() => {});
  };

  window.rmcTrack = (eventName, details = {}, options = {}) => {
    send(String(eventName || ''), details, Boolean(options.immediate));
  };

  window.dataLayer = window.dataLayer || [];
  const originalPush = window.dataLayer.push.bind(window.dataLayer);
  window.dataLayer.push = (...items) => {
    items.forEach((item) => {
      if (!item || typeof item !== 'object' || !VOICE_EVENTS.has(item.event)) return;
      const details = { ...item };
      delete details.event;
      send(item.event, details);
    });
    return originalPush(...items);
  };

  const initialiseTracking = () => {
    send('page_view');

    document.addEventListener('click', (event) => {
      const ageOption = event.target.closest('.age-option');
      if (ageOption) {
        send('age_selected', {
          age_range: ageOption.textContent?.trim() || '',
          slot: 'age-gate'
        }, true);
        return;
      }

      const cta = event.target.closest('.js-affiliate');
      if (cta) {
        const slot = cta.dataset.slot || cta.getAttribute('data-slot') || 'unknown';
        send('cta_click', { slot });
        send('age_gate_open', { slot });
        return;
      }

      const profile = event.target.closest('.profile-card-premium');
      if (profile) {
        send('profile_open', {
          slot: profile.dataset.slot || `profile-${profile.dataset.profileIndex || 'unknown'}`
        });
      }
    }, true);

    document.getElementById('languageSelect')?.addEventListener('change', (event) => {
      send('language_change', { selected_locale: event.target?.value || getLocale() });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseTracking, { once: true });
  } else {
    initialiseTracking();
  }
})();
