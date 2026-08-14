(() => {
  const REDIRECT_DELAY_MS = 1400;

  const COPY = {
    'en-GB': {
      title: 'Check your email after signing up 📩',
      body: 'After creating your account, you’ll receive an email with an activation link. Tap it to confirm your account and continue.',
      loading: 'Taking you to the next step…'
    },
    'en-US': {
      title: 'Check your email after signing up 📩',
      body: 'After creating your account, you’ll get an email with an activation link. Tap it to confirm your account and continue.',
      loading: 'Taking you to the next step…'
    },
    'en-SG': {
      title: 'Check your email after signing up 📩',
      body: 'After creating your account, you’ll receive an email with an activation link. Tap it to confirm your account and continue.',
      loading: 'Taking you to the next step…'
    },
    de: {
      title: 'Prüfe nach der Anmeldung deine E-Mails 📩',
      body: 'Nach der Kontoerstellung erhältst du eine E-Mail mit einem Aktivierungslink. Tippe darauf, um dein Konto zu bestätigen und fortzufahren.',
      loading: 'Du wirst weitergeleitet…'
    },
    nl: {
      title: 'Controleer na je registratie je e-mail 📩',
      body: 'Na het aanmaken van je account ontvang je een e-mail met een activatielink. Tik erop om je account te bevestigen en verder te gaan.',
      loading: 'Je wordt doorgestuurd…'
    },
    fr: {
      title: 'Vérifiez vos e-mails après l’inscription 📩',
      body: 'Après avoir créé votre compte, vous recevrez un e-mail avec un lien d’activation. Cliquez dessus pour confirmer votre compte et continuer.',
      loading: 'Redirection en cours…'
    },
    it: {
      title: 'Controlla l’e-mail dopo la registrazione 📩',
      body: 'Dopo aver creato l’account riceverai un’e-mail con un link di attivazione. Aprilo per confermare l’account e continuare.',
      loading: 'Ti stiamo reindirizzando…'
    },
    es: {
      title: 'Revisa tu correo después de registrarte 📩',
      body: 'Después de crear tu cuenta recibirás un correo con un enlace de activación. Ábrelo para confirmar tu cuenta y continuar.',
      loading: 'Te estamos redirigiendo…'
    },
    pt: {
      title: 'Verifica o teu e-mail depois do registo 📩',
      body: 'Depois de criares a conta, vais receber um e-mail com um link de ativação. Abre-o para confirmares a conta e continuares.',
      loading: 'A encaminhar-te…'
    },
    pl: {
      title: 'Sprawdź e-mail po rejestracji 📩',
      body: 'Po utworzeniu konta dostaniesz wiadomość z linkiem aktywacyjnym. Kliknij go, żeby potwierdzić konto i przejść dalej.',
      loading: 'Przenosimy Cię dalej…'
    },
    sv: {
      title: 'Kolla din e-post efter registreringen 📩',
      body: 'När du har skapat ditt konto får du ett mejl med en aktiveringslänk. Tryck på den för att bekräfta kontot och fortsätta.',
      loading: 'Du skickas vidare…'
    },
    no: {
      title: 'Sjekk e-posten etter registrering 📩',
      body: 'Etter at du har opprettet kontoen, får du en e-post med en aktiveringslenke. Trykk på den for å bekrefte kontoen og fortsette.',
      loading: 'Sender deg videre…'
    },
    da: {
      title: 'Tjek din e-mail efter tilmelding 📩',
      body: 'Når du har oprettet din konto, modtager du en e-mail med et aktiveringslink. Tryk på det for at bekræfte kontoen og fortsætte.',
      loading: 'Sender dig videre…'
    },
    fi: {
      title: 'Tarkista sähköpostisi rekisteröitymisen jälkeen 📩',
      body: 'Kun olet luonut tilin, saat sähköpostin, jossa on aktivointilinkki. Napauta sitä vahvistaaksesi tilisi ja jatkaaksesi.',
      loading: 'Siirryt seuraavaan vaiheeseen…'
    },
    el: {
      title: 'Έλεγξε το email σου μετά την εγγραφή 📩',
      body: 'Αφού δημιουργήσεις λογαριασμό, θα λάβεις email με έναν σύνδεσμο ενεργοποίησης. Πάτησέ τον για να επιβεβαιώσεις τον λογαριασμό σου και να συνεχίσεις.',
      loading: 'Σε μεταφέρουμε στο επόμενο βήμα…'
    },
    hr: {
      title: 'Provjeri e-mail nakon registracije 📩',
      body: 'Nakon izrade računa dobit ćeš e-mail s poveznicom za aktivaciju. Otvori je kako bi potvrdio račun i nastavio.',
      loading: 'Preusmjeravamo te dalje…'
    },
    sl: {
      title: 'Po registraciji preveri e-pošto 📩',
      body: 'Ko ustvariš račun, boš prejel e-pošto s povezavo za aktivacijo. Odpri jo, potrdi račun in nadaljuj.',
      loading: 'Preusmerjamo te naprej…'
    },
    sk: {
      title: 'Po registrácii skontroluj e-mail 📩',
      body: 'Po vytvorení účtu dostaneš e-mail s aktivačným odkazom. Klikni naň, potvrď účet a pokračuj.',
      loading: 'Presmerujeme ťa ďalej…'
    },
    cs: {
      title: 'Po registraci zkontroluj e-mail 📩',
      body: 'Po vytvoření účtu dostaneš e-mail s aktivačním odkazem. Klikni na něj, potvrď účet a pokračuj.',
      loading: 'Přesměrováváme tě dál…'
    },
    hu: {
      title: 'Regisztráció után nézd meg az e-mailed 📩',
      body: 'A fiók létrehozása után kapsz egy e-mailt aktiváló linkkel. Kattints rá a fiókod megerősítéséhez és a folytatáshoz.',
      loading: 'Továbbirányítunk…'
    },
    he: {
      title: 'בדוק את האימייל אחרי ההרשמה 📩',
      body: 'לאחר יצירת החשבון יישלח אליך אימייל עם קישור להפעלה. לחץ עליו כדי לאשר את החשבון ולהמשיך.',
      loading: 'מעבירים אותך לשלב הבא…'
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
        <div class="rmc-email-icon" aria-hidden="true">✉️</div>
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
