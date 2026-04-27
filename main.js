/* =============================================
   WebModerna – Premium JavaScript
   ============================================= */

/* Global helpers (must be outside IIFE) */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isActive = item.classList.contains('active');

  // Close all open items
  document.querySelectorAll('.faq-item.active').forEach(open => {
    open.classList.remove('active');
    open.querySelector('.faq-answer').style.maxHeight = null;
  });

  // Open clicked item (if it was closed)
  if (!isActive) {
    item.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

   document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initNavHighlight();
    initNavShrink();
    initTypingEffect();
    initCounters();
    initDynamicColor();
    init3DTilt();
    initIndustryCards();
    initCinemaShowcase();
    initDragonAuto();
    initDragonParallax();
    initDragonParticles();
  });

  /* ---------- Dragon Auto-Animation ---------- */
  function initDragonAuto() {
    const dragonDome = document.getElementById('dragonDome');
    if (!dragonDome) return;

    const states = ['state-fly', 'state-walk', 'state-transform'];
    let currentStateIndex = 0;

    setInterval(() => {
      // Remove current state
      dragonDome.classList.remove(states[currentStateIndex]);
      
      // Move to next state
      currentStateIndex = (currentStateIndex + 1) % states.length;
      
      // Add new state
      dragonDome.classList.add(states[currentStateIndex]);
    }, 6000); // Cambia cada 6 segundos
  }

  /* ---------- Dragon Parallax Effect & Cinematic Focus ---------- */
  function initDragonParallax() {
    const section = document.getElementById('experiencia-dragon');
    const dome = document.getElementById('dragonDome');
    const dragon = document.getElementById('dragonEntity');
    const cube = document.querySelector('.dome-cube');
    const sphere = document.querySelector('.dome-sphere');
    if (!section || !dome) return;

    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the section
      const y = e.clientY - rect.top;  // y position within the section
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on cursor position relative to center
      const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg
      const rotateY = ((x - centerX) / centerX) * 15;  // Max 15 deg
      
      dome.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Cinematic Camera Focus (Depth of Field)
      // El enfoque cambia dependiendo de dónde esté el mouse
      const normalizedX = Math.abs(x - centerX) / centerX; // 0 en el centro, 1 en los bordes
      
      // Si el mouse está en el centro, el dragón se enfoca y el fondo se desenfoca.
      // Si el mouse está a los lados, el fondo se enfoca y el dragón se desenfoca.
      if(dragon) dragon.style.filter = `blur(${normalizedX * 4}px)`;
      if(cube) cube.style.filter = `blur(${(1 - normalizedX) * 5}px)`;
      if(sphere) sphere.style.filter = `blur(${(1 - normalizedX) * 5}px)`;

      // Glass Glare Effect (Paso 5 real)
      const percentX = ((x / rect.width) * 100).toFixed(2);
      const percentY = ((y / rect.height) * 100).toFixed(2);
      dome.style.setProperty('--mouseX', `${percentX}%`);
      dome.style.setProperty('--mouseY', `${percentY}%`);
    });

    section.addEventListener('mouseleave', () => {
      dome.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      
      // Restablecer enfoque por defecto
      if(dragon) dragon.style.filter = `blur(0px)`;
      if(cube) cube.style.filter = `blur(0px)`;
      if(sphere) sphere.style.filter = `blur(0px)`;
      
      dome.style.setProperty('--mouseX', `50%`);
      dome.style.setProperty('--mouseY', `50%`);
    });
  }

  /* ---------- Dragon Particle Trail (Holographic Sparks) ---------- */
  function initDragonParticles() {
    const dome = document.getElementById('dragonDome');
    const dragonBody = document.querySelector('.d-body');
    if (!dome || !dragonBody) return;

    setInterval(() => {
      // Solo crear partículas si el documento está visible para ahorrar recursos
      if (document.hidden) return;

      const particle = document.createElement('div');
      const size = Math.random() * 5 + 2; 
      const color = Math.random() > 0.5 ? '#00f5d4' : '#a855f7';

      // Obtener posición actual del dragón respecto al domo
      const domeRect = dome.getBoundingClientRect();
      const dragonRect = dragonBody.getBoundingClientRect();
      
      // Calcular el centro del dragón relativo al domo
      const x = (dragonRect.left - domeRect.left) + (dragonRect.width / 2);
      const y = (dragonRect.top - domeRect.top) + (dragonRect.height / 2);

      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = `0 0 12px 2px ${color}`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '3'; 
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      dome.appendChild(particle);

      // Animar la partícula cayendo y desvaneciéndose
      particle.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.9 },
        { transform: `translate(calc(-50% - ${Math.random() * 60 - 30}px), calc(-50% + ${Math.random() * 80 + 40}px)) scale(0)`, opacity: 0 }
      ], {
        duration: 1200 + Math.random() * 800,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }).onfinish = () => particle.remove();

    }, 80); // Genera chispas más rápido (cada 80ms)
  }

  /* ---------- Cinematic Portfolio Showcase ---------- */
  function initCinemaShowcase() {
    const showcase = document.getElementById('cinemaShowcase');
    if (!showcase) return;

    const slides = showcase.querySelectorAll('.cinema-slide');
    const glitch = document.getElementById('cinemaGlitch');
    const progressBar = document.getElementById('cinemaProgressBar');
    const currentNum = document.getElementById('cinemaCurrentNum');
    const badge = document.getElementById('cinemaBadge');
    const title = document.getElementById('cinemaTitle');
    const desc = document.getElementById('cinemaDesc');
    const dots = showcase.querySelectorAll('.cinema-dot');
    const prevBtn = document.getElementById('cinemaPrev');
    const nextBtn = document.getElementById('cinemaNext');
    const infoInner = showcase.querySelector('.cinema-info-inner');

    // Slide data
    const slideData = [
      {
        badge: '🍽️ Restaurante',
        title: 'Menú online, reservas y pedidos a domicilio',
        desc: 'Diseño premium con sistema de reservas integrado, menú digital interactivo y pedidos por WhatsApp.'
      },
      {
        badge: '💇 Salón de Belleza',
        title: 'Citas online, portafolio de trabajos y reseñas',
        desc: 'Sistema de agenda inteligente con galería de trabajos, reseñas de clientes y promociones activas.'
      },
      {
        badge: '🏥 Clínica Médica',
        title: 'Perfil de doctores, citas y credibilidad digital',
        desc: 'Plataforma médica profesional con perfiles de especialistas, citas online y blog de salud.'
      }
    ];

    let currentSlide = 0;
    let autoplayInterval;
    let isTransitioning = false;
    const INTERVAL = 5000;

    // Initial animation trigger
    setTimeout(() => {
      if (infoInner) infoInner.classList.add('animate');
    }, 300);

    function goToSlide(index, direction = 'next') {
      if (isTransitioning || index === currentSlide) return;
      isTransitioning = true;

      const oldSlide = slides[currentSlide];
      const newSlide = slides[index];
      const data = slideData[index];

      // 1. Trigger glitch effect
      glitch.classList.remove('active');
      void glitch.offsetWidth; // force reflow
      glitch.classList.add('active');

      // 2. Remove info animation
      if (infoInner) infoInner.classList.remove('animate');

      // 3. Animate slides
      oldSlide.classList.remove('active');
      oldSlide.classList.add('leaving');
      
      newSlide.classList.add('entering');

      // 4. Reset progress bar
      progressBar.style.animation = 'none';
      void progressBar.offsetWidth;
      progressBar.style.animation = 'progressFill 5s linear forwards, gradientShift 2s linear infinite';

      // 5. Update counter with animation
      currentNum.style.transform = 'translateY(-10px)';
      currentNum.style.opacity = '0';
      
      setTimeout(() => {
        currentNum.textContent = String(index + 1).padStart(2, '0');
        currentNum.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          currentNum.style.transform = 'translateY(0)';
          currentNum.style.opacity = '1';
        }, 50);
      }, 200);

      // 6. Update dots
      dots.forEach((dot, i) => {
        dot.classList.remove('active');
        const fill = dot.querySelector('.dot-fill');
        if (fill) {
          fill.style.animation = 'none';
          fill.style.width = '0%';
        }
      });

      // 7. Update info text (staggered)
      setTimeout(() => {
        badge.textContent = data.badge;
        title.textContent = data.title;
        desc.textContent = data.desc;
        
        if (infoInner) infoInner.classList.add('animate');
      }, 400);

      // 8. Complete transition
      setTimeout(() => {
        oldSlide.classList.remove('leaving');
        newSlide.classList.remove('entering');
        newSlide.classList.add('active');

        // Activate new dot
        dots[index].classList.add('active');
        const fill = dots[index].querySelector('.dot-fill');
        if (fill) {
          fill.style.animation = 'none';
          void fill.offsetWidth;
          fill.style.animation = 'dotProgress 5s linear';
        }

        currentSlide = index;
        isTransitioning = false;
      }, 800);
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      goToSlide(next, 'next');
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prev, 'prev');
    }

    // Autoplay
    function startAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, INTERVAL);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      // Reset progress bar
      progressBar.style.animation = 'none';
      void progressBar.offsetWidth;
      progressBar.style.animation = 'progressFill 5s linear forwards, gradientShift 2s linear infinite';
      startAutoplay();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        goToSlide(slideIndex);
        resetAutoplay();
      });
    });

    // Pause on hover
    showcase.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    showcase.addEventListener('mouseleave', () => startAutoplay());

    // Initialize first dot animation
    const firstFill = dots[0].querySelector('.dot-fill');
    if (firstFill) {
      firstFill.style.animation = 'dotProgress 5s linear';
    }

    // Start autoplay
    startAutoplay();
  }

  /* ---------- Industry Cards – 3D Tilt & Particles ---------- */
  function initIndustryCards() {
    const cards = document.querySelectorAll('.industry-card[data-tilt]');
    
    cards.forEach(card => {
      const color = card.getAttribute('data-color') || '#a855f7';
      
      // Set glow color CSS variable
      card.style.setProperty('--glow-color', color);
      
      // 3D Tilt effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
      
      // Floating particles
      const particlesEl = card.querySelector('.card-particles');
      if (particlesEl) {
        for (let i = 0; i < 6; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 3 + 3}s ease-in-out ${Math.random() * 2}s infinite;
          `;
          particlesEl.appendChild(particle);
        }
      }
    });
    
    // Add particle keyframes
    if (!document.getElementById('particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes particleFloat {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
          20% { opacity: 0.8; transform: translateY(-10px) scale(1); }
          80% { opacity: 0.4; transform: translateY(-40px) scale(0.6); }
        }
        .industry-card:hover .card-particles div {
          opacity: 1 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  /* ---------- 3D Tilt Interaction ---------- */
  function init3DTilt() {
    const scene = document.getElementById('scene3d');
    if (!scene) return;
    
    document.addEventListener('mousemove', (e) => {
      // Calculamos la posición del ratón respecto al centro de la pantalla
      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      
      // Aplicamos la rotación sumada a la isometría base (60deg X, -45deg Z)
      // Ajustamos Z e Y para darle un efecto parallax 3D
      scene.style.transform = `rotateX(${60 + yAxis}deg) rotateZ(${-45 + xAxis}deg)`;
    });
  }
  
  /* ---------- Dynamic Background Color ---------- */
  function initDynamicColor() {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        const scrollPercent = scrollTop / docHeight;
        
        // Empieza en morado/azul (260) y transiciona hasta un turquesa/verde vivo (160)
        const startHue = 260;
        const endHue = 160;
        
        const currentHue = startHue - (scrollPercent * (startHue - endHue));
        
        // Actualiza la variable CSS que controla toda la paleta de colores
        document.documentElement.style.setProperty('--hue', currentHue);
      }
    });
  }
  
  /* ---------- Scroll Reveal Animation ---------- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
  
    revealElements.forEach((el) => observer.observe(el));
  }
  
  /* ---------- Active Nav Link Highlight ---------- */
  function initNavHighlight() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!sections.length || !navLinks.length) return;
  
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      let currentSection = "";
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSection) {
          link.classList.add("active");
        }
      });
    });
  }
  
  /* ---------- Navbar Shrink on Scroll ---------- */
  function initNavShrink() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
  
  /* ---------- Typing Effect ---------- */
  function initTypingEffect() {
    const typingElement = document.getElementById("typingText");
    if (!typingElement) return;
  
    const words = ["crecer en internet", "vender más hoy", "destacar del resto"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
  
    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Faster when deleting
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
      }
  
      if (!isDeleting && charIndex === currentWord.length) {
        typingDelay = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500; // Pause before typing next word
      }
  
      setTimeout(type, typingDelay);
    }
  
    // Start effect
    setTimeout(type, 1000);
  }
  
  /* ---------- Number Counters Animation ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    if (!counters.length) return;
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const duration = 2000; // 2 seconds
          const stepTime = Math.abs(Math.floor(duration / target));
          let current = 0;
  
          const timer = setInterval(() => {
            current += Math.ceil(target / 50); // Increment size
            if (current >= target) {
              counter.textContent = prefix + target;
              clearInterval(timer);
            } else {
              counter.textContent = prefix + current;
            }
          }, stepTime);
  
          observer.unobserve(counter); // Only animate once
        }
      });
    }, { threshold: 0.5 });
  
    counters.forEach(counter => observer.observe(counter));
  }
  
