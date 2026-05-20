// ===== FocusFlow To-Do App =====
(function () {
  'use strict';

  // --- State ---
  let tasks = JSON.parse(localStorage.getItem('ff_tasks') || '[]');
  let tags = JSON.parse(localStorage.getItem('ff_tags') || 'null') || [
    { name: 'work', color: '#4F46E5', desc: '업무 및 프로젝트' },
    { name: 'personal', color: '#DC2626', desc: '개인 생활' },
    { name: 'learning', color: '#059669', desc: '학습 및 자기개발' },
  ];
  let selectedTag = '';
  let timerInterval = null;
  let timerSeconds = 25 * 60;
  let timerRunning = false;

  // --- DOM Helpers ---
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // --- Navigation ---
  function switchPage(page) {
    $$('.page').forEach((p) => p.classList.remove('active'));
    $$('.nav-item').forEach((n) => n.classList.remove('active'));
    $$('.topbar-link').forEach((l) => l.classList.remove('active'));
    const el = $(`#page-${page}`);
    if (el) el.classList.add('active');
    const navEl = $(`#nav-${page}`);
    if (navEl) navEl.classList.add('active');
    $$(`.topbar-link[data-page="${page}"]`).forEach((l) => l.classList.add('active'));
    if (page === 'timeline') renderTimeline();
    if (page === 'tags') renderTagCards();
  }

  $$('.nav-item[data-page]').forEach((btn) =>
    btn.addEventListener('click', () => switchPage(btn.dataset.page))
  );
  $$('.topbar-link[data-page]').forEach((btn) =>
    btn.addEventListener('click', () => switchPage(btn.dataset.page))
  );

  // --- Theme ---
  function applyTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    const icon = $('#theme-toggle .material-symbols-outlined');
    if (icon) icon.textContent = dark ? 'light_mode' : 'dark_mode';
    localStorage.setItem('ff_theme', dark ? 'dark' : 'light');
  }

  $('#theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(!isDark);
    const dmToggle = $('#dark-mode-toggle');
    if (dmToggle) dmToggle.checked = !isDark;
  });

  $('#dark-mode-toggle').addEventListener('change', (e) => {
    applyTheme(e.target.checked);
  });

  // Init theme
  const savedTheme = localStorage.getItem('ff_theme');
  if (savedTheme === 'dark') {
    applyTheme(true);
    $('#dark-mode-toggle').checked = true;
  }

  // --- Tasks ---
  function saveTasks() {
    localStorage.setItem('ff_tasks', JSON.stringify(tasks));
  }

  function getTagStyle(tagName) {
    const tag = tags.find((t) => t.name === tagName);
    const color = tag ? tag.color : '#4F46E5';
    return { color, bg: color + '18' };
  }

  function renderTasks() {
    const list = $('#task-list');
    const empty = $('#empty-state');
    const leftEl = $('#tasks-left');
    const remaining = tasks.filter((t) => !t.done).length;
    leftEl.textContent = `${remaining} Tasks Left`;

    if (tasks.length === 0) {
      list.innerHTML = '';
      empty.classList.add('visible');
      return;
    }
    empty.classList.remove('visible');

    list.innerHTML = tasks
      .map((t, i) => {
        const style = getTagStyle(t.tag);
        const timeStr = t.done ? 'Completed' : t.time || '';
        return `<div class="task-item ${t.done ? 'done' : ''}" data-index="${i}">
        <button class="task-check ${t.done ? 'checked' : ''}" data-index="${i}" aria-label="완료 토글"></button>
        <div class="task-info">
          <div class="task-title">${escHtml(t.title)}</div>
          ${t.tag ? `<span class="task-tag" style="background:${style.bg};color:${style.color}">#${escHtml(t.tag)}</span>` : ''}
        </div>
        <span class="task-time">${escHtml(timeStr)}</span>
        <button class="task-delete" data-index="${i}" aria-label="삭제">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>`;
      })
      .join('');

    // Event listeners
    list.querySelectorAll('.task-check').forEach((btn) =>
      btn.addEventListener('click', () => toggleTask(+btn.dataset.index))
    );
    list.querySelectorAll('.task-delete').forEach((btn) =>
      btn.addEventListener('click', () => deleteTask(+btn.dataset.index))
    );

    updateStats();
  }

  function addTask(title, tag) {
    const now = new Date();
    const time = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    tasks.push({ title, tag, time, done: false, created: now.toISOString() });
    saveTasks();
    renderTasks();
  }

  function toggleTask(index) {
    if (tasks[index]) {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    }
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function escHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // Add task handler
  function handleAddTask() {
    const input = $('#task-input');
    let val = input.value.trim();
    if (!val) return;

    // Extract tag from input
    let tag = selectedTag;
    const tagMatch = val.match(/#(\w+)/);
    if (tagMatch) {
      tag = tagMatch[1].toLowerCase();
      val = val.replace(/#\w+/, '').trim();
    }
    if (!val) return;

    addTask(val, tag);
    input.value = '';
    selectedTag = '';
    $$('.tag-chip').forEach((c) => c.classList.remove('active'));
  }

  $('#btn-add-task').addEventListener('click', handleAddTask);
  $('#task-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAddTask();
  });

  // Tag chip selection
  $$('.tag-chip').forEach((chip) =>
    chip.addEventListener('click', () => {
      const isActive = chip.classList.contains('active');
      $$('.tag-chip').forEach((c) => c.classList.remove('active'));
      if (!isActive) {
        chip.classList.add('active');
        selectedTag = chip.dataset.tag;
      } else {
        selectedTag = '';
      }
    })
  );

  // --- Stats ---
  function updateStats() {
    const done = tasks.filter((t) => t.done).length;
    const total = tasks.length;
    const streak = Math.max(1, done);
    $('#streak-count').textContent = streak;

    // Update progress bars based on tasks
    const bars = $$('#progress-bars .bar');
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    if (bars.length >= 5) {
      bars[4].style.height = pct + '%';
    }
    $('#progress-text').textContent = total > 0 ? `완료율 ${pct}%` : '이번 주 진행 현황';
  }

  // --- Timeline ---
  function renderTimeline() {
    const list = $('#timeline-list');
    const sorted = [...tasks].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return new Date(b.created) - new Date(a.created);
    });

    const done = tasks.filter((t) => t.done).length;
    const progress = tasks.filter((t) => !t.done).length;
    const total = tasks.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    $('#achievement-pct').textContent = pct + '%';
    $('#ach-done').textContent = done;
    $('#ach-progress').textContent = progress;
    $('#ach-new').textContent = total;
    $('#timeline-subtitle').textContent = `Deep Work Mode: ${total}개의 작업이 등록되어 있습니다.`;

    if (sorted.length === 0) {
      list.innerHTML = '<p style="color:var(--text-muted);padding:40px;text-align:center">등록된 작업이 없습니다.</p>';
      return;
    }

    list.innerHTML = sorted
      .map((t) => {
        const style = getTagStyle(t.tag);
        const dotClass = t.done ? 'done' : 'active';
        const statusText = t.done ? '완료' : '진행 중';
        return `<div class="timeline-item">
        <span class="timeline-time">${escHtml(t.time || '')}</span>
        <div class="timeline-dot ${dotClass}"></div>
        <div class="timeline-card">
          <div class="timeline-card-title">
            ${escHtml(t.title)}
            ${t.tag ? `<span class="timeline-card-tag" style="background:${style.bg};color:${style.color}">${escHtml(t.tag)}</span>` : ''}
          </div>
          <div class="timeline-card-sub">${statusText} • ${escHtml(t.time || '')}</div>
        </div>
      </div>`;
      })
      .join('');
  }

  $('#btn-add-timeline').addEventListener('click', () => {
    switchPage('focus');
    $('#task-input').focus();
  });

  // --- Tags Page ---
  function saveTags() {
    localStorage.setItem('ff_tags', JSON.stringify(tags));
  }

  function renderTagCards() {
    const container = $('#tag-cards');
    const search = ($('#tag-search')?.value || '').toLowerCase();
    const filtered = tags.filter((t) => t.name.includes(search));

    container.innerHTML = filtered
      .map((tag) => {
        const count = tasks.filter((t) => t.tag === tag.name).length;
        return `<div class="tag-card-item" style="--tc:${tag.color}">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${tag.color}"></div>
        <span class="tag-card-badge" style="background:${tag.color}18;color:${tag.color}">#${escHtml(tag.name)}</span>
        <div class="tag-card-desc">${escHtml(tag.desc)}</div>
        <span class="tag-card-count">${String(count).padStart(2, '0')}</span>
        <span class="tag-card-tasks">할 일</span>
      </div>`;
      })
      .join('');
  }

  $('#tag-search')?.addEventListener('input', renderTagCards);

  // New Tag Modal
  $('#btn-new-tag').addEventListener('click', () => $('#tag-modal').classList.add('open'));
  $('#btn-cancel-tag').addEventListener('click', () => $('#tag-modal').classList.remove('open'));
  $('#tag-modal-close').addEventListener('click', () => $('#tag-modal').classList.remove('open'));
  $('#btn-save-tag').addEventListener('click', () => {
    const name = $('#new-tag-input').value.trim().toLowerCase();
    const color = $('#new-tag-color').value;
    if (!name) return;
    if (!tags.find((t) => t.name === name)) {
      tags.push({ name, color, desc: `#${name} 태그` });
      saveTags();
      renderTagCards();
    }
    $('#new-tag-input').value = '';
    $('#tag-modal').classList.remove('open');
  });

  // --- Focus Timer ---
  function updateTimerDisplay() {
    const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const s = String(timerSeconds % 60).padStart(2, '0');
    $('#timer-display').textContent = `${m}:${s}`;
  }

  $('#btn-focus-mode').addEventListener('click', () => {
    timerSeconds = 25 * 60;
    timerRunning = false;
    updateTimerDisplay();
    $('#btn-timer-start').textContent = '시작';
    $('#focus-modal').classList.add('open');
  });

  $('#modal-close').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    $('#focus-modal').classList.remove('open');
  });

  $('#btn-timer-start').addEventListener('click', () => {
    if (timerRunning) {
      clearInterval(timerInterval);
      timerRunning = false;
      $('#btn-timer-start').textContent = '계속';
    } else {
      timerRunning = true;
      $('#btn-timer-start').textContent = '일시정지';
      timerInterval = setInterval(() => {
        if (timerSeconds <= 0) {
          clearInterval(timerInterval);
          timerRunning = false;
          $('#btn-timer-start').textContent = '완료!';
          return;
        }
        timerSeconds--;
        updateTimerDisplay();
      }, 1000);
    }
  });

  $('#btn-timer-reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 25 * 60;
    updateTimerDisplay();
    $('#btn-timer-start').textContent = '시작';
  });

  // --- Settings: Reset ---
  $('#btn-reset-data').addEventListener('click', () => {
    if (confirm('모든 데이터를 초기화하시겠습니까?')) {
      localStorage.removeItem('ff_tasks');
      localStorage.removeItem('ff_tags');
      tasks = [];
      tags = [
        { name: 'work', color: '#4F46E5', desc: '업무 및 프로젝트' },
        { name: 'personal', color: '#DC2626', desc: '개인 생활' },
        { name: 'learning', color: '#059669', desc: '학습 및 자기개발' },
      ];
      renderTasks();
    }
  });

  // --- Init ---
  // Add sample tasks if empty
  if (tasks.length === 0) {
    tasks = [
      { title: '분기별 마케팅 성과 분석 리포트 작성', tag: 'work', time: '10:00 AM', done: false, created: new Date().toISOString() },
      { title: 'UX 디자인 시스템 기초 가이드라인 검토', tag: 'work', time: '11:00 AM', done: true, created: new Date().toISOString() },
      { title: '외국어 학습 (스페인어 2단원)', tag: 'learning', time: '2:00 PM', done: false, created: new Date().toISOString() },
      { title: '저녁 식료품 장보기', tag: 'personal', time: '6:30 PM', done: false, created: new Date().toISOString() },
    ];
    saveTasks();
  }

  renderTasks();
})();
