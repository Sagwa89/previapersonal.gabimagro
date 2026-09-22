const slides = [...document.querySelectorAll('.testimonial')];
const count = document.querySelector('.carousel-count');
let current = 0;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
  count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}

document.querySelectorAll('.carousel-button').forEach((button) => {
  button.addEventListener('click', () => showSlide(current + (button.dataset.direction === 'next' ? 1 : -1)));
});

let startX = 0;
const carousel = document.querySelector('.testimonial-carousel');
carousel.addEventListener('touchstart', (event) => { startX = event.changedTouches[0].screenX; }, { passive: true });
carousel.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].screenX - startX;
  if (Math.abs(distance) > 40) showSlide(current + (distance < 0 ? 1 : -1));
}, { passive: true });

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') showSlide(current + 1);
  if (event.key === 'ArrowLeft') showSlide(current - 1);
});

const revealItems = [...document.querySelectorAll('.section, .about__image, .service-card, .testimonial-carousel, .step, .final-cta')];
revealItems.forEach((item) => item.classList.add('reveal-ready'));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));
