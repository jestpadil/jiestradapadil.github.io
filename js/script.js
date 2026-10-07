document.addEventListener('DOMContentLoaded', () => {
     const navbar = document.getElementById('navbar');
     const hamburger = document.getElementById('hamburger');
     const navLinks = document.getElementById('navLinks');
     const sections = document.querySelectorAll('section[id]');
     const navAnchors = document.querySelectorAll('.nav-links a');

     // Navbar scroll effect
     const handleScroll = () => {
          if (window.scrollY > 50) {
               navbar.classList.add('scrolled');
          } else {
               navbar.classList.remove('scrolled');
          }
     };

     window.addEventListener('scroll', handleScroll, { passive: true });
     handleScroll();

     // Mobile menu toggle
     hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('active');
          navLinks.classList.toggle('active');
     });

     // Close mobile menu on link click
     navAnchors.forEach(link => {
          link.addEventListener('click', () => {
               hamburger.classList.remove('active');
               navLinks.classList.remove('active');
          });
     });

     // Close mobile menu on outside click
     document.addEventListener('click', (e) => {
          if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
               hamburger.classList.remove('active');
               navLinks.classList.remove('active');
          }
     });

     // Smooth scroll for anchor links
     navAnchors.forEach(anchor => {
          anchor.addEventListener('click', (e) => {
               e.preventDefault();
               const targetId = anchor.getAttribute('href');
               const target = document.querySelector(targetId);
               if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
               }
          });
     });

     // Active nav link highlighting
     const highlightNav = () => {
          let current = '';
          sections.forEach(section => {
               const sectionTop = section.offsetTop - 100;
               if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
               }
          });

          navAnchors.forEach(link => {
               link.classList.remove('active');
               if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
               }
          });
     };

     window.addEventListener('scroll', highlightNav, { passive: true });
     highlightNav();

     // IntersectionObserver for scroll animations
     const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
     };

     const revealObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
               if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate skill bars when skill card is visible
                    if (entry.target.classList.contains('skill-card')) {
                         const fills = entry.target.querySelectorAll('.skill-fill');
                         fills.forEach(fill => {
                              const width = fill.getAttribute('data-width');
                              fill.style.setProperty('--fill-width', `${width}%`);
                              fill.classList.add('animated');
                         });
                    }

                    revealObserver.unobserve(entry.target);
               }
          });
     }, observerOptions);

     // Observe timeline items
     document.querySelectorAll('.timeline-item').forEach(item => {
          revealObserver.observe(item);
     });

     // Observe skill cards
     document.querySelectorAll('.skill-card').forEach(card => {
          revealObserver.observe(card);
     });

     // Observe project cards
     document.querySelectorAll('.project-card').forEach(card => {
          revealObserver.observe(card);
     });

     // Observe about section elements
     document.querySelectorAll('.about-text, .about-info').forEach(el => {
          revealObserver.observe(el);
     });

     // Observe contact section
     const contactSection = document.querySelector('.contact-content');
     if (contactSection) {
          revealObserver.observe(contactSection);
     }

     // Observe section titles
     document.querySelectorAll('.section-title').forEach(title => {
          revealObserver.observe(title);
     });
});
