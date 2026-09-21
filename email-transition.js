(() => {
  const REDIRECT_DELAY_MS = 1400;

  const COPY = {
      "en-GB": {
          "title": "A quick verification",
          "body": "In a moment, you’ll see a few verification questions. Answer them, and you’ll get access to sending messages and viewing photos.",
          "loading": "Preparing the verification questions…"
      },
      "en-US": {
          "title": "A quick verification",
          "body": "In a moment, you’ll see a few verification questions. Answer them, and you’ll get access to sending messages and viewing photos.",
          "loading": "Preparing the verification questions…"
      },
      "en-SG": {
          "title": "A quick verification",
          "body": "In a moment, you’ll see a few verification questions. Answer them, and you’ll get access to sending messages and viewing photos.",
          "loading": "Preparing the verification questions…"
      },
      "de": {
          "title": "Kurze Verifizierung",
          "body": "Gleich siehst du ein paar Verifizierungsfragen. Beantworte sie, danach erhältst du Zugriff auf das Versenden von Nachrichten und das Ansehen von Fotos.",
          "loading": "Die Verifizierungsfragen werden vorbereitet…"
      },
      "nl": {
          "title": "Korte verificatie",
          "body": "Zo meteen krijg je een paar verificatievragen te zien. Beantwoord ze en daarna krijg je toegang tot het versturen van berichten en het bekijken van foto’s.",
          "loading": "De verificatievragen worden klaargezet…"
      },
      "fr": {
          "title": "Vérification rapide",
          "body": "Dans un instant, vous verrez quelques questions de vérification. Répondez-y, puis vous pourrez envoyer des messages et voir les photos.",
          "loading": "Préparation des questions de vérification…"
      },
      "it": {
          "title": "Verifica rapida",
          "body": "Tra poco vedrai alcune domande di verifica. Rispondi e poi potrai inviare messaggi e vedere le foto.",
          "loading": "Preparazione delle domande di verifica…"
      },
      "es": {
          "title": "Verificación rápida",
          "body": "En un momento verás unas preguntas de verificación. Respóndelas y después tendrás acceso a enviar mensajes y ver fotos.",
          "loading": "Preparando las preguntas de verificación…"
      },
      "pt": {
          "title": "Verificação rápida",
          "body": "Daqui a pouco vais ver algumas perguntas de verificação. Responde-lhes e depois terás acesso ao envio de mensagens e à visualização de fotos.",
          "loading": "A preparar as perguntas de verificação…"
      },
      "pl": {
          "title": "Krótka weryfikacja",
          "body": "Za chwilę zobaczysz kilka pytań weryfikacyjnych. Odpowiedz na nie, po czym otrzymasz dostęp do wysyłania wiadomości i oglądania zdjęć.",
          "loading": "Przygotowujemy pytania weryfikacyjne…"
      },
      "sv": {
          "title": "Snabb verifiering",
          "body": "Om en liten stund får du se några verifieringsfrågor. Svara på dem så får du sedan tillgång till att skicka meddelanden och visa bilder.",
          "loading": "Förbereder verifieringsfrågorna…"
      },
      "no": {
          "title": "Rask verifisering",
          "body": "Om et øyeblikk får du se noen verifiseringsspørsmål. Svar på dem, så får du tilgang til å sende meldinger og se bilder.",
          "loading": "Forbereder verifiseringsspørsmålene…"
      },
      "da": {
          "title": "Hurtig verificering",
          "body": "Om et øjeblik får du vist nogle verificeringsspørgsmål. Besvar dem, så får du adgang til at sende beskeder og se billeder.",
          "loading": "Forbereder verificeringsspørgsmålene…"
      },
      "fi": {
          "title": "Nopea vahvistus",
          "body": "Hetken kuluttua näet muutaman vahvistuskysymyksen. Vastaa niihin, niin saat pääsyn viestien lähettämiseen ja kuvien katseluun.",
          "loading": "Valmistellaan vahvistuskysymyksiä…"
      },
      "el": {
          "title": "Γρήγορη επαλήθευση",
          "body": "Σε λίγο θα δεις μερικές ερωτήσεις επαλήθευσης. Απάντησέ τες και μετά θα αποκτήσεις πρόσβαση στην αποστολή μηνυμάτων και στην προβολή φωτογραφιών.",
          "loading": "Ετοιμάζουμε τις ερωτήσεις επαλήθευσης…"
      },
      "hr": {
          "title": "Brza provjera",
          "body": "Za trenutak ćeš vidjeti nekoliko pitanja za provjeru. Odgovori na njih, nakon čega ćeš dobiti pristup slanju poruka i pregledavanju fotografija.",
          "loading": "Pripremamo pitanja za provjeru…"
      },
      "sl": {
          "title": "Hitra verifikacija",
          "body": "Čez trenutek boš videl nekaj vprašanj za preverjanje. Odgovori nanje, nato pa boš dobil dostop do pošiljanja sporočil in ogledovanja fotografij.",
          "loading": "Pripravljamo vprašanja za preverjanje…"
      },
      "sk": {
          "title": "Rýchle overenie",
          "body": "O chvíľu uvidíš niekoľko overovacích otázok. Odpovedz na ne a potom získaš prístup k odosielaniu správ a prezeraniu fotografií.",
          "loading": "Pripravujeme overovacie otázky…"
      },
      "cs": {
          "title": "Rychlé ověření",
          "body": "Za chvíli uvidíš několik ověřovacích otázek. Odpověz na ně a poté získáš přístup k posílání zpráv a prohlížení fotek.",
          "loading": "Připravujeme ověřovací otázky…"
      },
      "hu": {
          "title": "Gyors ellenőrzés",
          "body": "Hamarosan néhány ellenőrző kérdést fogsz látni. Válaszolj rájuk, ezután hozzáférsz az üzenetküldéshez és a fényképek megtekintéséhez.",
          "loading": "Az ellenőrző kérdések előkészítése…"
      },
      "he": {
          "title": "אימות קצר",
          "body": "בעוד רגע יוצגו לך כמה שאלות אימות. לאחר שתענה עליהן, תקבל גישה לשליחת הודעות ולצפייה בתמונות.",
          "loading": "מכינים את שאלות האימות…"
      }
  };

  const normaliseLocale = (value = '') => {
    if (COPY[value]) return value;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return COPY[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const getCopy = () => COPY[getLocale()] || COPY['en-GB'];

  const injectStyles = () => {
    if (document.getElementById('rmc-email-transition-style')) return;
    const style = document.createElement('style');
    style.id = 'rmc-email-transition-style';
    style.textContent = `
      .rmc-email-transition{position:fixed;inset:0;z-index:2147483600;display:grid;place-items:center;padding:22px;background:rgba(3,3,4,.88);backdrop-filter:blur(9px);opacity:0;pointer-events:none;transition:opacity .16s ease}
      .rmc-email-transition.is-visible{opacity:1;pointer-events:auto}
      .rmc-email-card{width:min(430px,100%);padding:28px 24px 22px;border:1px solid rgba(255,255,255,.13);border-radius:24px;background:linear-gradient(155deg,#1b1b1e,#09090a 75%);color:#fff;text-align:center;box-shadow:0 30px 90px rgba(0,0,0,.64)}
      .rmc-email-icon{display:grid;width:62px;height:62px;margin:0 auto 15px;place-items:center;border-radius:19px;background:linear-gradient(145deg,#ef1722,#a70008);font-size:1.7rem;box-shadow:0 14px 34px rgba(229,9,20,.28)}
      .rmc-email-title{margin:0 auto 10px;max-width:360px;font-size:clamp(1.35rem,5vw,1.72rem);line-height:1.16;letter-spacing:-.02em}
      .rmc-email-body{margin:0 auto;max-width:360px;color:#c3c3c7;font-size:.96rem;line-height:1.55}
      .rmc-email-status{margin:19px 0 9px;color:#8c8c92;font-size:.78rem;font-weight:700}
      .rmc-email-progress{height:4px;overflow:hidden;border-radius:999px;background:rgba(255,255,255,.09)}
      .rmc-email-progress::after{content:'';display:block;width:100%;height:100%;border-radius:inherit;background:#e50914;transform:scaleX(0);transform-origin:left;animation:rmcEmailProgress ${REDIRECT_DELAY_MS}ms linear forwards}
      [dir='rtl'] .rmc-email-progress::after{transform-origin:right}
      @keyframes rmcEmailProgress{to{transform:scaleX(1)}}
      @media(max-width:520px){.rmc-email-transition{padding:16px}.rmc-email-card{padding:25px 19px 20px;border-radius:21px}.rmc-email-body{font-size:.91rem}}
      @media(prefers-reduced-motion:reduce){.rmc-email-transition{transition:none}.rmc-email-progress::after{animation:none;transform:scaleX(1)}}
    `;
    document.head.appendChild(style);
  };

  const createOverlay = () => {
    let overlay = document.getElementById('rmcEmailTransition');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'rmcEmailTransition';
    overlay.className = 'rmc-email-transition';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-atomic', 'true');
    overlay.innerHTML = `
      <div class="rmc-email-card">
        <div class="rmc-email-icon" aria-hidden="true">✓</div>
        <h2 class="rmc-email-title"></h2>
        <p class="rmc-email-body"></p>
        <p class="rmc-email-status"></p>
        <div class="rmc-email-progress" aria-hidden="true"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  };

  let redirecting = false;

  const showTransition = (url) => {
    if (redirecting || !url) return;
    redirecting = true;

    const ageModal = document.getElementById('ageGateModal');
    if (ageModal?.open) ageModal.close();

    const overlay = createOverlay();
    const text = getCopy();
    overlay.querySelector('.rmc-email-title').textContent = text.title;
    overlay.querySelector('.rmc-email-body').textContent = text.body;
    overlay.querySelector('.rmc-email-status').textContent = text.loading;

    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    window.setTimeout(() => window.location.assign(url), REDIRECT_DELAY_MS);
  };

  const initialise = () => {
    injectStyles();

    document.addEventListener('click', (event) => {
      const option = event.target.closest('.age-option');
      if (!option || !option.href) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      showTransition(option.href);
    }, true);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
