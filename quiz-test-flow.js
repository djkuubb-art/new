(() => {
  const fallback = {
    kicker: 'MATCH WITH ANNA', picked: 'selected profile',
    q1: 'What are you looking for right now?', q1sub: 'Choose the answer that feels closest to you.',
    q1a: ['A relaxed conversation', 'A little flirting', 'Something more serious'],
    q2: 'What attracts you most in a woman?', q2sub: 'One quick question and we’ll check Anna’s profile.',
    q2a: ['Warmth and authenticity', 'Confidence', 'A sense of humour'],
    analysing: 'Checking Anna’s profile…', analysingSub: 'Comparing your answers with the information in her profile.',
    checks: ['Anna’s profile and bio', 'Your answers', 'Possible common ground'],
    result: 'This looks promising',
    resultSub: 'Your answers line up with several things Anna mentions in her profile. You can move to the final step and reply to her.',
    summary: 'Your choices', next: 'Go to the final step', close: 'Close'
  };

  let copy = null;
  let copyPromise = null;
  let picks = [];
  let pendingTrigger = null;
  let bypassTrigger = null;
  let currentStep = 1;

  const normalizeLocale = (value = '') => {
    const raw = String(value).replace('_', '-');
    const lower = raw.toLowerCase();
    if (lower.startsWith('en-us')) return 'en-US';
    if (lower.startsWith('en-sg')) return 'en-SG';
    if (lower.startsWith('en')) return 'en-GB';
    return lower.split('-')[0] || 'en-GB';
  };

  const locale = () => normalizeLocale(
    document.getElementById('languageSelect')?.value || document.documentElement.lang || navigator.language
  );

  const loadCopy = () => {
    if (copy) return Promise.resolve(copy);
    if (!copyPromise) {
      copyPromise = fetch('/quiz-copy.json', { cache: 'force-cache' })
        .then((response) => response.ok ? response.json() : Promise.reject(new Error('quiz copy unavailable')))
        .then((data) => (copy = data))
        .catch(() => (copy = { 'en-GB': fallback }));
    }
    return copyPromise;
  };

  const t = () => copy?.[locale()] || copy?.['en-GB'] || fallback;

  const style = document.createElement('style');
  style.id = 'rmc-quiz-funnel-style';
  style.textContent = `
    html.rmc-quiz-open,html.rmc-quiz-open body{overflow:hidden!important}
    .rmc-quiz-overlay{position:fixed;z-index:9999;inset:0;display:grid;place-items:center;padding:12px;background:rgba(0,0,0,.72);backdrop-filter:blur(9px);opacity:0;visibility:hidden;transition:opacity .18s ease,visibility .18s ease}
    .rmc-quiz-overlay.is-open{opacity:1;visibility:visible}
    .rmc-quiz-card{position:relative;width:min(470px,100%);max-height:calc(100dvh - 24px);overflow:auto;overscroll-behavior:contain;padding:25px 23px 22px;border:1px solid rgba(255,255,255,.12);border-radius:27px;background:radial-gradient(circle at 50% -12%,rgba(229,9,20,.22),transparent 35%),linear-gradient(155deg,#1a1a1d,#09090a 72%);box-shadow:0 34px 110px rgba(0,0,0,.78);text-align:center;color:#fff}
    .rmc-quiz-card:before{content:'';position:absolute;left:24px;right:24px;top:0;height:3px;border-radius:0 0 4px 4px;background:linear-gradient(90deg,transparent,#e50914,#ff6670,#e50914,transparent)}
    .rmc-quiz-close{position:absolute;right:11px;top:11px;width:35px;height:35px;border:1px solid rgba(255,255,255,.1);border-radius:50%;background:rgba(255,255,255,.05);color:#aaa;font-size:22px;line-height:1;cursor:pointer}
    [dir="rtl"] .rmc-quiz-close{right:auto;left:11px}
    .rmc-quiz-kicker{display:inline-flex;margin-bottom:10px;padding:6px 10px;border:1px solid rgba(229,9,20,.4);border-radius:999px;background:rgba(229,9,20,.1);color:#ff737b;font-size:10px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}
    .rmc-quiz-progress{display:flex;justify-content:center;gap:6px;margin:0 auto 15px}.rmc-quiz-progress i{display:block;width:35px;height:4px;border-radius:999px;background:rgba(255,255,255,.1)}.rmc-quiz-progress i.on{background:#e50914;box-shadow:0 0 12px rgba(229,9,20,.25)}
    .rmc-quiz-person{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:15px}.rmc-quiz-avatar{position:relative;width:58px;height:58px;flex:0 0 auto}.rmc-quiz-avatar img{display:block;width:58px;height:58px;border:2px solid rgba(255,255,255,.86);border-radius:50%;object-fit:cover;object-position:center 22%;box-shadow:0 0 0 5px rgba(229,9,20,.09)}.rmc-quiz-avatar b{position:absolute;right:-1px;bottom:0;display:grid;width:20px;height:20px;place-items:center;border:2px solid #111;border-radius:50%;background:#e50914;color:#fff;font-size:10px}[dir="rtl"] .rmc-quiz-avatar b{right:auto;left:-1px}
    .rmc-quiz-person-copy{text-align:left}[dir="rtl"] .rmc-quiz-person-copy{text-align:right}.rmc-quiz-person-copy strong{display:block;font-size:15px}.rmc-quiz-person-copy span{display:block;margin-top:2px;color:#8f8f95;font-size:11px;font-weight:750}
    .rmc-quiz-title{max-width:400px;margin:0 auto 8px;font-size:clamp(1.28rem,5vw,1.68rem);line-height:1.14;letter-spacing:-.025em}.rmc-quiz-sub{max-width:380px;margin:0 auto 17px;color:#96969c;font-size:13px;line-height:1.45}
    .rmc-quiz-options{display:grid;gap:9px}.rmc-quiz-option{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:59px;width:100%;padding:12px 15px;border:1px solid rgba(255,255,255,.1);border-radius:15px;background:rgba(255,255,255,.045);color:#fff;font:inherit;font-size:14px;font-weight:850;text-align:left;cursor:pointer;transition:transform .12s ease,border-color .12s ease,background .12s ease}.rmc-quiz-option:hover,.rmc-quiz-option:focus-visible{outline:none;border-color:rgba(229,9,20,.5);background:rgba(229,9,20,.08)}.rmc-quiz-option:active{transform:scale(.985)}.rmc-quiz-option .rmc-arrow{color:#ff5e68;font-size:18px}[dir="rtl"] .rmc-quiz-option{text-align:right}[dir="rtl"] .rmc-arrow{transform:scaleX(-1)}
    .rmc-analysis{display:grid;place-items:center;min-height:235px}.rmc-spinner{width:49px;height:49px;margin:0 auto 17px;border:3px solid rgba(255,255,255,.09);border-top-color:#e50914;border-radius:50%;animation:rmcspin .75s linear infinite}@keyframes rmcspin{to{transform:rotate(360deg)}}.rmc-checks{display:grid;gap:7px;width:min(320px,92%);margin:15px auto 0;text-align:left}[dir="rtl"] .rmc-checks{text-align:right}.rmc-check{display:flex;align-items:center;gap:8px;color:#929298;font-size:12px}.rmc-check b{display:grid;width:18px;height:18px;place-items:center;flex:0 0 auto;border-radius:50%;background:rgba(229,9,20,.12);color:#ff6972;font-size:9px}
    .rmc-result-icon{display:grid;width:60px;height:60px;place-items:center;margin:3px auto 15px;border:1px solid rgba(229,9,20,.35);border-radius:50%;background:rgba(229,9,20,.11);color:#ff6871;font-size:25px;font-weight:1000;box-shadow:0 0 0 8px rgba(229,9,20,.045)}.rmc-summary{margin:14px 0 17px;padding:13px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.035);color:#aaaab0;font-size:12px;line-height:1.5}.rmc-final-button{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:57px;border:0;border-radius:15px;background:linear-gradient(180deg,#ef1823,#cf0711);box-shadow:0 10px 30px rgba(229,9,20,.23);color:#fff;font:inherit;font-size:15px;font-weight:950;cursor:pointer}.rmc-final-button:active{transform:translateY(1px)}
    @media(max-width:640px){.rmc-quiz-overlay{padding:7px;padding-top:max(7px,env(safe-area-inset-top));padding-bottom:max(7px,env(safe-area-inset-bottom))}.rmc-quiz-card{width:100%;max-height:calc(100dvh - 14px);padding:22px 13px 16px;border-radius:22px}.rmc-quiz-card:before{left:20px;right:20px}.rmc-quiz-kicker{font-size:9px}.rmc-quiz-progress{margin-bottom:12px}.rmc-quiz-person{margin-bottom:12px}.rmc-quiz-avatar,.rmc-quiz-avatar img{width:52px;height:52px}.rmc-quiz-title{font-size:1.2rem}.rmc-quiz-sub{font-size:12px;margin-bottom:14px}.rmc-quiz-option{min-height:54px;padding:10px 13px;font-size:13px;border-radius:14px}.rmc-analysis{min-height:215px}.rmc-final-button{min-height:54px}}
    @media(max-height:650px) and (max-width:640px){.rmc-quiz-card{padding-top:18px}.rmc-quiz-progress{margin-bottom:9px}.rmc-quiz-person{margin-bottom:8px}.rmc-quiz-avatar,.rmc-quiz-avatar img{width:46px;height:46px}.rmc-quiz-title{font-size:1.08rem}.rmc-quiz-sub{margin-bottom:10px}.rmc-quiz-option{min-height:49px}.rmc-analysis{min-height:180px}}
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.innerHTML = `<div class="rmc-quiz-overlay" id="rmcQuizOverlay" aria-hidden="true"><section class="rmc-quiz-card" role="dialog" aria-modal="true" aria-labelledby="rmcQuizTitle"><button class="rmc-quiz-close" type="button">×</button><div class="rmc-quiz-kicker"></div><div class="rmc-quiz-progress" aria-hidden="true"><i class="on"></i><i></i><i></i></div><div class="rmc-quiz-person"><span class="rmc-quiz-avatar"><img alt="Anna"><b>✓</b></span><span class="rmc-quiz-person-copy"><strong>Anna, 41</strong><span></span></span></div><div class="rmc-quiz-body"></div></section></div>`;
  document.body.appendChild(root.firstElementChild);

  const overlay = document.getElementById('rmcQuizOverlay');
  const body = overlay.querySelector('.rmc-quiz-body');
  const progress = [...overlay.querySelectorAll('.rmc-quiz-progress i')];
  const personName = overlay.querySelector('.rmc-quiz-person-copy strong');
  const personLabel = overlay.querySelector('.rmc-quiz-person-copy span');
  const avatar = overlay.querySelector('.rmc-quiz-avatar img');
  const kicker = overlay.querySelector('.rmc-quiz-kicker');
  const closeBtn = overlay.querySelector('.rmc-quiz-close');

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

  const setStep = (step) => progress.forEach((node, index) => node.classList.toggle('on', index < step));
  const optionMarkup = (label, index) => `<button class="rmc-quiz-option" type="button" data-index="${index}"><span>${label}</span><span class="rmc-arrow" aria-hidden="true">→</span></button>`;

  const renderQuestion = (step) => {
    currentStep = step;
    syncPerson();
    setStep(step);
    const x = t();
    const title = step === 1 ? x.q1 : x.q2;
    const sub = step === 1 ? x.q1sub : x.q2sub;
    const options = step === 1 ? x.q1a : x.q2a;
    body.innerHTML = `<h2 class="rmc-quiz-title" id="rmcQuizTitle">${title}</h2><p class="rmc-quiz-sub">${sub}</p><div class="rmc-quiz-options">${options.map(optionMarkup).join('')}</div>`;
    const buttons = [...body.querySelectorAll('.rmc-quiz-option')];
    buttons.forEach((button) => button.addEventListener('click', () => {
      const index = Number(button.dataset.index) || 0;
      picks[step - 1] = options[index];
      if (step === 1) window.setTimeout(() => renderQuestion(2), 100);
      else window.setTimeout(renderAnalysis, 100);
    }));
    window.setTimeout(() => buttons[0]?.focus({ preventScroll: true }), 30);
  };

  const renderAnalysis = () => {
    currentStep = 3;
    syncPerson();
    setStep(3);
    const x = t();
    body.innerHTML = `<div class="rmc-analysis"><div><div class="rmc-spinner"></div><h2 class="rmc-quiz-title" id="rmcQuizTitle">${x.analysing}</h2><p class="rmc-quiz-sub">${x.analysingSub}</p><div class="rmc-checks">${x.checks.map((item) => `<div class="rmc-check"><b>✓</b><span>${item}</span></div>`).join('')}</div></div></div>`;
    window.setTimeout(renderResult, 1250);
  };

  const closeQuiz = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('rmc-quiz-open');
  };

  const continueToAgeGate = () => {
    const trigger = pendingTrigger || document.querySelector('.hero-invite .phone-cta');
    closeQuiz();
    if (trigger) {
      bypassTrigger = trigger;
      window.setTimeout(() => trigger.click(), 40);
      return;
    }
    const modal = document.getElementById('ageGateModal');
    if (modal && !modal.open && typeof modal.showModal === 'function') modal.showModal();
  };

  const renderResult = () => {
    currentStep = 4;
    syncPerson();
    const x = t();
    body.innerHTML = `<div class="rmc-result-icon">✓</div><h2 class="rmc-quiz-title" id="rmcQuizTitle">${x.result}</h2><p class="rmc-quiz-sub">${x.resultSub}</p><div class="rmc-summary"><strong>${x.summary}:</strong><br>${picks.filter(Boolean).join(' · ')}</div><button class="rmc-final-button" type="button"><span>${x.next}</span><span class="rmc-arrow" aria-hidden="true">→</span></button>`;
    const next = body.querySelector('.rmc-final-button');
    next.addEventListener('click', continueToAgeGate);
    window.setTimeout(() => next.focus({ preventScroll: true }), 30);
  };

  const openQuiz = async (trigger) => {
    pendingTrigger = trigger;
    picks = [];
    await loadCopy();
    syncPerson();
    renderQuestion(1);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('rmc-quiz-open');
  };

  closeBtn.addEventListener('click', closeQuiz);
  overlay.addEventListener('click', (event) => { if (event.target === overlay) closeQuiz(); });
  window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeQuiz(); });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const trigger = target.closest('.hero-invite .phone-cta, .hero-invite .button-primary.js-affiliate, .hero-invite .heart-button.js-affiliate');
    if (!trigger) return;
    if (bypassTrigger === trigger) { bypassTrigger = null; return; }
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openQuiz(trigger);
  }, true);

  document.getElementById('languageSelect')?.addEventListener('change', () => {
    window.setTimeout(async () => {
      if (!overlay.classList.contains('is-open')) return;
      await loadCopy();
      if (currentStep === 1) renderQuestion(1);
      else if (currentStep === 2) renderQuestion(2);
      else if (currentStep === 3) renderAnalysis();
      else renderResult();
    }, 0);
  });

  loadCopy();
})();