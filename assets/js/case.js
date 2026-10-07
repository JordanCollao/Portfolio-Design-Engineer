/* ============================================================
   CASE STUDY behaviour: shared by every case-*.html
   body[data-start][data-end] (fractional years, "now" allowed) drive the track.
   ============================================================ */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // "now" is today, so active bars keep growing; the axis ends at the end of the current year
  const today = new Date(), NOW = today.getFullYear() + (today.getMonth() + 0.5) / 12;
  const START = 2021, END = today.getFullYear() + 1, SPAN = END - START;
  const pct = y => ((y - START) / SPAN * 100).toFixed(3) + '%';

  // Project track: ruler ticks, this project's bar, the "now" playhead
  const track = document.querySelector('.c-track');
  if (track) {
    const ticks = track.querySelector('.c-ticks');
    for (let y = START; y < END; y++) {
      const t = document.createElement('span');
      t.className = 'tick'; t.style.left = pct(y); t.textContent = y;
      ticks.appendChild(t);
    }
    const ds = document.body.dataset;
    const s = +ds.start, e = ds.end === 'now' ? NOW : +ds.end;
    const bar = track.querySelector('.bar');
    bar.style.setProperty('--x', pct(s));
    bar.style.setProperty('--w', ((e - s) / SPAN * 100).toFixed(3) + '%');

    track.style.setProperty('--cols', SPAN);
    const now = document.createElement('div');
    now.className = 'now'; now.innerHTML = '<span>now</span>';
    track.style.position = 'relative'; track.appendChild(now);
    const placeNow = () => {
      const l = ticks.getBoundingClientRect(), t = track.getBoundingClientRect();
      now.style.left = (l.left - t.left + l.width * (NOW - START) / SPAN) + 'px';
    };
    placeNow(); addEventListener('resize', placeNow);
  }

  // Hero: one playhead sweep on load (static when arriving through the curtain or with reduced motion)
  const hero = document.querySelector('.c-hero');
  if (hero) {
    if (reduce || window.__fromCurtain) hero.classList.add('played', 'instant');
    else requestAnimationFrame(() => hero.classList.add('played'));
  }

  // Section nav: mark the link of the section crossing the upper part of the viewport
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  if (links.length) {
    const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const setOn = id => links.forEach(a => {
      const on = a === byId.get(id);
      a.classList.toggle('on', on);
      on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
    });
    const spy = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) setOn(en.target.id); }),
      { rootMargin: '-30% 0px -60% 0px' });
    byId.forEach((a, id) => { const sec = document.getElementById(id); if (sec) spy.observe(sec); });
    // Above the first section nothing is marked
    addEventListener('scroll', () => {
      const first = document.getElementById(links[0].getAttribute('href').slice(1));
      if (first && first.getBoundingClientRect().top > innerHeight * 0.3) setOn(null);
    }, { passive: true });
  }

  // Reading playhead along the header edge
  const head = document.querySelector('.read-head');
  if (head) {
    let tick = false;
    const update = () => {
      tick = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      head.style.setProperty('--read', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update); update();
  }
})();
