// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
});

revealElements.forEach((el) => revealObserver.observe(el));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Animation des skill dots au scroll
const skillDotStyle = document.createElement('style');
skillDotStyle.textContent = `
  .skill-dot.active {
    animation: none;
    transform: scale(0);
    opacity: 0;
  }
`;
document.head.appendChild(skillDotStyle);

const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const dots = entry.target.querySelectorAll('.skill-dot.active');
      dots.forEach((dot, index) => {
        setTimeout(() => {
          dot.style.animation = 'popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        }, index * 80);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCards.forEach((card) => skillObserver.observe(card));
