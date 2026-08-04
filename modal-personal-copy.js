(() => {
  const localeCopy = {
    'en-GB': { title: 'You’re one final step away from Anna.', text: 'Select your age range to continue to her profile and see whether she is still available.', distance: '7.6 miles from you' },
    'en-US': { title: 'You’re one final step away from Anna.', text: 'Select your age range to continue to her profile and see if she is still available.', distance: '7.6 miles from you' },
    'en-SG': { title: 'You’re one final step away from Anna.', text: 'Select your age range to continue to her profile and see whether she is still available.', distance: '12.3 km from you' },
    de: { title: 'Nur noch ein letzter Schritt bis zu Anna.', text: 'Wähle deine Altersgruppe, um zu ihrem Profil weiterzugehen und zu sehen, ob sie noch verfügbar ist.', distance: '12,3 km von dir entfernt' },
    nl: { title: 'Nog één laatste stap en je bent bij Anna.', text: 'Kies je leeftijdsgroep om door te gaan naar haar profiel en te bekijken of ze nog beschikbaar is.', distance: '12,3 km bij je vandaan' },
    fr: { title: 'Plus qu’une dernière étape avant de retrouver Anna.', text: 'Choisissez votre tranche d’âge pour accéder à son profil et vérifier si elle est toujours disponible.', distance: 'à 12,3 km de chez vous' },
    it: { title: 'Ti manca solo un ultimo passaggio per arrivare ad Anna.', text: 'Scegli la tua fascia d’età per continuare al suo profilo e vedere se è ancora disponibile.', distance: 'a 12,3 km da te' },
    es: { title: 'Solo te queda un último paso para llegar a Anna.', text: 'Elige tu franja de edad para continuar a su perfil y comprobar si todavía está disponible.', distance: 'a 12,3 km de ti' },
    pt: { title: 'Falta apenas um último passo para chegares à Anna.', text: 'Escolhe a tua faixa etária para continuares para o perfil dela e veres se ainda está disponível.', distance: 'a 12,3 km de ti' },
    pl: { title: 'To już ostatni krok, aby przejść do Anny.', text: 'Wybierz swój przedział wiekowy, a za chwilę przejdziesz do jej profilu i sprawdzisz, czy nadal jest dostępna.', distance: '12,3 km od Ciebie' },
    sv: { title: 'Bara ett sista steg återstår innan du kommer till Anna.', text: 'Välj din åldersgrupp för att gå vidare till hennes profil och se om hon fortfarande är tillgänglig.', distance: '12,3 km från dig' },
    no: { title: 'Du er bare ett siste steg unna Anna.', text: 'Velg aldersgruppen din for å gå videre til profilen hennes og se om hun fortsatt er tilgjengelig.', distance: '12,3 km fra deg' },
    da: { title: 'Du er kun ét sidste trin fra Anna.', text: 'Vælg din aldersgruppe for at fortsætte til hendes profil og se, om hun stadig er tilgængelig.', distance: '12,3 km fra dig' },
    fi: { title: 'Olet enää yhden viimeisen vaiheen päässä Annasta.', text: 'Valitse ikäryhmäsi, niin pääset hänen profiiliinsa ja voit tarkistaa, onko hän yhä tavoitettavissa.', distance: '12,3 km päässä sinusta' },
    el: { title: 'Μένει μόνο ένα τελευταίο βήμα για να πας στην Άννα.', text: 'Επίλεξε την ηλικιακή σου ομάδα για να συνεχίσεις στο προφίλ της και να δεις αν είναι ακόμη διαθέσιμη.', distance: '12,3 χλμ. από εσένα' },
    hr: { title: 'Još samo jedan posljednji korak dijeli te od Anne.', text: 'Odaberi svoju dobnu skupinu kako bi nastavio do njezina profila i provjerio je li još dostupna.', distance: '12,3 km od tebe' },
    sl: { title: 'Le še zadnji korak te loči od Anne.', text: 'Izberi svojo starostno skupino, da nadaljuješ do njenega profila in preveriš, ali je še vedno na voljo.', distance: '12,3 km od tebe' },
    sk: { title: 'Od Anny ťa delí už len posledný krok.', text: 'Vyber svoju vekovú skupinu, pokračuj na jej profil a zisti, či je ešte dostupná.', distance: '12,3 km od teba' },
    cs: { title: 'Od Anny tě dělí už jen poslední krok.', text: 'Vyber svou věkovou skupinu, pokračuj na její profil a zjisti, zda je ještě dostupná.', distance: '12,3 km od tebe' },
    hu: { title: 'Már csak egy utolsó lépés választ el Annától.', text: 'Válaszd ki a korcsoportodat, lépj tovább a profiljára, és nézd meg, hogy még elérhető-e.', distance: '12,3 km-re tőled' },
    he: { title: 'נשאר רק צעד אחרון אחד כדי להגיע לאנה.', text: 'בחר את קבוצת הגיל שלך כדי להמשיך לפרופיל שלה ולבדוק אם היא עדיין זמינה.', distance: 'במרחק 12.3 ק״מ ממך' }
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