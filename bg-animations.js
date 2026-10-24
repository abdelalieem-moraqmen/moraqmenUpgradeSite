/**
 * مرقمن — Animated Background Engine
 * frontend-design skill applied:
 *   • Subject-grounded: Software company → tech ecosystem visuals
 *   • Intentional, non-generic aesthetic choices
 *   • Three layered animations: Binary Nodes · Binary Rain · Code Orbits
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     1. HERO — SOFTWARE ECOSYSTEM
     API, database, app, cloud, and other systems connected by
     subtle animated data packets; intentionally no background grid.
  ═══════════════════════════════════════════════════════════ */
  class TechEcosystem {
    constructor(container) {
      this.container = container;
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'techBgCanvas';
      this.canvas.setAttribute('aria-hidden', 'true');
      this.canvas.style.cssText = `
        position:absolute; inset:0;
        width:100%; height:100%; display:block;
        pointer-events:none; z-index:0; opacity:.9;
      `;
      container.style.position = 'relative';
      container.prepend(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.nodes = [
        { label: 'API', icon: '\uf121', color: '#38CAB0', x: .13, y: .27 },
        { label: 'DATABASE', icon: '\uf1c0', color: '#60a5fa', x: .34, y: .68 },
        { label: 'APP', icon: '\uf3cd', color: '#a78bfa', x: .53, y: .30 },
        { label: 'CLOUD', icon: '\uf0c2', color: '#22d3ee', x: .76, y: .62 },
        { label: 'AUTH', icon: '\uf023', color: '#818cf8', x: .22, y: .78 },
        { label: 'GIT', icon: '\uf126', color: '#38CAB0', x: .87, y: .27 },
        { label: 'MOBILE', icon: '\uf10b', color: '#60a5fa', x: .62, y: .82 },
        { label: 'SERVER', icon: '\uf233', color: '#a78bfa', x: .44, y: .48 },
      ];
      this.edges = [[0,7],[7,1],[7,2],[2,5],[5,3],[3,6],[1,4],[4,7],[2,3],[0,4]];
      this.packets = this.edges.map(([from, to], index) => ({
        from,
        to,
        progress: (index * .137) % 1,
        speed: .0018 + (index % 3) * .0007,
        direction: index % 2 ? -1 : 1,
      }));
      this.time = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._resize();
      window.addEventListener('resize', () => this._resize(), { passive: true });
      this._loop();
    }

    _resize() {
      const { offsetWidth: w, offsetHeight: h } = this.container;
      this.W = w;
      this.H = h;
      this.canvas.width  = w * this.dpr;
      this.canvas.height = h * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    _nodePosition(node, index) {
      return {
        x: node.x * this.W,
        y: node.y * this.H + (this.reducedMotion ? 0 : Math.sin(this.time * .018 + index) * 5),
      };
    }

    _drawEdge(from, to) {
      const ctx = this.ctx;
      const start = this._nodePosition(this.nodes[from], from);
      const end = this._nodePosition(this.nodes[to], to);
      const curveX = (start.y - end.y) * .12;
      const curveY = (end.x - start.x) * .12;

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.quadraticCurveTo(
        (start.x + end.x) / 2 + curveX,
        (start.y + end.y) / 2 + curveY,
        end.x,
        end.y
      );
      ctx.strokeStyle = 'rgba(129,140,248,.2)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    _drawPacket(packet) {
      const ctx = this.ctx;
      const start = this._nodePosition(this.nodes[packet.from], packet.from);
      const end = this._nodePosition(this.nodes[packet.to], packet.to);
      const t = packet.direction > 0 ? packet.progress : 1 - packet.progress;
      const curveX = (start.y - end.y) * .12;
      const curveY = (end.x - start.x) * .12;
      const controlX = (start.x + end.x) / 2 + curveX;
      const controlY = (start.y + end.y) / 2 + curveY;
      const x = (1 - t) ** 2 * start.x + 2 * (1 - t) * t * controlX + t ** 2 * end.x;
      const y = (1 - t) ** 2 * start.y + 2 * (1 - t) * t * controlY + t ** 2 * end.y;

      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = this.nodes[packet.from].color;
      ctx.shadowColor = this.nodes[packet.from].color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    _drawNode(node, index) {
      const ctx = this.ctx;
      const { x, y } = this._nodePosition(node, index);
      const pulse = this.reducedMotion ? 1 : .5 + (Math.sin(this.time * .045 + index) + 1) * .25;
      const radius = 23;

      const glow = ctx.createRadialGradient(x, y, radius * .35, x, y, radius * 2.2);
      glow.addColorStop(0, `${node.color}35`);
      glow.addColorStop(1, `${node.color}00`);
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.2 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15,23,42,.88)';
      ctx.fill();
      ctx.strokeStyle = `${node.color}bb`;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 13px "Font Awesome 6 Free"';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(node.icon, x, y);
      ctx.font = '600 9px "Cairo", sans-serif';
      ctx.fillStyle = node.color;
      ctx.fillText(node.label, x, y + radius + 12);
    }

    _loop() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);
      this.time++;

      this.edges.forEach(([from, to]) => this._drawEdge(from, to));
      if (!this.reducedMotion) {
        this.packets.forEach(packet => {
          packet.progress += packet.speed;
          if (packet.progress >= 1) packet.progress = 0;
          this._drawPacket(packet);
        });
      }
      this.nodes.forEach((node, index) => this._drawNode(node, index));

      if (!this.reducedMotion) {
        requestAnimationFrame(() => this._loop());
      }
    }
  }

  /* ═══════════════════════════════════════════════════════════
     2. BINARY RAIN — subtle column rain in dark sections
     Only in stats / cta sections — legibility maintained
  ═══════════════════════════════════════════════════════════ */
  class BinaryRain {
    constructor(container, opts = {}) {
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = `
        position:absolute; inset:0; width:100%; height:100%;
        pointer-events:none; z-index:0; opacity:${opts.opacity || .18};
      `;
      container.style.position = 'relative';
      container.prepend(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.chars = '01アイウエオカキクケコ<>/{}[]=>|';
      this.color = opts.color || '#6366f1';
      this.fontSize = 12;
      this.columns = 0;
      this.drops = [];
      this._resize(container);
      window.addEventListener('resize', () => this._resize(container), { passive: true });
      this._loop();
    }

    _resize(container) {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      this.canvas.width  = w;
      this.canvas.height = h;
      this.W = w; this.H = h;
      this.columns = Math.ceil(w / this.fontSize);
      // Keep existing drops, add new ones
      while (this.drops.length < this.columns) {
        this.drops.push(-Math.random() * this.H / this.fontSize);
      }
      this.drops.length = this.columns;
    }

    _loop() {
      const ctx = this.ctx;
      ctx.fillStyle = 'rgba(0,0,0,.08)';
      ctx.fillRect(0, 0, this.W, this.H);

      ctx.font = `${this.fontSize}px "Courier New", monospace`;

      this.drops.forEach((y, i) => {
        const char = this.chars[Math.floor(Math.random() * this.chars.length)];
        const progress = (y * this.fontSize) / this.H;

        // Gradient fade: bright head, fading tail
        const alpha = Math.min(1, progress < .1 ? 1 : 1 - (progress - .1) / .9);
        ctx.fillStyle = i % 5 === 0
          ? `rgba(255,255,255,${alpha * .9})`
          : `${this.color}${Math.floor(alpha * 200).toString(16).padStart(2,'0')}`;

        ctx.fillText(char, i * this.fontSize, y * this.fontSize);
        this.drops[i] = (y * this.fontSize > this.H && Math.random() > .975)
          ? 0
          : y + 1;
      });

      requestAnimationFrame(() => this._loop());
    }
  }

  /* ═══════════════════════════════════════════════════════════
     3. ORBIT RINGS — services section background
     Concentric rings with rotating code keywords
     (API, React, Node, SQL, Swift, Kotlin, Docker, Git)
  ═══════════════════════════════════════════════════════════ */
  class OrbitRings {
    constructor(container) {
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = `
        position:absolute; inset:0; width:100%; height:100%;
        pointer-events:none; z-index:0; opacity:.55;
      `;
      container.style.position = 'relative';
      container.prepend(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this._resize(container);
      window.addEventListener('resize', () => this._resize(container), { passive: true });

      this.rings = [
        { r: 180, speed: .0006, offset: 0,   color: '#6366f133',
          tokens: ['API', 'REST', 'GraphQL', 'gRPC'] },
        { r: 280, speed:-.0004, offset: 1.2, color: '#3b82f622',
          tokens: ['React', 'Next.js', 'Vue', 'Svelte'] },
        { r: 380, speed: .0003, offset: 2.4, color: '#7c3aed18',
          tokens: ['Node', 'Python', 'Go', 'Rust', 'Swift'] },
        { r: 480, speed:-.0002, offset: .8, color: '#0ea5e910',
          tokens: ['Docker', 'K8s', 'CI/CD', 'Git', 'AWS'] },
      ];
      this.angles = this.rings.map(r => r.offset);
      this._loop();
    }

    _resize(container) {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      this.canvas.width  = w * this.dpr;
      this.canvas.height = h * this.dpr;
      this.canvas.style.width  = w + 'px';
      this.canvas.style.height = h + 'px';
      this.ctx.scale(this.dpr, this.dpr);
      this.W = w; this.H = h;
      this.cx = w / 2;
      this.cy = h / 2;
    }

    _loop() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);

      this.rings.forEach((ring, ri) => {
        this.angles[ri] += ring.speed;
        const angle = this.angles[ri];

        // Draw ring arc
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw tokens along ring
        ring.tokens.forEach((token, ti) => {
          const a = angle + (Math.PI * 2 / ring.tokens.length) * ti;
          const x = this.cx + Math.cos(a) * ring.r;
          const y = this.cy + Math.sin(a) * ring.r;

          // Token dot
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = ring.color.replace(/[\d.]+\)$/, '1)');
          ctx.fill();

          // Token label
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(a + Math.PI / 2);
          ctx.font = 'bold 9px "Courier New", monospace';
          ctx.fillStyle = ring.color.replace(/[\d.]+\)$/, '.7)');
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(token, 0, -14);
          ctx.restore();
        });
      });

      requestAnimationFrame(() => this._loop());
    }
  }

  /* ═══════════════════════════════════════════════════════════
     4. PROCESS SECTION — flowing pipe animation
     Horizontal data flow: business → idea → code → product
  ═══════════════════════════════════════════════════════════ */
  class DataFlow {
    constructor(container) {
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = `
        position:absolute; inset:0; width:100%; height:100%;
        pointer-events:none; z-index:0; opacity:.3;
      `;
      container.style.position = 'relative';
      container.prepend(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this._resize(container);
      window.addEventListener('resize', () => this._resize(container), { passive: true });
      this._seedParticles();
      this._loop();
    }

    _resize(container) {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      this.canvas.width = w;
      this.canvas.height = h;
      this.W = w; this.H = h;
    }

    _seedParticles() {
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: Math.random() * this.W,
          y: Math.random() * this.H,
          vx: .8 + Math.random() * 1.2,
          vy: (Math.random() - .5) * .3,
          size: 1.5 + Math.random() * 2,
          color: ['#6366f1','#3b82f6','#7c3aed','#0ea5e9'][Math.floor(Math.random()*4)],
          trail: [],
        });
      }
    }

    _loop() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);

      this.particles.forEach(p => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x > this.W + 20) { p.x = -10; p.y = Math.random() * this.H; p.trail = []; }

        // Draw trail
        for (let i = 1; i < p.trail.length; i++) {
          ctx.beginPath();
          ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y);
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
          ctx.strokeStyle = p.color + Math.floor((i / p.trail.length) * 120).toString(16).padStart(2,'0');
          ctx.lineWidth = p.size * (i / p.trail.length);
          ctx.stroke();
        }

        // Head dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(() => this._loop());
    }
  }

  /* ═══════════════════════════════════════════════════════════
     5. TESTIMONIALS — ambient floating code fragments
  ═══════════════════════════════════════════════════════════ */
  class CodeFragments {
    constructor(container) {
      this.canvas = document.createElement('canvas');
      this.canvas.style.cssText = `
        position:absolute; inset:0; width:100%; height:100%;
        pointer-events:none; z-index:0; opacity:.07;
      `;
      container.style.position = 'relative';
      container.prepend(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this._resize(container);
      window.addEventListener('resize', () => this._resize(container), { passive: true });

      const snippets = [
        'const app = express();',
        'git commit -m "feat"',
        'npm run build',
        'SELECT * FROM users',
        'docker build -t app .',
        'async function deploy()',
        'kubectl apply -f k8s/',
        'yarn add moraqmen-sdk',
        '{ status: 200 }',
        'export default App',
        'import React from',
        '@GetMapping("/api")',
        'SwiftUI.View',
        'return res.json()',
      ];

      this.frags = Array.from({ length: 14 }, (_, i) => ({
        text: snippets[i % snippets.length],
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vx: (Math.random() - .5) * .2,
        vy: (Math.random() - .5) * .2,
        alpha: .3 + Math.random() * .5,
        size: 10 + Math.random() * 4,
        color: ['#6366f1','#7c3aed','#3b82f6'][Math.floor(Math.random()*3)],
      }));

      this._loop();
    }

    _resize(container) {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      this.canvas.width = w;
      this.canvas.height = h;
      this.W = w; this.H = h;
    }

    _loop() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);

      this.frags.forEach(f => {
        f.x += f.vx; f.y += f.vy;
        if (f.x < -200) f.x = this.W + 50;
        if (f.x > this.W + 200) f.x = -50;
        if (f.y < 0) f.y = this.H;
        if (f.y > this.H) f.y = 0;

        ctx.font = `${f.size}px "Courier New", monospace`;
        ctx.fillStyle = f.color;
        ctx.globalAlpha = f.alpha;
        ctx.fillText(f.text, f.x, f.y);
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(() => this._loop());
    }
  }

  /* ═══════════════════════════════════════════════════════════
     BOOT: attach each animation to its section
  ═══════════════════════════════════════════════════════════ */
  function boot() {
    // 1. Hero — restrained binary nodes
    const hero = document.querySelector('.hero');
    if (hero) {
      new TechEcosystem(hero);
    }

    // 2. Stats — binary rain (dark section)
    const stats = document.querySelector('.stats');
    if (stats) new BinaryRain(stats, { opacity: .15, color: '#6366f1' });

    // 3. CTA — binary rain (dark section)
    const cta = document.querySelector('.cta-section');
    if (cta) new BinaryRain(cta, { opacity: .12, color: '#818cf8' });

    // 4. Services — orbit rings (light section)
    const services = document.querySelector('.services');
    if (services) new OrbitRings(services);

    // 5. Process — data flow (left-to-right particles)
    const process = document.querySelector('.process');
    if (process) new DataFlow(process);

    // 6. Testimonials — floating code fragments
    const testimonials = document.querySelector('.testimonials');
    if (testimonials) new CodeFragments(testimonials);
  }

  // Run after page loads (so existing script.js still fires too)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
