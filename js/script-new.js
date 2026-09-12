document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSmoothScroll();
});

function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || (systemPreference.matches ? 'dark' : 'light');

  applyTheme(initialTheme, toggle);

  toggle.addEventListener('click', () => {
    const nextTheme =
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';

    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme, toggle);
  });

  systemPreference.addEventListener('change', (event) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(event.matches ? 'dark' : 'light', toggle);
    }
  });
}

function applyTheme(theme, toggle) {
  document.documentElement.setAttribute('data-theme', theme);
  toggle.innerHTML =
    theme === 'dark'
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
  toggle.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  );
}

function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.nav-right');
  if (!toggle || !navigation) return;

  const closeNavigation = () => {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
  };

  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen
      ? '<i class="fas fa-times" aria-hidden="true"></i>'
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeNavigation();
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      const headerOffset = 78;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });
}
