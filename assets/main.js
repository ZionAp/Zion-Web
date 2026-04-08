(function() {
  'use strict';

  // Theme
  const Theme = {
    init() {
      const stored = localStorage.getItem('zion-theme');
      if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
      }
      document.querySelector('.theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('zion-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      });
    }
  };

  // Mobile Menu
  const Menu = {
    init() {
      const btn = document.querySelector('.mobile-menu-btn');
      const links = document.querySelector('.nav-links');
      btn.addEventListener('click', () => {
        links.classList.toggle('active');
        btn.setAttribute('aria-expanded', links.classList.contains('active'));
      });
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('active')));
    }
  };

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Form
  const Form = {
    init() {
      const form = document.getElementById('booking-form');
      const toast = document.getElementById('toast');
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.textContent = 'Sending...';
        const data = new FormData(form);
        try {
          const res = await fetch('/functions/api/submit-booking', { method: 'POST', body: data });
          const json = await res.json();
          if (json.ok) {
            toast.textContent = 'Booking submitted! We\'ll contact you shortly.';
            toast.className = 'show success';
            form.reset();
          } else {
            toast.textContent = json.error || 'Failed. Call (505) 508-8203.';
            toast.className = 'show error';
          }
        } catch (err) {
          toast.textContent = 'Failed. Call (505) 508-8203.';
          toast.className = 'show error';
        }
        btn.disabled = false;
        btn.textContent = 'Book Appointment';
        setTimeout(() => toast.classList.remove('show'), 5000);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Menu.init();
    Form.init();
  });
})();
