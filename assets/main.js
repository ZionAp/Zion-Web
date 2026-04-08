(function() {
  // Theme Toggle
  var themeToggle = document.querySelector('.theme-toggle');
  if (localStorage.getItem('zion-theme') === 'dark' || (!localStorage.getItem('zion-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
  }
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('zion-theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Mobile Menu
  var mobileBtn = document.querySelector('.mobile-menu');
  var navLinks = document.querySelector('.nav-links');
  mobileBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });
  navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      navLinks.classList.remove('active');
    });
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form Submission
  var form = document.getElementById('booking-form');
  var toast = document.getElementById('toast');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    var data = new FormData(form);
    try {
      var res = await fetch('/functions/api/submit-booking', { method: 'POST', body: data });
      var json = await res.json();
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
    setTimeout(function() { toast.className = ''; }, 5000);
  });
})();
