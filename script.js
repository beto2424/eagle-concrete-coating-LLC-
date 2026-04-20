document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('open');
    });
  }

  // Lightbox Implementation
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
  const lightbox = document.getElementById('lightbox');
  
  if (lightbox && lightboxTriggers.length > 0) {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        lightboxImage.src = e.target.src;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    lightboxClose.addEventListener('click', () => {
      closeLightbox();
    });

    // Close when clicking empty space
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      setTimeout(() => { lightboxImage.src = ''; }, 300); // Clear source after transition
    }
  }

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Targets to animate
  const animationTargets = document.querySelectorAll(`
    section > .container > div,
    .service-card,
    .testimonial-card,
    .gallery-card,
    .color-card,
    .hero-grid > div
  `);

  animationTargets.forEach((el, index) => {
    el.classList.add('fade-in');
    
    // Add staggered delays for grouped items
    if (el.classList.contains('service-card') || 
        el.classList.contains('gallery-card') || 
        el.classList.contains('color-card') || 
        el.classList.contains('testimonial-card')) {
      el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    }
    
    observer.observe(el);
  });
});
