(() => {
  const localeCopy = {
    'en-GB': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', distance: '7.6 miles from you', accountCta: 'Create account', message: 'Hey… are you still there?' },
    'en-US': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', distance: '7.6 miles from you', accountCta: 'Create account', message: 'Hey… are you still there?' },
    'en-SG': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', distance: '12.3 km from you', accountCta: 'Create account', message: 'Hey… are you still there?' },
    de: { title: 'Du bist ganz nah dran.', text: 'Wähle deine Altersgruppe. Im nächsten Schritt meldest du dich kurz an und kannst anschließend mit Anna chatten.', distance: '12,3 km von dir entfernt', accountCta: 'Konto erstellen', message: 'Hey … bist du noch da?' },
    nl: { title: 'Je bent er bijna.', text: 'Kies je leeftijdsgroep. Daarna maak je snel een account aan en kun je verder naar het gesprek met Anna.', distance: '12,3 km bij je vandaan', accountCta: 'Account aanmaken', message: 'Hé… ben je er nog?' },
    fr: { title: 'Vous y êtes presque.', text: 'Choisissez votre tranche d’âge. Vous passerez ensuite par une inscription rapide avant de poursuivre la conversation avec Anna.', distance: 'à 12,3 km de chez vous', accountCta: 'Créer un compte', message: 'Coucou… tu es toujours là ?' },
    it: { title: 'Ci sei quasi.', text: 'Scegli la tua fascia d’età. Nel passaggio successivo completerai una registrazione rapida e potrai continuare la conversazione con Anna.', distance: 'a 12,3 km da te', accountCta: 'Crea un account', message: 'Ehi… ci sei ancora?' },
    es: { title: 'Ya estás muy cerca.', text: 'Elige tu franja de edad. En el siguiente paso completarás un registro rápido y podrás continuar la conversación con Anna.', distance: 'a 12,3 km de ti', accountCta: 'Crear una cuenta', message: 'Hola… ¿sigues ahí?' },
    pt: { title: 'Estás quase lá.', text: 'Escolhe a tua faixa etária. No passo seguinte farás um registo rápido e poderás continuar a conversa com a Anna.', distance: 'a 12,3 km de ti', accountCta: 'Criar conta', message: 'Olá… ainda estás aí?' },
    pl: { title: 'Jesteś bardzo blisko.', text: 'Wybierz swój przedział wiekowy, a w następnym kroku przejdziesz do szybkiej rejestracji i rozmowy z Anną.', distance: '12,3 km od Ciebie', accountCta: 'Załóż konto', message: 'Hej… jesteś jeszcze tutaj?' },
    sv: { title: 'Du är nästan framme.', text: 'Välj din åldersgrupp. Därefter gör du en snabb registrering och kan fortsätta till samtalet med Anna.', distance: '12,3 km från dig', accountCta: 'Skapa konto', message: 'Hej… är du fortfarande kvar?' },
    no: { title: 'Du er nesten fremme.', text: 'Velg aldersgruppen din. Deretter fullfører du en rask registrering og kan fortsette til samtalen med Anna.', distance: '12,3 km fra deg', accountCta: 'Opprett konto', message: 'Hei… er du fortsatt der?' },
    da: { title: 'Du er næsten fremme.', text: 'Vælg din aldersgruppe. Derefter gennemfører du en hurtig oprettelse og kan fortsætte til samtalen med Anna.', distance: '12,3 km fra dig', accountCta: 'Opret konto', message: 'Hej… er du der stadig?' },
    fi: { title: 'Olet aivan lähellä.', text: 'Valitse ikäryhmäsi. Seuraavaksi teet nopean rekisteröitymisen ja voit jatkaa keskusteluun Annan kanssa.', distance: '12,3 km päässä sinusta', accountCta: 'Luo tili', message: 'Hei… oletko vielä siellä?' },
    el: { title: 'Είσαι πολύ κοντά.', text: 'Επίλεξε την ηλικιακή σου ομάδα. Στο επόμενο βήμα θα κάνεις μια γρήγορη εγγραφή και θα συνεχίσεις στη συζήτηση με την Άννα.', distance: '12,3 χλμ. από εσένα', accountCta: 'Δημιούργησε λογαριασμό', message: 'Γεια… είσαι ακόμα εδώ;' },
    hr: { title: 'Još si samo korak do cilja.', text: 'Odaberi svoju dobnu skupinu. U sljedećem koraku brzo ćeš otvoriti račun i nastaviti razgovor s Annom.', distance: '12,3 km od tebe', accountCta: 'Otvori račun', message: 'Hej… jesi li još tu?' },
    sl: { title: 'Skoraj si že tam.', text: 'Izberi svojo starostno skupino. V naslednjem koraku se hitro registriraš in nadaljuješ pogovor z Anno.', distance: '12,3 km od tebe', accountCta: 'Ustvari račun', message: 'Hej… si še tukaj?' },
    sk: { title: 'Si už veľmi blízko.', text: 'Vyber svoju vekovú skupinu. V ďalšom kroku sa rýchlo zaregistruješ a budeš môcť pokračovať v rozhovore s Annou.', distance: '12,3 km od teba', accountCta: 'Vytvoriť účet', message: 'Ahoj… ešte si tu?' },
    cs: { title: 'Jsi už velmi blízko.', text: 'Vyber svou věkovou skupinu. V dalším kroku se rychle zaregistruješ a budeš moci pokračovat v rozhovoru s Annou.', distance: '12,3 km od tebe', accountCta: 'Vytvořit účet', message: 'Ahoj… jsi ještě tady?' },
    hu: { title: 'Már nagyon közel vagy.', text: 'Válaszd ki a korcsoportodat. A következő lépésben gyorsan regisztrálsz, majd folytathatod a beszélgetést Annával.', distance: '12,3 km-re tőled', accountCta: 'Fiók létrehozása', message: 'Szia… még itt vagy?' },
    he: { title: 'אתה ממש קרוב.', text: 'בחר את קבוצת הגיל שלך. בשלב הבא תבצע הרשמה מהירה ותוכל להמשיך לשיחה עם אנה.', distance: 'במרחק 12.3 ק״מ ממך', accountCta: 'פתיחת חשבון', message: 'היי… אתה עדיין כאן?' }
  };

  const normaliseLocale = (value = '') => {
    if (localeCopy[value]) return value;
    const raw = String(value).toLowerCase();
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

    document.querySelectorAll('[data-profile="0-city"]').forEach((node) => {
      setText(node, current.distance);
    });

    const stickyCopy = document.querySelector('.mobile-sticky [data-role="sticky-account-copy"], .mobile-sticky span:first-child');
    if (stickyCopy) {
      stickyCopy.removeAttribute('data-i18n');
      stickyCopy.setAttribute('data-role', 'sticky-account-copy');
      setText(stickyCopy, current.accountCta);
    }

    const messageCopy = document.querySelector('.mini-message [data-i18n="messagePreview"], .mini-message p span');
    if (messageCopy) {
      messageCopy.removeAttribute('data-i18n');
      setText(messageCopy, current.message);
    }
  };

  const initialise = () => {
    applyPersonalCopy();

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.js-affiliate')) return;
      queueMicrotask(applyPersonalCopy);
    }, true);

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      setTimeout(applyPersonalCopy, 0);
    });

    new MutationObserver(applyPersonalCopy).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['open']
    });

    new MutationObserver(() => setTimeout(applyPersonalCopy, 0)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
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

(() => {
  const SESSION_KEY = 'rmc_anna_followup_v1';
  const TYPING_DELAY = 6000;
  const REVEAL_DELAY = 2800;
  const copy = {
    'en-GB': { typing: 'Anna is typing…', followup: 'I don’t think I’ve told you the most important thing yet…' },
    'en-US': { typing: 'Anna is typing…', followup: 'I don’t think I’ve told you the most important thing yet…' },
    'en-SG': { typing: 'Anna is typing…', followup: 'I don’t think I’ve told you the most important thing yet…' },
    de: { typing: 'Anna schreibt …', followup: 'Ich glaube, ich habe dir das Wichtigste noch gar nicht gesagt …' },
    fr: { typing: 'Anna écrit…', followup: 'Je crois que je ne t’ai pas encore dit le plus important…' },
    pl: { typing: 'Anna pisze…', followup: 'Chyba nie powiedziałam Ci jeszcze najważniejszego…' },
    hu: { typing: 'Anna éppen ír…', followup: 'Azt hiszem, a legfontosabbat még nem is mondtam el neked…' },
    he: { typing: 'אנה מקלידה…', followup: 'נראה לי שעוד לא סיפרתי לך את הדבר הכי חשוב…' },
    cs: { typing: 'Anna píše…', followup: 'Myslím, že jsem ti ještě neřekla to nejdůležitější…' },
    sk: { typing: 'Anna píše…', followup: 'Myslím, že som ti ešte nepovedala to najdôležitejšie…' },
    sl: { typing: 'Anna piše…', followup: 'Mislim, da ti še nisem povedala tistega najpomembnejšega…' },
    hr: { typing: 'Anna piše…', followup: 'Mislim da ti još nisam rekla ono najvažnije…' },
    el: { typing: 'Η Άννα πληκτρολογεί…', followup: 'Νομίζω πως δεν σου έχω πει ακόμα το πιο σημαντικό…' },
    fi: { typing: 'Anna kirjoittaa…', followup: 'Luulen, etten ole vielä kertonut sinulle sitä kaikkein tärkeintä…' },
    da: { typing: 'Anna skriver…', followup: 'Jeg tror ikke, jeg har fortalt dig det vigtigste endnu…' },
    no: { typing: 'Anna skriver…', followup: 'Jeg tror ikke jeg har fortalt deg det viktigste ennå…' },
    sv: { typing: 'Anna skriver…', followup: 'Jag tror inte att jag har berättat det viktigaste för dig än…' },
    nl: { typing: 'Anna is aan het typen…', followup: 'Volgens mij heb ik je het belangrijkste nog niet verteld…' },
    pt: { typing: 'A Anna está a escrever…', followup: 'Acho que ainda não te contei o mais importante…' },
    es: { typing: 'Anna está escribiendo…', followup: 'Creo que todavía no te he contado lo más importante…' },
    it: { typing: 'Anna sta scrivendo…', followup: 'Credo di non averti ancora detto la cosa più importante…' }
  };

  const normaliseLocale = (value = '') => {
    if (copy[value]) return value;
    const raw = String(value).toLowerCase();
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

  const getState = () => {
    try { return sessionStorage.getItem(SESSION_KEY) || ''; }
    catch (_) { return ''; }
  };

  const saveRevealed = () => {
    try { sessionStorage.setItem(SESSION_KEY, 'revealed'); }
    catch (_) {}
  };

  const trackImpression = (slot) => {
    if (typeof window.rmcTrack !== 'function') return;
    window.rmcTrack('profile_open', { slot, component: 'anna-followup-thread' });
  };

  const addStyles = () => {
    if (document.getElementById('annaFollowupStyles')) return;
    const style = document.createElement('style');
    style.id = 'annaFollowupStyles';
    style.textContent = `
      .anna-followup-thread { margin: 9px 5px 3px; min-height: 0; }
      .anna-followup-card {
        width: 100%; display: grid; grid-template-columns: 42px minmax(0, 1fr); align-items: center;
        gap: 10px; border: 1px solid #292929; border-radius: 18px; padding: 10px;
        background: #171717; color: inherit; text-align: left; font: inherit;
        opacity: 0; transform: translateY(8px); animation: annaFollowupIn .28s ease forwards;
      }
      button.anna-followup-card { cursor: pointer; transition: border-color .18s ease, background .18s ease, transform .18s ease; }
      button.anna-followup-card:hover { border-color: rgba(229, 9, 20, .68); background: #1b1516; transform: translateY(-1px); }
      button.anna-followup-card:focus-visible { outline: 2px solid #ff3540; outline-offset: 2px; }
      .anna-followup-avatar, .anna-followup-avatar img { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; }
      .anna-followup-copy { min-width: 0; display: grid; gap: 2px; }
      .anna-followup-name { color: #fff; font-size: .78rem; line-height: 1.2; font-weight: 800; }
      .anna-followup-text { color: #c5c5c5; font-size: .78rem; line-height: 1.35; }
      .anna-followup-typing-line { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; color: #a8a8a8; font-size: .76rem; }
      .anna-followup-dots { display: inline-flex; align-items: center; gap: 3px; }
      .anna-followup-dots i { width: 5px; height: 5px; border-radius: 50%; background: #ff3540; animation: annaDot 1.05s ease-in-out infinite; }
      .anna-followup-dots i:nth-child(2) { animation-delay: .14s; }
      .anna-followup-dots i:nth-child(3) { animation-delay: .28s; }
      [dir='rtl'] .anna-followup-card { text-align: right; }
      @keyframes annaFollowupIn { to { opacity: 1; transform: translateY(0); } }
      @keyframes annaDot { 0%, 60%, 100% { opacity: .35; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-2px); } }
      @media (prefers-reduced-motion: reduce) {
        .anna-followup-card, .anna-followup-dots i { animation: none; opacity: 1; transform: none; }
      }
    `;
    document.head.appendChild(style);
  };

  const initialise = () => {
    const firstMessage = document.querySelector('.mini-message');
    const phoneCard = firstMessage?.closest('.phone-card');
    if (!firstMessage || !phoneCard || phoneCard.querySelector('.anna-followup-thread')) return;

    addStyles();

    const thread = document.createElement('div');
    thread.className = 'anna-followup-thread';
    thread.setAttribute('aria-live', 'polite');
    firstMessage.insertAdjacentElement('afterend', thread);

    const sourceImage = firstMessage.querySelector('img');
    const sourceName = firstMessage.querySelector('strong');
    let phase = 'hidden';

    const currentCopy = () => copy[getLocale()] || copy['en-GB'];
    const currentName = () => sourceName?.textContent?.trim() || 'Anna';

    const avatarMarkup = () => {
      if (!sourceImage?.src) return '<span class="anna-followup-avatar" aria-hidden="true"></span>';
      const alt = sourceImage.alt || '';
      return `<span class="anna-followup-avatar"><img src="${sourceImage.src}" alt="${alt.replace(/"/g, '&quot;')}" width="42" height="42" decoding="async"></span>`;
    };

    const renderTyping = (track = false) => {
      phase = 'typing';
      const text = currentCopy();
      thread.innerHTML = `
        <div class="anna-followup-card anna-followup-is-typing">
          ${avatarMarkup()}
          <span class="anna-followup-copy">
            <strong class="anna-followup-name">${currentName()}</strong>
            <span class="anna-followup-typing-line"><span>${text.typing}</span><span class="anna-followup-dots" aria-hidden="true"><i></i><i></i><i></i></span></span>
          </span>
        </div>`;
      if (track) trackImpression('anna-typing-visible');
    };

    const renderFollowup = (track = false) => {
      phase = 'revealed';
      const text = currentCopy();
      thread.innerHTML = `
        <button type="button" class="anna-followup-card js-affiliate" data-slot="anna-followup" aria-label="${text.followup.replace(/"/g, '&quot;')}">
          ${avatarMarkup()}
          <span class="anna-followup-copy">
            <strong class="anna-followup-name">${currentName()}</strong>
            <span class="anna-followup-text">${text.followup}</span>
          </span>
        </button>`;
      saveRevealed();
      if (track) trackImpression('anna-followup-visible');
    };

    const updateLanguage = () => {
      if (phase === 'typing') renderTyping(false);
      if (phase === 'revealed') renderFollowup(false);
    };

    document.getElementById('languageSelect')?.addEventListener('change', () => {
      setTimeout(updateLanguage, 0);
    });

    new MutationObserver(updateLanguage).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });

    if (getState() === 'revealed') {
      renderFollowup(false);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setTimeout(() => renderFollowup(true), 500);
      return;
    }

    setTimeout(() => {
      renderTyping(true);
      setTimeout(() => renderFollowup(true), REVEAL_DELAY);
    }, TYPING_DELAY);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
