/**
 * LONZ FLAWLS AURA - Luxury Skincare Experience
 * Premium JavaScript for a first-class user experience
 * 
 * Features:
 * - Silk-smooth animations with GSAP + ScrollTrigger
 * - Seamless page transitions with Barba.js
 * - Micro-interactions that delight
 * - Performance-optimized everything
 * - Graceful degradation
 */

class LuxuryExperience {
  constructor() {
    this.initBindings();
    this.setupGlobalEvents();
    this.initializeModules();
    this.startExperience();
  }

  // ==================== CORE FUNCTIONALITY ====================
  initBindings() {
    this.dom = {
      body: document.body,
      html: document.documentElement,
      // Cache other frequently used elements
    };
    
    this.settings = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      touchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      goldDustParticles: window.innerWidth < 768 ? 100 : 200
    };
  }

  setupGlobalEvents() {
    // Debounced resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 100));

    // System preferences changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.settings.reducedMotion = e.matches;
      this.toggleMotionEffects();
    });
  }

  initializeModules() {
    // Initialize GSAP with custom defaults
    gsap.defaults({
      ease: "expo.out",
      duration: 1.2
    });

    // Register plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize modules
    this.navigation = new LuxuryNavigation();
    this.animations = new LuxuryAnimations();
    this.products = new LuxuryProducts();
    this.video = new LuxuryVideoPlayer();
    this.forms = new LuxuryForms();
    
    // Check for Barba.js
    if (typeof barba !== 'undefined') {
      this.pageTransitions = new LuxuryPageTransitions();
    }

    // Initialize gold dust only on desktop
    if (!this.settings.touchDevice && !this.settings.reducedMotion) {
      this.goldDust = new LuxuryGoldDust();
    }
  }

  startExperience() {
    // Remove loading class
    this.dom.body.classList.remove('is-loading');

    // Start animations
    this.animations.animateIn();

    // Load non-critical elements
    this.loadNonCriticalAssets();
  }

  // ==================== LUXURY MODULES ====================
  loadNonCriticalAssets() {
    // Load additional fonts, analytics, etc.
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        // Load additional resources
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        // Fallback
      }, 2000);
    }
  }

  handleResize() {
    // Handle responsive changes
    if (this.goldDust) {
      this.goldDust.resizeCanvas();
    }
    
    // Recalculate ScrollTrigger positions
    ScrollTrigger.refresh();
  }

  debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
}

// ==================== LUXURY NAVIGATION ====================
class LuxuryNavigation {
  constructor() {
    this.dom = {
      nav: document.querySelector('.main-nav'),
      toggle: document.querySelector('.mobile-toggle'),
      dropdowns: document.querySelectorAll('.dropdown')
    };

    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.dom.toggle) {
      this.dom.toggle.addEventListener('click', () => this.toggleMenu());
    }

    // Dropdown menus
    this.dom.dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-link');
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          this.toggleDropdown(dropdown);
        }
      });

      // Handle hover on desktop
      if (!this.settings.touchDevice) {
        dropdown.addEventListener('mouseenter', () => this.openDropdown(dropdown));
        dropdown.addEventListener('mouseleave', () => this.closeDropdown(dropdown));
      }
    });

    // Smooth scrolling
    document.querySelectorAll('[data-scroll-to]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.smoothScroll(link.getAttribute('href'));
      });
    });
  }

  toggleMenu() {
    const isExpanded = this.dom.toggle.getAttribute('aria-expanded') === 'true';
    this.dom.toggle.setAttribute('aria-expanded', !isExpanded);
    this.dom.nav.classList.toggle('is-open');

    // Animate the toggle icon
    gsap.to(this.dom.toggle.querySelectorAll('.toggle-bar'), {
      duration: 0.3,
      backgroundColor: !isExpanded ? '#E91E63' : '#1a1a1a',
      stagger: 0.1
    });
  }

  toggleDropdown(dropdown) {
    dropdown.classList.toggle('is-open');
    gsap.from(dropdown.querySelector('.dropdown-menu'), {
      duration: 0.4,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    });
  }

  smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: target,
          offsetY: 100,
          autoKill: false
        },
        ease: "expo.out"
      });
    }
  }
}

