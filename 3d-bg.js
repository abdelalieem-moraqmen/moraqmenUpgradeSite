/**
 * مرقمن — 3D Tech Background  v2
 * Colorful wireframe / edge objects · Scroll parallax · Day/Night aware
 * Requires THREE (r134) already on window
 */
(function () {
  'use strict';

  /* ─── wait for THREE ────────────────────────────────── */
  function boot() {
    if (typeof THREE === 'undefined') { setTimeout(boot, 60); return; }
    init();
  }

  /* ─── colour palettes ───────────────────────────────── */
  const NIGHT = [
    0xFF6B6B,   // coral
    0xFF9F43,   // orange
    0xFFD700,   // gold
    0x38CAB0,   // teal
    0x00F5FF,   // cyan
    0x7C8CF8,   // indigo
    0xFF6EB4,   // hot pink
    0x39FF14,   // electric green
    0xA78BFA,   // violet
    0x192999,   // navy
  ];

  const DAY = [
    0xE63946,   // red
    0xF4A261,   // warm orange
    0xE9C46A,   // golden
    0x2A9D8F,   // darker teal
    0x0096C7,   // ocean blue
    0x4361EE,   // royal blue
    0xD62598,   // pink
    0x06A77D,   // forest green
    0x7400B8,   // purple
    0x00B4D8,   // light blue
  ];

  let COLORS = NIGHT;
  let isDark  = true;

  /* ─── global THREE state ─────────────────────────────── */
  let scene, camera, renderer;
  let objects = [];
  let particles, particleMat;
  let scrollY = 0, targetScrollY = 0;
  let mouseX = 0, mouseY = 0;
  let time   = 0;

  /* ─── init ───────────────────────────────────────────── */
  function init() {
    /* canvas */
    const canvas    = document.createElement('canvas');
    canvas.id       = 'techCanvas3D';
    canvas.style.cssText = `
      position:fixed;top:0;left:0;
      width:100vw;height:100vh;
      pointer-events:none;z-index:0;
    `;
    document.body.prepend(canvas);

    /* renderer */
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    /* scene / camera */
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(0, 0, 520);

    /* read current theme */
    syncTheme();
    buildScene();
    bindEvents();
    animate();
  }

  /* ─── sync theme from HTML attribute ────────────────── */
  function syncTheme() {
    isDark  = document.documentElement.getAttribute('data-theme') !== 'light';
    COLORS  = isDark ? NIGHT : DAY;
  }

  /* ─── helpers ────────────────────────────────────────── */
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function pick(arr, i) {
    return arr[i % arr.length];
  }

  function wireMat(c, op) {
    return new THREE.MeshBasicMaterial({
      color: c, wireframe: true, transparent: true, opacity: op,
    });
  }
  function edgeMat(c, op) {
    return new THREE.LineBasicMaterial({
      color: c, transparent: true, opacity: op,
    });
  }
  function edgeMesh(geo, c, op) {
    return new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat(c, op));
  }

  /* ─── build the scene ────────────────────────────────── */
  function buildScene() {
    objects = [];

    /* spread across the page height in 3-D
       Y 0 → hero, Y -2400 → footer
       each object: { mesh, baseY, baseX, scrollF, rv:{x,y,z}, phase, floatA } */

    const specs = [
      /* HERO ── top ─────────────────── */
      { geo: new THREE.IcosahedronGeometry(75, 1), x:  340, y:   80, z: -280, s:  1, sf: 0.16, rv:[0.003,0.005,0.001], ci: 0 },
      { geo: new THREE.TorusGeometry(55,15,8,24),  x: -310, y:  110, z: -200, s:  1, sf: 0.12, rv:[0.005,0.002,0.004], ci: 4 },
      { geo: new THREE.BoxGeometry(80,80,80),       x:  200, y:  -60, z: -350, s:  1, sf: 0.20, rv:[0.004,0.003,0.005], ci: 6 },
      { geo: new THREE.OctahedronGeometry(60, 0),  x: -190, y:  -90, z: -180, s:  1, sf: 0.10, rv:[0.002,0.006,0.003], ci: 9 },

      /* SERVICES ── mid-top ─────────── */
      { geo: new THREE.TorusKnotGeometry(48,13,80,8), x:  380, y: -300, z: -320, s: 1, sf: 0.28, rv:[0.002,0.004,0.003], ci: 1 },
      { geo: new THREE.IcosahedronGeometry(68, 2),    x: -340, y: -350, z: -200, s: 1, sf: 0.24, rv:[0.003,0.003,0.002], ci: 3 },
      { geo: new THREE.TorusGeometry(52,13,8,20),     x: -130, y: -500, z: -260, s: 1, sf: 0.18, rv:[0.005,0.004,0.001], ci: 7 },
      { geo: new THREE.BoxGeometry(70,70,70),          x:  260, y: -520, z: -160, s: 1, sf: 0.16, rv:[0.004,0.005,0.003], ci: 2 },

      /* PROCESS ── mid ──────────────── */
      { geo: new THREE.OctahedronGeometry(55, 1),     x: -370, y: -720, z: -300, s: 1, sf: 0.32, rv:[0.003,0.002,0.005], ci: 5 },
      { geo: new THREE.IcosahedronGeometry(72, 1),    x:  310, y: -760, z: -340, s: 1, sf: 0.30, rv:[0.002,0.004,0.002], ci: 8 },
      { geo: new THREE.TorusGeometry(58,14,10,22),    x: -160, y: -940, z: -220, s: 1, sf: 0.26, rv:[0.004,0.003,0.004], ci: 0 },

      /* PROJECTS / WHY ─────────────── */
      { geo: new THREE.TorusKnotGeometry(44,12,64,8), x:  360, y:-1080, z: -360, s: 1, sf: 0.38, rv:[0.003,0.003,0.003], ci: 4 },
      { geo: new THREE.BoxGeometry(85,85,85),          x: -350, y:-1120, z: -220, s: 1, sf: 0.34, rv:[0.005,0.002,0.003], ci: 6 },
      { geo: new THREE.OctahedronGeometry(62, 0),     x:  180, y:-1320, z: -180, s: 1, sf: 0.40, rv:[0.002,0.005,0.002], ci: 2 },
      { geo: new THREE.IcosahedronGeometry(78, 2),    x: -290, y:-1480, z: -300, s: 1, sf: 0.36, rv:[0.003,0.004,0.004], ci: 7 },

      /* FAQ / CTA ──────────────────── */
      { geo: new THREE.TorusGeometry(62,15,8,18),     x:  340, y:-1660, z: -250, s: 1, sf: 0.44, rv:[0.004,0.002,0.004], ci: 9 },
      { geo: new THREE.TorusKnotGeometry(40,11,60,7), x: -310, y:-1720, z: -310, s: 1, sf: 0.42, rv:[0.002,0.004,0.005], ci: 1 },
      { geo: new THREE.IcosahedronGeometry(65, 1),    x: -150, y:-1900, z: -200, s: 1, sf: 0.46, rv:[0.005,0.003,0.002], ci: 5 },

      /* CONTACT / FOOTER ───────────── */
      { geo: new THREE.BoxGeometry(90,90,90),          x:  320, y:-2100, z: -270, s: 1, sf: 0.50, rv:[0.003,0.005,0.003], ci: 3 },
      { geo: new THREE.TorusGeometry(66,16,10,24),    x: -370, y:-2180, z: -220, s: 1, sf: 0.52, rv:[0.004,0.002,0.004], ci: 8 },
      { geo: new THREE.OctahedronGeometry(58, 1),     x:  160, y:-2320, z: -260, s: 1, sf: 0.54, rv:[0.002,0.004,0.003], ci: 0 },
    ];

    specs.forEach((s, i) => {
      const c  = pick(COLORS, s.ci);
      const op = isDark ? 0.38 : 0.28;

      /* alternate between wireframe and edgeMesh for variety */
      let mesh;
      if (i % 3 === 0) {
        mesh = edgeMesh(s.geo, c, op + 0.04);
      } else {
        mesh = new THREE.Mesh(s.geo, wireMat(c, op));
      }

      mesh.position.set(s.x, s.y, s.z);
      mesh.rotation.set(rnd(0, Math.PI * 2), rnd(0, Math.PI * 2), rnd(0, Math.PI * 2));
      scene.add(mesh);

      objects.push({
        mesh,
        baseX:  s.x,
        baseY:  s.y,
        scrollF: s.sf,
        rv:     s.rv,
        phase:  rnd(0, Math.PI * 2),
        floatA: rnd(8, 18),
        ci:     s.ci,
      });
    });

    buildParticles();
  }

  /* ─── ambient particles ─────────────────────────────── */
  function buildParticles() {
    if (particles) { scene.remove(particles); particles.geometry.dispose(); }

    const count = 240;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = rnd(-480, 480);
      pos[i * 3 + 1] = rnd(-2600, 200);
      pos[i * 3 + 2] = rnd(-500, -50);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particleMat = new THREE.PointsMaterial({
      color:       isDark ? 0x38CAB0 : 0x0096C7,
      size:        isDark ? 2.8 : 2.2,
      transparent: true,
      opacity:     isDark ? 0.45 : 0.35,
    });
    particles = new THREE.Points(geo, particleMat);
    scene.add(particles);
  }

  /* ─── rebuild scene when theme changes ──────────────── */
  function rebuildForTheme() {
    // remove old meshes
    objects.forEach(o => scene.remove(o.mesh));
    syncTheme();
    buildScene();
  }

  /* ─── events ─────────────────────────────────────────── */
  function bindEvents() {
    window.addEventListener('scroll',      () => { targetScrollY = window.scrollY; }, { passive: true });
    window.addEventListener('mousemove',   e  => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    /* theme change event */
    window.addEventListener('themeChange', () => { rebuildForTheme(); });
  }

  /* ─── animation loop ─────────────────────────────────── */
  function animate() {
    requestAnimationFrame(animate);
    time += 0.009;

    /* smooth scroll */
    scrollY += (targetScrollY - scrollY) * 0.07;

    /* camera follows mouse gently */
    camera.position.x += (mouseX * 22 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 14 - camera.position.y) * 0.04;
    camera.lookAt(0, -scrollY * 0.05, 0);

    /* update each object */
    objects.forEach(o => {
      /* rotation */
      o.mesh.rotation.x += o.rv[0];
      o.mesh.rotation.y += o.rv[1];
      o.mesh.rotation.z += o.rv[2];

      /* float + scroll parallax */
      const fl = Math.sin(time + o.phase) * o.floatA;
      o.mesh.position.y = o.baseY + fl + scrollY * o.scrollF;

      /* subtle mouse parallax on X */
      o.mesh.position.x = o.baseX + mouseX * 10;

      /* pulse opacity on night mode */
      if (isDark) {
        const mat = o.mesh.material;
        if (mat && mat.opacity !== undefined) {
          mat.opacity = 0.28 + Math.sin(time * 1.3 + o.phase) * 0.10;
        }
      }
    });

    /* particles follow scroll */
    particles.position.y = scrollY * 0.32;

    renderer.render(scene, camera);
  }

  boot();
})();
