// Sticky CTA
const stickyCta = document.getElementById('stickyCta');
let heroBottom = 0;
const hero = document.querySelector('.hero');
if (hero) heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > heroBottom - 80) {
    stickyCta.classList.add('visible');
  } else {
    stickyCta.classList.remove('visible');
  }
}, { passive: true });

// Fade in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));
