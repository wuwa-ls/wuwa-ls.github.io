(() => {
  const OPEN_SOURCE_REPOS = ['walking_robot', 'Spherical_robot', 'Map_Path_Tracking_Car'];

  const TIMELINE_EVENTS = [
    'timeline.event1',
    'timeline.event2',
    'timeline.event3',
    'timeline.event4',
    'timeline.event5',
    'timeline.event6',
    'timeline.event7',
  ];

  const TECH_STACK = [
    {
      category: 'skills.hardware',
      items: [
        { name: 'SolidWorks', icon: 'fas fa-drafting-compass' },
      ],
    },
    {
      category: 'skills.embedded',
      items: [
        { name: 'MCU', icon: 'fas fa-microchip' },
        { name: 'Keil MDK', icon: 'fas fa-screwdriver-wrench' },
        { name: 'STM32CubeMX', icon: 'fas fa-cubes' },
        { name: 'C/C++', icon: 'fas fa-code' },
        { name: 'RTOS', icon: 'fas fa-cogs' },
      ],
    },
    {
      category: 'skills.tools',
      items: [
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'CMake', icon: 'fas fa-gears' },
      ],
    },
  ];

  const CONTACT_LINKS = [
    { icon: 'fab fa-bilibili', key: 'contact.bilibili', link: 'https://space.bilibili.com/309848164?spm_id_from=333.1387.0.0' },
    { icon: 'fab fa-github', key: 'contact.github', link: 'https://github.com/wuwa-ls' },
    { icon: 'fas fa-comments', key: 'contact.feishu', link: 'https://ocnbvpuirl27.feishu.cn/next/messenger' },
    { icon: 'fab fa-zhihu', key: 'contact.zhihu', link: 'https://www.zhihu.com/people/41-5-41-31' },
  ];

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clear(el) {
    if (!el) return;
    el.innerHTML = '';
  }

  function t(key) {
    return window.i18n?.get ? window.i18n.get(key) : key;
  }

  function initThemeToggle() {
    const toggleBtn = qs('.theme-toggle');
    const htmlEl = document.documentElement;
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);

    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      console.log(`[Theme] Switched to ${newTheme}`);
    });
  }

  function initLangToggle() {
    const toggleBtn = qs('.lang-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const current = window.i18n.currentLang();
      const next = current === 'en' ? 'zh' : 'en';
      console.log(`[Lang] Switching to ${next}...`);
      window.i18n.changeLang(next);
    });
  }

  async function initOpenSource() {
    const grid = qs('.opensource-grid');
    if (!grid) return;
    clear(grid);

    grid.innerHTML = `<p class="empty-hint">${t('opensource.loading')}</p>`;

    let repos;
    try {
      const res = await fetch('https://api.github.com/users/wuwa-ls/repos?per_page=100');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      repos = await res.json();
    } catch (err) {
      console.error('[opensource] Load failed:', err);
      grid.innerHTML = `<p class="empty-hint">${t('opensource.error')}</p>`;
      return;
    }

    const selected = OPEN_SOURCE_REPOS
      .map((name) => repos.find((r) => r.name === name))
      .filter(Boolean);

    if (selected.length === 0) {
      grid.innerHTML = `<p class="empty-hint">${t('opensource.error')}</p>`;
      return;
    }

    clear(grid);
    selected.forEach((repo) => {
      const langTag = repo.language
        ? `<span class="os-tag">${repo.language}</span>`
        : '';
      const desc = repo.description || t('opensource.noDesc');

      const card = document.createElement('div');
      card.className = 'os-card';
      card.innerHTML = `
        <div class="os-header">
          <a class="os-title" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
          <span class="os-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
        </div>
        <p class="os-desc">${desc}</p>
        <div class="os-tags">${langTag}</div>
        <div class="os-actions">
          <a class="os-btn" href="${repo.html_url}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> ${t('opensource.btnCode')}</a>
        </div>
      `;
      grid.appendChild(card);
    });

    applyReveal(qsa('.opensource-grid .os-card'));
  }

  function initTimeline() {
    const container = qs('.timeline-container');
    if (!container) return;
    clear(container);

    TIMELINE_EVENTS.forEach((key) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <span class="timeline-date">${t(`${key}.date`)}</span>
        <div class="timeline-content">
          <h3>${t(`${key}.title`)}</h3>
          <p>${t(`${key}.desc`)}</p>
        </div>
      `;
      container.appendChild(item);
    });
  }

  function initTechStack() {
    const container = qs('.skills-wrapper');
    if (!container) return;
    clear(container);

    TECH_STACK.forEach((group) => {
      const itemsHtml = group.items
        .map((s) => `<div class="skill-badge"><i class="${s.icon}"></i> ${s.name}</div>`)
        .join('');

      const col = document.createElement('div');
      col.className = 'skill-category';
      col.innerHTML = `<h3>${t(group.category)}</h3><div class="skill-list">${itemsHtml}</div>`;
      container.appendChild(col);
    });
  }

  function initContactLinks() {
    const container = qs('.intro-contact-links');
    if (!container) return;
    clear(container);

    CONTACT_LINKS.forEach((contact) => {
      const label = t(contact.key);
      const item = document.createElement('a');
      item.className = 'intro-contact-link';
      item.href = contact.link;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      item.title = label;
      item.setAttribute('aria-label', label);
      item.innerHTML = `<i class="${contact.icon}"></i>`;
      container.appendChild(item);
    });
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        let target;
        try {
          target = qs(href);
        } catch {
          return;
        }

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  function applyReveal(targets) {
    if (!targets.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    targets.forEach((el, index) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${(index % 6) * 60}ms`);
    });

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    targets.forEach((el) => observer.observe(el));
  }

  function initRevealMotion() {
    applyReveal([
      ...qsa('.timeline-container .timeline-item'),
      ...qsa('.skills-wrapper .skill-category'),
    ]);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLangToggle();
    initSmoothScroll();
  });

  window.addEventListener('i18nLoaded', () => {
    console.log('[main] i18n loaded, rendering content...');
    initOpenSource();
    initTimeline();
    initTechStack();
    initContactLinks();
    initRevealMotion();
  });
})();
