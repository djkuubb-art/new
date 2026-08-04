(() => {
  const BRAND = 'RealMeetClub';
  const OLD_BRAND = 'HeartMatch';

  const messages = {
    'en-GB': { name: 'Anna', text: 'I guess you’re not going to reply to me... I knew I wasn’t pretty enough.' },
    'en-US': { name: 'Anna', text: 'I guess you’re not going to reply to me... I knew I wasn’t pretty enough.' },
    'en-SG': { name: 'Anna', text: 'I guess you’re not going to reply to me... I knew I wasn’t pretty enough.' },
    de: { name: 'Anna', text: 'Du wirst mir wohl nicht mehr antworten... Ich wusste, dass ich nicht hübsch genug bin.' },
    nl: { name: 'Anna', text: 'Je gaat me zeker niet meer antwoorden... Ik wist wel dat ik niet mooi genoeg ben.' },
    fr: { name: 'Anna', text: 'J’imagine que tu ne vas plus me répondre... Je savais bien que je n’étais pas assez jolie.' },
    it: { name: 'Anna', text: 'Immagino che non mi risponderai più... Lo sapevo che non ero abbastanza carina.' },
    es: { name: 'Anna', text: 'Supongo que ya no vas a responderme... Sabía que no era lo bastante guapa.' },
    pt: { name: 'Anna', text: 'Acho que já não me vais responder... Eu sabia que não era bonita o suficiente.' },
    pl: { name: 'Anna', text: 'Chyba już mi nie odpiszesz... Wiedziałam, że jestem za brzydka.' },
    sv: { name: 'Anna', text: 'Du kommer nog inte att svara mig mer... Jag visste att jag inte var tillräckligt fin.' },
    no: { name: 'Anna', text: 'Du kommer vel ikke til å svare meg mer... Jeg visste at jeg ikke var pen nok.' },
    da: { name: 'Anna', text: 'Du svarer mig nok ikke mere... Jeg vidste, at jeg ikke var pæn nok.' },
    fi: { name: 'Anna', text: 'Et taida enää vastata minulle... Tiesin, etten ollut tarpeeksi kaunis.' },
    el: { name: 'Anna', text: 'Μάλλον δεν θα μου απαντήσεις πια... Το ήξερα ότι δεν ήμουν αρκετά όμορφη.' },
    hr: { name: 'Anna', text: 'Izgleda da mi više nećeš odgovoriti... Znala sam da nisam dovoljno lijepa.' },
    sl: { name: 'Anna', text: 'Verjetno mi ne boš več odpisal... Vedela sem, da nisem dovolj lepa.' },
    sk: { name: 'Anna', text: 'Asi mi už neodpíšeš... Vedela som, že nie som dosť pekná.' },
    cs: { name: 'Anna', text: 'Asi už mi neodpovíš... Věděla jsem, že nejsem dost hezká.' },
    hu: { name: 'Anna', text: 'Úgy tűnik, már nem fogsz válaszolni... Tudtam, hogy nem vagyok elég szép.' },
    he: { name: 'אנה', text: 'כנראה שכבר לא תענה לי... ידעתי שאני לא מספיק יפה.' }
  };

  const invitations = {
    'en-GB': {
      label: 'Personal invitation from Anna',
      title: 'Anna would like to get to know you.',
      text: 'Open her profile and see whether you might be a good match.',
      preview: 'I noticed you and thought I’d say hello 😊',
      cta: 'View Anna’s profile',
      note: 'Discreet access for adults only'
    },
    'en-US': {
      label: 'Personal invitation from Anna',
      title: 'Anna would like to get to know you.',
      text: 'Open her profile and see if the two of you might be a good match.',
      preview: 'You caught my attention, so I thought I’d say hi 😊',
      cta: 'View Anna’s profile',
      note: 'Discreet access for adults only'
    },
    'en-SG': {
      label: 'Personal invitation from Anna',
      title: 'Anna would like to get to know you.',
      text: 'Open her profile and see whether the two of you might click.',
      preview: 'You caught my attention, so I thought I’d say hello 😊',
      cta: 'View Anna’s profile',
      note: 'Discreet access for adults only'
    },
    de: {
      label: 'Persönliche Einladung von Anna',
      title: 'Anna würde dich gern kennenlernen.',
      text: 'Öffne ihr Profil und schau, ob ihr zueinander passen könntet.',
      preview: 'Du bist mir aufgefallen, deshalb wollte ich einfach mal Hallo sagen 😊',
      cta: 'Annas Profil ansehen',
      note: 'Diskreter Zugang nur für Erwachsene'
    },
    nl: {
      label: 'Persoonlijke uitnodiging van Anna',
      title: 'Anna wil je graag leren kennen.',
      text: 'Open haar profiel en kijk of jullie misschien bij elkaar passen.',
      preview: 'Je viel me op, dus ik dacht: ik zeg gewoon even hallo 😊',
      cta: 'Bekijk Anna’s profiel',
      note: 'Discrete toegang, alleen voor volwassenen'
    },
    fr: {
      label: 'Invitation personnelle d’Anna',
      title: 'Anna aimerait faire votre connaissance.',
      text: 'Ouvrez son profil et voyez si vous pourriez bien vous entendre.',
      preview: 'Vous avez attiré mon attention, alors j’ai eu envie de vous dire bonjour 😊',
      cta: 'Voir le profil d’Anna',
      note: 'Accès discret réservé aux adultes'
    },
    it: {
      label: 'Invito personale da Anna',
      title: 'Anna vorrebbe conoscerti.',
      text: 'Apri il suo profilo e scopri se potreste essere compatibili.',
      preview: 'Mi hai incuriosita e ho pensato di salutarti 😊',
      cta: 'Guarda il profilo di Anna',
      note: 'Accesso discreto riservato agli adulti'
    },
    es: {
      label: 'Invitación personal de Anna',
      title: 'A Anna le gustaría conocerte.',
      text: 'Abre su perfil y comprueba si podríais encajar.',
      preview: 'Me llamaste la atención y pensé en saludarte 😊',
      cta: 'Ver el perfil de Anna',
      note: 'Acceso discreto solo para adultos'
    },
    pt: {
      label: 'Convite pessoal da Anna',
      title: 'A Anna gostava de te conhecer.',
      text: 'Abre o perfil dela e vê se poderão combinar.',
      preview: 'Chamaste-me a atenção e pensei em dizer olá 😊',
      cta: 'Ver o perfil da Anna',
      note: 'Acesso discreto apenas para adultos'
    },
    pl: {
      label: 'Osobiste zaproszenie od Anny',
      title: 'Anna chciałaby Cię poznać.',
      text: 'Otwórz jej profil i sprawdź, czy możecie do siebie pasować.',
      preview: 'Zwróciłeś moją uwagę, więc pomyślałam, że się przywitam 😊',
      cta: 'Zobacz profil Anny',
      note: 'Dyskretny dostęp tylko dla dorosłych'
    },
    sv: {
      label: 'Personlig inbjudan från Anna',
      title: 'Anna skulle gärna vilja lära känna dig.',
      text: 'Öppna hennes profil och se om ni kanske passar ihop.',
      preview: 'Du fångade min uppmärksamhet, så jag tänkte säga hej 😊',
      cta: 'Visa Annas profil',
      note: 'Diskret åtkomst endast för vuxna'
    },
    no: {
      label: 'Personlig invitasjon fra Anna',
      title: 'Anna vil gjerne bli kjent med deg.',
      text: 'Åpne profilen hennes og se om dere kanskje passer sammen.',
      preview: 'Du fanget oppmerksomheten min, så jeg tenkte å si hei 😊',
      cta: 'Se Annas profil',
      note: 'Diskré tilgang kun for voksne'
    },
    da: {
      label: 'Personlig invitation fra Anna',
      title: 'Anna vil gerne lære dig at kende.',
      text: 'Åbn hendes profil og se, om I måske passer godt sammen.',
      preview: 'Du fangede min opmærksomhed, så jeg tænkte, jeg ville sige hej 😊',
      cta: 'Se Annas profil',
      note: 'Diskret adgang kun for voksne'
    },
    fi: {
      label: 'Henkilökohtainen kutsu Annalta',
      title: 'Anna haluaisi tutustua sinuun.',
      text: 'Avaa hänen profiilinsa ja katso, voisitteko sopia yhteen.',
      preview: 'Kiinnitin sinuun huomiota, joten ajattelin tulla sanomaan hei 😊',
      cta: 'Katso Annan profiili',
      note: 'Huomaamaton pääsy vain aikuisille'
    },
    el: {
      label: 'Προσωπική πρόσκληση από την Άννα',
      title: 'Η Άννα θα ήθελε να σε γνωρίσει.',
      text: 'Άνοιξε το προφίλ της και δες αν θα μπορούσατε να ταιριάξετε.',
      preview: 'Μου τράβηξες την προσοχή και σκέφτηκα να σου πω ένα γεια 😊',
      cta: 'Δες το προφίλ της Άννας',
      note: 'Διακριτική πρόσβαση μόνο για ενήλικες'
    },
    hr: {
      label: 'Osobni poziv od Anne',
      title: 'Anna bi te voljela upoznati.',
      text: 'Otvori njezin profil i provjeri biste li mogli odgovarati jedno drugome.',
      preview: 'Privukao si mi pažnju pa sam pomislila da ti se javim 😊',
      cta: 'Pogledaj Annin profil',
      note: 'Diskretan pristup samo za odrasle'
    },
    sl: {
      label: 'Osebno povabilo Anne',
      title: 'Anna bi te rada spoznala.',
      text: 'Odpri njen profil in preveri, ali bi se lahko ujela.',
      preview: 'Pritegnil si mojo pozornost, zato sem pomislila, da te pozdravim 😊',
      cta: 'Poglej Annin profil',
      note: 'Diskreten dostop samo za odrasle'
    },
    sk: {
      label: 'Osobná pozvánka od Anny',
      title: 'Anna by ťa rada spoznala.',
      text: 'Otvor jej profil a zisti, či by ste si mohli rozumieť.',
      preview: 'Zaujal si ma, tak som si povedala, že ťa pozdravím 😊',
      cta: 'Pozrieť profil Anny',
      note: 'Diskrétny prístup len pre dospelých'
    },
    cs: {
      label: 'Osobní pozvánka od Anny',
      title: 'Anna by tě ráda poznala.',
      text: 'Otevři její profil a zjisti, jestli byste si mohli rozumět.',
      preview: 'Zaujal jsi mě, tak jsem si řekla, že tě pozdravím 😊',
      cta: 'Zobrazit profil Anny',
      note: 'Diskrétní přístup pouze pro dospělé'
    },
    hu: {
      label: 'Személyes meghívás Annától',
      title: 'Anna szeretne megismerni téged.',
      text: 'Nyisd meg a profilját, és nézd meg, vajon összeillenétek-e.',
      preview: 'Felkeltetted a figyelmemet, ezért gondoltam, rád köszönök 😊',
      cta: 'Anna profiljának megtekintése',
      note: 'Diszkrét hozzáférés csak felnőtteknek'
    },
    he: {
      label: 'הזמנה אישית מאנה',
      title: 'אנה הייתה רוצה להכיר אותך.',
      text: 'פתח את הפרופיל שלה ובדוק אם אולי יש ביניכם התאמה.',
      preview: 'משכת את תשומת הלב שלי, אז חשבתי לומר שלום 😊',
      cta: 'צפה בפרופיל של אנה',
      note: 'גישה דיסקרטית למבוגרים בלבד'
    }
  };

  function applyBranding() {
    if (document.title.includes(OLD_BRAND)) {
      document.title = document.title.replaceAll(OLD_BRAND, BRAND);
    }
  }

  function prepareAnnaMessage() {
    const messageName = document.querySelector('.mini-message strong');
    if (messageName) {
      messageName.removeAttribute('data-profile');
      messageName.dataset.i18n = 'messageName';
    }

    const heroHeading = document.querySelector('.featured-profile .profile-overlay h2');
    if (heroHeading) {
      heroHeading.innerHTML = '<span data-profile="0-name">Anna</span>, 41';
    }

    const firstCardHeading = document.querySelector('.profile-grid .profile-card:first-child h3');
    if (firstCardHeading) {
      firstCardHeading.innerHTML = '<span data-profile="0-name">Anna</span>, 41';
    }

    const heroImage = document.querySelector('.featured-profile img');
    const smallAvatar = document.querySelector('.mini-message .avatar-small img');
    const inviteAvatar = document.querySelector('.invite-avatar img');

    if (heroImage) {
      const syncAvatars = () => {
        [smallAvatar, inviteAvatar].filter(Boolean).forEach((avatar) => {
          avatar.src = heroImage.src;
          avatar.alt = 'Anna';
        });
      };

      syncAvatars();
      new MutationObserver(syncAvatars).observe(heroImage, {
        attributes: true,
        attributeFilter: ['src']
      });
    }
  }

  function applyLocaleOverrides() {
    if (typeof locales === 'undefined') return;

    Object.entries(locales).forEach(([code, dictionary]) => {
      const message = messages[code] || messages['en-GB'];
      const invitation = invitations[code] || invitations['en-GB'];

      dictionary.messageName = message.name;
      dictionary.messagePreview = message.text;
      dictionary.inviteLabel = invitation.label;
      dictionary.inviteTitle = invitation.title;
      dictionary.inviteText = invitation.text;
      dictionary.invitePreview = invitation.preview;
      dictionary.inviteCta = invitation.cta;
      dictionary.inviteNote = invitation.note;
      dictionary.stickyCta = invitation.cta;

      if (typeof dictionary.metaTitle === 'string') {
        dictionary.metaTitle = dictionary.metaTitle.replaceAll(OLD_BRAND, BRAND);
      }

      if (Array.isArray(dictionary.profiles) && dictionary.profiles[0]) {
        dictionary.profiles[0][0] = message.name;
      }
    });

    if (typeof setLocale === 'function') {
      setLocale(typeof currentLocale === 'string' ? currentLocale : 'en-GB');
    }
  }

  prepareAnnaMessage();
  applyLocaleOverrides();
  applyBranding();

  window.addEventListener('load', applyBranding);

  const title = document.querySelector('title');
  if (title) {
    new MutationObserver(applyBranding).observe(title, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }
})();