// ==================== LUXURY ANIMATIONS ====================
class LuxuryAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('[data-scroll]');
    this.init();
  }

  init() {
    if (this.settings.reducedMotion) {
      this.setupReducedMotion();
      return;
    }

    this.setupScrollAnimations();
    this.setupMicroInteractions();
  }

  setupScrollAnimations() {
    this.animatedElements.forEach(el => {
      const speed = el.dataset.scrollSpeed || 1;
      
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        },
        y: 50 * speed,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });
    });

    // Hero text animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      gsap.from(heroTitle.children, {
        duration: 1.5,
        y: 80,
        opacity: 0,
        stagger: 0.15,
        ease: "expo.out"
      });
    }
  }

  setupMicroInteractions() {
    // Product card hover effects
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          duration: 0.6,
          y: -10,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          duration: 0.6,
          y: 0,
          boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
          ease: "power2.out"
        });
      });
    });

    // Button hover effects
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          duration: 0.3,
          scale: 1.05,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          duration: 0.3,
          scale: 1,
          ease: "power2.out"
        });
      });
    });
  }

  setupReducedMotion() {
    // Simple fade-in for reduced motion preference
    gsap.to(this.animatedElements, {
      opacity: 1,
      duration: 0.5
    });
  }
}

// ==================== LUXURY PRODUCTS ====================
class LuxuryProducts {
  constructor() {
    this.products = document.querySelectorAll('.product-card');
    this.init();
  }

  init() {
    this.setupQuickView();
    this.setupAddToCart();
    this.setupWishlist();
    this.setupBeforeAfterSliders();
  }

  setupQuickView() {
    document.querySelectorAll('.quick-view').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        this.openQuickView(productCard);
      });
    });
  }

  openQuickView(productCard) {
    // Create modal with product details
    const modal = document.createElement('div');
    modal.className = 'luxury-modal';
    modal.innerHTML = `
      <div class="luxury-modal__content">
        <button class="luxury-modal__close" aria-label="Close modal">
          <i class="fas fa-times"></i>
        </button>
        ${productCard.innerHTML}
      </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    // Animate in
    gsap.from(modal, {
      duration: 0.6,
      opacity: 0,
      y: 50,
      ease: "expo.out"
    });

    // Close handler
    modal.querySelector('.luxury-modal__close').addEventListener('click', () => {
      this.closeQuickView(modal);
    });
  }

  closeQuickView(modal) {
    gsap.to(modal, {
      duration: 0.4,
      opacity: 0,
      y: 50,
      ease: "expo.in",
      onComplete: () => {
        document.body.removeChild(modal);
        document.body.classList.remove('modal-open');
      }
    });
  }

  setupAddToCart() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAddToCart(button);
      });
    });
  }

  handleAddToCart(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.price').textContent;

    // Create flying product effect
    const flyer = document.createElement('div');
    flyer.className = 'product-flyer';
    flyer.innerHTML = `<img src="${productCard.querySelector('img').src}" alt="${productName}">`;
    
    const buttonRect = button.getBoundingClientRect();
    const cartRect = document.querySelector('.cart-icon').getBoundingClientRect();
    
    flyer.style.left = `${buttonRect.left}px`;
    flyer.style.top = `${buttonRect.top}px`;
    document.body.appendChild(flyer);

    // Animate to cart
    gsap.to(flyer, {
      duration: 1,
      x: cartRect.left - buttonRect.left,
      y: cartRect.top - buttonRect.top,
      scale: 0.3,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        document.body.removeChild(flyer);
        this.showAddToCartNotification(productName, productPrice);
      }
    });
  }

  showAddToCartNotification(name, price) {
    const notification = document.createElement('div');
    notification.className = 'luxury-notification';
    notification.innerHTML = `
      <div class="luxury-notification__content">
        <i class="fas fa-check-circle"></i>
        <div>
          <p>Added to cart</p>
          <h4>${name}</h4>
          <p>${price}</p>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in/out
    gsap.fromTo(notification,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "expo.out" }
    );

    setTimeout(() => {
      gsap.to(notification, {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: "expo.in",
        onComplete: () => document.body.removeChild(notification)
      });
    }, 3000);
  }

  setupWishlist() {
    document.querySelectorAll('.wishlist').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        button.classList.toggle('active');
        button.innerHTML = button.classList.contains('active') ? 
          '<i class="fas fa-heart"></i>' : 
          '<i class="far fa-heart"></i>';
        
        // Pulse animation
        gsap.to(button, {
          duration: 0.6,
          scale: 1.3,
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            gsap.to(button, { duration: 0.3, scale: 1 });
          }
        });
      });
    });
  }

  setupBeforeAfterSliders() {
    document.querySelectorAll('.before-after-container').forEach(container => {
      const before = container.querySelector('.before');
      const after = container.querySelector('.after');
      const handle = container.querySelector('.slider-handle');
      
      let isDragging = false;
      
      // Set initial position
      gsap.set(handle, { x: '50%' });
      gsap.set(after, { width: '50%' });
      
      // Mouse/touch events
      const startDrag = (e) => {
        isDragging = true;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', stopDrag);
      };
      
      const drag = (e) => {
        if (!isDragging) return;
        
        const containerRect = container.getBoundingClientRect();
        let xPos = (e.clientX || e.touches[0].clientX) - containerRect.left;
        xPos = Math.max(0, Math.min(xPos, containerRect.width));
        const percent = (xPos / containerRect.width) * 100;
        
        gsap.to(handle, { x: `${percent}%`, duration: 0.1 });
        gsap.to(after, { width: `${percent}%`, duration: 0.1 });
      };
      
      const stopDrag = () => {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
      };
      
      handle.addEventListener('mousedown', startDrag);
      handle.addEventListener('touchstart', startDrag);
      
      // Click/tap to set position
      container.addEventListener('click', (e) => {
        const containerRect = container.getBoundingClientRect();
        const xPos = e.clientX - containerRect.left;
        const percent = (xPos / containerRect.width) * 100;
        
        gsap.to(handle, { x: `${percent}%`, duration: 0.3, ease: "power2.out" });
        gsap.to(after, { width: `${percent}%`, duration: 0.3, ease: "power2.out" });
      });
    });
  }
}

