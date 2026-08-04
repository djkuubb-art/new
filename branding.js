(() => {
  const BRAND = 'RealMeetClub';
  const OLD_BRAND = 'HeartMatch';
  const TIMER_SECONDS = 10 * 60;
  const TIMER_KEY = 'realmeetclub_invite_deadline';
  const AGE_18_44_URL = 'https://tikhoty.pl/link/fbbc/1212/58239101';
  const AGE_45_PLUS_URL = 'https://tikhoty.pl/link/ecea/1211/58239101';

  const copy = {
    'en-GB': {
      name: 'Anna', timerLabel: 'Expires in', waiting: 'Anna is waiting for your reply.', message: 'Hi 😊 I left you a private message.', phoneCta: 'Open Anna’s message', expired: 'Last chance',
      inviteLabel: 'Personal invitation from Anna', inviteTitle: 'Anna would like to get to know you.', inviteText: 'Open her profile and see whether you might be a good match.', invitePreview: 'I noticed you and thought I’d say hello 😊', inviteCta: 'View Anna’s profile', inviteNote: 'Discreet access for adults only',
      modalBadge: 'Final step', modalTitle: 'You’re one step away from meeting people looking for the same thing as you.', modalText: 'Select your age range to continue to the profiles best matched to you.'
    },
    'en-US': {
      name: 'Anna', timerLabel: 'Expires in', waiting: 'Anna is waiting for your reply.', message: 'Hi 😊 I left you a private message.', phoneCta: 'Open Anna’s message', expired: 'Last chance',
      inviteLabel: 'Personal invitation from Anna', inviteTitle: 'Anna would like to get to know you.', inviteText: 'Open her profile and see if the two of you might be a good match.', invitePreview: 'You caught my attention, so I thought I’d say hi 😊', inviteCta: 'View Anna’s profile', inviteNote: 'Discreet access for adults only',
      modalBadge: 'Final step', modalTitle: 'You’re one step away from meeting people who want the same kind of connection you do.', modalText: 'Select your age range to continue to the profiles that fit you best.'
    },
    'en-SG': {
      name: 'Anna', timerLabel: 'Expires in', waiting: 'Anna is waiting for your reply.', message: 'Hi 😊 I left you a private message.', phoneCta: 'Open Anna’s message', expired: 'Last chance',
      inviteLabel: 'Personal invitation from Anna', inviteTitle: 'Anna would like to get to know you.', inviteText: 'Open her profile and see whether the two of you might click.', invitePreview: 'You caught my attention, so I thought I’d say hello 😊', inviteCta: 'View Anna’s profile', inviteNote: 'Discreet access for adults only',
      modalBadge: 'Final step', modalTitle: 'You’re one step away from meeting people looking for the same thing as you.', modalText: 'Select your age range to continue to the profiles best suited to you.'
    },
    de: {
      name: 'Anna', timerLabel: 'Läuft ab in', waiting: 'Anna wartet auf deine Antwort.', message: 'Hallo 😊 Ich habe dir eine private Nachricht hinterlassen.', phoneCta: 'Annas Nachricht öffnen', expired: 'Letzte Chance',
      inviteLabel: 'Persönliche Einladung von Anna', inviteTitle: 'Anna würde dich gern kennenlernen.', inviteText: 'Öffne ihr Profil und schau, ob ihr zueinander passen könntet.', invitePreview: 'Du bist mir aufgefallen, deshalb wollte ich einfach mal Hallo sagen 😊', inviteCta: 'Annas Profil ansehen', inviteNote: 'Diskreter Zugang nur für Erwachsene',
      modalBadge: 'Letzter Schritt', modalTitle: 'Du bist nur noch einen Schritt davon entfernt, Menschen kennenzulernen, die dasselbe suchen wie du.', modalText: 'Wähle deine Altersgruppe, um zu den Profilen zu gelangen, die am besten zu dir passen.'
    },
    nl: {
      name: 'Anna', timerLabel: 'Verloopt over', waiting: 'Anna wacht op je antwoord.', message: 'Hoi 😊 Ik heb je een privébericht gestuurd.', phoneCta: 'Open Anna’s bericht', expired: 'Laatste kans',
      inviteLabel: 'Persoonlijke uitnodiging van Anna', inviteTitle: 'Anna wil je graag leren kennen.', inviteText: 'Open haar profiel en kijk of jullie misschien bij elkaar passen.', invitePreview: 'Je viel me op, dus ik dacht: ik zeg gewoon even hallo 😊', inviteCta: 'Bekijk Anna’s profiel', inviteNote: 'Discrete toegang, alleen voor volwassenen',
      modalBadge: 'Laatste stap', modalTitle: 'Je bent nog maar één stap verwijderd van mensen die hetzelfde zoeken als jij.', modalText: 'Kies je leeftijdsgroep om door te gaan naar de profielen die het beste bij je passen.'
    },
    fr: {
      name: 'Anna', timerLabel: 'Expire dans', waiting: 'Anna attend votre réponse.', message: 'Bonjour 😊 Je vous ai laissé un message privé.', phoneCta: 'Ouvrir le message d’Anna', expired: 'Dernière chance',
      inviteLabel: 'Invitation personnelle d’Anna', inviteTitle: 'Anna aimerait faire votre connaissance.', inviteText: 'Ouvrez son profil et voyez si vous pourriez bien vous entendre.', invitePreview: 'Vous avez attiré mon attention, alors j’ai eu envie de vous dire bonjour 😊', inviteCta: 'Voir le profil d’Anna', inviteNote: 'Accès discret réservé aux adultes',
      modalBadge: 'Dernière étape', modalTitle: 'Vous n’êtes plus qu’à une étape de rencontrer des personnes qui recherchent la même chose que vous.', modalText: 'Choisissez votre tranche d’âge pour accéder aux profils qui vous correspondent le mieux.'
    },
    it: {
      name: 'Anna', timerLabel: 'Scade tra', waiting: 'Anna aspetta la tua risposta.', message: 'Ciao 😊 Ti ho lasciato un messaggio privato.', phoneCta: 'Apri il messaggio di Anna', expired: 'Ultima occasione',
      inviteLabel: 'Invito personale da Anna', inviteTitle: 'Anna vorrebbe conoscerti.', inviteText: 'Apri il suo profilo e scopri se potreste essere compatibili.', invitePreview: 'Mi hai incuriosita e ho pensato di salutarti 😊', inviteCta: 'Guarda il profilo di Anna', inviteNote: 'Accesso discreto riservato agli adulti',
      modalBadge: 'Ultimo passaggio', modalTitle: 'Sei a un solo passo dal conoscere persone che cercano la tua stessa cosa.', modalText: 'Scegli la tua fascia d’età per continuare verso i profili più adatti a te.'
    },
    es: {
      name: 'Anna', timerLabel: 'Caduca en', waiting: 'Anna espera tu respuesta.', message: 'Hola 😊 Te he dejado un mensaje privado.', phoneCta: 'Abrir el mensaje de Anna', expired: 'Última oportunidad',
      inviteLabel: 'Invitación personal de Anna', inviteTitle: 'A Anna le gustaría conocerte.', inviteText: 'Abre su perfil y comprueba si podríais encajar.', invitePreview: 'Me llamaste la atención y pensé en saludarte 😊', inviteCta: 'Ver el perfil de Anna', inviteNote: 'Acceso discreto solo para adultos',
      modalBadge: 'Último paso', modalTitle: 'Estás a un solo paso de conocer a personas que buscan lo mismo que tú.', modalText: 'Elige tu franja de edad para continuar a los perfiles que mejor encajan contigo.'
    },
    pt: {
      name: 'Anna', timerLabel: 'Expira em', waiting: 'A Anna está à espera da tua resposta.', message: 'Olá 😊 Deixei-te uma mensagem privada.', phoneCta: 'Abrir a mensagem da Anna', expired: 'Última oportunidade',
      inviteLabel: 'Convite pessoal da Anna', inviteTitle: 'A Anna gostava de te conhecer.', inviteText: 'Abre o perfil dela e vê se poderão combinar.', invitePreview: 'Chamaste-me a atenção e pensei em dizer olá 😊', inviteCta: 'Ver o perfil da Anna', inviteNote: 'Acesso discreto apenas para adultos',
      modalBadge: 'Último passo', modalTitle: 'Estás a apenas um passo de conhecer pessoas que procuram o mesmo que tu.', modalText: 'Escolhe a tua faixa etária para continuares para os perfis mais indicados para ti.'
    },
    pl: {
      name: 'Anna', timerLabel: 'Wygasa za', waiting: 'Anna czeka na Twoją odpowiedź.', message: 'Hej 😊 Zostawiłam Ci prywatną wiadomość.', phoneCta: 'Otwórz wiadomość Anny', expired: 'Ostatnia szansa',
      inviteLabel: 'Osobiste zaproszenie od Anny', inviteTitle: 'Anna chciałaby Cię poznać.', inviteText: 'Otwórz jej profil i sprawdź, czy możecie do siebie pasować.', invitePreview: 'Zwróciłeś moją uwagę, więc pomyślałam, że się przywitam 😊', inviteCta: 'Zobacz profil Anny', inviteNote: 'Dyskretny dostęp tylko dla dorosłych',
      modalBadge: 'Ostatni krok', modalTitle: 'Jesteś o krok od poznania osób, które chcą tego samego co Ty.', modalText: 'Wybierz swój przedział wiekowy, aby przejść do najlepiej dopasowanych profili.'
    },
    sv: {
      name: 'Anna', timerLabel: 'Går ut om', waiting: 'Anna väntar på ditt svar.', message: 'Hej 😊 Jag har lämnat ett privat meddelande till dig.', phoneCta: 'Öppna Annas meddelande', expired: 'Sista chansen',
      inviteLabel: 'Personlig inbjudan från Anna', inviteTitle: 'Anna skulle gärna vilja lära känna dig.', inviteText: 'Öppna hennes profil och se om ni kanske passar ihop.', invitePreview: 'Du fångade min uppmärksamhet, så jag tänkte säga hej 😊', inviteCta: 'Visa Annas profil', inviteNote: 'Diskret åtkomst endast för vuxna',
      modalBadge: 'Sista steget', modalTitle: 'Du är bara ett steg från att träffa personer som söker samma sak som du.', modalText: 'Välj din åldersgrupp för att gå vidare till de profiler som passar dig bäst.'
    },
    no: {
      name: 'Anna', timerLabel: 'Utløper om', waiting: 'Anna venter på svaret ditt.', message: 'Hei 😊 Jeg har lagt igjen en privat melding til deg.', phoneCta: 'Åpne Annas melding', expired: 'Siste sjanse',
      inviteLabel: 'Personlig invitasjon fra Anna', inviteTitle: 'Anna vil gjerne bli kjent med deg.', inviteText: 'Åpne profilen hennes og se om dere kanskje passer sammen.', invitePreview: 'Du fanget oppmerksomheten min, så jeg tenkte å si hei 😊', inviteCta: 'Se Annas profil', inviteNote: 'Diskré tilgang kun for voksne',
      modalBadge: 'Siste steg', modalTitle: 'Du er bare ett steg unna å møte personer som ser etter det samme som deg.', modalText: 'Velg aldersgruppen din for å gå videre til profilene som passer deg best.'
    },
    da: {
      name: 'Anna', timerLabel: 'Udløber om', waiting: 'Anna venter på dit svar.', message: 'Hej 😊 Jeg har lagt en privat besked til dig.', phoneCta: 'Åbn Annas besked', expired: 'Sidste chance',
      inviteLabel: 'Personlig invitation fra Anna', inviteTitle: 'Anna vil gerne lære dig at kende.', inviteText: 'Åbn hendes profil og se, om I måske passer godt sammen.', invitePreview: 'Du fangede min opmærksomhed, så jeg tænkte, jeg ville sige hej 😊', inviteCta: 'Se Annas profil', inviteNote: 'Diskret adgang kun for voksne',
      modalBadge: 'Sidste trin', modalTitle: 'Du er kun ét trin fra at møde personer, der søger det samme som dig.', modalText: 'Vælg din aldersgruppe for at fortsætte til de profiler, der passer bedst til dig.'
    },
    fi: {
      name: 'Anna', timerLabel: 'Vanhenee', waiting: 'Anna odottaa vastaustasi.', message: 'Hei 😊 Jätin sinulle yksityisviestin.', phoneCta: 'Avaa Annan viesti', expired: 'Viimeinen mahdollisuus',
      inviteLabel: 'Henkilökohtainen kutsu Annalta', inviteTitle: 'Anna haluaisi tutustua sinuun.', inviteText: 'Avaa hänen profiilinsa ja katso, voisitteko sopia yhteen.', invitePreview: 'Kiinnitin sinuun huomiota, joten ajattelin tulla sanomaan hei 😊', inviteCta: 'Katso Annan profiili', inviteNote: 'Huomaamaton pääsy vain aikuisille',
      modalBadge: 'Viimeinen vaihe', modalTitle: 'Olet vain yhden vaiheen päässä ihmisistä, jotka etsivät samaa kuin sinä.', modalText: 'Valitse ikäryhmäsi ja jatka sinulle parhaiten sopiviin profiileihin.'
    },
    el: {
      name: 'Άννα', timerLabel: 'Λήγει σε', waiting: 'Η Άννα περιμένει την απάντησή σου.', message: 'Γεια 😊 Σου άφησα ένα προσωπικό μήνυμα.', phoneCta: 'Άνοιξε το μήνυμα της Άννας', expired: 'Τελευταία ευκαιρία',
      inviteLabel: 'Προσωπική πρόσκληση από την Άννα', inviteTitle: 'Η Άννα θα ήθελε να σε γνωρίσει.', inviteText: 'Άνοιξε το προφίλ της και δες αν θα μπορούσατε να ταιριάξετε.', invitePreview: 'Μου τράβηξες την προσοχή και σκέφτηκα να σου πω ένα γεια 😊', inviteCta: 'Δες το προφίλ της Άννας', inviteNote: 'Διακριτική πρόσβαση μόνο για ενήλικες',
      modalBadge: 'Τελευταίο βήμα', modalTitle: 'Είσαι μόλις ένα βήμα πριν γνωρίσεις άτομα που αναζητούν το ίδιο με εσένα.', modalText: 'Επίλεξε την ηλικιακή σου ομάδα για να συνεχίσεις στα προφίλ που σου ταιριάζουν καλύτερα.'
    },
    hr: {
      name: 'Anna', timerLabel: 'Istječe za', waiting: 'Anna čeka tvoj odgovor.', message: 'Bok 😊 Ostavila sam ti privatnu poruku.', phoneCta: 'Otvori Anninu poruku', expired: 'Posljednja prilika',
      inviteLabel: 'Osobni poziv od Anne', inviteTitle: 'Anna bi te voljela upoznati.', inviteText: 'Otvori njezin profil i provjeri biste li mogli odgovarati jedno drugome.', invitePreview: 'Privukao si mi pažnju pa sam pomislila da ti se javim 😊', inviteCta: 'Pogledaj Annin profil', inviteNote: 'Diskretan pristup samo za odrasle',
      modalBadge: 'Posljednji korak', modalTitle: 'Samo te jedan korak dijeli od osoba koje traže isto što i ti.', modalText: 'Odaberi svoju dobnu skupinu i nastavi do profila koji ti najbolje odgovaraju.'
    },
    sl: {
      name: 'Anna', timerLabel: 'Poteče čez', waiting: 'Anna čaka na tvoj odgovor.', message: 'Živjo 😊 Pustila sem ti zasebno sporočilo.', phoneCta: 'Odpri Annino sporočilo', expired: 'Zadnja priložnost',
      inviteLabel: 'Osebno povabilo Anne', inviteTitle: 'Anna bi te rada spoznala.', inviteText: 'Odpri njen profil in preveri, ali bi se lahko ujela.', invitePreview: 'Pritegnil si mojo pozornost, zato sem pomislila, da te pozdravim 😊', inviteCta: 'Poglej Annin profil', inviteNote: 'Diskreten dostop samo za odrasle',
      modalBadge: 'Zadnji korak', modalTitle: 'Le še en korak te loči od ljudi, ki iščejo isto kot ti.', modalText: 'Izberi svojo starostno skupino in nadaljuj do profilov, ki ti najbolj ustrezajo.'
    },
    sk: {
      name: 'Anna', timerLabel: 'Vyprší o', waiting: 'Anna čaká na tvoju odpoveď.', message: 'Ahoj 😊 Nechala som ti súkromnú správu.', phoneCta: 'Otvoriť správu od Anny', expired: 'Posledná šanca',
      inviteLabel: 'Osobná pozvánka od Anny', inviteTitle: 'Anna by ťa rada spoznala.', inviteText: 'Otvor jej profil a zisti, či by ste si mohli rozumieť.', invitePreview: 'Zaujal si ma, tak som si povedala, že ťa pozdravím 😊', inviteCta: 'Pozrieť profil Anny', inviteNote: 'Diskrétny prístup len pre dospelých',
      modalBadge: 'Posledný krok', modalTitle: 'Od ľudí, ktorí hľadajú to isté ako ty, ťa delí už len jeden krok.', modalText: 'Vyber svoju vekovú skupinu a pokračuj k profilom, ktoré sa k tebe hodia najviac.'
    },
    cs: {
      name: 'Anna', timerLabel: 'Vyprší za', waiting: 'Anna čeká na tvoji odpověď.', message: 'Ahoj 😊 Nechala jsem ti soukromou zprávu.', phoneCta: 'Otevřít zprávu od Anny', expired: 'Poslední šance',
      inviteLabel: 'Osobní pozvánka od Anny', inviteTitle: 'Anna by tě ráda poznala.', inviteText: 'Otevři její profil a zjisti, jestli byste si mohli rozumět.', invitePreview: 'Zaujal jsi mě, tak jsem si řekla, že tě pozdravím 😊', inviteCta: 'Zobrazit profil Anny', inviteNote: 'Diskrétní přístup pouze pro dospělé',
      modalBadge: 'Poslední krok', modalTitle: 'Od lidí, kteří hledají totéž co ty, tě dělí už jen jeden krok.', modalText: 'Vyber svou věkovou skupinu a pokračuj k profilům, které se k tobě hodí nejlépe.'
    },
    hu: {
      name: 'Anna', timerLabel: 'Lejár ennyi idő múlva', waiting: 'Anna várja a válaszodat.', message: 'Szia 😊 Hagytam neked egy privát üzenetet.', phoneCta: 'Anna üzenetének megnyitása', expired: 'Utolsó esély',
      inviteLabel: 'Személyes meghívás Annától', inviteTitle: 'Anna szeretne megismerni téged.', inviteText: 'Nyisd meg a profilját, és nézd meg, vajon összeillenétek-e.', invitePreview: 'Felkeltetted a figyelmemet, ezért gondoltam, rád köszönök 😊', inviteCta: 'Anna profiljának megtekintése', inviteNote: 'Diszkrét hozzáférés csak felnőtteknek',
      modalBadge: 'Utolsó lépés', modalTitle: 'Már csak egy lépés választ el azoktól, akik ugyanazt keresik, mint te.', modalText: 'Válaszd ki a korcsoportodat, és lépj tovább a hozzád leginkább illő profilokhoz.'
    },
    he: {
      name: 'אנה', timerLabel: 'יפוג בעוד', waiting: 'אנה מחכה לתשובה שלך.', message: 'היי 😊 השארתי לך הודעה פרטית.', phoneCta: 'פתיחת ההודעה של אנה', expired: 'הזדמנות אחרונה',
      inviteLabel: 'הזמנה אישית מאנה', inviteTitle: 'אנה הייתה רוצה להכיר אותך.', inviteText: 'פתח את הפרופיל שלה ובדוק אם אולי יש ביניכם התאמה.', invitePreview: 'משכת את תשומת הלב שלי, אז חשבתי לומר שלום 😊', inviteCta: 'צפה בפרופיל של אנה', inviteNote: 'גישה דיסקרטית למבוגרים בלבד',
      modalBadge: 'השלב האחרון', modalTitle: 'נשאר לך רק צעד אחד כדי להכיר אנשים שמחפשים את אותו הדבר כמוך.', modalText: 'בחר את קבוצת הגיל שלך כדי להמשיך לפרופילים המתאימים לך ביותר.'
    }
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

  const getText = () => copy[getLocale()] || copy['en-GB'];

  const injectStyles = () => {
    if (document.getElementById('realmeetclub-dynamic-styles')) return;
    const style = document.createElement('style');
    style.id = 'realmeetclub-dynamic-styles';
    style.textContent = `
      .phone-top{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.phone-top .mini-brand{margin-right:auto}.expiry-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 8px;border:1px solid rgba(229,9,20,.38);border-radius:999px;background:rgba(229,9,20,.12);color:#ff737b;font-size:.64rem;font-weight:800;white-space:nowrap}.expiry-time{color:#fff;font-variant-numeric:tabular-nums;letter-spacing:.04em}.expiry-pill.is-urgent{animation:rmcPulse 1.15s infinite}.expiry-pill.is-expired{background:#e50914;color:#fff}.urgency-strip{display:flex;align-items:center;justify-content:center;gap:7px;margin:8px 1px 0;padding:9px 10px;border-radius:12px;background:rgba(229,9,20,.10);color:#f3d8da;font-size:.76rem;font-weight:750;text-align:center}.urgency-dot{width:7px;height:7px;border-radius:50%;background:#ff3340;box-shadow:0 0 0 4px rgba(229,9,20,.14)}.phone-cta{display:flex;align-items:center;justify-content:center;gap:9px;margin-top:9px;padding:13px 14px;border-radius:14px;background:linear-gradient(135deg,#ef1823,#b00009);color:#fff;text-decoration:none;font-size:.82rem;font-weight:900;letter-spacing:.015em;text-align:center;box-shadow:0 12px 28px rgba(229,9,20,.26);transition:transform .18s ease,filter .18s ease}.phone-cta:hover{transform:translateY(-1px);filter:brightness(1.08)}
      .age-gate-modal{width:min(520px,calc(100vw - 28px));max-width:520px;padding:0;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:linear-gradient(155deg,#1b1b1d,#09090a 72%);color:#fff;box-shadow:0 36px 120px rgba(0,0,0,.72);overflow:hidden}.age-gate-modal::backdrop{background:rgba(0,0,0,.78);backdrop-filter:blur(7px)}.age-gate-shell{position:relative;padding:34px 30px 30px;text-align:center}.age-gate-shell::before{content:'';position:absolute;inset:0 0 auto;height:4px;background:linear-gradient(90deg,#7d0006,#ff2631,#7d0006)}.age-gate-close{position:absolute;top:13px;right:13px;display:grid;width:36px;height:36px;place-items:center;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.055);color:#aaa;font-size:1.35rem;line-height:1;cursor:pointer}.age-gate-close:hover{color:#fff;background:rgba(255,255,255,.10)}.age-gate-icon{display:grid;width:58px;height:58px;margin:0 auto 16px;place-items:center;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ff5961,#d40712 62%,#870006);font-size:1.55rem;box-shadow:0 15px 42px rgba(229,9,20,.34)}.age-gate-badge{display:inline-flex;padding:7px 11px;border:1px solid rgba(229,9,20,.36);border-radius:999px;background:rgba(229,9,20,.10);color:#ff6971;font-size:.69rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.age-gate-title{margin:15px auto 10px;max-width:440px;font-size:clamp(1.55rem,5vw,2.18rem);line-height:1.08;letter-spacing:-.025em}.age-gate-text{margin:0 auto;max-width:420px;color:#b9b9bd;font-size:.98rem;line-height:1.55}.age-gate-progress{display:flex;align-items:center;gap:10px;margin:22px 0 19px}.age-gate-progress::before,.age-gate-progress::after{content:'';height:1px;flex:1;background:linear-gradient(90deg,transparent,#3b3b3e)}.age-gate-progress::after{background:linear-gradient(90deg,#3b3b3e,transparent)}.age-gate-progress span{color:#777;font-size:.69rem;font-weight:800;letter-spacing:.10em;text-transform:uppercase}.age-gate-options{display:grid;grid-template-columns:1fr 1fr;gap:12px}.age-option{display:flex;align-items:center;justify-content:center;min-height:74px;padding:14px;border:1px solid rgba(255,255,255,.12);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.025));color:#fff;text-decoration:none;font-size:1.65rem;font-weight:950;letter-spacing:-.02em;box-shadow:inset 0 1px 0 rgba(255,255,255,.05);transition:transform .18s ease,border-color .18s ease,background .18s ease}.age-option:hover{transform:translateY(-2px);border-color:rgba(255,54,65,.72);background:linear-gradient(145deg,rgba(229,9,20,.25),rgba(229,9,20,.08))}.age-option.age-option-primary{border-color:rgba(229,9,20,.48);background:linear-gradient(145deg,#ed1722,#a70008);box-shadow:0 14px 34px rgba(229,9,20,.22)}.age-gate-secure{display:flex;align-items:center;justify-content:center;gap:7px;margin:16px 0 0;color:#707075;font-size:.71rem}.age-gate-modal[open]{animation:rmcModalIn .22s ease-out}.age-gate-modal.closing{animation:rmcModalOut .16s ease-in forwards}[dir='rtl'] .age-gate-close{right:auto;left:13px}
      @keyframes rmcPulse{50%{box-shadow:0 0 0 5px rgba(229,9,20,.12)}}@keyframes rmcModalIn{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}@keyframes rmcModalOut{to{opacity:0;transform:translateY(8px) scale(.98)}}
      @media(max-width:640px){.expiry-pill{padding:5px 7px;font-size:.58rem}.urgency-strip{font-size:.69rem;padding:8px}.phone-cta{padding:12px 10px;font-size:.76rem}.age-gate-shell{padding:30px 18px 21px}.age-gate-title{font-size:1.62rem}.age-gate-text{font-size:.9rem}.age-gate-options{grid-template-columns:1fr;gap:10px}.age-option{min-height:62px;font-size:1.42rem}.age-gate-icon{width:52px;height:52px;margin-bottom:13px}}
    `;
    document.head.appendChild(style);
  };

  const applyBrand = () => {
    if (document.title.includes(OLD_BRAND)) document.title = document.title.replaceAll(OLD_BRAND, BRAND);
    document.querySelectorAll('.brand span:last-child, .mini-brand, .footer-brand strong').forEach((node) => {
      node.textContent = node.classList.contains('mini-brand') ? `♥ ${BRAND}` : BRAND;
    });
  };

  const preparePage = () => {
    const t = getText();
    const phone = document.querySelector('.phone-card');
    const phoneTop = phone?.querySelector('.phone-top');
    const featured = phone?.querySelector('.featured-profile');
    const miniMessage = phone?.querySelector('.mini-message');
    if (!phone || !phoneTop || !featured || !miniMessage) return;

    let timer = phoneTop.querySelector('.expiry-pill');
    if (!timer) {
      timer = document.createElement('div');
      timer.className = 'expiry-pill';
      timer.innerHTML = '<span class="expiry-copy"></span><strong class="expiry-time">10:00</strong>';
      phoneTop.appendChild(timer);
    }

    let strip = phone.querySelector('.urgency-strip');
    if (!strip) {
      strip = document.createElement('div');
      strip.className = 'urgency-strip';
      strip.innerHTML = '<span class="urgency-dot" aria-hidden="true"></span><span class="urgency-copy"></span>';
      featured.insertAdjacentElement('afterend', strip);
    }

    let cta = phone.querySelector('.phone-cta');
    if (!cta) {
      cta = document.createElement('a');
      cta.className = 'phone-cta js-affiliate';
      cta.dataset.slot = 'phone-message';
      cta.href = '/api/go?slot=phone-message';
      cta.innerHTML = '<span class="phone-cta-copy"></span><span aria-hidden="true">→</span>';
      miniMessage.insertAdjacentElement('afterend', cta);
    }

    const heroHeading = document.querySelector('.featured-profile .profile-overlay h2');
    if (heroHeading) heroHeading.textContent = `${t.name}, 41`;
    const firstCardHeading = document.querySelector('.profile-grid .profile-card:first-child h3');
    if (firstCardHeading) firstCardHeading.textContent = `${t.name}, 41`;

    const messageName = miniMessage.querySelector('strong');
    const messageText = miniMessage.querySelector('[data-i18n="messagePreview"], p span');
    if (messageName) {
      messageName.removeAttribute('data-profile');
      messageName.textContent = t.name;
    }
    if (messageText) {
      messageText.removeAttribute('data-i18n');
      messageText.textContent = t.message;
    }

    timer.querySelector('.expiry-copy').textContent = t.timerLabel;
    strip.querySelector('.urgency-copy').textContent = t.waiting;
    cta.querySelector('.phone-cta-copy').textContent = t.phoneCta;

    const heroImage = document.querySelector('.featured-profile img');
    const avatar = miniMessage.querySelector('img');
    const inviteAvatar = document.querySelector('.invite-avatar img');
    [avatar, inviteAvatar].filter(Boolean).forEach((image) => {
      if (heroImage) image.src = heroImage.src;
      image.alt = t.name;
    });
  };

  const applyLocaleOverrides = () => {
    if (typeof locales === 'undefined') return;
    Object.entries(locales).forEach(([code, dictionary]) => {
      const t = copy[code] || copy['en-GB'];
      Object.assign(dictionary, {
        messageName: t.name,
        messagePreview: t.message,
        inviteLabel: t.inviteLabel,
        inviteTitle: t.inviteTitle,
        inviteText: t.inviteText,
        invitePreview: t.invitePreview,
        inviteCta: t.inviteCta,
        inviteNote: t.inviteNote,
        stickyCta: t.phoneCta
      });
      if (typeof dictionary.metaTitle === 'string') dictionary.metaTitle = dictionary.metaTitle.replaceAll(OLD_BRAND, BRAND);
      if (Array.isArray(dictionary.profiles) && dictionary.profiles[0]) dictionary.profiles[0][0] = t.name;
    });
    if (typeof setLocale === 'function') setLocale(typeof currentLocale === 'string' ? currentLocale : getLocale());
  };

  const createModal = () => {
    let modal = document.getElementById('ageGateModal');
    if (modal) return modal;

    modal = document.createElement('dialog');
    modal.id = 'ageGateModal';
    modal.className = 'age-gate-modal';
    modal.innerHTML = `
      <div class="age-gate-shell">
        <button class="age-gate-close" type="button" aria-label="Close">×</button>
        <div class="age-gate-icon" aria-hidden="true">♥</div>
        <span class="age-gate-badge"></span>
        <h2 class="age-gate-title"></h2>
        <p class="age-gate-text"></p>
        <div class="age-gate-progress"><span>RealMeetClub · 2/2</span></div>
        <div class="age-gate-options">
          <a class="age-option" href="${AGE_18_44_URL}" rel="nofollow sponsored">18–44</a>
          <a class="age-option age-option-primary" href="${AGE_45_PLUS_URL}" rel="nofollow sponsored">45+</a>
        </div>
        <p class="age-gate-secure"><span aria-hidden="true">🔒</span><span>18+</span></p>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => {
      if (!modal.open) return;
      modal.classList.add('closing');
      setTimeout(() => {
        modal.classList.remove('closing');
        modal.close();
      }, 150);
    };

    modal.querySelector('.age-gate-close').addEventListener('click', close);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) close();
    });
    return modal;
  };

  const updateModalCopy = () => {
    const modal = createModal();
    const t = getText();
    modal.querySelector('.age-gate-badge').textContent = t.modalBadge;
    modal.querySelector('.age-gate-title').textContent = t.modalTitle;
    modal.querySelector('.age-gate-text').textContent = t.modalText;
  };

  const openAgeGate = () => {
    updateModalCopy();
    const modal = createModal();
    if (!modal.open) modal.showModal();
    setTimeout(() => modal.querySelector('.age-option')?.focus(), 30);
  };

  const getDeadline = () => {
    try {
      const stored = Number(sessionStorage.getItem(TIMER_KEY));
      if (Number.isFinite(stored) && stored > Date.now()) return stored;
      const deadline = Date.now() + TIMER_SECONDS * 1000;
      sessionStorage.setItem(TIMER_KEY, String(deadline));
      return deadline;
    } catch {
      return Date.now() + TIMER_SECONDS * 1000;
    }
  };

  const deadline = getDeadline();

  const updateTimer = () => {
    const time = document.querySelector('.expiry-time');
    const pill = document.querySelector('.expiry-pill');
    if (!time || !pill) return;
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
    const seconds = String(remaining % 60).padStart(2, '0');
    time.textContent = `${minutes}:${seconds}`;
    pill.classList.toggle('is-urgent', remaining > 0 && remaining <= 60);
    pill.classList.toggle('is-expired', remaining === 0);
    if (remaining === 0) pill.querySelector('.expiry-copy').textContent = getText().expired;
  };

  const refresh = () => {
    applyBrand();
    preparePage();
    updateModalCopy();
    updateTimer();
  };

  const initialise = () => {
    injectStyles();
    applyLocaleOverrides();
    refresh();
    setInterval(updateTimer, 1000);

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('.js-affiliate');
      if (!trigger) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openAgeGate();
    }, true);

    document.getElementById('languageSelect')?.addEventListener('change', () => setTimeout(refresh, 0));
    new MutationObserver(() => setTimeout(refresh, 0)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });
    const title = document.querySelector('title');
    if (title) new MutationObserver(applyBrand).observe(title, { childList: true, characterData: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise, { once: true });
  else initialise();
})();
