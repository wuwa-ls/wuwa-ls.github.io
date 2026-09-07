(() => {
  const PROJECT_TAG_LIBRARY = {
    ROBOTICS: 'Robotics',
    EMBEDDED: 'Embedded Systems',
    MOTION_CONTROL: 'Motion Control',
    MOTOR_CONTROL: 'Motor Control',
    MECHANICAL_DESIGN: 'Mechanical Design',
  };

  const PROJECTS = [];

  const OPEN_SOURCE_ITEMS = [];

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

  function renderSpanTags(tags, className) {
    if (!Array.isArray(tags)) return '';
    return tags.map((tag) => `<span class="${className}">${tag}</span>`).join('');
  }

  function renderProjectTags(tags) {
    if (!Array.isArray(tags)) return '';
    return `<div class="project-tags">${renderSpanTags(tags, 'project-tag')}</div>`;
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

  function initProjects() {
    const grid = qs('.projects-grid');
    if (!grid) return;
    clear(grid);

    if (PROJECTS.length === 0) {
      grid.innerHTML = `<p class="empty-hint">${t('projects.empty')}</p>`;
      return;
    }

    PROJECTS.forEach((project) => {
      const tagsHtml = renderProjectTags(project.tags);

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="project-thumbnail-wrapper">
          <img src="${project.img}" alt="${t('projects.imgAlt')}" class="project-thumbnail">
        </div>
        <div class="project-info">
          <h3>${t(project.titleKey)}</h3>
          <p>${t(project.descKey)}</p>
          ${tagsHtml}
          <a href="${project.link}" class="project-link">${t('projects.viewDetail')}</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function initOpenSource() {
    const grid = qs('.opensource-grid');
    if (!grid) return;
    clear(grid);

    if (OPEN_SOURCE_ITEMS.length === 0) {
      grid.innerHTML = `<p class="empty-hint">${t('opensource.empty')}</p>`;
      return;
    }

    OPEN_SOURCE_ITEMS.forEach((item) => {
      const tags = t(`${item.key}.tags`) || [];
      const tagsHtml = renderSpanTags(tags, 'os-tag');

      let buttonsHtml = '';
      if (item.linkCode) {
        buttonsHtml += `<a href="${item.linkCode}" target="_blank" rel="noopener noreferrer" class="os-btn"><i class="fab fa-github"></i> ${t('opensource.btnCode')}</a>`;
      }
      if (item.linkDoc) {
        buttonsHtml += `<a href="${item.linkDoc}" target="_blank" rel="noopener noreferrer" class="os-btn"><i class="fas fa-book"></i> ${t('opensource.btnDoc')}</a>`;
      }

      const card = document.createElement('div');
      card.className = 'os-card';
      card.innerHTML = `
        <div class="os-header">
          <div class="os-title">${t(`${item.key}.title`)}</div>
          <i class="fas fa-code-branch" style="color:var(--primary); opacity:0.5;"></i>
        </div>
        <p class="os-desc">${t(`${item.key}.desc`)}</p>
        <div class="os-tags">${tagsHtml}</div>
        <div class="os-actions">${buttonsHtml}</div>
      `;
      grid.appendChild(card);
    });
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

  function initRevealMotion() {
    const targets = [
      ...qsa('.project-detail-card'),
      ...qsa('.projects-grid .card'),
      ...qsa('.opensource-grid .os-card'),
      ...qsa('.timeline-container .timeline-item'),
      ...qsa('.skills-wrapper .skill-category'),
    ];

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

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLangToggle();
    initSmoothScroll();
  });

  window.addEventListener('i18nLoaded', () => {
    console.log('[main] i18n loaded, rendering content...');
    initProjects();
    initOpenSource();
    initTimeline();
    initTechStack();
    initContactLinks();
    initRevealMotion();
  });
})();