// ==================== LUXURY VIDEO PLAYER ====================
class LuxuryVideoPlayer {
  constructor() {
    this.videoContainers = document.querySelectorAll('.video-embed');
    this.init();
  }

  init() {
    this.videoContainers.forEach(container => {
      const playButton = container.querySelector('.play-button');
      if (playButton) {
        playButton.addEventListener('click', () => this.loadVideo(container));
      }
    });
  }

  loadVideo(container) {
    // Replace with actual video embed
    container.innerHTML = `
      <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&rel=0" 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen></iframe>
    `;
    
    // Animate in
    gsap.from(container.querySelector('iframe'), {
      duration: 0.8,
      opacity: 0,
      scale: 0.95,
      ease: "expo.out"
    });
  }
}

// ==================== LUXURY FORMS ====================
class LuxuryForms {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
      
      // Add floating label effects
      const inputs = form.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('is-focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('is-focused');
          }
        });
        
        // Check for pre-filled values
        if (input.value) {
          input.parentElement.classList.add('is-focused');
        }
      });
    });
  }

  handleSubmit(e, form) {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      this.showSuccessMessage(form);
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      form.reset();
      
      // Reset floating labels
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('is-focused');
      });
    }, 1500);
  }

  showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-success-message';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Thank you! Your submission has been received.</p>
    `;
    
    form.parentNode.insertBefore(message, form.nextSibling);
    
    // Animate in
    gsap.from(message, {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: "expo.out"
    });
    
    // Remove after delay
    setTimeout(() => {
      gsap.to(message, {
        duration: 0.6,
        y: -20,
        opacity: 0,
        ease: "expo.in",
        onComplete: () => message.parentNode.removeChild(message)
      });
    }, 3000);
  }
}

// ==================== LUXURY PAGE TRANSITIONS ====================
class LuxuryPageTransitions {
  constructor() {
    this.init();
  }

  init() {
    barba.init({
      transitions: [{
        name: 'luxury-fade',
        once() {
          // Initial page load
        },
        leave(data) {
          return gsap.to(data.current.container, {
            duration: 0.6,
            opacity: 0,
            ease: "expo.out"
          });
        },
        enter(data) {
          return gsap.from(data.next.container, {
            duration: 0.8,
            opacity: 0,
            y: 50,
            ease: "expo.out"
          });
        }
      }],
      views: [{
        namespace: 'product',
        beforeEnter(data) {
          // Product page specific transitions
        }
      }],
      prevent: ({ el }) => el.classList && el.classList.contains('no-barba')
    });
    
    // Update scroll position after transition
    barba.hooks.after(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });
  }
}

// ==================== LUXURY GOLD DUST ====================
class LuxuryGoldDust {
  constructor() {
    this.canvas = document.getElementById('goldDustCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    this.init();
  }

  init() {
    this.setupCanvas();
    this.createParticles();
    this.animate();
  }

  setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  createParticles() {
    for (let i = 0; i < this.settings.goldDustParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        sway: Math.random() * 0.5 - 0.25
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Update position
      particle.y -= particle.speed;
      particle.x += Math.sin(particle.angle) * particle.sway;
      particle.angle += 0.01;
      
      // Reset if off screen
      if (particle.y < 0) {
        particle.y = this.canvas.height;
        particle.x = Math.random() * this.canvas.width;
      }
      
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.sway = -particle.sway;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  resizeCanvas() {
    // Adjust particle positions on resize
    const widthRatio = this.canvas.width / window.innerWidth;
    const heightRatio = this.canvas.height / window.innerHeight;
    
    this.particles.forEach(particle => {
      particle.x *= widthRatio;
      particle.y *= heightRatio;
    });
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
  }
}

// ==================== START THE EXPERIENCE ====================
document.addEventListener('DOMContentLoaded', () => {
  // Check for required features
  if ('querySelector' in document && 'addEventListener' in window && 'classList' in document.documentElement) {
    new LuxuryExperience();
  } else {
    // Provide basic functionality for older browsers
    document.body.classList.remove('is-loading');
  }
});