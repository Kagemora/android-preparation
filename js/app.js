(function () {
  'use strict';

  const FREQ_LABEL = { '🔥': 'часто спрашивают', '⭐': 'бывает', '🥶': 'редко' };
  const LEVEL_CLASS = (lvl) => {
    if (!lvl) return 'lvl-m';
    const l = lvl.toLowerCase();
    if (l.includes('j') && !l.includes('m')) return 'lvl-j';
    if (l.includes('s')) return 'lvl-s';
    return 'lvl-m';
  };

  const ALL_QUESTIONS = [...QUESTIONS, ...EXTRA_QUESTIONS];

  const PROGRESS_KEY = 'android-prep-progress-v1';
  function loadProgress() {
    try { return new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]')); }
    catch (e) { return new Set(); }
  }
  function saveProgress(set) {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...set])); } catch (e) { /* приватный режим браузера — молча игнорируем */ }
  }
  let progress = loadProgress();

  // Индекс: category -> [questions] (порядок сохраняется как в data.js — уже отсортирован по частоте внутри подкатегории)
  const byCategory = {};
  for (const q of ALL_QUESTIONS) {
    (byCategory[q.category] ||= []).push(q);
  }

  function countsFor(catId) {
    const list = byCategory[catId] || [];
    const total = list.length;
    const done = list.reduce((n, q) => n + (progress.has(q.id) ? 1 : 0), 0);
    return { done, total };
  }

  function totalStats() {
    let done = 0, total = ALL_QUESTIONS.length;
    for (const q of ALL_QUESTIONS) if (progress.has(q.id)) done++;
    return { done, total };
  }

  // ---------- Sidebar ----------
  const sidebarList = document.getElementById('sidebarList');
  const sidebarRefList = document.getElementById('sidebarRefList');

  function renderRow(cat) {
    const { done, total } = countsFor(cat.id);
    const row = document.createElement('div');
    row.className = 'file-item';
    row.dataset.cat = cat.id;
    row.innerHTML = `
      <span class="badge" style="background:${cat.color}22;color:${cat.color};border-color:${cat.color}55">${cat.badge}</span>
      <span class="file-name">${cat.name}<span class="file-ext">${cat.ext}</span></span>
      <span class="file-count">${total ? `${done}/${total}` : '—'}</span>
    `;
    row.addEventListener('click', () => openCategory(cat.id));
    return row;
  }

  function renderSidebar() {
    sidebarList.innerHTML = '';
    CATEGORIES.forEach(c => sidebarList.appendChild(renderRow(c)));
    sidebarRefList.innerHTML = '';
    REFERENCE_CATEGORIES.forEach(c => sidebarRefList.appendChild(renderRow(c)));
    highlightActiveRow();
  }

  function highlightActiveRow() {
    document.querySelectorAll('.file-item').forEach(el => {
      el.classList.toggle('active', el.dataset.cat === state.activeCat);
    });
  }

  // ---------- Main content ----------
  const tabLabel = document.getElementById('tabLabel');
  const tabDot = document.getElementById('tabDot');
  const contentHeader = document.getElementById('contentHeader');
  const contentSub = document.getElementById('contentSub');
  const searchInput = document.getElementById('searchInput');
  const questionList = document.getElementById('questionList');
  const dashboard = document.getElementById('dashboard');
  const mainScroll = document.getElementById('mainScroll');

  const state = { activeCat: null, query: '' };

  function openCategory(catId) {
    state.activeCat = catId;
    state.query = '';
    searchInput.value = '';
    location.hash = catId;
    highlightActiveRow();
    dashboard.style.display = 'none';
    document.getElementById('categoryView').style.display = '';
    renderCategory();
    mainScroll.scrollTop = 0;
  }

  function showDashboard() {
    state.activeCat = null;
    location.hash = '';
    highlightActiveRow();
    dashboard.style.display = '';
    document.getElementById('categoryView').style.display = 'none';
    renderDashboard();
  }

  function matchesQuery(q, query) {
    if (!query) return true;
    const hay = (q.question + ' ' + (q.subcategory || '') + ' ' + q.source + ' ' + q.probes.join(' '))
      .toLowerCase().replace(/<[^>]+>/g, '');
    return hay.includes(query.toLowerCase());
  }

  function groupBySubcategory(list) {
    const order = [];
    const map = new Map();
    for (const q of list) {
      const key = q.subcategory || '';
      if (!map.has(key)) { map.set(key, []); order.push(key); }
      map.get(key).push(q);
    }
    return order.map(k => [k, map.get(k)]);
  }

  function questionCardHTML(q) {
    const checked = progress.has(q.id) ? 'checked' : '';
    const lvlClass = LEVEL_CLASS(q.level);
    const hasAnswer = q.answer && (q.answer.what || q.answer.diff || q.answer.example || q.answer.code);
    return `
    <div class="q-card" data-id="${q.id}">
      <div class="q-row">
        <input type="checkbox" class="q-check" ${checked} title="Отметить как выученное" />
        ${(q.freq || q.level) ? `
        <div class="q-tags">
          <span class="q-freq" title="${FREQ_LABEL[q.freq] || ''}">${q.freq || ''}</span>
          <span class="q-level ${lvlClass}">${q.level || ''}</span>
        </div>` : ''}
        <div class="q-text">
          <span class="q-num">${q.localNum}.</span> ${q.question}
          ${q.source ? `<div class="q-source">Спрашивают: ${q.source}</div>` : ''}
        </div>
        <span class="q-chevron">›</span>
      </div>
      <div class="q-answer">
        ${q.probes.length ? `
          <div class="q-probes">
            <div class="q-probes-title">Что дополнительно спрашивают</div>
            <ul>${q.probes.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>` : ''}
        <div class="q-formula">
          ${hasAnswer ? `
            ${q.answer.what ? `<p><span class="lbl lbl-what">Что это</span> ${q.answer.what}</p>` : ''}
            ${q.answer.diff ? `<p><span class="lbl lbl-diff">Ключевое отличие</span> ${q.answer.diff}</p>` : ''}
            ${q.answer.example ? `<p><span class="lbl lbl-example">Пример / следствие</span> ${q.answer.example}</p>` : ''}
            ${q.answer.code ? `<div class="q-code-label"><span class="lbl lbl-code">Пример кода</span></div>${q.answer.code}` : ''}
          ` : `<div class="q-empty">Разбор появится здесь позже — пока отмечай вопрос как ориентир для повторения.</div>`}
        </div>
      </div>
    </div>`;
  }

  function renderCategory() {
    const cat = CATEGORY_BY_ID[state.activeCat];
    if (!cat) return;
    tabLabel.textContent = cat.name + cat.ext;
    tabDot.style.background = cat.color;

    const list = (byCategory[cat.id] || []).filter(q => matchesQuery(q, state.query));
    const { done, total } = countsFor(cat.id);

    contentHeader.textContent = cat.name + cat.ext;
    contentSub.textContent = total ? `Выучено ${done} из ${total}` : 'Пока пусто — вопросы будут добавлены позже';

    if (!list.length) {
      questionList.innerHTML = `<div class="q-empty-cat">Ничего не найдено${state.query ? ' по запросу «' + escapeHtml(state.query) + '»' : ''}.</div>`;
      return;
    }

    const groups = groupBySubcategory(list);
    let html = '';
    for (const [subcat, items] of groups) {
      if (subcat) html += `<div class="subcat-title">${subcat}</div>`;
      html += items.map(questionCardHTML).join('');
    }
    questionList.innerHTML = html;
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  questionList.addEventListener('click', (e) => {
    const checkEl = e.target.closest('.q-check');
    const card = e.target.closest('.q-card');
    if (!card) return;
    const id = Number(card.dataset.id);

    if (checkEl) {
      if (progress.has(id)) progress.delete(id); else progress.add(id);
      saveProgress(progress);
      renderSidebar();
      const cat = CATEGORY_BY_ID[state.activeCat];
      const { done, total } = countsFor(cat.id);
      contentSub.textContent = `Выучено ${done} из ${total}`;
      return;
    }
    card.classList.toggle('expanded');
  });

  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value.trim();
    renderCategory();
  });

  // ---------- Dashboard ----------
  function renderDashboard() {
    const { done, total } = totalStats();
    const pct = total ? Math.round((done / total) * 100) : 0;
    let grid = '';
    for (const cat of [...CATEGORIES, ...REFERENCE_CATEGORIES]) {
      const c = countsFor(cat.id);
      if (!c.total) continue;
      const p = Math.round((c.done / c.total) * 100);
      grid += `
        <div class="dash-card" data-cat="${cat.id}">
          <div class="dash-card-top">
            <span class="badge" style="background:${cat.color}22;color:${cat.color};border-color:${cat.color}55">${cat.badge}</span>
            <span class="dash-card-name">${cat.name}${cat.ext}</span>
          </div>
          <div class="dash-bar"><div class="dash-bar-fill" style="width:${p}%;background:${cat.color}"></div></div>
          <div class="dash-card-count">${c.done}/${c.total}</div>
        </div>`;
    }
    dashboard.innerHTML = `
      <div class="dash-hero">
        <div class="dash-hero-title">android-prep</div>
        <div class="dash-hero-sub">${total} вопросов из реальных собеседований · выучено ${done} (${pct}%)</div>
        <div class="dash-bar dash-bar-big"><div class="dash-bar-fill" style="width:${pct}%;background:#7ee787"></div></div>
      </div>
      <div class="dash-grid">${grid}</div>
    `;
    dashboard.querySelectorAll('.dash-card').forEach(el => {
      el.addEventListener('click', () => openCategory(el.dataset.cat));
    });
  }

  // ---------- Boot ----------
  function boot() {
    renderSidebar();
    const hash = location.hash.replace('#', '');
    if (hash && CATEGORY_BY_ID[hash]) {
      openCategory(hash);
    } else {
      showDashboard();
    }
  }

  document.getElementById('logoHome').addEventListener('click', showDashboard);
  window.addEventListener('hashchange', () => {
    const hash = location.hash.replace('#', '');
    if (hash && CATEGORY_BY_ID[hash]) openCategory(hash);
    else showDashboard();
  });

  boot();
})();
