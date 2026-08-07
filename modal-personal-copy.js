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

(() => {
  const DURATION_MS = 10 * 60 * 1000;
  const DEADLINE_KEY = 'rmc_prominent_invite_deadline_v1';

  const timerCopy = {
    'en-GB': { label: 'This invitation expires permanently in', expired: 'Your invitation has expired', renew: 'Renew invitation' },
    'en-US': { label: 'This invitation expires permanently in', expired: 'Your invitation has expired', renew: 'Renew invitation' },
    'en-SG': { label: 'This invitation expires permanently in', expired: 'Your invitation has expired', renew: 'Renew invitation' },
    de: { label: 'Diese Einladung verfällt endgültig in', expired: 'Deine Einladung ist abgelaufen', renew: 'Einladung erneuern' },
    nl: { label: 'Deze uitnodiging verloopt definitief over', expired: 'Je uitnodiging is verlopen', renew: 'Uitnodiging vernieuwen' },
    fr: { label: 'Cette invitation expire définitivement dans', expired: 'Votre invitation a expiré', renew: 'Renouveler l’invitation' },
    it: { label: 'Questo invito scade definitivamente tra', expired: 'Il tuo invito è scaduto', renew: 'Rinnova l’invito' },
    es: { label: 'Esta invitación caduca definitivamente en', expired: 'Tu invitación ha caducado', renew: 'Renovar invitación' },
    pt: { label: 'Este convite expira definitivamente dentro de', expired: 'O teu convite expirou', renew: 'Renovar convite' },
    pl: { label: 'Zaproszenie wygaśnie bezpowrotnie za', expired: 'Zaproszenie wygasło', renew: 'Odnów zaproszenie' },
    sv: { label: 'Den här inbjudan upphör permanent om', expired: 'Din inbjudan har gått ut', renew: 'Förnya inbjudan' },
    no: { label: 'Denne invitasjonen utløper permanent om', expired: 'Invitasjonen din har utløpt', renew: 'Forny invitasjonen' },
    da: { label: 'Denne invitation udløber permanent om', expired: 'Din invitation er udløbet', renew: 'Forny invitationen' },
    fi: { label: 'Tämä kutsu vanhenee lopullisesti', expired: 'Kutsusi on vanhentunut', renew: 'Uusi kutsu' },
    el: { label: 'Αυτή η πρόσκληση λήγει οριστικά σε', expired: 'Η πρόσκλησή σου έληξε', renew: 'Ανανέωση πρόσκλησης' },
    hr: { label: 'Ova pozivnica trajno istječe za', expired: 'Tvoja pozivnica je istekla', renew: 'Obnovi pozivnicu' },
    sl: { label: 'To povabilo dokončno poteče čez', expired: 'Tvoje povabilo je poteklo', renew: 'Obnovi povabilo' },
    sk: { label: 'Táto pozvánka definitívne vyprší o', expired: 'Tvoja pozvánka vypršala', renew: 'Obnoviť pozvánku' },
    cs: { label: 'Tato pozvánka definitivně vyprší za', expired: 'Tvoje pozvánka vypršela', renew: 'Obnovit pozvánku' },
    hu: { label: 'Ez a meghívó végleg lejár ennyi idő múlva', expired: 'A meghívód lejárt', renew: 'Meghívó megújítása' },
    he: { label: 'ההזמנה הזו תפוג לצמיתות בעוד', expired: 'ההזמנה שלך פגה', renew: 'חידוש ההזמנה' }
  };

  const normaliseLocale = (value = '') => {
    if (timerCopy[value]) return value;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return timerCopy[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const getCopy = () => timerCopy[getLocale()] || timerCopy['en-GB'];

  const readDeadline = () => {
    try {
      const saved = Number(sessionStorage.getItem(DEADLINE_KEY));
      if (Number.isFinite(saved) && saved > 0) return saved;
      const next = Date.now() + DURATION_MS;
      sessionStorage.setItem(DEADLINE_KEY, String(next));
      return next;
    } catch (_) {
      return Date.now() + DURATION_MS;
    }
  };

  let deadline = readDeadline();

  const saveDeadline = (value) => {
    deadline = value;
    try { sessionStorage.setItem(DEADLINE_KEY, String(value)); }
    catch (_) {}
  };

  const injectStyles = () => {
    if (document.getElementById('rmc-prominent-countdown-styles')) return;
    const style = document.createElement('style');
    style.id = 'rmc-prominent-countdown-styles';
    style.textContent = `
      .phone-top .expiry-pill{display:none!important}
      .rmc-invite-countdown{position:relative;display:grid;grid-template-columns:34px minmax(0,1fr) auto;align-items:center;gap:11px;margin:0 0 9px;padding:13px 14px;border:1px solid rgba(255,61,72,.34);border-radius:16px;background:linear-gradient(135deg,rgba(229,9,20,.16),rgba(255,255,255,.025));box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 9px 24px rgba(0,0,0,.18);color:#fff;overflow:hidden}
      .rmc-invite-countdown::before{content:'';position:absolute;inset:0 auto 0 0;width:3px;background:linear-gradient(#ff4a55,#b40009)}
      .rmc-invite-countdown-icon{display:grid;width:34px;height:34px;place-items:center;border-radius:11px;background:rgba(229,9,20,.16);font-size:1rem;box-shadow:inset 0 0 0 1px rgba(255,70,80,.16)}
      .rmc-invite-countdown-copy{min-width:0;text-align:left}
      .rmc-invite-countdown-label{display:block;color:rgba(255,255,255,.82);font-size:.78rem;font-weight:760;line-height:1.25}
      .rmc-invite-countdown-expired{display:none;color:#fff;font-size:.88rem;font-weight:850;line-height:1.2}
      .rmc-invite-countdown-time{min-width:84px;color:#fff;font:950 1.65rem/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-variant-numeric:tabular-nums;letter-spacing:.025em;text-align:right;text-shadow:0 0 22px rgba(255,45,58,.22)}
      .rmc-invite-countdown.is-urgent{border-color:rgba(255,72,83,.68);background:linear-gradient(135deg,rgba(229,9,20,.24),rgba(255,255,255,.03))}
      .rmc-invite-countdown.is-urgent .rmc-invite-countdown-time{animation:rmcCountdownPulse 1.1s ease-in-out infinite}
      .rmc-invite-countdown-renew{display:none;align-items:center;justify-content:center;min-height:40px;padding:8px 13px;border:0;border-radius:11px;background:linear-gradient(135deg,#f01b27,#b5000a);box-shadow:0 8px 20px rgba(229,9,20,.24);color:#fff;font:850 .76rem/1.1 inherit;white-space:nowrap;cursor:pointer}
      .rmc-invite-countdown-renew:focus-visible{outline:3px solid rgba(255,255,255,.9);outline-offset:2px}
      .rmc-invite-countdown.is-expired{grid-template-columns:34px minmax(0,1fr) auto;border-color:rgba(255,63,75,.52);background:linear-gradient(135deg,rgba(229,9,20,.20),rgba(255,255,255,.025))}
      .rmc-invite-countdown.is-expired .rmc-invite-countdown-label,.rmc-invite-countdown.is-expired .rmc-invite-countdown-time{display:none}
      .rmc-invite-countdown.is-expired .rmc-invite-countdown-expired,.rmc-invite-countdown.is-expired .rmc-invite-countdown-renew{display:flex}
      [dir='rtl'] .rmc-invite-countdown{direction:rtl}
      [dir='rtl'] .rmc-invite-countdown-copy{text-align:right}
      [dir='rtl'] .rmc-invite-countdown-time{direction:ltr;text-align:left}
      @keyframes rmcCountdownPulse{50%{opacity:.72;transform:scale(1.035)}}
      @media(max-width:760px){.hero-invite .rmc-invite-countdown{margin:0 0 8px;padding:12px 12px 12px 13px;border-radius:15px;grid-template-columns:32px minmax(0,1fr) auto;gap:9px}.hero-invite .rmc-invite-countdown-icon{width:32px;height:32px;border-radius:10px}.hero-invite .rmc-invite-countdown-label{font-size:.75rem}.hero-invite .rmc-invite-countdown-time{min-width:78px;font-size:1.52rem}.hero-invite .rmc-invite-countdown-renew{min-height:38px;padding:8px 11px;font-size:.73rem}}
      @media(max-width:390px){.hero-invite .rmc-invite-countdown{grid-template-columns:30px minmax(0,1fr) auto;padding:11px 10px 11px 12px;gap:8px}.hero-invite .rmc-invite-countdown-icon{width:30px;height:30px}.hero-invite .rmc-invite-countdown-label{font-size:.70rem}.hero-invite .rmc-invite-countdown-time{min-width:71px;font-size:1.38rem}.hero-invite .rmc-invite-countdown-renew{padding-inline:9px;font-size:.68rem}}
    `;
    document.head.appendChild(style);
  };

  const ensurePanel = () => {
    const phone = document.querySelector('.hero-invite .phone-card');
    const featured = phone?.querySelector('.featured-profile');
    if (!phone || !featured) return null;

    let panel = phone.querySelector('.rmc-invite-countdown');
    if (panel) return panel;

    panel = document.createElement('div');
    panel.className = 'rmc-invite-countdown';
    panel.setAttribute('role', 'timer');
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <span class="rmc-invite-countdown-icon" aria-hidden="true">⏳</span>
      <span class="rmc-invite-countdown-copy">
        <span class="rmc-invite-countdown-label"></span>
        <span class="rmc-invite-countdown-expired"></span>
      </span>
      <strong class="rmc-invite-countdown-time">10:00</strong>
      <button class="rmc-invite-countdown-renew" type="button"></button>
    `;
    featured.insertAdjacentElement('beforebegin', panel);

    panel.querySelector('.rmc-invite-countdown-renew').addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      saveDeadline(Date.now() + DURATION_MS);
      updatePanel();
      if (typeof window.rmcTrack === 'function') window.rmcTrack('invite_renewed', { slot: 'countdown' });
      window.setTimeout(() => {
        const opener = document.querySelector('.hero-invite .phone-cta.js-affiliate, .hero-invite .heart-button.js-affiliate, .js-affiliate');
        opener?.click();
      }, 40);
    });

    return panel;
  };

  const updatePanel = () => {
    const panel = ensurePanel();
    if (!panel) return;

    const copy = getCopy();
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    const expired = remaining === 0;

    panel.querySelector('.rmc-invite-countdown-label').textContent = copy.label;
    panel.querySelector('.rmc-invite-countdown-expired').textContent = copy.expired;
    panel.querySelector('.rmc-invite-countdown-renew').textContent = copy.renew;
    panel.querySelector('.rmc-invite-countdown-time').textContent = `${minutes}:${seconds}`;
    panel.classList.toggle('is-urgent', remaining > 0 && remaining <= 60);
    panel.classList.toggle('is-expired', expired);
  };

  const initialise = () => {
    injectStyles();
    updatePanel();
    window.setInterval(updatePanel, 1000);
    document.addEventListener('visibilitychange', updatePanel);
    document.getElementById('languageSelect')?.addEventListener('change', () => window.setTimeout(updatePanel, 0));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();