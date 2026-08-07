(() => {
  const localeCopy = {
    'en-GB': {
      badge: 'FINAL STEP',
      title: 'Anna can only receive messages from verified users',
      confirm: 'Confirm your age so you can reply to her.',
      note: 'In the next step, you’ll create a short profile and enter your email address. It only takes a moment.',
      ageYoung: 'I’m 18–44',
      ageOlder: 'I’m 45+',
      profileStep: 'Anna’s profile',
      verifyStep: 'Verification',
      privacyAria: 'Private access',
      profileAria: 'Quick profile',
      verifiedAria: 'Verified access',
      accountCta: 'Create account'
    },
    'en-US': {
      badge: 'FINAL STEP',
      title: 'Anna can only receive messages from verified users',
      confirm: 'Confirm your age so you can reply to her.',
      note: 'In the next step, you’ll create a short profile and enter your email address. It only takes a moment.',
      ageYoung: 'I’m 18–44',
      ageOlder: 'I’m 45+',
      profileStep: 'Anna’s profile',
      verifyStep: 'Verification',
      privacyAria: 'Private access',
      profileAria: 'Quick profile',
      verifiedAria: 'Verified access',
      accountCta: 'Create account'
    },
    'en-SG': {
      badge: 'FINAL STEP',
      title: 'Anna can only receive messages from verified users',
      confirm: 'Confirm your age so you can reply to her.',
      note: 'In the next step, you’ll create a short profile and enter your email address. It only takes a moment.',
      ageYoung: 'I’m 18–44',
      ageOlder: 'I’m 45+',
      profileStep: 'Anna’s profile',
      verifyStep: 'Verification',
      privacyAria: 'Private access',
      profileAria: 'Quick profile',
      verifiedAria: 'Verified access',
      accountCta: 'Create account'
    },
    de: {
      badge: 'LETZTER SCHRITT',
      title: 'Anna kann Nachrichten nur von verifizierten Nutzern empfangen',
      confirm: 'Bestätige dein Alter, damit du ihr antworten kannst.',
      note: 'Im nächsten Schritt erstellst du ein kurzes Profil und gibst deine E-Mail-Adresse an. Das dauert nur einen Moment.',
      ageYoung: 'Ich bin 18–44',
      ageOlder: 'Ich bin 45+',
      profileStep: 'Annas Profil',
      verifyStep: 'Verifizierung',
      privacyAria: 'Diskreter Zugang',
      profileAria: 'Kurzes Profil',
      verifiedAria: 'Verifizierter Zugang',
      accountCta: 'Konto erstellen'
    },
    nl: {
      badge: 'LAATSTE STAP',
      title: 'Anna kan alleen berichten ontvangen van geverifieerde gebruikers',
      confirm: 'Bevestig je leeftijd om haar te kunnen antwoorden.',
      note: 'In de volgende stap maak je kort een profiel aan en vul je je e-mailadres in. Dat duurt maar even.',
      ageYoung: 'Ik ben 18–44',
      ageOlder: 'Ik ben 45+',
      profileStep: 'Anna’s profiel',
      verifyStep: 'Verificatie',
      privacyAria: 'Discrete toegang',
      profileAria: 'Kort profiel',
      verifiedAria: 'Geverifieerde toegang',
      accountCta: 'Account aanmaken'
    },
    fr: {
      badge: 'DERNIÈRE ÉTAPE',
      title: 'Anna ne peut recevoir des messages que d’utilisateurs vérifiés',
      confirm: 'Confirmez votre âge pour pouvoir lui répondre.',
      note: 'À l’étape suivante, vous créerez un court profil et indiquerez votre adresse e-mail. Cela ne prendra qu’un instant.',
      ageYoung: 'J’ai entre 18 et 44 ans',
      ageOlder: 'J’ai 45 ans ou plus',
      profileStep: 'Profil d’Anna',
      verifyStep: 'Vérification',
      privacyAria: 'Accès discret',
      profileAria: 'Profil rapide',
      verifiedAria: 'Accès vérifié',
      accountCta: 'Créer un compte'
    },
    it: {
      badge: 'ULTIMO PASSAGGIO',
      title: 'Anna può ricevere messaggi solo da utenti verificati',
      confirm: 'Conferma la tua età per poterle rispondere.',
      note: 'Nel passaggio successivo creerai un breve profilo e inserirai il tuo indirizzo e-mail. Ci vorrà solo un attimo.',
      ageYoung: 'Ho 18–44 anni',
      ageOlder: 'Ho 45 anni o più',
      profileStep: 'Profilo di Anna',
      verifyStep: 'Verifica',
      privacyAria: 'Accesso discreto',
      profileAria: 'Profilo rapido',
      verifiedAria: 'Accesso verificato',
      accountCta: 'Crea un account'
    },
    es: {
      badge: 'ÚLTIMO PASO',
      title: 'Anna solo puede recibir mensajes de usuarios verificados',
      confirm: 'Confirma tu edad para poder responderle.',
      note: 'En el siguiente paso crearás un perfil breve e indicarás tu correo electrónico. Solo te llevará un momento.',
      ageYoung: 'Tengo entre 18 y 44 años',
      ageOlder: 'Tengo 45 años o más',
      profileStep: 'Perfil de Anna',
      verifyStep: 'Verificación',
      privacyAria: 'Acceso discreto',
      profileAria: 'Perfil rápido',
      verifiedAria: 'Acceso verificado',
      accountCta: 'Crear una cuenta'
    },
    pt: {
      badge: 'ÚLTIMO PASSO',
      title: 'A Anna só pode receber mensagens de utilizadores verificados',
      confirm: 'Confirma a tua idade para lhe poderes responder.',
      note: 'No passo seguinte, vais criar um perfil rápido e indicar o teu endereço de e-mail. Leva apenas um momento.',
      ageYoung: 'Tenho entre 18 e 44 anos',
      ageOlder: 'Tenho 45 anos ou mais',
      profileStep: 'Perfil da Anna',
      verifyStep: 'Verificação',
      privacyAria: 'Acesso discreto',
      profileAria: 'Perfil rápido',
      verifiedAria: 'Acesso verificado',
      accountCta: 'Criar conta'
    },
    pl: {
      badge: 'OSTATNI KROK',
      title: 'Anna może otrzymywać wiadomości tylko od zweryfikowanych użytkowników',
      confirm: 'Potwierdź swój wiek, żeby móc jej odpowiedzieć.',
      note: 'W następnym kroku utworzysz krótki profil i podasz adres e-mail. Zajmie to tylko chwilę.',
      ageYoung: 'Mam 18–44',
      ageOlder: 'Mam 45+',
      profileStep: 'Profil Anny',
      verifyStep: 'Weryfikacja',
      privacyAria: 'Dyskretny dostęp',
      profileAria: 'Krótki profil',
      verifiedAria: 'Zweryfikowany dostęp',
      accountCta: 'Załóż konto'
    },
    sv: {
      badge: 'SISTA STEGET',
      title: 'Anna kan bara ta emot meddelanden från verifierade användare',
      confirm: 'Bekräfta din ålder för att kunna svara henne.',
      note: 'I nästa steg skapar du en kort profil och anger din e-postadress. Det tar bara ett ögonblick.',
      ageYoung: 'Jag är 18–44',
      ageOlder: 'Jag är 45+',
      profileStep: 'Annas profil',
      verifyStep: 'Verifiering',
      privacyAria: 'Diskret åtkomst',
      profileAria: 'Snabb profil',
      verifiedAria: 'Verifierad åtkomst',
      accountCta: 'Skapa konto'
    },
    no: {
      badge: 'SISTE STEG',
      title: 'Anna kan bare motta meldinger fra verifiserte brukere',
      confirm: 'Bekreft alderen din for å kunne svare henne.',
      note: 'I neste steg oppretter du en kort profil og oppgir e-postadressen din. Det tar bare et øyeblikk.',
      ageYoung: 'Jeg er 18–44',
      ageOlder: 'Jeg er 45+',
      profileStep: 'Annas profil',
      verifyStep: 'Verifisering',
      privacyAria: 'Diskré tilgang',
      profileAria: 'Kort profil',
      verifiedAria: 'Verifisert tilgang',
      accountCta: 'Opprett konto'
    },
    da: {
      badge: 'SIDSTE TRIN',
      title: 'Anna kan kun modtage beskeder fra verificerede brugere',
      confirm: 'Bekræft din alder for at kunne svare hende.',
      note: 'I næste trin opretter du en kort profil og angiver din e-mailadresse. Det tager kun et øjeblik.',
      ageYoung: 'Jeg er 18–44',
      ageOlder: 'Jeg er 45+',
      profileStep: 'Annas profil',
      verifyStep: 'Verificering',
      privacyAria: 'Diskret adgang',
      profileAria: 'Kort profil',
      verifiedAria: 'Verificeret adgang',
      accountCta: 'Opret konto'
    },
    fi: {
      badge: 'VIIMEINEN VAIHE',
      title: 'Anna voi vastaanottaa viestejä vain vahvistetuilta käyttäjiltä',
      confirm: 'Vahvista ikäsi, jotta voit vastata hänelle.',
      note: 'Seuraavassa vaiheessa luot lyhyen profiilin ja annat sähköpostiosoitteesi. Se vie vain hetken.',
      ageYoung: 'Olen 18–44-vuotias',
      ageOlder: 'Olen vähintään 45-vuotias',
      profileStep: 'Annan profiili',
      verifyStep: 'Vahvistus',
      privacyAria: 'Huomaamaton pääsy',
      profileAria: 'Lyhyt profiili',
      verifiedAria: 'Vahvistettu pääsy',
      accountCta: 'Luo tili'
    },
    el: {
      badge: 'ΤΕΛΕΥΤΑΙΟ ΒΗΜΑ',
      title: 'Η Άννα μπορεί να λαμβάνει μηνύματα μόνο από επαληθευμένους χρήστες',
      confirm: 'Επιβεβαίωσε την ηλικία σου για να μπορέσεις να της απαντήσεις.',
      note: 'Στο επόμενο βήμα θα δημιουργήσεις ένα σύντομο προφίλ και θα δώσεις τη διεύθυνση email σου. Θα πάρει μόνο μια στιγμή.',
      ageYoung: 'Είμαι 18–44',
      ageOlder: 'Είμαι 45+',
      profileStep: 'Προφίλ της Άννας',
      verifyStep: 'Επαλήθευση',
      privacyAria: 'Διακριτική πρόσβαση',
      profileAria: 'Σύντομο προφίλ',
      verifiedAria: 'Επαληθευμένη πρόσβαση',
      accountCta: 'Δημιούργησε λογαριασμό'
    },
    hr: {
      badge: 'POSLJEDNJI KORAK',
      title: 'Anna može primati poruke samo od verificiranih korisnika',
      confirm: 'Potvrdi svoju dob kako bi joj mogao odgovoriti.',
      note: 'U sljedećem koraku izradit ćeš kratak profil i unijeti svoju e-mail adresu. Trebat će ti samo trenutak.',
      ageYoung: 'Imam 18–44 godine',
      ageOlder: 'Imam 45+ godina',
      profileStep: 'Annin profil',
      verifyStep: 'Verifikacija',
      privacyAria: 'Diskretan pristup',
      profileAria: 'Kratak profil',
      verifiedAria: 'Verificiran pristup',
      accountCta: 'Otvori račun'
    },
    sl: {
      badge: 'ZADNJI KORAK',
      title: 'Anna lahko prejema sporočila samo od preverjenih uporabnikov',
      confirm: 'Potrdi svojo starost, da ji boš lahko odgovoril.',
      note: 'V naslednjem koraku boš ustvaril kratek profil in vnesel svoj e-poštni naslov. Vzelo ti bo le trenutek.',
      ageYoung: 'Star sem 18–44 let',
      ageOlder: 'Star sem 45+ let',
      profileStep: 'Annin profil',
      verifyStep: 'Preverjanje',
      privacyAria: 'Diskreten dostop',
      profileAria: 'Kratek profil',
      verifiedAria: 'Preverjen dostop',
      accountCta: 'Ustvari račun'
    },
    sk: {
      badge: 'POSLEDNÝ KROK',
      title: 'Anna môže prijímať správy iba od overených používateľov',
      confirm: 'Potvrď svoj vek, aby si jej mohol odpovedať.',
      note: 'V ďalšom kroku si vytvoríš krátky profil a zadáš svoju e-mailovú adresu. Zaberie to len chvíľu.',
      ageYoung: 'Mám 18–44 rokov',
      ageOlder: 'Mám 45+ rokov',
      profileStep: 'Profil Anny',
      verifyStep: 'Overenie',
      privacyAria: 'Diskrétny prístup',
      profileAria: 'Krátky profil',
      verifiedAria: 'Overený prístup',
      accountCta: 'Vytvoriť účet'
    },
    cs: {
      badge: 'POSLEDNÍ KROK',
      title: 'Anna může přijímat zprávy pouze od ověřených uživatelů',
      confirm: 'Potvrď svůj věk, abys jí mohl odpovědět.',
      note: 'V dalším kroku si vytvoříš krátký profil a zadáš svou e-mailovou adresu. Zabere to jen chvilku.',
      ageYoung: 'Je mi 18–44 let',
      ageOlder: 'Je mi 45+ let',
      profileStep: 'Profil Anny',
      verifyStep: 'Ověření',
      privacyAria: 'Diskrétní přístup',
      profileAria: 'Krátký profil',
      verifiedAria: 'Ověřený přístup',
      accountCta: 'Vytvořit účet'
    },
    hu: {
      badge: 'UTOLSÓ LÉPÉS',
      title: 'Anna csak ellenőrzött felhasználóktól fogadhat üzeneteket',
      confirm: 'Erősítsd meg az életkorodat, hogy válaszolhass neki.',
      note: 'A következő lépésben létrehozol egy rövid profilt, és megadod az e-mail-címedet. Csak egy pillanat.',
      ageYoung: '18–44 éves vagyok',
      ageOlder: '45+ éves vagyok',
      profileStep: 'Anna profilja',
      verifyStep: 'Ellenőrzés',
      privacyAria: 'Diszkrét hozzáférés',
      profileAria: 'Rövid profil',
      verifiedAria: 'Ellenőrzött hozzáférés',
      accountCta: 'Fiók létrehozása'
    },
    he: {
      badge: 'שלב אחרון',
      title: 'אנה יכולה לקבל הודעות רק ממשתמשים מאומתים',
      confirm: 'אמת את גילך כדי שתוכל להשיב לה.',
      note: 'בשלב הבא תיצור פרופיל קצר ותזין כתובת אימייל. זה ייקח רק רגע.',
      ageYoung: 'אני בן 18–44',
      ageOlder: 'אני בן 45 ומעלה',
      profileStep: 'הפרופיל של אנה',
      verifyStep: 'אימות',
      privacyAria: 'גישה דיסקרטית',
      profileAria: 'פרופיל קצר',
      verifiedAria: 'גישה מאומתת',
      accountCta: 'פתיחת חשבון'
    }
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

  const getCopy = () => localeCopy[getLocale()] || localeCopy['en-GB'];

  const setText = (node, value) => {
    if (node && node.textContent !== value) node.textContent = value;
  };

  const injectStyles = () => {
    if (document.getElementById('rmc-age-gate-v2-styles')) return;
    const style = document.createElement('style');
    style.id = 'rmc-age-gate-v2-styles';
    style.textContent = `
      #ageGateModal.rmc-age-gate-v2{
        width:min(500px,calc(100vw - 24px))!important;
        max-width:500px!important;
        max-height:calc(100dvh - 24px)!important;
        border:1px solid rgba(255,255,255,.12)!important;
        border-radius:26px!important;
        background:
          radial-gradient(circle at 50% -12%,rgba(229,9,20,.22),transparent 34%),
          linear-gradient(155deg,#1a1a1d,#09090a 72%)!important;
        box-shadow:0 34px 110px rgba(0,0,0,.74)!important;
        overflow:hidden auto!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-shell{
        padding:27px 26px 22px!important;
        text-align:center!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-shell::before{
        height:3px!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-icon{
        display:none!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-close{
        top:12px!important;
        right:12px!important;
        width:34px!important;
        height:34px!important;
        z-index:5!important;
      }
      [dir="rtl"] #ageGateModal.rmc-age-gate-v2 .age-gate-close{
        right:auto!important;
        left:12px!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-badge{
        padding:6px 10px!important;
        border-color:rgba(229,9,20,.42)!important;
        background:rgba(229,9,20,.12)!important;
        color:#ff7078!important;
        font-size:.67rem!important;
        font-weight:950!important;
        letter-spacing:.105em!important;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:7px;
        margin:13px auto 12px;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar-photo{
        position:relative;
        width:62px;
        height:62px;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar-photo img{
        width:62px;
        height:62px;
        object-fit:cover;
        object-position:center 22%;
        border:2px solid rgba(255,255,255,.86);
        border-radius:50%;
        box-shadow:0 11px 30px rgba(0,0,0,.34),0 0 0 5px rgba(229,9,20,.10);
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-modal-verified{
        position:absolute;
        right:-2px;
        bottom:0;
        display:grid;
        width:21px;
        height:21px;
        place-items:center;
        border:2px solid #111;
        border-radius:50%;
        background:#e50914;
        color:#fff;
        font-size:.68rem;
        font-weight:1000;
        box-shadow:0 4px 12px rgba(229,9,20,.34);
      }
      [dir="rtl"] #ageGateModal.rmc-age-gate-v2 .rmc-modal-verified{
        right:auto;
        left:-2px;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar-name{
        color:rgba(255,255,255,.82);
        font-size:.72rem;
        font-weight:850;
        letter-spacing:.01em;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-title{
        max-width:430px!important;
        margin:0 auto 9px!important;
        color:#fff!important;
        font-size:clamp(1.28rem,4.4vw,1.72rem)!important;
        line-height:1.13!important;
        letter-spacing:-.025em!important;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-age-confirm{
        margin:0 auto 8px;
        max-width:405px;
        color:#fff;
        font-size:.96rem;
        font-weight:850;
        line-height:1.35;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-text{
        margin:0 auto!important;
        max-width:410px!important;
        color:#9d9da3!important;
        font-size:.81rem!important;
        font-style:italic!important;
        line-height:1.45!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-progress{
        display:block!important;
        margin:15px 0 14px!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-progress::before,
      #ageGateModal.rmc-age-gate-v2 .age-gate-progress::after{
        display:none!important;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-progress-track{
        position:relative;
        display:grid;
        grid-template-columns:1fr 1fr;
        align-items:center;
        width:min(270px,82%);
        margin:0 auto 6px;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-progress-track::before{
        content:'';
        position:absolute;
        top:50%;
        left:25%;
        right:25%;
        height:2px;
        transform:translateY(-50%);
        background:linear-gradient(90deg,#e50914,#ff4a54);
        box-shadow:0 0 10px rgba(229,9,20,.22);
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-progress-dot{
        position:relative;
        z-index:1;
        display:grid;
        width:18px;
        height:18px;
        place-items:center;
        justify-self:center;
        border:2px solid #111;
        border-radius:50%;
        background:#e50914;
        color:#fff;
        font-size:.56rem;
        font-weight:1000;
        box-shadow:0 0 0 3px rgba(229,9,20,.13);
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-progress-labels{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        color:#77777e;
        font-size:.63rem;
        font-weight:800;
        line-height:1.2;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-progress-labels span:last-child{
        color:#bdbdc2;
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-options{
        display:grid!important;
        grid-template-columns:1fr 1fr!important;
        gap:10px!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-option{
        display:flex!important;
        align-items:center!important;
        justify-content:space-between!important;
        gap:10px!important;
        min-height:62px!important;
        padding:12px 15px!important;
        border-radius:16px!important;
        font-size:1rem!important;
        font-weight:950!important;
        letter-spacing:-.01em!important;
        text-align:left!important;
      }
      [dir="rtl"] #ageGateModal.rmc-age-gate-v2 .age-option{
        text-align:right!important;
      }
      #ageGateModal.rmc-age-gate-v2 .age-option .rmc-age-arrow{
        flex:0 0 auto;
        font-size:1.18rem;
        opacity:.92;
      }
      [dir="rtl"] #ageGateModal.rmc-age-gate-v2 .age-option .rmc-age-arrow{
        transform:scaleX(-1);
      }
      #ageGateModal.rmc-age-gate-v2 .age-gate-secure{
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        gap:9px!important;
        margin:13px 0 0!important;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-trust-icon{
        display:grid;
        width:31px;
        height:31px;
        place-items:center;
        border:1px solid rgba(255,255,255,.09);
        border-radius:10px;
        background:rgba(255,255,255,.035);
        color:#8e8e94;
        font-size:.78rem;
      }
      #ageGateModal.rmc-age-gate-v2 .rmc-trust-icon:last-child{
        color:#ff6b74;
        border-color:rgba(229,9,20,.20);
        background:rgba(229,9,20,.06);
      }
      @media(max-width:640px){
        #ageGateModal.rmc-age-gate-v2{
          width:calc(100vw - 14px)!important;
          max-height:calc(100dvh - 14px)!important;
          border-radius:22px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-shell{
          padding:23px 14px 16px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-close{
          top:10px!important;
          right:10px!important;
          width:32px!important;
          height:32px!important;
        }
        [dir="rtl"] #ageGateModal.rmc-age-gate-v2 .age-gate-close{
          right:auto!important;
          left:10px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-badge{
          font-size:.62rem!important;
          padding:5px 9px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar{
          margin:11px auto 10px;
          gap:6px;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar-photo,
        #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar-photo img{
          width:56px;
          height:56px;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-title{
          max-width:360px!important;
          margin-bottom:7px!important;
          font-size:1.2rem!important;
          line-height:1.16!important;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-age-confirm{
          max-width:360px;
          margin-bottom:7px;
          font-size:.88rem;
          line-height:1.34;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-text{
          max-width:360px!important;
          font-size:.75rem!important;
          line-height:1.42!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-progress{
          margin:13px 0 12px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-progress-track{
          width:min(240px,82%);
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-progress-labels{
          font-size:.59rem;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-options{
          grid-template-columns:1fr!important;
          gap:8px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-option{
          min-height:54px!important;
          padding:10px 14px!important;
          border-radius:14px!important;
          font-size:.94rem!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-secure{
          margin-top:11px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-trust-icon{
          width:29px;
          height:29px;
          border-radius:9px;
          font-size:.73rem;
        }
      }
      @media(max-width:390px){
        #ageGateModal.rmc-age-gate-v2 .age-gate-shell{
          padding-inline:12px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-title{
          font-size:1.13rem!important;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-age-confirm{
          font-size:.84rem;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-text{
          font-size:.72rem!important;
        }
      }
      @media(max-height:650px) and (max-width:640px){
        #ageGateModal.rmc-age-gate-v2 .age-gate-shell{
          padding-top:18px!important;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar{
          margin:8px auto;
        }
        #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar-photo,
        #ageGateModal.rmc-age-gate-v2 .rmc-modal-avatar-photo img{
          width:50px;
          height:50px;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-title{
          font-size:1.08rem!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-gate-progress{
          margin:10px 0!important;
        }
        #ageGateModal.rmc-age-gate-v2 .age-option{
          min-height:49px!important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const ensureStructure = () => {
    const modal = document.getElementById('ageGateModal');
    if (!modal) return null;

    modal.classList.add('rmc-age-gate-v2');

    const shell = modal.querySelector('.age-gate-shell');
    const badge = modal.querySelector('.age-gate-badge');
    const title = modal.querySelector('.age-gate-title');
    const text = modal.querySelector('.age-gate-text');
    const progress = modal.querySelector('.age-gate-progress');
    const options = [...modal.querySelectorAll('.age-option')];
    const secure = modal.querySelector('.age-gate-secure');
    if (!shell || !badge || !title || !text || !progress || options.length < 2 || !secure) return modal;

    let avatar = modal.querySelector('.rmc-modal-avatar');
    if (!avatar) {
      avatar = document.createElement('div');
      avatar.className = 'rmc-modal-avatar';
      avatar.innerHTML = `
        <span class="rmc-modal-avatar-photo">
          <img alt="Anna" width="62" height="62" decoding="async">
          <span class="rmc-modal-verified" aria-hidden="true">✓</span>
        </span>
        <span class="rmc-modal-avatar-name">Anna, 41</span>
      `;
      badge.insertAdjacentElement('afterend', avatar);
    }

    let confirm = modal.querySelector('.rmc-age-confirm');
    if (!confirm) {
      confirm = document.createElement('p');
      confirm.className = 'rmc-age-confirm';
      title.insertAdjacentElement('afterend', confirm);
    }

    if (!progress.querySelector('.rmc-progress-track')) {
      progress.innerHTML = `
        <div class="rmc-progress-track" aria-hidden="true">
          <span class="rmc-progress-dot">✓</span>
          <span class="rmc-progress-dot">2</span>
        </div>
        <div class="rmc-progress-labels">
          <span class="rmc-profile-step"></span>
          <span class="rmc-verify-step"></span>
        </div>
      `;
    }

    options.forEach((option) => {
      let label = option.querySelector('.rmc-age-label');
      if (!label) {
        label = document.createElement('span');
        label.className = 'rmc-age-label';
      }
      let arrow = option.querySelector('.rmc-age-arrow');
      if (!arrow) {
        arrow = document.createElement('span');
        arrow.className = 'rmc-age-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
      }
      option.replaceChildren(label, arrow);
    });

    if (!secure.querySelector('.rmc-trust-icon')) {
      secure.innerHTML = `
        <span class="rmc-trust-icon rmc-trust-private" aria-hidden="true">🔒</span>
        <span class="rmc-trust-icon rmc-trust-profile" aria-hidden="true">👤</span>
        <span class="rmc-trust-icon rmc-trust-verified" aria-hidden="true">✓</span>
      `;
    }

    const heroImage = document.querySelector('.hero-invite .featured-profile img');
    const modalImage = avatar.querySelector('img');
    if (modalImage && heroImage?.src) {
      modalImage.src = heroImage.src;
      modalImage.alt = 'Anna';
    }

    return modal;
  };

  const applyPersonalCopy = () => {
    injectStyles();
    const modal = ensureStructure();
    const current = getCopy();

    if (modal) {
      setText(modal.querySelector('.age-gate-badge'), current.badge);
      setText(modal.querySelector('.age-gate-title'), current.title);
      setText(modal.querySelector('.rmc-age-confirm'), current.confirm);
      setText(modal.querySelector('.age-gate-text'), current.note);
      setText(modal.querySelector('.rmc-profile-step'), current.profileStep);
      setText(modal.querySelector('.rmc-verify-step'), current.verifyStep);

      const options = modal.querySelectorAll('.age-option');
      setText(options[0]?.querySelector('.rmc-age-label'), current.ageYoung);
      setText(options[1]?.querySelector('.rmc-age-label'), current.ageOlder);
      if (options[0]) options[0].setAttribute('aria-label', current.ageYoung);
      if (options[1]) options[1].setAttribute('aria-label', current.ageOlder);

      const privateIcon = modal.querySelector('.rmc-trust-private');
      const profileIcon = modal.querySelector('.rmc-trust-profile');
      const verifiedIcon = modal.querySelector('.rmc-trust-verified');
      if (privateIcon) {
        privateIcon.removeAttribute('aria-hidden');
        privateIcon.setAttribute('aria-label', current.privacyAria);
        privateIcon.setAttribute('title', current.privacyAria);
      }
      if (profileIcon) {
        profileIcon.removeAttribute('aria-hidden');
        profileIcon.setAttribute('aria-label', current.profileAria);
        profileIcon.setAttribute('title', current.profileAria);
      }
      if (verifiedIcon) {
        verifiedIcon.removeAttribute('aria-hidden');
        verifiedIcon.setAttribute('aria-label', current.verifiedAria);
        verifiedIcon.setAttribute('title', current.verifiedAria);
      }
    }

    const stickyCopy = document.querySelector('.mobile-sticky [data-role="sticky-account-copy"], .mobile-sticky span:first-child');
    if (stickyCopy) {
      stickyCopy.removeAttribute('data-i18n');
      stickyCopy.setAttribute('data-role', 'sticky-account-copy');
      setText(stickyCopy, current.accountCta);
    }
  };

  const scheduleApply = () => {
    window.setTimeout(applyPersonalCopy, 0);
    window.setTimeout(applyPersonalCopy, 60);
  };

  const initialise = () => {
    applyPersonalCopy();

    window.addEventListener('click', (event) => {
      if (!event.target.closest('.js-affiliate')) return;
      scheduleApply();
    }, true);

    document.getElementById('languageSelect')?.addEventListener('change', scheduleApply);
    window.addEventListener('pageshow', scheduleApply);
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
          age_range: ageOption.querySelector('.rmc-age-label')?.textContent?.trim() || ageOption.textContent?.trim() || '',
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
