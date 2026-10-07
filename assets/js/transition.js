/* ============================================================
   PAGE TRANSITION CURTAIN: shared by case and lab pages.
   Same contract as index.html: sessionStorage 'curtain-transition' = '1'
   tells the next page it was reached through the curtain.
   Load this synchronously right after the #curtain element so the
   pre-cover happens before the first paint and the scroll restore.
   ============================================================ */
(function () {
  const curtain = document.getElementById('curtain');
  if (!curtain) return;

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SLIDE_IN_MS = reduceMotion ? 200 : 600;
  const HOLD_MS = reduceMotion ? 0 : 300;
  const SLIDE_OUT_MS = reduceMotion ? 200 : 600;

  // ---------- PRE-COVER: arrived through the curtain → cover instantly ----------
  const fromCurtain = sessionStorage.getItem('curtain-transition') === '1';
  window.__fromCurtain = fromCurtain;
  if (fromCurtain) {
    sessionStorage.removeItem('curtain-transition');
    curtain.style.transition = 'none';
    curtain.classList.add('in');
    void curtain.offsetHeight;

    // Slide out once the page has loaded (and scroll restore is done), with a short hold
    const start = performance.now();
    const reveal = () => requestAnimationFrame(() => {
      curtain.style.transition = '';
      void curtain.offsetHeight;
      requestAnimationFrame(() => {
        curtain.classList.remove('in');
        curtain.classList.add('out');
        setTimeout(() => curtain.classList.remove('out'), SLIDE_OUT_MS + 50);
      });
    });
    const tryReveal = () => {
      const elapsed = performance.now() - start;
      if ((document.readyState === 'complete' && elapsed >= HOLD_MS + 200) || elapsed >= 3000) reveal();
      else setTimeout(tryReveal, 50);
    };
    requestAnimationFrame(tryReveal);
  }

  // ---------- EXIT: cover the screen, then navigate ----------
  function isInternalLink(a) {
    if (!a || !a.href || a.target === '_blank' || a.hasAttribute('download')) return false;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    try {
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return false;
      return !(url.pathname === location.pathname && url.search === location.search);
    } catch { return false; }
  }

  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a');
    if (!isInternalLink(a)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    curtain.classList.remove('out');
    curtain.classList.add('in');
    sessionStorage.setItem('curtain-transition', '1');
    setTimeout(() => { location.href = a.href; }, SLIDE_IN_MS + HOLD_MS);
  });

  // Back/forward from bfcache: never leave the curtain covering the page
  addEventListener('pageshow', e => {
    if (e.persisted) { curtain.classList.remove('in', 'out'); curtain.style.transition = ''; }
  });
})();
