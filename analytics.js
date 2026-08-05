(() => {
  const $ = (selector) => document.querySelector(selector);
  const numberFormat = new Intl.NumberFormat('pl-PL');
  const regionNames = typeof Intl.DisplayNames === 'function'
    ? new Intl.DisplayNames(['pl'], { type: 'region' })
    : null;

  const elements = {
    loginView: $('#loginView'),
    dashboardView: $('#dashboardView'),
    loginForm: $('#loginForm'),
    password: $('#password'),
    loginError: $('#loginError'),
    filtersForm: $('#filtersForm'),
    dateFrom: $('#dateFrom'),
    dateTo: $('#dateTo'),
    country: $('#countryFilter'),
    device: $('#deviceFilter'),
    locale: $('#localeFilter'),
    source: $('#sourceFilter'),
    refresh: $('#refreshButton'),
    logout: $('#logoutButton'),
    updatedAt: $('#updatedAt'),
    dashboardError: $('#dashboardError'),
    loadingBar: $('#loadingBar'),
    dataNotice: $('#dataNotice')
  };

  const formatInputDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const setDefaultDates = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 6);
    elements.dateFrom.value = formatInputDate(start);
    elements.dateTo.value = formatInputDate(end);
  };

  const readJson = async (response) => {
    const text = await response.text();
    if (!text) return {};
    try { return JSON.parse(text); }
    catch (_) { return { error: text.slice(0, 240) }; }
  };

  const request = async (url, options = {}) => {
    const response = await fetch(url, {
      credentials: 'same-origin',
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {})
      }
    });
    const data = await readJson(response);
    if (!response.ok) {
      const error = new Error(data.error || `Błąd ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return data;
  };

  const showLogin = (message = '') => {
    elements.dashboardView.hidden = true;
    elements.loginView.hidden = false;
    elements.loginError.textContent = message;
    elements.password.value = '';
    window.setTimeout(() => elements.password.focus(), 50);
  };

  const showDashboard = () => {
    elements.loginView.hidden = true;
    elements.dashboardView.hidden = false;
  };

  const setLoading = (loading) => {
    elements.loadingBar.hidden = !loading;
    elements.refresh.disabled = loading;
    elements.filtersForm.querySelector('button[type="submit"]').disabled = loading;
  };

  const setDashboardError = (message = '') => {
    elements.dashboardError.textContent = message;
    elements.dashboardError.hidden = !message;
  };

  const formatPercent = (value) => `${Number(value || 0).toLocaleString('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  })}%`;

  const countryLabel = (code) => {
    if (!code || code === 'brak') return 'Brak kraju';
    try { return `${regionNames?.of(code) || code} (${code})`; }
    catch (_) { return code; }
  };

  const sourceLabel = (value) => value === 'direct' ? 'Bez UTM / direct' : value;
  const deviceLabel = (value) => ({ mobile: 'Telefon', desktop: 'Komputer', brak: 'Brak danych' }[value] || value);

  const replaceSelectOptions = (select, values, labelFn = (value) => value) => {
    const current = select.value;
    while (select.options.length > 1) select.remove(1);
    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = labelFn(value);
      select.appendChild(option);
    });
    if (current && !values.includes(current)) {
      const option = document.createElement('option');
      option.value = current;
      option.textContent = labelFn(current);
      select.appendChild(option);
    }
    select.value = current;
  };

  const renderKpis = (totals) => {
    $('#kpiVisits').textContent = numberFormat.format(totals.visits || 0);
    $('#kpiCta').textContent = numberFormat.format(totals.cta || 0);
    $('#kpiAge').textContent = numberFormat.format(totals.age_selected || 0);
    $('#kpiCtaRate').textContent = `${formatPercent(totals.cta_rate)} wejść`;
    $('#kpiAgeRate').textContent = `${formatPercent(totals.age_rate)} wejść`;
    $('#kpiVoiceRate').textContent = formatPercent(totals.voice_completion_rate);
    $('#kpiVoiceCounts').textContent = `${numberFormat.format(totals.voice_completed || 0)} / ${numberFormat.format(totals.voice_started || 0)} odsłuchań`;
  };

  const renderFunnel = (stages) => {
    const container = $('#funnel');
    container.replaceChildren();
    const startCount = stages[0]?.count || 0;

    stages.forEach((stage, index) => {
      const row = document.createElement('div');
      row.className = 'funnel-row';

      const label = document.createElement('div');
      label.className = 'funnel-label';
      label.textContent = stage.label;

      const track = document.createElement('div');
      track.className = 'funnel-track';
      const fill = document.createElement('div');
      fill.className = 'funnel-fill';
      const width = startCount > 0 ? Math.max(0, Math.min(100, (stage.count / startCount) * 100)) : 0;
      fill.style.width = `${width}%`;
      if (width >= 14) fill.textContent = formatPercent(stage.from_start);
      track.appendChild(fill);

      const count = document.createElement('div');
      count.className = 'funnel-count';
      count.textContent = numberFormat.format(stage.count || 0);

      const rate = document.createElement('div');
      rate.className = 'funnel-rate';
      rate.textContent = index === 0
        ? 'punkt startowy'
        : `${formatPercent(stage.from_previous)} z poprzedniego etapu`;

      row.append(label, track, count, rate);
      container.appendChild(row);
    });
  };

  const svgElement = (name, attributes = {}) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };

  const renderTrend = (trend) => {
    const container = $('#trendChart');
    container.replaceChildren();
    if (!trend.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Brak danych w wybranym zakresie.';
      container.appendChild(empty);
      return;
    }

    const width = 1000;
    const height = 270;
    const margin = { top: 18, right: 18, bottom: 42, left: 48 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const maxValue = Math.max(1, ...trend.flatMap((day) => [day.visits, day.cta, day.age]));
    const svg = svgElement('svg', { viewBox: `0 0 ${width} ${height}`, preserveAspectRatio: 'none' });

    for (let index = 0; index <= 4; index += 1) {
      const y = margin.top + (innerHeight * index / 4);
      svg.appendChild(svgElement('line', {
        x1: margin.left,
        y1: y,
        x2: width - margin.right,
        y2: y,
        class: 'chart-grid'
      }));
      const value = Math.round(maxValue * (1 - index / 4));
      const label = svgElement('text', { x: margin.left - 9, y: y + 4, 'text-anchor': 'end', class: 'chart-axis' });
      label.textContent = numberFormat.format(value);
      svg.appendChild(label);
    }

    const xFor = (index) => trend.length === 1
      ? margin.left + innerWidth / 2
      : margin.left + (innerWidth * index / (trend.length - 1));
    const yFor = (value) => margin.top + innerHeight - ((value / maxValue) * innerHeight);

    const series = [
      ['visits', 'chart-line-visits', 'chart-point-visits', 'Wejścia'],
      ['cta', 'chart-line-cta', 'chart-point-cta', 'CTA'],
      ['age', 'chart-line-age', 'chart-point-age', 'Wiek']
    ];

    series.forEach(([key, lineClass, pointClass, label]) => {
      const points = trend.map((day, index) => `${xFor(index)},${yFor(day[key])}`).join(' ');
      svg.appendChild(svgElement('polyline', { points, class: lineClass }));
      trend.forEach((day, index) => {
        const circle = svgElement('circle', { cx: xFor(index), cy: yFor(day[key]), r: 3.5, class: pointClass });
        const title = svgElement('title');
        title.textContent = `${day.date}: ${label} ${numberFormat.format(day[key])}`;
        circle.appendChild(title);
        svg.appendChild(circle);
      });
    });

    const labelStep = Math.max(1, Math.ceil(trend.length / 8));
    trend.forEach((day, index) => {
      if (index % labelStep !== 0 && index !== trend.length - 1) return;
      const label = svgElement('text', {
        x: xFor(index),
        y: height - 14,
        'text-anchor': 'middle',
        class: 'chart-axis'
      });
      label.textContent = day.date.slice(5);
      svg.appendChild(label);
    });

    container.appendChild(svg);
  };

  const renderTable = (selector, rows, total, labelFn = (value) => value) => {
    const container = $(selector);
    container.replaceChildren();
    if (!rows.length) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.style.minHeight = '90px';
      empty.textContent = 'Brak danych';
      container.appendChild(empty);
      return;
    }

    rows.forEach((row) => {
      const line = document.createElement('div');
      line.className = 'table-row';
      const name = document.createElement('span');
      name.className = 'table-name';
      name.textContent = labelFn(row.name);
      name.title = name.textContent;
      const value = document.createElement('span');
      value.className = 'table-value';
      const share = total > 0 ? ` · ${formatPercent((row.count / total) * 100)}` : '';
      value.textContent = `${numberFormat.format(row.count)}${share}`;
      line.append(name, value);
      container.appendChild(line);
    });
  };

  const renderDashboard = (data) => {
    renderKpis(data.totals);
    renderFunnel(data.funnel || []);
    renderTrend(data.trend || []);

    const visits = data.totals?.visits || 0;
    renderTable('#countriesTable', data.breakdowns?.countries || [], visits, countryLabel);
    renderTable('#sourcesTable', data.breakdowns?.sources || [], visits, sourceLabel);
    renderTable('#devicesTable', data.breakdowns?.devices || [], visits, deviceLabel);
    renderTable('#localesTable', data.breakdowns?.locales || [], visits);
    renderTable('#ctaTable', data.breakdowns?.cta_slots || [], data.totals?.cta || 0);
    renderTable('#ageTable', data.breakdowns?.age_ranges || [], data.totals?.age_selected || 0);

    replaceSelectOptions(elements.country, data.options?.countries || [], countryLabel);
    replaceSelectOptions(elements.locale, data.options?.locales || []);
    replaceSelectOptions(elements.source, data.options?.sources || [], sourceLabel);

    const generated = new Date(data.generated_at);
    elements.updatedAt.textContent = `Zaktualizowano: ${generated.toLocaleString('pl-PL')}`;
    elements.dataNotice.textContent = data.truncated
      ? `Przetworzono ${numberFormat.format(data.processed_rows || 0)} rekordów. Osiągnięto limit raportu — skróć zakres dat, aby uzyskać pełne dane.`
      : `Przetworzono ${numberFormat.format(data.processed_rows || 0)} zdarzeń. „Sesja” oznacza jedną sesję karty przeglądarki, a nie zweryfikowaną osobę.`;
  };

  const loadData = async () => {
    setLoading(true);
    setDashboardError('');
    const params = new URLSearchParams();
    new FormData(elements.filtersForm).forEach((value, key) => {
      if (String(value).trim()) params.set(key, String(value).trim());
    });

    try {
      const data = await request(`/api/analytics-data?${params.toString()}`);
      renderDashboard(data);
    } catch (error) {
      if (error.status === 401) {
        showLogin('Sesja wygasła. Zaloguj się ponownie.');
        return;
      }
      setDashboardError(error.message || 'Nie udało się pobrać danych.');
    } finally {
      setLoading(false);
    }
  };

  elements.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    elements.loginError.textContent = '';
    const button = elements.loginForm.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
      await request('/api/analytics-auth', {
        method: 'POST',
        body: JSON.stringify({ password: elements.password.value })
      });
      showDashboard();
      await loadData();
    } catch (error) {
      elements.loginError.textContent = error.message || 'Nie udało się zalogować.';
      elements.password.select();
    } finally {
      button.disabled = false;
    }
  });

  elements.filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loadData();
  });
  elements.refresh.addEventListener('click', loadData);
  elements.logout.addEventListener('click', async () => {
    try { await request('/api/analytics-auth', { method: 'DELETE' }); }
    catch (_) { /* Cookie is still cleared locally after expiry. */ }
    showLogin();
  });

  const initialise = async () => {
    setDefaultDates();
    try {
      const status = await request('/api/analytics-auth');
      if (!status.authenticated) {
        showLogin();
        return;
      }
      showDashboard();
      await loadData();
    } catch (error) {
      showLogin(error.status === 503
        ? 'Najpierw dodaj zmienną ANALYTICS_PASSWORD w Vercelu.'
        : 'Nie udało się sprawdzić sesji.');
    }
  };

  initialise();
})();
