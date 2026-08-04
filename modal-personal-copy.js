(() => {
  const localeCopy = {
    'en-GB': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', distance: '7.6 miles from you', accountCta: 'Create account' },
    'en-US': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', distance: '7.6 miles from you', accountCta: 'Create account' },
    'en-SG': { title: 'You’re very close.', text: 'Choose your age range. Next, you’ll complete a quick sign-up and continue to a conversation with Anna.', distance: '12.3 km from you', accountCta: 'Create account' },
    de: { title: 'Du bist ganz nah dran.', text: 'Wähle deine Altersgruppe. Im nächsten Schritt meldest du dich kurz an und kannst anschließend mit Anna chatten.', distance: '12,3 km von dir entfernt', accountCta: 'Konto erstellen' },
    nl: { title: 'Je bent er bijna.', text: 'Kies je leeftijdsgroep. Daarna maak je snel een account aan en kun je verder naar het gesprek met Anna.', distance: '12,3 km bij je vandaan', accountCta: 'Account aanmaken' },
    fr: { title: 'Vous y êtes presque.', text: 'Choisissez votre tranche d’âge. Vous passerez ensuite par une inscription rapide avant de poursuivre la conversation avec Anna.', distance: 'à 12,3 km de chez vous', accountCta: 'Créer un compte' },
    it: { title: 'Ci sei quasi.', text: 'Scegli la tua fascia d’età. Nel passaggio successivo completerai una registrazione rapida e potrai continuare la conversazione con Anna.', distance: 'a 12,3 km da te', accountCta: 'Crea un account' },
    es: { title: 'Ya estás muy cerca.', text: 'Elige tu franja de edad. En el siguiente paso completarás un registro rápido y podrás continuar la conversación con Anna.', distance: 'a 12,3 km de ti', accountCta: 'Crear una cuenta' },
    pt: { title: 'Estás quase lá.', text: 'Escolhe a tua faixa etária. No passo seguinte farás um registo rápido e poderás continuar a conversa com a Anna.', distance: 'a 12,3 km de ti', accountCta: 'Criar conta' },
    pl: { title: 'Jesteś bardzo blisko.', text: 'Wybierz swój przedział wiekowy, a w następnym kroku przejdziesz do szybkiej rejestracji i rozmowy z Anną.', distance: '12,3 km od Ciebie', accountCta: 'Załóż konto', message: 'Unikasz mnie? Czekam od rana na odpowiedź...' },
    sv: { title: 'Du är nästan framme.', text: 'Välj din åldersgrupp. Därefter gör du en snabb registrering och kan fortsätta till samtalet med Anna.', distance: '12,3 km från dig', accountCta: 'Skapa konto' },
    no: { title: 'Du er nesten fremme.', text: 'Velg aldersgruppen din. Deretter fullfører du en rask registrering og kan fortsette til samtalen med Anna.', distance: '12,3 km fra deg', accountCta: 'Opprett konto' },
    da: { title: 'Du er næsten fremme.', text: 'Vælg din aldersgruppe. Derefter gennemfører du en hurtig oprettelse og kan fortsætte til samtalen med Anna.', distance: '12,3 km fra dig', accountCta: 'Opret konto' },
    fi: { title: 'Olet aivan lähellä.', text: 'Valitse ikäryhmäsi. Seuraavaksi teet nopean rekisteröitymisen ja voit jatkaa keskusteluun Annan kanssa.', distance: '12,3 km päässä sinusta', accountCta: 'Luo tili' },
    el: { title: 'Είσαι πολύ κοντά.', text: 'Επίλεξε την ηλικιακή σου ομάδα. Στο επόμενο βήμα θα κάνεις μια γρήγορη εγγραφή και θα συνεχίσεις στη συζήτηση με την Άννα.', distance: '12,3 χλμ. από εσένα', accountCta: 'Δημιούργησε λογαριασμό' },
    hr: { title: 'Još si samo korak do cilja.', text: 'Odaberi svoju dobnu skupinu. U sljedećem koraku brzo ćeš otvoriti račun i nastaviti razgovor s Annom.', distance: '12,3 km od tebe', accountCta: 'Otvori račun' },
    sl: { title: 'Skoraj si že tam.', text: 'Izberi svojo starostno skupino. V naslednjem koraku se hitro registriraš in nadaljuješ pogovor z Anno.', distance: '12,3 km od tebe', accountCta: 'Ustvari račun' },
    sk: { title: 'Si už veľmi blízko.', text: 'Vyber svoju vekovú skupinu. V ďalšom kroku sa rýchlo zaregistruješ a budeš môcť pokračovať v rozhovore s Annou.', distance: '12,3 km od teba', accountCta: 'Vytvoriť účet' },
    cs: { title: 'Jsi už velmi blízko.', text: 'Vyber svou věkovou skupinu. V dalším kroku se rychle zaregistruješ a budeš moci pokračovat v rozhovoru s Annou.', distance: '12,3 km od tebe', accountCta: 'Vytvořit účet' },
    hu: { title: 'Már nagyon közel vagy.', text: 'Válaszd ki a korcsoportodat. A következő lépésben gyorsan regisztrálsz, majd folytathatod a beszélgetést Annával.', distance: '12,3 km-re tőled', accountCta: 'Fiók létrehozása' },
    he: { title: 'אתה ממש קרוב.', text: 'בחר את קבוצת הגיל שלך. בשלב הבא תבצע הרשמה מהירה ותוכל להמשיך לשיחה עם אנה.', distance: 'במרחק 12.3 ק״מ ממך', accountCta: 'פתיחת חשבון' }
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

    if (current.message) {
      const messageCopy = document.querySelector('.mini-message [data-i18n="messagePreview"], .mini-message p span');
      if (messageCopy) {
        messageCopy.removeAttribute('data-i18n');
        setText(messageCopy, current.message);
      }
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
