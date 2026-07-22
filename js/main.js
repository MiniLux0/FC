// ─── Progressive Enhancement: JS enabled flag ────────────────────
document.documentElement.classList.add('js');

// ─── Mobile nav toggle ───────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const nav    = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

// ─── Mobile dropdown toggles ──────────────────────────────────────
document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth <= 720) {
      e.preventDefault();
      const parent = btn.parentElement;
      if (parent) {
        const isOpen = parent.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
      }
    }
  });
});

// ─── Active nav link ─────────────────────────────────────────────
let currentPathname = window.location.pathname;
if (currentPathname.endsWith('/')) {
  currentPathname += 'index.html';
}

document.querySelectorAll('.nav a').forEach(link => {
  let linkPathname = link.pathname;
  // Normalize pathnames ending with '/'
  if (linkPathname.endsWith('/')) {
    linkPathname += 'index.html';
  }
  if (linkPathname === currentPathname) {
    link.classList.add('active');
  }
});

// ─── Scroll reveal (sections) ────────────────────────────────────
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0 });

document.querySelectorAll('.section').forEach(s => sectionObserver.observe(s));

// ─── Scroll reveal (grids with stagger) ───────────────────────────
const gridObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      gridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0 });

document.querySelectorAll('.reveal-grid').forEach(g => gridObserver.observe(g));

// ─── Header on scroll ────────────────────────────────────────────
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}



// ─── Close mobile nav on link click ──────────────────────────────
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 720 && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});