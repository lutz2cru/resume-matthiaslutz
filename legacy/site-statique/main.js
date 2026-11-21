// Progressive enhancement only: the page is complete without this script.

// Mobile menu: close after jumping to a section, on Escape, or on a click outside.
(() => {
  const menu = document.querySelector('.menu');
  if (!menu) return;
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) menu.open = false;
  });
  document.addEventListener('click', (e) => {
    if (menu.open && !menu.contains(e.target)) menu.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
})();

// Highlight the navigation link of the section currently in view.
(() => {
  if (!('IntersectionObserver' in window)) return;
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
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
  // The hero and intro are not in the nav: clear the highlight when back at the top.
  document.querySelectorAll('.hero, .intro').forEach((el) => {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setActive(null);
    }, { rootMargin: '-45% 0px -50% 0px' }).observe(el);
  });
})();
