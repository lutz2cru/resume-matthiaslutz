// Progressive enhancement only: the page is complete without this script.

// Mobile contents: close after jumping to a section, or on Escape.
(() => {
  const menu = document.querySelector('.mnav');
  if (!menu) return;
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
})();
(() => {
  if (!('IntersectionObserver' in window)) return;

  // Highlight the sidebar link of the section currently in view.
  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const setActive = (id) => {
    links.forEach((a) => a.removeAttribute('aria-current'));
    const link = byId.get(id);
    if (link) link.setAttribute('aria-current', 'true');
  };
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  });
  // The hero is not in the nav: clear the highlight when back at the top.
  const hero = document.getElementById('top');
  if (hero) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(null);
    }, { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
  }

  // Fade sections in as they enter the viewport.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      reveal.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('will-reveal');
    reveal.observe(el);
  });
})();
