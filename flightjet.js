// ==================== FAST LOADER REMOVAL (add at the top or bottom of your JS file) ====================
document.addEventListener('DOMContentLoaded', function() {
  const loader = document.querySelector('.luxury-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 400); // Faster loader transition (0.4s)
  }
});

// ==================== LONZ FLAWLS AURA - Luxury Skincare Experience ====================
// (Your original code below remains UNCHANGED)
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
// ... (rest of your code unchanged) ...
// (Paste the rest of your original JS code here. No other modifications needed.)