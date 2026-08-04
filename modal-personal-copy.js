(() => {
  const modalCopy = {
    'en-GB': {
      title: 'You’re one final step away from Anna.',
      text: 'Select your age range to continue to her profile and see whether she is still available.'
    },
    'en-US': {
      title: 'You’re one final step away from Anna.',
      text: 'Select your age range to continue to her profile and see if she is still available.'
    },
    'en-SG': {
      title: 'You’re one final step away from Anna.',
      text: 'Select your age range to continue to her profile and see whether she is still available.'
    },
    de: {
      title: 'Nur noch ein letzter Schritt bis zu Anna.',
      text: 'Wähle deine Altersgruppe, um zu ihrem Profil weiterzugehen und zu sehen, ob sie noch verfügbar ist.'
    },
    nl: {
      title: 'Nog één laatste stap en je bent bij Anna.',
      text: 'Kies je leeftijdsgroep om door te gaan naar haar profiel en te bekijken of ze nog beschikbaar is.'
    },
    fr: {
      title: 'Plus qu’une dernière étape avant de retrouver Anna.',
      text: 'Choisissez votre tranche d’âge pour accéder à son profil et vérifier si elle est toujours disponible.'
    },
    it: {
      title: 'Ti manca solo un ultimo passaggio per arrivare ad Anna.',
      text: 'Scegli la tua fascia d’età per continuare al suo profilo e vedere se è ancora disponibile.'
    },
    es: {
      title: 'Solo te queda un último paso para llegar a Anna.',
      text: 'Elige tu franja de edad para continuar a su perfil y comprobar si todavía está disponible.'
    },
    pt: {
      title: 'Falta apenas um último passo para chegares à Anna.',
      text: 'Escolhe a tua faixa etária para continuares para o perfil dela e veres se ainda está disponível.'
    },
    pl: {
      title: 'To już ostatni krok, aby przejść do Anny.',
      text: 'Wybierz swój przedział wiekowy, a za chwilę przejdziesz do jej profilu i sprawdzisz, czy nadal jest dostępna.'
    },
    sv: {
      title: 'Bara ett sista steg återstår innan du kommer till Anna.',
      text: 'Välj din åldersgrupp för att gå vidare till hennes profil och se om hon fortfarande är tillgänglig.'
    },
    no: {
      title: 'Du er bare ett siste steg unna Anna.',
      text: 'Velg aldersgruppen din for å gå videre til profilen hennes og se om hun fortsatt er tilgjengelig.'
    },
    da: {
      title: 'Du er kun ét sidste trin fra Anna.',
      text: 'Vælg din aldersgruppe for at fortsætte til hendes profil og se, om hun stadig er tilgængelig.'
    },
    fi: {
      title: 'Olet enää yhden viimeisen vaiheen päässä Annasta.',
      text: 'Valitse ikäryhmäsi, niin pääset hänen profiiliinsa ja voit tarkistaa, onko hän yhä tavoitettavissa.'
    },
    el: {
      title: 'Μένει μόνο ένα τελευταίο βήμα για να πας στην Άννα.',
      text: 'Επίλεξε την ηλικιακή σου ομάδα για να συνεχίσεις στο προφίλ της και να δεις αν είναι ακόμη διαθέσιμη.'
    },
    hr: {
      title: 'Još samo jedan posljednji korak dijeli te od Anne.',
      text: 'Odaberi svoju dobnu skupinu kako bi nastavio do njezina profila i provjerio je li još dostupna.'
    },
    sl: {
      title: 'Le še zadnji korak te loči od Anne.',
      text: 'Izberi svojo starostno skupino, da nadaljuješ do njenega profila in preveriš, ali je še vedno na voljo.'
    },
    sk: {
      title: 'Od Anny ťa delí už len posledný krok.',
      text: 'Vyber svoju vekovú skupinu, pokračuj na jej profil a zisti, či je ešte dostupná.'
    },
    cs: {
      title: 'Od Anny tě dělí už jen poslední krok.',
      text: 'Vyber svou věkovou skupinu, pokračuj na její profil a zjisti, zda je ještě dostupná.'
    },
    hu: {
      title: 'Már csak egy utolsó lépés választ el Annától.',
      text: 'Válaszd ki a korcsoportodat, lépj tovább a profiljára, és nézd meg, hogy még elérhető-e.'
    },
    he: {
      title: 'נשאר רק צעד אחרון אחד כדי להגיע לאנה.',
      text: 'בחר את קבוצת הגיל שלך כדי להמשיך לפרופיל שלה ולבדוק אם היא עדיין זמינה.'
    }
  };

  const normaliseLocale = (value = '') => {
    if (modalCopy[value]) return value;
    const raw = String(value).toLowerCase();
    if (raw.startsWith('en-us')) return 'en-US';
    if (raw.startsWith('en-sg')) return 'en-SG';
    if (raw.startsWith('en')) return 'en-GB';
    const short = raw.split('-')[0];
    return modalCopy[short] ? short : 'en-GB';
  };

  const getLocale = () => normaliseLocale(
    document.getElementById('languageSelect')?.value ||
    document.documentElement.lang ||
    navigator.language
  );

  const applyPersonalCopy = () => {
    const modal = document.getElementById('ageGateModal');
    if (!modal) return;
    const text = modalCopy[getLocale()] || modalCopy['en-GB'];
    const title = modal.querySelector('.age-gate-title');
    const description = modal.querySelector('.age-gate-text');
    if (title) title.textContent = text.title;
    if (description) description.textContent = text.text;
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
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
