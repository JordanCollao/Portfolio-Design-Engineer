/* Clipped-text check (rule 8 of DESIGN-BRIEF.md)
   Paste into the browser console on any page of the site (served over http, e.g. localhost:8765)
   and run:  await checkClippedText()
   It loads every page in a hidden iframe at 390, 820 and 1440px, jumps entrance animations to their
   end state, and reports any text whose glyph box (including descenders and accents) falls outside
   an ancestor that clips: overflow other than visible, or clip-path: inset(...).
   Expected result: { checked: N, clipped: 'none' } */
async function checkClippedText(pages = [
  '/index.html',
  '/case-tastemakers.html', '/case-hidroroots.html', '/case-progresol.html', '/case-unacem360.html',
  '/case-cantera.html', '/case-vitamin.html', '/case-gawq.html', '/case-cometa.html',
  '/lab-motion-tokens.html', '/lab-image-compressor.html', '/lab-luz.html', '/lab-audio-extractor.html',
  '/404.html',
], widths = [390, 820, 1440]) {
  const px = (v, base) => v.endsWith('%') ? parseFloat(v) / 100 * base : parseFloat(v) || 0;

  async function check(path, width) {
    const f = document.createElement('iframe');
    f.style.cssText = `position:fixed;left:0;top:0;width:${width}px;height:900px;opacity:0;pointer-events:none`;
    const loaded = new Promise(r => f.addEventListener('load', r));
    f.src = path + '?cc=' + Date.now();
    document.body.appendChild(f);
    await loaded;
    await new Promise(r => setTimeout(r, 500));
    const d = f.contentDocument, w = f.contentWindow;

    // End state of every entrance animation
    const st = d.createElement('style');
    st.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}';
    d.head.appendChild(st);
    d.querySelectorAll('.hero-v,.c-hero').forEach(h => h.classList.add('played', 'instant'));
    d.body.classList.add('loaded');
    d.getElementById('loader')?.classList.add('done');
    d.querySelectorAll('.xp-row').forEach(r => r.classList.add('in'));
    await new Promise(r => setTimeout(r, 100));

    const clipBox = el => {
      const cs = w.getComputedStyle(el), r = el.getBoundingClientRect();
      let box = null;
      if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
        box = {
          l: cs.overflowX !== 'visible' ? r.left : -1e9, r: cs.overflowX !== 'visible' ? r.right : 1e9,
          t: cs.overflowY !== 'visible' ? r.top : -1e9, b: cs.overflowY !== 'visible' ? r.bottom : 1e9,
        };
      }
      const m = cs.clipPath.match(/^inset\(([^)]*)\)/);
      if (m) {
        let p = m[1].split(/\s+/);
        if (p.length === 1) p = [p[0], p[0], p[0], p[0]];
        else if (p.length === 2) p = [p[0], p[1], p[0], p[1]];
        else if (p.length === 3) p = [p[0], p[1], p[2], p[1]];
        const c = { t: r.top + px(p[0], r.height), r: r.right - px(p[1], r.width), b: r.bottom - px(p[2], r.height), l: r.left + px(p[3], r.width) };
        box = box ? { l: Math.max(box.l, c.l), r: Math.min(box.r, c.r), t: Math.max(box.t, c.t), b: Math.min(box.b, c.b) } : c;
      }
      return box;
    };

    const bad = [];
    const walker = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      // The IconScout reel and the overlays clip on purpose
      if (el.closest('.reel,.curtain,.loader,script,style,noscript,.skip-link,svg')) continue;
      const cs = w.getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || cs.opacity === '0') continue;
      const range = d.createRange();
      range.selectNodeContents(n);
      for (const rr of range.getClientRects()) {
        if (!rr.width) continue;
        for (let a = el; a && a !== d.documentElement; a = a.parentElement) {
          const b = clipBox(a);
          if (!b) continue;
          const over = Math.max(b.t - rr.top, rr.bottom - b.b, b.l - rr.left, rr.right - b.r);
          if (over > 1) { bad.push({ text: n.textContent.trim().slice(0, 40), cut: Math.round(over) + 'px', by: String(a.className || a.tagName).slice(0, 40) }); break; }
        }
      }
    }
    f.remove();
    return bad;
  }

  const out = {};
  let checked = 0;
  for (const p of pages) for (const w of widths) {
    checked++;
    const r = await check(p, w);
    if (r.length) out[`${p} @${w}`] = r;
  }
  return { checked, clipped: Object.keys(out).length ? out : 'none' };
}
