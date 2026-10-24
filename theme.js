/**
 * مرقمن — Day / Night Theme Engine
 * Toggles data-theme="dark" | "light" on <html>
 * Dispatches window 'themeChange' event for 3D engine
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'moraqmen_theme';
  const DEFAULT     = 'dark';

  /* ── apply theme ─────────────────────────────── */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(STORAGE_KEY, t);

    /* update toggle button icon */
    const btn  = document.getElementById('themeToggle');
    if (btn) {
      const icon  = btn.querySelector('.theme-icon');
      const label = btn.querySelector('.theme-label');
      if (icon) icon.className = `theme-icon fa-solid ${t === 'dark' ? 'fa-sun' : 'fa-moon'}`;
      if (label) label.textContent = t === 'dark' ? 'Day'  : 'Night';
    }

    /* notify 3D engine */
    window.dispatchEvent(new CustomEvent('themeChange', { detail: t }));
  }

  /* ── toggle ──────────────────────────────────── */
  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || DEFAULT;
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* ── init ────────────────────────────────────── */
  (function init() {
    const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT;
    /* Apply immediately (before DOMContentLoaded) to avoid flash */
    document.documentElement.setAttribute('data-theme', saved);

    document.addEventListener('DOMContentLoaded', () => {
      applyTheme(saved);      /* re-run to sync button icon */

      const btn = document.getElementById('themeToggle');
      if (btn) btn.addEventListener('click', toggle);
    });
  })();
})();
