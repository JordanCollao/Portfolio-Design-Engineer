/* ============================================================
   SITE BEHAVIOUR (shared by every page): cursor, Lima clock, reveal on scroll,
   section nav (marks the section in view), reading progress, marquee loop.
   ============================================================ */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Live Lima clock (only where #clock exists)
  const clock = document.getElementById('clock');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit' });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 15000);
  }

  // Marquee: duplicate the set so the loop never shows a gap
  document.querySelectorAll('.marquee-track').forEach(t => { t.innerHTML += t.innerHTML; });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in'); io.unobserve(en.target);
  }), { threshold: .15 });
  document.querySelectorAll('.rise, .notes').forEach(el => io.observe(el));

  // CURSOR: the dot follows exactly, the ring trails; links grow it, [data-cursor] turns it into a labelled disc
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.createElement('div'), ring = document.createElement('div'), label = document.createElement('span');
    dot.className = 'c-dot away'; ring.className = 'c-ring away'; ring.appendChild(label);
    dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring); document.documentElement.classList.add('has-cursor');
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      dot.classList.remove('away'); ring.classList.remove('away');
    });
    (function follow() {
      rx += (mx - rx) * .18; ry += (my - ry) * .18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(follow);
    })();
    addEventListener('mouseover', e => {
      const t = e.target.closest('a, button, [data-cursor]');
      const host = t && t.closest('[data-cursor]');
      const text = host ? host.dataset.cursor : '';
      ring.classList.toggle('is-hot', !!t && !text);
      ring.classList.toggle('is-label', !!text);
      dot.classList.toggle('hide', !!text);
      label.textContent = text;
    });
    addEventListener('mousedown', () => ring.classList.add('is-press'));
    addEventListener('mouseup', () => ring.classList.remove('is-press'));
    document.addEventListener('mouseleave', () => { dot.classList.add('away'); ring.classList.add('away'); });
  }

  // Section nav (case and lab pages): mark the link of the section in view
  const links = [...document.querySelectorAll('.links a[href^="#"]')].filter(a => a.getAttribute('href').length > 1);
  const sections = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if (sections.length && document.body.classList.contains('page')) {
    const setOn = id => links.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('on', on);
      on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
    });
    const spy = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) setOn(en.target.id); }), { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(s => spy.observe(s));
    addEventListener('scroll', () => { if (sections[0].getBoundingClientRect().top > innerHeight * .3) setOn(null); }, { passive: true });
  }

  // Reading progress along the nav edge
  const head = document.querySelector('.read-head');
  if (head) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      head.style.setProperty('--read', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0);
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update); update();
  }
})();
