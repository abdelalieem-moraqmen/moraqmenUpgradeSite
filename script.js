/* ============================================================
   مرقمن — JavaScript Animations
   ThreeUI-inspired: Particles · Typewriter · Magnetic ·
   Scroll-reveal · Counter · Terminal typer · Tilt cards
   ============================================================ */

(function () {
  'use strict';

  /* ── LOADING SCREEN ──────────────────────────────────────── */
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-label', 'Loading Moraqmen');
  loader.innerHTML = `
    <img class="loader-logo" src="logo-ar-9--1NSl4.svg" alt="مرقمن" />
    <div class="loader-bar"><div class="loader-bar-inner"></div></div>
  `;
  document.body.prepend(loader);
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1400);
  });

  /* ── HELPERS ─────────────────────────────────────────────── */
  const qs  = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const lerp  = (a, b, t)   => a + (b - a) * t;

  /* ── NAVBAR ─────────────────────────────────────────────── */
  const navbar = qs('#navbar');
  const hamburger = qs('#hamburger');
  const navLinks  = qs('#navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Active link on scroll
  const sections = qsa('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        qsa('.nav-link').forEach(l => l.classList.remove('active'));
        const link = qs(`.nav-link[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: .4 });
  sections.forEach(s => observer.observe(s));

  /* ── SCROLL TO TOP ───────────────────────────────────────── */
  const scrollTopBtn = qs('#scrollTop');
  window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ═══════════════════════════════════════════════════════════
     TYPEWRITER — hero title dynamic words
  ═══════════════════════════════════════════════════════════ */
  function initTypewriter() {
    const el = qs('.hero-title .highlight');
    if (!el) return;

    el.textContent = '';

    const phrases = {
      ar: [
        'مبنية لاحتياجات بيزنس حقيقية.',
        'تساعدك تنمو بثقة وسرعة.',
        'قابلة للتوسع مع بيزنسك.',
        'يعتمد عليها كل يوم.',
      ],
      en: [
        'real business needs.',
        'help you grow with confidence.',
        'scale with your business.',
        'reliable every day.',
      ],
    };

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    el.appendChild(cursor);

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let paused    = false;
    let activeLang = document.documentElement.lang === 'en' ? 'en' : 'ar';

    function type() {
      const lang = document.documentElement.lang === 'en' ? 'en' : 'ar';
      if (lang !== activeLang) {
        activeLang = lang;
        phraseIdx = 0;
        charIdx = 0;
        deleting = false;
        paused = false;
        el.textContent = '';
        el.appendChild(document.createTextNode(''));
        el.appendChild(cursor);
      }

      const current = phrases[activeLang][phraseIdx];

      if (paused) return;

      if (!deleting) {
        el.childNodes[0].textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          paused = true;
          setTimeout(() => { paused = false; deleting = true; }, 2200);
        }
      } else {
        el.childNodes[0].textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting  = false;
          phraseIdx = (phraseIdx + 1) % phrases[activeLang].length;
        }
      }

      const speed = deleting
        ? 40
        : charIdx < 4 ? 150 : 80;
      setTimeout(type, speed);
    }

    // Prepare text node
    el.prepend(document.createTextNode(''));
    type();
  }

  // Wait a beat for the underline animation, then start typewriter
  setTimeout(initTypewriter, 900);

  /* ═══════════════════════════════════════════════════════════
     ANIMATED CODE TERMINAL
  ═══════════════════════════════════════════════════════════ */
  function buildTerminal() {
    const wrapper = qs('.hero-img-wrapper');
    if (!wrapper) return;

    const terminal = document.createElement('div');
    terminal.className = 'code-terminal';
    terminal.dir = 'ltr';
    terminal.innerHTML = `
      <svg width="0" height="0">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#1d4ed8"/>
            <stop offset="100%" style="stop-color:#7c3aed"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="terminal-header">
        <span class="terminal-dot red"></span>
        <span class="terminal-dot yellow"></span>
        <span class="terminal-dot green"></span>
        <span class="terminal-title">moraqmen.js</span>
      </div>
      <div class="terminal-body" id="terminalBody"></div>
    `;
    wrapper.appendChild(terminal);

    const body = qs('#terminalBody');
    const allCode = [
      `<span class="kw">const</span> project = <span class="kw">await</span>`,
      `  <span class="cls">moraqmen</span>.<span class="fn">build</span>({`,
      `    <span class="kw">idea</span>: <span class="str">"<span class="arabic-underline">فكرتك</span>"</span>,`,
      `    <span class="kw">quality</span>: <span class="num">100</span>,`,
      `    <span class="kw">support</span>: <span class="str">"<span class="arabic-underline">30 يوم</span>"</span>,`,
      `    <span class="kw">scalable</span>: <span class="kw">true</span>`,
      `  });`,
      `<span class="cm">// SUCCESS: <span class="arabic-underline">منتجك جاهز!</span></span>`,
    ];

    let lineIndex = 0;
    function addLine() {
      if (lineIndex >= allCode.length) {
        // Restart after delay
        setTimeout(() => {
          body.innerHTML = '';
          lineIndex = 0;
          addLine();
        }, 3000);
        return;
      }
      const row = document.createElement('div');
      row.className = 'code-line';
      row.innerHTML = `
        <span class="ln">${String(lineIndex + 1).padStart(2, ' ')}</span>
        <span class="code-text">${allCode[lineIndex]}</span>
      `;
      row.style.opacity = '0';
      row.style.transform = 'translateX(-8px)';
      row.style.transition = 'opacity .3s ease, transform .3s ease';
      body.appendChild(row);
      requestAnimationFrame(() => {
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      });
      lineIndex++;
      setTimeout(addLine, 280);
    }
    addLine();
  }
  buildTerminal();

  /* ═══════════════════════════════════════════════════════════
     SCROLL REVEAL (custom AOS-like)
  ═══════════════════════════════════════════════════════════ */
  function initReveal() {
    const items = qsa('[data-aos]');

    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.aosDelay || '0');
          setTimeout(() => e.target.classList.add('aos-animate'), delay);
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: .12 });

    items.forEach(el => revealObs.observe(el));
  }
  initReveal();

  /* ═══════════════════════════════════════════════════════════
     COUNTER ANIMATION
  ═══════════════════════════════════════════════════════════ */
  function initCounters() {
    const counters = qsa('.stat-number[data-target]');

    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        countObs.unobserve(e.target);
        const el     = e.target;
        const target = parseInt(el.dataset.target);
        const dur    = 1800;
        const start  = performance.now();

        function step(now) {
          const progress = clamp((now - start) / dur, 0, 1);
          // ease out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: .5 });

    counters.forEach(c => countObs.observe(c));
  }
  initCounters();

  /* ═══════════════════════════════════════════════════════════
     MAGNETIC BUTTON EFFECT (ThreeUI-inspired)
  ═══════════════════════════════════════════════════════════ */
  function initMagnetic() {
    qsa('.btn-primary, .btn-outline, .btn-whatsapp').forEach(btn => {
      btn.classList.add('magnetic');

      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) * .25;
        const dy   = (e.clientY - cy) * .25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
  initMagnetic();

  /* ═══════════════════════════════════════════════════════════
     3D TILT — service & project cards
  ═══════════════════════════════════════════════════════════ */
  function initTilt() {
    qsa('.service-card, .project-card, .testimonial-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const rx     = clamp((e.clientY - cy) / (rect.height / 2), -1, 1) * 6;
        const ry     = clamp((e.clientX - cx) / (rect.width  / 2), -1, 1) * -6;
        const gx     = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
        const gy     = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.backgroundImage = card.classList.contains('service-card--featured')
          ? `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.08), transparent 60%), linear-gradient(160deg,#1d4ed8,#6366f1,#7c3aed)`
          : `radial-gradient(circle at ${gx}% ${gy}%, rgba(99,102,241,.05), transparent 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.backgroundImage = '';
      });
    });
  }
  initTilt();

  /* ═══════════════════════════════════════════════════════════
     PROCESS CONNECTOR ANIMATION
  ═══════════════════════════════════════════════════════════ */
  function initProcessConnectors() {
    const connectors = qsa('.process-connector');
    const connObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('animated');
          connObs.unobserve(e.target);
        }
      });
    }, { threshold: .5 });
    connectors.forEach(c => connObs.observe(c));
  }
  initProcessConnectors();

  /* ═══════════════════════════════════════════════════════════
     FLOATING CARDS — smooth entrance
  ═══════════════════════════════════════════════════════════ */
  function initFloatingCards() {
    qsa('.floating-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform += ' translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity .6s ease, transform .6s ease';
        card.style.opacity = '1';
        card.style.transform = card.style.transform.replace(' translateY(20px)', '');
      }, 1200 + i * 200);
    });
  }
  initFloatingCards();

  /* ═══════════════════════════════════════════════════════════
     STATS BACKGROUND GLOW ON SCROLL
  ═══════════════════════════════════════════════════════════ */
  function initStatsGlow() {
    const statsSection = qs('.stats');
    if (!statsSection) return;

    let glow = null;
    statsSection.addEventListener('mousemove', e => {
      if (!glow) {
        glow = document.createElement('div');
        glow.style.cssText = `
          position:absolute;
          width:400px;height:400px;
          border-radius:50%;
          background:radial-gradient(circle,rgba(255,255,255,.06),transparent);
          pointer-events:none;
          transform:translate(-50%,-50%);
          transition:left .1s,top .1s;
        `;
        statsSection.style.position = 'relative';
        statsSection.appendChild(glow);
      }
      const rect = statsSection.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top  = `${e.clientY - rect.top}px`;
    });
  }
  initStatsGlow();

  /* ═══════════════════════════════════════════════════════════
     NAVBAR INDICATOR — gliding pill
  ═══════════════════════════════════════════════════════════ */
  function initNavIndicator() {
    const linkEls = qsa('.nav-link');
    if (!linkEls.length) return;

    const pill = document.createElement('span');
    pill.style.cssText = `
      position:absolute;
      background:rgba(99,102,241,.1);
      border-radius:999px;
      pointer-events:none;
      transition:all .3s cubic-bezier(.4,0,.2,1);
      z-index:-1;
    `;
    qs('.nav-links')?.appendChild(pill);

    function movePill(el) {
      const rect = el.getBoundingClientRect();
      const pRect = qs('.nav-links').getBoundingClientRect();
      pill.style.width  = `${rect.width}px`;
      pill.style.height = `${rect.height}px`;
      pill.style.top    = `${rect.top - pRect.top}px`;
      pill.style.left   = `${rect.left - pRect.left}px`;
      pill.style.opacity = '1';
    }

    linkEls.forEach(link => {
      link.addEventListener('mouseenter', () => movePill(link));
    });
    qs('.nav-links')?.addEventListener('mouseleave', () => {
      pill.style.opacity = '0';
    });
  }
  initNavIndicator();

  /* ═══════════════════════════════════════════════════════════
     CONTACT FORM — success animation
  ═══════════════════════════════════════════════════════════ */
  function initContactForm() {
    const form = qs('#contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.innerHTML = '<span>جاري الإرسال...</span>';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span>تم الإرسال بنجاح!</span>';
        btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = '<span>أرسل طلبك</span>';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
  initContactForm();

  /* ═══════════════════════════════════════════════════════════
     SMOOTH SCROLL for all anchor links
  ═══════════════════════════════════════════════════════════ */
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        // Close mobile nav
        navLinks?.classList.remove('open');
        hamburger?.classList.remove('open');
        const offset = navbar?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ═══════════════════════════════════════════════════════════
     STAGGER ANIMATION — service cards on hover of parent
  ═══════════════════════════════════════════════════════════ */
  function initServiceStagger() {
    const grid = qs('.services-grid');
    if (!grid) return;
    const cards = qsa('.service-card', grid);
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 30}ms`;
    });
  }
  initServiceStagger();

  /* ═══════════════════════════════════════════════════════════
     COPY hero image → assets folder reference
     (use generated image if available)
  ═══════════════════════════════════════════════════════════ */
  function checkHeroImg() {
    const img = qs('.hero-img');
    if (img) {
      img.onerror = () => { img.style.display = 'none'; };
    }
  }
  checkHeroImg();

  /* ═══════════════════════════════════════════════════════════
     LOGO text sparkle on hover
  ═══════════════════════════════════════════════════════════ */
  function initLogoSparkle() {
    const logo = qs('.nav-logo .logo-text');
    if (!logo) return;
    logo.style.cursor = 'default';
    logo.addEventListener('mouseover', () => {
      logo.style.filter = 'drop-shadow(0 0 12px rgba(99,102,241,.6))';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.filter = '';
    });
  }
  initLogoSparkle();

  console.log('%c مرقمن', 'color:#6366f1;font-size:1.5rem;font-weight:bold;');
  console.log('%c Built with passion · مبني بشغف', 'color:#94a3b8;font-size:.9rem;');

})();
