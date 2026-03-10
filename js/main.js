// ─── Mobile nav toggle ───────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const nav    = document.getElementById('nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

// ─── Active nav link ─────────────────────────────────────────────
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav a').forEach(link => {
  if (link.getAttribute('href').includes(currentPath)) {
    link.classList.add('active');
  }
});

// ─── Scroll reveal ───────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(s => observer.observe(s));

// ─── Header on scroll ────────────────────────────────────────────
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });