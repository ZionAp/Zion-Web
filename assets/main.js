/* ===================================
   ZION APPLIANCE SOLUTIONS
   Main JavaScript
   =================================== */

(function() {
  'use strict';

  // Theme Management
  const ThemeManager = {
    STORAGE_KEY: 'zion-theme-preference',
    
    init() {
      this.applyTheme(this.getPreferredTheme());
      this.bindToggle();
      this.watchSystemPreference();
    },
    
    getPreferredTheme() {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },
    
    applyTheme(theme) {
      if (theme === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    },
    
    toggle() {
      const isDark = document.body.classList.contains('dark-mode');
      const newTheme = isDark ? 'light' : 'dark';
      this.applyTheme(newTheme);
      localStorage.setItem(this.STORAGE_KEY, newTheme);
    },
    
    bindToggle() {
      const toggle = document.querySelector('.theme-toggle');
      if (toggle) {
        toggle.addEventListener('click', () => this.toggle());
      }
    },
    
    watchSystemPreference() {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  };

  // Mobile Menu
  const MobileMenu = {
    isOpen: false,
    
    init() {
      this.btn = document.querySelector('.mobile-menu-btn');
      this.links = document.querySelector('.nav-links');
      this.header = document.querySelector('.header');
      
      if (this.btn && this.links) {
        this.bind();
      }
    },
    
    bind() {
      this.btn.addEventListener('click', () => this.toggle());
      
      this.links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.close());
      });
      
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.header.contains(e.target)) {
          this.close();
        }
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    },
    
    toggle() {
      this.isOpen ? this.close() : this.open();
    },
    
    open() {
      this.isOpen = true;
      this.btn.classList.add('active');
      this.btn.setAttribute('aria-expanded', 'true');
      this.links.classList.add('active');
      document.body.style.overflow = 'hidden';
    },
    
    close() {
      this.isOpen = false;
      this.btn.classList.remove('active');
      this.btn.setAttribute('aria-expanded', 'false');
      this.links.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Smooth Scroll
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;
          
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // Form Handling
  const BookingForm = {
    init() {
      this.form = document.getElementById('booking-form');
      this.toast = document.getElementById('toast');
      
      if (this.form) {
        this.bind();
      }
    },
    
    bind() {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const botField = this.form.querySelector('input[name="website"]');
        if (botField && botField.value) {
          return;
        }
        
        const lastSubmit = localStorage.getItem('lastSubmit');
        if (lastSubmit && Date.now() - parseInt(lastSubmit) < 60000) {
          this.showToast('Please wait 60 seconds before submitting again.', 'error');
          return;
        }
        
        const btn = this.form.querySelector('button[type="submit"]');
        if (btn.disabled) return;
        
        btn.disabled = true;
        btn.innerHTML = 'Sending...';
        
        const formData = new FormData(this.form);
        
        fetch(this.form.action, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }).catch(() => {});
        
        if (typeof hcaptcha !== 'undefined') {
          hcaptcha.reset();
        }
        
        setTimeout(() => {
          btn.innerHTML = 'Book Appointment';
          btn.disabled = false;
          this.showSuccess();
          this.form.reset();
          localStorage.setItem('lastSubmit', Date.now());
        }, 1000);
      });
    },
    
    showSuccess() {
      const overlay = document.createElement('div');
      overlay.className = 'success-overlay';
      overlay.innerHTML = `
        <div class="success-modal">
          <div class="success-icon">✓</div>
          <h3>Booking Submitted!</h3>
          <p>We'll contact you within 30 minutes during business hours.</p>
          <a href="tel:5055088203" class="success-call">Call us now: (505) 508-8203</a>
          <button onclick="this.closest('.success-overlay').remove()">Close</button>
        </div>
      `;
      document.body.appendChild(overlay);
    },
    
    validate() {
      let isValid = true;
      
      const fullName = this.form.querySelector('#fullName');
      const email = this.form.querySelector('#emailAddress');
      const phone = this.form.querySelector('#phoneNumber');
      const appliance = this.form.querySelector('#appliance');
      
      if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        this.showFieldError({ target: fullName });
        isValid = false;
      }
      
      if (!this.isValidEmail(email.value)) {
        this.showFieldError({ target: email });
        isValid = false;
      }
      
      if (!this.isValidPhone(phone.value)) {
        this.showFieldError({ target: phone });
        isValid = false;
      }
      
      if (!appliance.value) {
        this.showFieldError({ target: appliance });
        isValid = false;
      }
      
      return isValid;
    },
    
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    isValidPhone(phone) {
      const cleaned = phone.replace(/\D/g, '');
      return cleaned.length >= 10;
    },
    
    showFieldError(e) {
      const field = e.target;
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
    },
    
    clearFieldError(field) {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    },
    
    showToast(message, type = 'success') {
      this.toast.textContent = message;
      this.toast.className = `toast ${type}`;
      
      requestAnimationFrame(() => {
        this.toast.classList.add('show');
      });
      
      setTimeout(() => {
        this.toast.classList.remove('show');
      }, 5000);
    }
  };

  // Header Scroll Effect
  const HeaderScroll = {
    init() {
      const header = document.querySelector('.header');
      if (!header) return;
      
      let lastScroll = 0;
      
      window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
      }, { passive: true });
    }
  };

  // FAQ Accordion Animation
  const FAQAccordion = {
    init() {
      document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('toggle', () => {
          if (item.open) {
            item.style.animation = 'slideDown 0.3s ease';
          }
        });
      });
    }
  };

  // Intersection Observer for Animations
  const ScrollAnimations = {
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      document.querySelectorAll('.service-card, .feature-card, .faq-item').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
      });
    }
  };

  // Add CSS for form validation and animations
  const injectStyles = () => {
    const styles = `
      .form-group input.error,
      .form-group select.error,
      .form-group textarea.error {
        border-color: #ef4444;
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  };

  // Lazy load hCaptcha when form is focused
  const loadHCaptcha = () => {
    if (document.querySelector('script[src*="hcaptcha"]')) return;
    const script = document.createElement('script');
    script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    document.removeEventListener('focus', loadHCaptcha);
    document.removeEventListener('click', loadHCaptcha);
  };
  document.addEventListener('focus', loadHCaptcha, { once: true });
  document.addEventListener('click', loadHCaptcha, { once: true });

  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    ThemeManager.init();
    MobileMenu.init();
    SmoothScroll.init();
    BookingForm.init();
    HeaderScroll.init();
    FAQAccordion.init();
    ScrollAnimations.init();
    
    // Register Service Worker for PWA/Offline
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  });

})();
