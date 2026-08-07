(() => {
  const copy = {
    pl: {
      kicker: 'DOPASOWANIE DO ANNY',
      picked: 'wybrany profil',
      q1: 'Czego teraz szukasz?',
      q1sub: 'Wybierz odpowiedź, która jest Ci najbliższa.',
      q1a: ['Luźnej rozmowy', 'Flirtu', 'Czegoś poważniejszego'],
      q2: 'Co najbardziej przyciąga Cię w kobiecie?',
      q2sub: 'Jeszcze jedno krótkie pytanie i sprawdzimy profil Anny.',
      q2a: ['Ciepło i naturalność', 'Pewność siebie', 'Poczucie humoru'],
      analysing: 'Sprawdzamy profil Anny…',
      analysingSub: 'Porównujemy Twoje odpowiedzi z informacjami w jej profilu.',
      checks: ['Profil i opis Anny', 'Twoje odpowiedzi', 'Możliwe punkty wspólne'],
      result: 'Wygląda obiecująco',
      resultSub: 'Twoje odpowiedzi pasują do kilku rzeczy, które Anna zaznacza w swoim profilu. Możesz przejść do ostatniego kroku i jej odpowiedzieć.',
      summary: 'Twoje wybory',
      next: 'Przejdź do ostatniego kroku',
      close: 'Zamknij',
      testToast: 'TEST: tutaj wybór wieku uruchomiłby właściwe przekierowanie.'
    },
    en: {
      kicker: 'MATCH WITH ANNA',
      picked: 'selected profile',
      q1: 'What are you looking for right now?',
      q1sub: 'Choose the answer that feels closest to you.',
      q1a: ['A relaxed conversation', 'A little flirting', 'Something more serious'],
      q2: 'What attracts you most in a woman?',
      q2sub: 'One quick question and we’ll check Anna’s profile.',
      q2a: ['Warmth and authenticity', 'Confidence', 'A sense of humour'],
      analysing: 'Checking Anna’s profile…',
      analysingSub: 'Comparing your answers with the information in her profile.',
      checks: ['Anna’s profile and bio', 'Your answers', 'Possible common ground'],
      result: 'This looks promising',
      resultSub: 'Your answers line up with several things Anna mentions in her profile. You can move to the final step and reply to her.',
      summary: 'Your choices',
      next: 'Go to the final step',
      close: 'Close',
      testToast: 'TEST: the age choice would trigger the correct destination here.'
    }
  };

  const localeKey = () => String(
    document.getElementById('languageSelect')?.value || document.documentElement.lang || 'en'
  ).toLowerCase().startsWith('pl') ? 'pl' : 'en';
  const t = () => copy[localeKey()];

  const css = `
    .rmc-quiz-test-badge{position:fixed;z-index:9998;left:8px;top:8px;padding:6px 9px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(10,10,11,.82);backdrop-filter:blur(12px);color:#aaa;font-size:10px;font-weight:900;letter-spacing:.09em;pointer-events:none}
    .rmc-quiz-overlay{position:fixed;z-index:9999;inset:0;display:grid;place-items:center;padding:12px;background:rgba(0,0,0,.72);backdrop-filter:blur(9px);opacity:0;visibility:hidden;transition:.18s}
    .rmc-quiz-overlay.is-open{opacity:1;visibility:visible}
    .rmc-quiz-card{position:relative;width:min(470px,100%);max-height:calc(100dvh - 24px);overflow:auto;padding:25px 23px 22px;border:1px solid rgba(255,255,255,.12);border-radius:27px;background:radial-gradient(circle at 50% -12%,rgba(229,9,20,.22),transparent 35%),linear-gradient(155deg,#1a1a1d,#09090a 72%);box-shadow:0 34px 110px rgba(0,0,0,.78);text-align:center;color:#fff}
    .rmc-quiz-card:before{content:'';position:absolute;left:24px;right:24px;top:0;height:3px;background:linear-gradient(90deg,transparent,#e50914,#ff6670,#e50914,transparent)}
    .rmc-quiz-close{position:absolute;right:11px;top:11px;width:35px;height:35px;border:1px solid rgba(255,255,255,.1);border-radius:50%;background:rgba(255,255,255,.05);color:#aaa;font-size:22px;cursor:pointer}
    .rmc-quiz-kicker{display:inline-flex;margin-bottom:10px;padding:6px 10px;border:1px solid rgba(229,9,20,.4);border-radius:999px;background:rgba(229,9,20,.1);color:#ff737b;font-size:10px;font-weight:950;letter-spacing:.1em}
    .rmc-quiz-progress{display:flex;justify-content:center;gap:6px;margin:0 auto 15px}.rmc-quiz-progress i{display:block;width:35px;height:4px;border-radius:999px;background:rgba(255,255,255,.1)}.rmc-quiz-progress i.on{background:#e50914;box-shadow:0 0 12px rgba(229,9,20,.25)}
    .rmc-quiz-person{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:15px}.rmc-quiz-avatar{position:relative;width:58px;height:58px}.rmc-quiz-avatar img{width:58px;height:58px;border:2px solid rgba(255,255,255,.86);border-radius:50%;object-fit:cover;object-position:center 22%;box-shadow:0 0 0 5px rgba(229,9,20,.09)}.rmc-quiz-avatar b{position:absolute;right:-1px;bottom:0;display:grid;width:20px;height:20px;place-items:center;border:2px solid #111;border-radius:50%;background:#e50914;color:#fff;font-size:10px}.rmc-quiz-person-copy{text-align:left}.rmc-quiz-person-copy strong{display:block;font-size:15px}.rmc-quiz-person-copy span{display:block;margin-top:2px;color:#8f8f95;font-size:11px;font-weight:750}
    .rmc-quiz-title{max-width:400px;margin:0 auto 8px;font-size:clamp(1.28rem,5vw,1.68rem);line-height:1.14;letter-spacing:-.025em}.rmc-quiz-sub{max-width:380px;margin:0 auto 17px;color:#96969c;font-size:13px;line-height:1.45}
    .rmc-quiz-options{display:grid;gap:9px}.rmc-quiz-option{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:59px;width:100%;padding:12px 15px;border:1px solid rgba(255,255,255,.1);border-radius:15px;background:rgba(255,255,255,.045);color:#fff;font:inherit;font-size:14px;font-weight:850;text-align:left;cursor:pointer}.rmc-quiz-option:hover,.rmc-quiz-option:focus-visible{outline:none;border-color:rgba(229,9,20,.5);background:rgba(229,9,20,.08)}.rmc-quiz-option span:last-child{color:#ff5e68;font-size:18px}
    .rmc-analysis{display:grid;place-items:center;min-height:235px}.rmc-spinner{width:49px;height:49px;margin:0 auto 17px;border:3px solid rgba(255,255,255,.09);border-top-color:#e50914;border-radius:50%;animation:rmcspin .75s linear infinite}@keyframes rmcspin{to{transform:rotate(360deg)}}.rmc-checks{display:grid;gap:7px;width:min(320px,92%);margin:15px auto 0;text-align:left}.rmc-check{display:flex;align-items:center;gap:8px;color:#929298;font-size:12px}.rmc-check b{display:grid;width:18px;height:18px;place-items:center;border-radius:50%;background:rgba(229,9,20,.12);color:#ff6972;font-size:9px}
    .rmc-result-icon{display:grid;width:60px;height:60px;place-items:center;margin:3px auto 15px;border:1px solid rgba(229,9,20,.35);border-radius:50%;background:rgba(229,9,20,.11);color:#ff6871;font-size:25px;font-weight:1000;box-shadow:0 0 0 8px rgba(229,9,20,.045)}.rmc-summary{margin:14px 0 17px;padding:13px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.035);color:#aaaab0;font-size:12px;line-height:1.5}.rmc-final-button{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:57px;border:0;border-radius:15px;background:linear-gradient(180deg,#ef1823,#cf0711);box-shadow:0 10px 30px rgba(229,9,20,.23);color:#fff;font:inherit;font-size:15px;font-weight:950;cursor:pointer}
    .rmc-test-toast{position:fixed;z-index:10001;left:50%;bottom:18px;transform:translate(-50%,15px);width:min(390px,calc(100vw - 24px));padding:12px 14px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(18,18,20,.97);color:#ddd;font-size:12px;font-weight:800;text-align:center;opacity:0;visibility:hidden;transition:.2s}.rmc-test-toast.on{opacity:1;visibility:visible;transform:translate(-50%,0)}
    @media(max-width:640px){.rmc-quiz-overlay{padding:7px}.rmc-quiz-card{width:100%;max-height:calc(100dvh - 14px);padding:22px 13px 16px;border-radius:22px}.rmc-quiz-kicker{font-size:9px}.rmc-quiz-progress{margin-bottom:12px}.rmc-quiz-person{margin-bottom:12px}.rmc-quiz-avatar,.rmc-quiz-avatar img{width:52px;height:52px}.rmc-quiz-title{font-size:1.2rem}.rmc-quiz-sub{font-size:12px;margin-bottom:14px}.rmc-quiz-option{min-height:54px;padding:10px 13px;font-size:13px;border-radius:14px}.rmc-analysis{min-height:215px}.rmc-final-button{min-height:54px}}
    @media(max-height:650px) and (max-width:640px){.rmc-quiz-card{padding-top:18px}.rmc-quiz-person{margin-bottom:8px}.rmc-quiz-avatar,.rmc-quiz-avatar img{width:46px;height:46px}.rmc-quiz-title{font-size:1.08rem}.rmc-quiz-sub{margin-bottom:10px}.rmc-quiz-option{min-height:49px}.rmc-analysis{min-height:180px}}
  `;

  const style = document.createElement('style');
  style.id = 'rmc-quiz-test-style';
  style.textContent = css;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.innerHTML = `
    <div class="rmc-quiz-test-badge">TEST · QUIZ FLOW</div>
    <div class="rmc-quiz-overlay" id="rmcQuizOverlay" aria-hidden="true">
      <section class="rmc-quiz-card" role="dialog" aria-modal="true">
        <button class="rmc-quiz-close" type="button">×</button>
        <div class="rmc-quiz-kicker"></div>
        <div class="rmc-quiz-progress"><i class="on"></i><i></i><i></i></div>
        <div class="rmc-quiz-person">
          <span class="rmc-quiz-avatar"><img alt="Anna"><b>✓</b></span>
          <span class="rmc-quiz-person-copy"><strong>Anna, 41</strong><span></span></span>
        </div>
        <div class="rmc-quiz-body"></div>
      </section>
    </div>
    <div class="rmc-test-toast"></div>`;
  [...root.children].forEach((node) => document.body.appendChild(node));

  const overlay = document.getElementById('rmcQuizOverlay');
  const body = overlay.querySelector('.rmc-quiz-body');
  const progress = [...overlay.querySelectorAll('.rmc-quiz-progress i')];
  const personName = overlay.querySelector('.rmc-quiz-person-copy strong');
  const personLabel = overlay.querySelector('.rmc-quiz-person-copy span');
  const avatar = overlay.querySelector('.rmc-quiz-avatar img');
  const kicker = overlay.querySelector('.rmc-quiz-kicker');
  const closeBtn = overlay.querySelector('.rmc-quiz-close');
  const toast = document.querySelector('.rmc-test-toast');
  let picks = [];
  let bypass = false;

  const syncPerson = () => {
    const h = document.querySelector('.hero-invite .featured-profile h2')?.textContent?.trim() || 'Anna, 41';
    personName.textContent = h;
    personLabel.textContent = t().picked;
    const img = document.querySelector('.hero-invite .featured-profile > img');
    avatar.src = img?.currentSrc || img?.src || '';
    avatar.alt = h.split(',')[0]?.trim() || 'Anna';
    kicker.textContent = t().kicker;
    closeBtn.setAttribute('aria-label', t().close);
  };

  const setStep = (step) => progress.forEach((node, i) => node.classList.toggle('on', i < step));
  const optionMarkup = (label, index) => `<button class="rmc-quiz-option" type="button" data-index="${index}"><span>${label}</span><span aria-hidden="true">→</span></button>`;

  const question = (step) => {
    const x = t();
    setStep(step);
    const title = step === 1 ? x.q1 : x.q2;
    const sub = step === 1 ? x.q1sub : x.q2sub;
    const opts = step === 1 ? x.q1a : x.q2a;
    body.innerHTML = `<h2 class="rmc-quiz-title">${title}</h2><p class="rmc-quiz-sub">${sub}</p><div class="rmc-quiz-options">${opts.map(optionMarkup).join('')}</div>`;
    body.querySelectorAll('.rmc-quiz-option').forEach((btn) => btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index) || 0;
      picks[step - 1] = opts[index];
      if (step === 1) window.setTimeout(() => question(2), 100);
      else window.setTimeout(analyse, 100);
    }));
  };

  const analyse = () => {
    const x = t();
    setStep(3);
    body.innerHTML = `<div class="rmc-analysis"><div><div class="rmc-spinner"></div><h2 class="rmc-quiz-title">${x.analysing}</h2><p class="rmc-quiz-sub">${x.analysingSub}</p><div class="rmc-checks">${x.checks.map((v) => `<div class="rmc-check"><b>✓</b><span>${v}</span></div>`).join('')}</div></div></div>`;
    window.setTimeout(result, 1250);
  };

  const result = () => {
    const x = t();
    body.innerHTML = `<div class="rmc-result-icon">✓</div><h2 class="rmc-quiz-title">${x.result}</h2><p class="rmc-quiz-sub">${x.resultSub}</p><div class="rmc-summary"><strong>${x.summary}:</strong><br>${picks.filter(Boolean).join(' · ')}</div><button class="rmc-final-button" type="button">${x.next} <span aria-hidden="true">→</span></button>`;
    body.querySelector('.rmc-final-button').addEventListener('click', openAgeStep);
  };

  const openQuiz = () => {
    syncPerson();
    picks = [];
    question(1);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
  };
  const closeQuiz = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  };

  const openAgeStep = () => {
    closeQuiz();
    const modal = document.getElementById('ageGateModal');
    if (modal) {
      try { if (!modal.open) modal.showModal(); } catch (_) { modal.setAttribute('open', ''); }
      return;
    }
    const cta = document.querySelector('.hero-invite .phone-cta, .hero-invite .js-affiliate');
    if (!cta) return;
    bypass = true;
    cta.click();
    window.setTimeout(() => { bypass = false; }, 0);
  };

  const showToast = () => {
    toast.textContent = t().testToast;
    toast.classList.add('on');
    window.setTimeout(() => toast.classList.remove('on'), 2400);
  };

  closeBtn.addEventListener('click', closeQuiz);
  overlay.addEventListener('click', (event) => { if (event.target === overlay) closeQuiz(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeQuiz(); });

  document.addEventListener('click', (event) => {
    if (bypass) return;
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const age = target.closest('#ageGateModal .age-option');
    if (age) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      showToast();
      return;
    }

    const trigger = target.closest('.hero-invite .phone-cta, .hero-invite .heart-button.js-affiliate, .hero-invite .hero-actions .js-affiliate, .profile-preview-cta');
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openQuiz();
  }, true);

  document.getElementById('languageSelect')?.addEventListener('change', () => window.setTimeout(syncPerson, 30));
  window.setTimeout(syncPerson, 0);
  window.setTimeout(syncPerson, 500);
})();