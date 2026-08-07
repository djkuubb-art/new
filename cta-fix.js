(() => {
  const labels = {
    'en-GB': 'Reply to Anna',
    'en-US': 'Reply to Anna',
    'en-SG': 'Reply to Anna',
    de: 'Anna antworten',
    nl: 'Anna antwoorden',
    fr: 'Répondre à Anna',
    it: 'Rispondi ad Anna',
    es: 'Responder a Anna',
    pt: 'Responder à Anna',
    pl: 'Odpowiedz Annie',
    sv: 'Svara Anna',
    no: 'Svar Anna',
    da: 'Svar Anna',
    fi: 'Vastaa Annalle',
    el: 'Απάντησε στην Άννα',
    hr: 'Odgovori Anni',
    sl: 'Odgovori Anni',
    sk: 'Odpíš Anne',
    cs: 'Odepiš Anně',
    hu: 'Válaszolj Annának',
    he: 'השב לאנה'
  };

  const STYLE_ID = 'rmc-proxy-safe-cta-style';
  let ctaObserver = null;
  let repairQueued = false;

  const normaliseLocale = (value = '') => {
    if (labels[value]) return value;
    const raw = String(value).replace('_', '-').toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return labels[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const injectStyle = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .phone-cta.rmc-generated-label > .phone-cta-copy {
        display: none !important;
      }
      .phone-cta.rmc-generated-label::before {
        content: attr(data-rmc-label);
        display: inline;
      }
      .phone-cta.rmc-generated-label::after {
        content: '→';
        display: inline;
        flex: 0 0 auto;
      }
      [dir="rtl"] .phone-cta.rmc-generated-label::after {
        content: '←';
      }
    `;
    document.head.appendChild(style);
  };

  const startObserving = (cta) => {
    ctaObserver?.disconnect();
    ctaObserver = new MutationObserver(() => {
      if (repairQueued) return;
      repairQueued = true;
      requestAnimationFrame(() => {
        repairQueued = false;
        render();
      });
    });
    ctaObserver.observe(cta, {
      childList: true,
      subtree: true,
      characterData: true
    });
  };

  const render = () => {
    const cta = document.querySelector('.hero-invite .phone-card .phone-cta');
    if (!(cta instanceof HTMLAnchorElement)) return false;

    ctaObserver?.disconnect();
    injectStyle();

    const locale = getLocale();
    const label = labels[locale] || labels['en-GB'];

    cta.classList.add('js-affiliate', 'notranslate', 'rmc-generated-label');
    cta.setAttribute('translate', 'no');
    cta.setAttribute('lang', locale);
    cta.setAttribute('aria-label', label);
    cta.dataset.rmcLabel = label;
    cta.dataset.rmcCtaOwner = 'reply';

    if (!cta.dataset.rmcOriginalHref) {
      cta.dataset.rmcOriginalHref = cta.getAttribute('href') || '/api/go?slot=phone-message';
    }
    cta.setAttribute('href', cta.dataset.rmcOriginalHref);

    const hiddenCopy = document.createElement('span');
    hiddenCopy.className = 'phone-cta-copy notranslate';
    hiddenCopy.setAttribute('translate', 'no');
    hiddenCopy.setAttribute('aria-hidden', 'true');
    hiddenCopy.textContent = '';

    cta.replaceChildren(hiddenCopy);
    startObserving(cta);
    return true;
  };

  const renderWhenReady = () => {
    if (render()) return;
    const bodyObserver = new MutationObserver(() => {
      if (!render()) return;
      bodyObserver.disconnect();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => bodyObserver.disconnect(), 5000);
  };

  const refresh = () => {
    window.setTimeout(render, 0);
    window.setTimeout(render, 250);
    window.setTimeout(render, 1000);
  };

  renderWhenReady();
  document.getElementById('languageSelect')?.addEventListener('change', refresh);
  window.addEventListener('pageshow', refresh);
})();

(() => {
  const ages = [47, 42, 49, 45, 44, 48, 46, 51, 43, 55];
  const imagePaths = ages.map((_, index) => `/images/profiles/profile-${String(index + 1).padStart(2, '0')}.svg`);

  const namesByLocale = {
    'en-GB': ['Anna', 'Claire', 'Emma', 'Laura', 'Sophie', 'Rachel', 'Julia', 'Hannah', 'Louise', 'Rebecca'],
    'en-US': ['Anna', 'Rachel', 'Megan', 'Laura', 'Jennifer', 'Amanda', 'Nicole', 'Michelle', 'Melissa', 'Rebecca'],
    'en-SG': ['Anna', 'Grace', 'Elaine', 'Joanne', 'Cheryl', 'Patricia', 'Irene', 'Linda', 'Karen', 'Susan'],
    de: ['Anna', 'Claudia', 'Katja', 'Andrea', 'Martina', 'Nicole', 'Petra', 'Sandra', 'Heike', 'Birgit'],
    nl: ['Anna', 'Monique', 'Linda', 'Marieke', 'Karin', 'Esther', 'Petra', 'Anita', 'Ilse', 'Bianca'],
    fr: ['Anna', 'Sophie', 'Élodie', 'Isabelle', 'Valérie', 'Sandrine', 'Céline', 'Caroline', 'Virginie', 'Laurence'],
    it: ['Anna', 'Laura', 'Alessandra', 'Monica', 'Silvia', 'Paola', 'Barbara', 'Elena', 'Daniela', 'Cristina'],
    es: ['Anna', 'Laura', 'Carmen', 'Ana', 'Isabel', 'Patricia', 'Mónica', 'Elena', 'Cristina', 'Silvia'],
    pt: ['Anna', 'Ana', 'Carla', 'Rita', 'Teresa', 'Paula', 'Sandra', 'Helena', 'Cristina', 'Susana'],
    pl: ['Anna', 'Katarzyna', 'Monika', 'Agnieszka', 'Joanna', 'Magdalena', 'Ewa', 'Beata', 'Marta', 'Dorota'],
    sv: ['Anna', 'Maria', 'Sofia', 'Karin', 'Helena', 'Linda', 'Eva', 'Malin', 'Camilla', 'Åsa'],
    no: ['Anna', 'Marianne', 'Ingrid', 'Linda', 'Kristin', 'Monica', 'Eva', 'Camilla', 'Heidi', 'Tone'],
    da: ['Anna', 'Helle', 'Louise', 'Camilla', 'Charlotte', 'Line', 'Maria', 'Anne', 'Lene', 'Rikke'],
    fi: ['Anna', 'Minna', 'Laura', 'Tiina', 'Päivi', 'Katja', 'Marika', 'Johanna', 'Hanna', 'Kirsi'],
    el: ['Άννα', 'Ελένη', 'Κατερίνα', 'Σοφία', 'Μαρία', 'Δήμητρα', 'Ιωάννα', 'Χριστίνα', 'Γεωργία', 'Νίκη'],
    hr: ['Ana', 'Ivana', 'Marija', 'Petra', 'Martina', 'Jelena', 'Katarina', 'Sandra', 'Marina', 'Renata'],
    sl: ['Ana', 'Nataša', 'Petra', 'Maja', 'Mojca', 'Tanja', 'Mateja', 'Nina', 'Andreja', 'Simona'],
    sk: ['Anna', 'Martina', 'Zuzana', 'Katarína', 'Monika', 'Petra', 'Eva', 'Lucia', 'Andrea', 'Veronika'],
    cs: ['Anna', 'Petra', 'Lucie', 'Martina', 'Monika', 'Kateřina', 'Eva', 'Lenka', 'Andrea', 'Veronika'],
    hu: ['Anna', 'Andrea', 'Éva', 'Mónika', 'Zsuzsa', 'Judit', 'Krisztina', 'Erika', 'Ágnes', 'Ildikó'],
    he: ['אנה', 'מיכל', 'יעל', 'רונית', 'אורית', 'שרון', 'מירב', 'טלי', 'סיגל', 'ליאת']
  };

  const biosByLocale = {
    'en-GB': [
      'Honest conversation and a proper laugh win me over.',
      'Coffee, a long walk and good company sounds like a lovely day to me.',
      'Confidence is attractive, but kindness matters even more.',
      'I’m not here for endless texting — I’d rather see if there’s real chemistry.',
      'I love slow Sundays, spontaneous plans and people who don’t take themselves too seriously.',
      'Make me laugh and you’re already halfway there.',
      'I value calm, loyalty and a man who keeps his word.',
      'I’ve got a soft spot for men who can actually listen.',
      'Life’s too short for games. I’d rather meet and see where it goes.',
      'Independent, affectionate and still curious about who I might meet next.'
    ],
    'en-US': [
      'Good conversation and a man who can make me laugh go a long way with me.',
      'Give me coffee, a walk, and someone easy to talk to and I’m happy.',
      'Confidence catches my eye, but kindness is what keeps my attention.',
      'I’m not looking for weeks of texting. I’d rather see if we click.',
      'I’m into relaxed weekends, spontaneous plans, and people who can laugh at themselves.',
      'If you can make me laugh, you already have an advantage.',
      'Loyalty, consistency, and keeping your word matter a lot to me.',
      'I like a man who knows when to talk and when to actually listen.',
      'No games, no drama. I’d rather meet and see what happens.',
      'Independent, affectionate, and open to meeting someone who surprises me.'
    ],
    'en-SG': [
      'A good conversation and an easy sense of humour always get my attention.',
      'I’m happiest with a nice coffee, a walk and someone I can talk to comfortably.',
      'Confidence is nice, but kindness and respect matter more to me.',
      'I’d rather meet and see if we click than spend forever chatting online.',
      'I enjoy relaxed weekends, spontaneous plans and people who don’t take life too seriously.',
      'Make me laugh and you’ve already made a very good start.',
      'I value loyalty, consistency and someone who means what he says.',
      'A man who really listens is more attractive than he probably realises.',
      'I’m not interested in games. Let’s talk, meet and see how it feels.',
      'Independent, warm and still excited by the idea of meeting someone new.'
    ],
    de: [
      'Ein gutes Gespräch und ein Mann, der mich zum Lachen bringt, sind schon mal ein sehr guter Anfang.',
      'Kaffee, ein langer Spaziergang und angenehme Gesellschaft – mehr brauche ich oft gar nicht.',
      'Selbstbewusstsein fällt mir auf, aber Freundlichkeit bleibt mir im Gedächtnis.',
      'Wochenlang nur schreiben ist nicht mein Ding. Ich möchte lieber sehen, ob die Chemie stimmt.',
      'Ich mag entspannte Wochenenden, spontane Ideen und Menschen, die auch über sich selbst lachen können.',
      'Wenn du mich zum Lachen bringst, hast du schon einen Pluspunkt.',
      'Verlässlichkeit, Ruhe und ein Mann, der zu seinem Wort steht, bedeuten mir viel.',
      'Ich finde Männer attraktiv, die nicht nur reden, sondern auch wirklich zuhören.',
      'Für Spielchen ist mir meine Zeit zu schade. Lieber kennenlernen und schauen, was passiert.',
      'Selbstständig, herzlich und neugierig darauf, wen das Leben noch so vor mich stellt.'
    ],
    nl: [
      'Een goed gesprek en een man die me aan het lachen maakt: daar word ik blij van.',
      'Koffie, een fijne wandeling en goed gezelschap is voor mij al een prima dag.',
      'Zelfvertrouwen valt op, maar vriendelijkheid blijft hangen.',
      'Ik hoef niet wekenlang te appen. Liever ontdekken of er echt een klik is.',
      'Ik hou van rustige weekenden, spontane plannen en mensen die zichzelf niet te serieus nemen.',
      'Kun je me laten lachen, dan heb je meteen een streepje voor.',
      'Betrouwbaarheid, rust en doen wat je zegt vind ik belangrijk.',
      'Een man die echt kan luisteren vind ik verrassend aantrekkelijk.',
      'Geen spelletjes voor mij. Gewoon kennismaken en kijken wat er gebeurt.',
      'Zelfstandig, warm en nog steeds nieuwsgierig naar wie ik hier kan tegenkomen.'
    ],
    fr: [
      'Une vraie conversation et un homme qui me fait rire, c’est déjà un très bon début.',
      'Un café, une balade et une compagnie agréable suffisent souvent à me rendre heureuse.',
      'La confiance en soi attire mon regard, mais la gentillesse retient mon attention.',
      'Je n’ai pas envie de discuter pendant des semaines. Je préfère voir s’il y a un vrai feeling.',
      'J’aime les week-ends tranquilles, les plans improvisés et les gens qui savent rire d’eux-mêmes.',
      'Si tu arrives à me faire rire, tu pars déjà avec un avantage.',
      'La loyauté, la stabilité et quelqu’un qui tient parole comptent beaucoup pour moi.',
      'Un homme qui sait vraiment écouter, je trouve ça très séduisant.',
      'Les jeux et les complications, très peu pour moi. Je préfère se rencontrer et voir.',
      'Indépendante, affectueuse et toujours curieuse de découvrir qui la vie peut mettre sur mon chemin.'
    ],
    it: [
      'Una bella conversazione e un uomo capace di farmi ridere sono già un ottimo inizio.',
      'Un caffè, una passeggiata e buona compagnia: per me può essere una giornata perfetta.',
      'La sicurezza attira lo sguardo, ma la gentilezza è ciò che mi conquista davvero.',
      'Non voglio passare settimane a scrivere. Preferisco capire se dal vivo c’è intesa.',
      'Adoro i weekend tranquilli, i programmi improvvisati e chi sa ridere anche di sé.',
      'Se riesci a farmi ridere, parti già con un bel vantaggio.',
      'Per me contano la lealtà, la serenità e chi mantiene la parola data.',
      'Trovo molto attraente un uomo che sappia davvero ascoltare.',
      'Non ho tempo per i giochini. Meglio conoscersi e vedere dove porta.',
      'Indipendente, affettuosa e ancora curiosa di scoprire chi potrei incontrare.'
    ],
    es: [
      'Una buena conversación y un hombre que me haga reír ya son un gran comienzo.',
      'Un café, un paseo largo y buena compañía me parecen un plan perfecto.',
      'La seguridad llama la atención, pero la amabilidad es lo que de verdad me gana.',
      'No quiero pasar semanas escribiendo. Prefiero ver si en persona hay química.',
      'Me gustan los fines de semana tranquilos, los planes improvisados y la gente que sabe reírse de sí misma.',
      'Si consigues hacerme reír, ya tienes bastante ganado.',
      'Valoro la lealtad, la tranquilidad y a un hombre que cumpla su palabra.',
      'Un hombre que sabe escuchar de verdad me parece muy atractivo.',
      'No estoy para juegos. Prefiero conocernos y ver qué pasa.',
      'Independiente, cariñosa y todavía con curiosidad por saber a quién puedo conocer aquí.'
    ],
    pt: [
      'Uma boa conversa e um homem que me faça rir já são um excelente começo.',
      'Um café, um passeio e boa companhia são suficientes para fazer o meu dia.',
      'A confiança chama a atenção, mas é a gentileza que realmente me conquista.',
      'Não quero passar semanas só a trocar mensagens. Prefiro perceber se existe química ao vivo.',
      'Gosto de fins de semana tranquilos, planos de última hora e pessoas que sabem rir de si próprias.',
      'Se me fizeres rir, já começas com vantagem.',
      'Valorizo lealdade, tranquilidade e um homem que cumpra o que diz.',
      'Acho muito atraente um homem que saiba mesmo ouvir.',
      'Não tenho paciência para jogos. Prefiro conhecer e ver no que dá.',
      'Independente, carinhosa e ainda curiosa para descobrir quem posso encontrar por aqui.'
    ],
    pl: [
      'Dobra rozmowa i facet, który potrafi mnie rozśmieszyć, to dla mnie świetny początek.',
      'Kawa, długi spacer i dobre towarzystwo — naprawdę niewiele więcej mi trzeba.',
      'Pewność siebie przyciąga uwagę, ale to życzliwość zostaje ze mną na dłużej.',
      'Nie chcę tygodniami tylko pisać. Wolę sprawdzić, czy na żywo jest między nami chemia.',
      'Lubię spokojne weekendy, spontaniczne pomysły i ludzi, którzy mają dystans do siebie.',
      'Jeśli potrafisz mnie rozbawić, od razu masz u mnie plusa.',
      'Cenię lojalność, spokój i faceta, który dotrzymuje słowa.',
      'Facet, który naprawdę umie słuchać, jest dla mnie bardzo atrakcyjny.',
      'Na gierki szkoda mi czasu. Wolę się poznać i zobaczyć, co z tego będzie.',
      'Samodzielna, ciepła i wciąż ciekawa, kogo jeszcze mogę tutaj poznać.'
    ],
    sv: [
      'Ett bra samtal och en man som får mig att skratta är en väldigt bra början.',
      'Kaffe, en lång promenad och trevligt sällskap räcker långt för mig.',
      'Självförtroende märks, men vänlighet är det jag minns.',
      'Jag vill inte skriva i flera veckor. Jag träffas hellre och ser om det finns kemi.',
      'Jag gillar lugna helger, spontana planer och människor som kan skratta åt sig själva.',
      'Får du mig att skratta har du redan ett litet försprång.',
      'Lojalitet, trygghet och en man som håller vad han lovar betyder mycket för mig.',
      'En man som faktiskt kan lyssna tycker jag är väldigt attraktiv.',
      'Jag har ingen lust med spel. Hellre träffas och se vart det leder.',
      'Självständig, varm och fortfarande nyfiken på vem jag kan möta här.'
    ],
    no: [
      'En god samtale og en mann som får meg til å le er en veldig god start.',
      'Kaffe, en lang tur og hyggelig selskap er egentlig alt jeg trenger for en fin dag.',
      'Selvtillit fanger blikket, men det er vennlighet jeg husker.',
      'Jeg vil ikke bruke ukevis på bare å skrive. Jeg møtes heller og ser om kjemien er der.',
      'Jeg liker rolige helger, spontane planer og folk som klarer å le av seg selv.',
      'Får du meg til å le, har du allerede et lite forsprang.',
      'Lojalitet, ro og en mann som holder det han lover betyr mye for meg.',
      'En mann som faktisk kan lytte synes jeg er skikkelig attraktivt.',
      'Jeg har ikke tid til spill. Jeg vil heller møtes og se hva som skjer.',
      'Selvstendig, varm og fortsatt nysgjerrig på hvem jeg kan møte her.'
    ],
    da: [
      'En god samtale og en mand, der kan få mig til at grine, er en rigtig god start.',
      'Kaffe, en lang gåtur og godt selskab er egentlig alt, jeg behøver for en dejlig dag.',
      'Selvtillid fanger blikket, men venlighed er det, jeg husker.',
      'Jeg gider ikke skrive i ugevis. Jeg vil hellere mødes og se, om kemien er der.',
      'Jeg elsker rolige weekender, spontane planer og mennesker, der kan grine af sig selv.',
      'Kan du få mig til at grine, har du allerede et lille forspring.',
      'Loyalitet, ro og en mand, der holder sit ord, betyder meget for mig.',
      'En mand, der faktisk kan lytte, synes jeg er virkelig attraktiv.',
      'Jeg har ikke tid til spil. Hellere mødes og se, hvad der sker.',
      'Selvstændig, varm og stadig nysgerrig på, hvem jeg kan møde her.'
    ],
    fi: [
      'Hyvä keskustelu ja mies, joka saa minut nauramaan, on jo erinomainen alku.',
      'Kahvi, pitkä kävely ja hyvä seura riittävät minulle oikein hyvin.',
      'Itsevarmuus kiinnittää huomion, mutta ystävällisyys jää mieleen.',
      'En halua viestitellä viikkokausia. Tapaan mieluummin ja katson, löytyykö kemiaa.',
      'Pidän rauhallisista viikonlopuista, spontaaneista suunnitelmista ja ihmisistä, jotka osaavat nauraa itselleen.',
      'Jos saat minut nauramaan, olet jo hyvällä alulla.',
      'Arvostan uskollisuutta, rauhallisuutta ja miestä, joka pitää sanansa.',
      'Mies, joka osaa oikeasti kuunnella, on minusta todella viehättävä.',
      'En jaksa pelejä. Mieluummin tavataan ja katsotaan, mitä tapahtuu.',
      'Itsenäinen, lämmin ja yhä utelias näkemään, kenet voisin täällä tavata.'
    ],
    el: [
      'Μια καλή συζήτηση και ένας άντρας που με κάνει να γελάω είναι υπέροχη αρχή.',
      'Ένας καφές, μια μεγάλη βόλτα και καλή παρέα μου αρκούν για μια όμορφη μέρα.',
      'Η αυτοπεποίθηση τραβάει το βλέμμα, αλλά η καλοσύνη είναι αυτή που μένει.',
      'Δεν θέλω να μιλάμε μόνο με μηνύματα για εβδομάδες. Προτιμώ να βρεθούμε και να δούμε αν υπάρχει χημεία.',
      'Μου αρέσουν τα ήρεμα Σαββατοκύριακα, τα αυθόρμητα σχέδια και οι άνθρωποι που ξέρουν να γελούν με τον εαυτό τους.',
      'Αν καταφέρεις να με κάνεις να γελάσω, έχεις ήδη ένα μικρό προβάδισμα.',
      'Εκτιμώ την αφοσίωση, την ηρεμία και έναν άντρα που κρατά τον λόγο του.',
      'Ένας άντρας που ξέρει πραγματικά να ακούει είναι πολύ ελκυστικός για μένα.',
      'Δεν έχω χρόνο για παιχνίδια. Προτιμώ να γνωριστούμε και να δούμε πού θα πάει.',
      'Ανεξάρτητη, τρυφερή και ακόμα περίεργη να δω ποιον μπορεί να γνωρίσω εδώ.'
    ],
    hr: [
      'Dobar razgovor i muškarac koji me zna nasmijati za mene su odličan početak.',
      'Kava, duga šetnja i ugodno društvo sasvim su dovoljni za lijep dan.',
      'Samopouzdanje privuče pažnju, ali dobrota je ono što ostaje.',
      'Ne želim tjednima samo tipkati. Radije bih se upoznala i vidjela ima li kemije.',
      'Volim mirne vikende, spontane planove i ljude koji se znaju našaliti na vlastiti račun.',
      'Ako me uspiješ nasmijati, već imaš mali plus kod mene.',
      'Cijenim odanost, smirenost i muškarca koji drži riječ.',
      'Muškarac koji stvarno zna slušati meni je jako privlačan.',
      'Nemam vremena za igrice. Radije se upoznajmo pa vidimo što će biti.',
      'Samostalna, topla i još uvijek znatiželjna koga bih ovdje mogla upoznati.'
    ],
    sl: [
      'Dober pogovor in moški, ki me zna nasmejati, sta zame odličen začetek.',
      'Kava, dolg sprehod in prijetna družba so zame dovolj za lep dan.',
      'Samozavest pritegne pogled, prijaznost pa je tista, ki ostane v spominu.',
      'Ne želim si več tednov samo dopisovati. Raje se srečam in vidim, ali je med nama kemija.',
      'Rada imam mirne vikende, spontane načrte in ljudi, ki se znajo pošaliti tudi na svoj račun.',
      'Če me znaš nasmejati, imaš pri meni že majhno prednost.',
      'Cenim zvestobo, mirnost in moškega, ki drži besedo.',
      'Moški, ki zna res poslušati, se mi zdi zelo privlačen.',
      'Za igrice nimam časa. Raje se spoznajva in poglejva, kam naju pelje.',
      'Samostojna, topla in še vedno radovedna, koga lahko tukaj spoznam.'
    ],
    sk: [
      'Dobrý rozhovor a muž, ktorý ma vie rozosmiať, sú pre mňa skvelý začiatok.',
      'Káva, dlhá prechádzka a príjemná spoločnosť mi úplne stačia na pekný deň.',
      'Sebavedomie upúta, ale láskavosť je to, čo si zapamätám.',
      'Nechcem si celé týždne iba písať. Radšej sa stretnem a zistím, či medzi nami funguje chémia.',
      'Mám rada pokojné víkendy, spontánne plány a ľudí, ktorí sa vedia zasmiať aj sami na sebe.',
      'Ak ma dokážeš rozosmiať, už máš u mňa malé plus.',
      'Cením si vernosť, pokoj a muža, ktorý dodrží slovo.',
      'Muž, ktorý vie naozaj počúvať, je pre mňa veľmi príťažlivý.',
      'Na hry nemám čas. Radšej sa spoznajme a uvidíme, čo z toho bude.',
      'Samostatná, srdečná a stále zvedavá, koho tu môžem stretnúť.'
    ],
    cs: [
      'Dobrý rozhovor a muž, který mě umí rozesmát, jsou pro mě skvělý začátek.',
      'Káva, dlouhá procházka a příjemná společnost mi úplně stačí ke krásnému dni.',
      'Sebevědomí zaujme, ale laskavost je to, co si zapamatuju.',
      'Nechci si celé týdny jen psát. Radši se potkám a zjistím, jestli mezi námi funguje chemie.',
      'Mám ráda klidné víkendy, spontánní plány a lidi, kteří se umějí zasmát sami sobě.',
      'Když mě dokážeš rozesmát, máš u mě rovnou malé plus.',
      'Cením si věrnosti, klidu a muže, který dodrží slovo.',
      'Muž, který umí opravdu poslouchat, je pro mě hodně přitažlivý.',
      'Na hry nemám čas. Radši se poznejme a uvidíme, co z toho bude.',
      'Samostatná, srdečná a pořád zvědavá, koho tady můžu potkat.'
    ],
    hu: [
      'Egy jó beszélgetés és egy férfi, aki meg tud nevettetni, nálam remek kezdés.',
      'Egy kávé, egy hosszú séta és jó társaság nekem bőven elég egy szép naphoz.',
      'Az önbizalom felkelti a figyelmemet, de a kedvesség az, ami megmarad.',
      'Nem szeretnék hetekig csak üzengetni. Inkább találkozom, és megnézem, működik-e a kémia.',
      'Szeretem a nyugodt hétvégéket, a spontán programokat és azokat, akik magukon is tudnak nevetni.',
      'Ha meg tudsz nevettetni, máris van nálam egy kis előnyöd.',
      'Fontos nekem a hűség, a nyugalom és egy férfi, aki tartja a szavát.',
      'Nagyon vonzónak találom, ha egy férfi tényleg tud figyelni.',
      'Nincs időm játszmákra. Inkább ismerjük meg egymást, aztán meglátjuk.',
      'Önálló, melegszívű és még mindig kíváncsi arra, kivel hozhat össze az élet.'
    ],
    he: [
      'שיחה טובה וגבר שיודע להצחיק אותי הם מבחינתי התחלה מצוינת.',
      'קפה, הליכה ארוכה וחברה נעימה זה כל מה שאני צריכה בשביל יום טוב.',
      'ביטחון עצמי מושך את העין, אבל דווקא טוב לב הוא מה שנשאר אצלי.',
      'לא בא לי להתכתב שבועות. מעדיפה להיפגש ולראות אם באמת יש כימיה.',
      'אני אוהבת סופי שבוע רגועים, תוכניות ספונטניות ואנשים שיודעים לצחוק גם על עצמם.',
      'אם הצלחת להצחיק אותי, כבר התחלת טוב.',
      'נאמנות, רוגע וגבר שעומד במילה שלו חשובים לי מאוד.',
      'גבר שיודע באמת להקשיב הוא בעיניי מאוד מושך.',
      'אין לי זמן למשחקים. מעדיפה להכיר ולראות לאן זה הולך.',
      'עצמאית, חמה ועדיין סקרנית לראות את מי עוד אוכל להכיר כאן.'
    ]
  };

  const fallbackBios = biosByLocale['en-GB'];

  const normaliseLocale = (value = '') => {
    const raw = String(value).replace('_', '-');
    if (namesByLocale[raw]) return raw;
    const lower = raw.toLowerCase();
    if (lower.startsWith('en-us')) return 'en-US';
    if (lower.startsWith('en-sg')) return 'en-SG';
    if (lower.startsWith('en')) return 'en-GB';
    const short = lower.split('-')[0];
    return namesByLocale[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const getLocalProfiles = (locale) => {
    try {
      return typeof locales !== 'undefined' && Array.isArray(locales[locale]?.profiles)
        ? locales[locale].profiles
        : [];
    } catch (_) {
      return [];
    }
  };

  const cardMarkup = (index) => `
    <article class="profile-card profile-card-premium js-affiliate" data-slot="card-${index + 1}" tabindex="0" role="button" aria-label="View profile">
      <div class="image-wrap">
        <img
          src="${imagePaths[index]}"
          alt="Profile photo"
          width="600"
          height="800"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
        <span class="status-pill${index % 4 === 3 ? ' muted' : ''}"><i></i><span data-i18n="${index % 4 === 3 ? 'activeToday' : 'online'}">${index % 4 === 3 ? 'Active today' : 'Online'}</span></span>
        <div class="profile-card-gradient"></div>
        <div class="profile-card-overlay-premium">
          <span class="profile-distance">📍 <span data-profile-distance="${index}">near you</span></span>
          <h3><span data-gallery-name>${namesByLocale['en-GB'][index]}</span>, <span data-gallery-age>${ages[index]}</span></h3>
          <p class="profile-bio" data-profile-bio="${index}">${fallbackBios[index % fallbackBios.length]}</p>
          <button class="profile-primary-action" type="button"><span data-profile-cta>View profile</span><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </article>
  `;

  const injectGalleryStyle = () => {
    if (document.getElementById('rmc-ten-profile-gallery-style')) return;
    const style = document.createElement('style');
    style.id = 'rmc-ten-profile-gallery-style';
    style.textContent = `
      .profile-swipe-track .profile-card-premium .image-wrap > img {
        object-fit: cover;
        object-position: center 18%;
      }
      @media (max-width: 760px) {
        .profile-swipe-dots {
          max-width: 240px;
          margin-inline: auto;
          flex-wrap: wrap;
          gap: 6px;
        }
        .profile-swipe-dot {
          width: 7px;
          height: 7px;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const renderGallery = () => {
    const track = document.getElementById('profileSwipeTrack');
    if (!track || track.dataset.tenProfileGallery === '1') return false;

    track.dataset.tenProfileGallery = '1';
    track.innerHTML = ages.map((_, index) => cardMarkup(index)).join('');

    const dots = document.querySelector('.profile-swipe-dots');
    if (dots) {
      dots.innerHTML = ages.map((_, index) => `
        <button class="profile-swipe-dot${index === 0 ? ' is-active' : ''}" type="button" aria-label="Profile ${index + 1}"></button>
      `).join('');
    }

    injectGalleryStyle();
    return true;
  };

  const syncText = () => {
    const locale = getLocale();
    const names = namesByLocale[locale] || namesByLocale['en-GB'];
    const bios = biosByLocale[locale] || biosByLocale['en-GB'];
    const localProfiles = getLocalProfiles(locale);
    const cards = [...document.querySelectorAll('#profileSwipeTrack .profile-card-premium')];
    if (!cards.length) return;

    cards.forEach((card, index) => {
      const name = card.querySelector('[data-gallery-name]');
      if (name) name.textContent = names[index] || names[index % names.length];

      const age = card.querySelector('[data-gallery-age]');
      if (age) age.textContent = String(ages[index]);

      const bio = card.querySelector('[data-profile-bio]');
      if (bio && bios.length) bio.textContent = bios[index] || bios[index % bios.length];

      const distance = card.querySelector('[data-profile-distance]');
      if (distance) {
        const current = distance.textContent.trim();
        const distanceOnly = current.includes('·') ? current.split('·').pop().trim() : current;
        const city = localProfiles[index % Math.max(localProfiles.length, 1)]?.[1] || '';
        distance.textContent = city ? `${city} · ${distanceOnly}` : distanceOnly;
      }
    });
  };

  const scheduleSync = () => {
    [0, 250, 900, 1800].forEach((delay) => window.setTimeout(syncText, delay));
  };

  const initialise = () => {
    renderGallery();
    scheduleSync();

    document.getElementById('languageSelect')?.addEventListener('change', scheduleSync);
    window.addEventListener('pageshow', scheduleSync);

    new MutationObserver(scheduleSync).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'dir']
    });
  };

  initialise();
})();