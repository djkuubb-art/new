(() => {
  const BRAND = 'RealMeetClub';
  const OLD_BRAND = 'HeartMatch';

  const messages = {
    'en-GB': {
      name: 'Anna',
      text: 'I guess you’re not going to reply to me... I knew I wasn’t pretty enough.'
    },
    'en-US': {
      name: 'Anna',
      text: 'I guess you’re not going to reply to me... I knew I wasn’t pretty enough.'
    },
    'en-SG': {
      name: 'Anna',
      text: 'I guess you’re not going to reply to me... I knew I wasn’t pretty enough.'
    },
    de: {
      name: 'Anna',
      text: 'Du wirst mir wohl nicht mehr antworten... Ich wusste, dass ich nicht hübsch genug bin.'
    },
    nl: {
      name: 'Anna',
      text: 'Je gaat me zeker niet meer antwoorden... Ik wist wel dat ik niet mooi genoeg ben.'
    },
    fr: {
      name: 'Anna',
      text: 'J’imagine que tu ne vas plus me répondre... Je savais bien que je n’étais pas assez jolie.'
    },
    it: {
      name: 'Anna',
      text: 'Immagino che non mi risponderai più... Lo sapevo che non ero abbastanza carina.'
    },
    es: {
      name: 'Anna',
      text: 'Supongo que ya no vas a responderme... Sabía que no era lo bastante guapa.'
    },
    pt: {
      name: 'Anna',
      text: 'Acho que já não me vais responder... Eu sabia que não era bonita o suficiente.'
    },
    pl: {
      name: 'Anna',
      text: 'Chyba już mi nie odpiszesz... Wiedziałam, że jestem za brzydka.'
    },
    sv: {
      name: 'Anna',
      text: 'Du kommer nog inte att svara mig mer... Jag visste att jag inte var tillräckligt fin.'
    },
    no: {
      name: 'Anna',
      text: 'Du kommer vel ikke til å svare meg mer... Jeg visste at jeg ikke var pen nok.'
    },
    da: {
      name: 'Anna',
      text: 'Du svarer mig nok ikke mere... Jeg vidste, at jeg ikke var pæn nok.'
    },
    fi: {
      name: 'Anna',
      text: 'Et taida enää vastata minulle... Tiesin, etten ollut tarpeeksi kaunis.'
    },
    el: {
      name: 'Anna',
      text: 'Μάλλον δεν θα μου απαντήσεις πια... Το ήξερα ότι δεν ήμουν αρκετά όμορφη.'
    },
    hr: {
      name: 'Anna',
      text: 'Izgleda da mi više nećeš odgovoriti... Znala sam da nisam dovoljno lijepa.'
    },
    sl: {
      name: 'Anna',
      text: 'Verjetno mi ne boš več odpisal... Vedela sem, da nisem dovolj lepa.'
    },
    sk: {
      name: 'Anna',
      text: 'Asi mi už neodpíšeš... Vedela som, že nie som dosť pekná.'
    },
    cs: {
      name: 'Anna',
      text: 'Asi už mi neodpovíš... Věděla jsem, že nejsem dost hezká.'
    },
    hu: {
      name: 'Anna',
      text: 'Úgy tűnik, már nem fogsz válaszolni... Tudtam, hogy nem vagyok elég szép.'
    },
    he: {
      name: 'Anna',
      text: 'כנראה שכבר לא תענה לי... ידעתי שאני לא מספיק יפה.'
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
    if (heroImage && smallAvatar) {
      const syncAvatar = () => {
        smallAvatar.src = heroImage.src;
        smallAvatar.alt = 'Anna';
      };
      syncAvatar();
      new MutationObserver(syncAvatar).observe(heroImage, {
        attributes: true,
        attributeFilter: ['src']
      });
    }
  }

  function applyLocaleOverrides() {
    if (typeof locales === 'undefined') return;

    Object.entries(locales).forEach(([code, dictionary]) => {
      const message = messages[code] || messages['en-GB'];
      dictionary.messageName = message.name;
      dictionary.messagePreview = message.text;

      if (Array.isArray(dictionary.profiles) && dictionary.profiles[0]) {
        dictionary.profiles[0][0] = 'Anna';
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
