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

  // Mobile Menu Toggle
  var mobileBtn = document.querySelector('.mobile-menu');
  var nav = document.querySelector('.nav');
  mobileBtn.addEventListener('click', function() {
    nav.classList.toggle('active');
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        nav.classList.remove('active');
      }
    });
  });

  // Form Submission
  var form = document.querySelector('.form');
  var submitBtn = form ? form.querySelector('.btn-submit') : null;
  
  if (form && submitBtn) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<svg class="spinner" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4" stroke-dashoffset="10"/></svg> Sending...';
      submitBtn.disabled = true;
      
      try {
        var formData = new FormData(form);
        var response = await fetch(form.action, {
          method: 'POST',
          body: formData
        });
        
        var data = await response.json();
        
        if (data.ok) {
          form.innerHTML = '<div class="success-message"><svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><h3>Booking Submitted!</h3><p>We\'ll contact you shortly.</p><p class="phone-direct">Or call us now: <a href="tel:5055088203">(505) 508-8203</a></p></div>';
          form.style.textAlign = 'center';
          form.style.padding = '48px 32px';
        } else {
          alert(data.error || 'Failed to submit. Please call us at (505) 508-8203.');
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      } catch (err) {
        alert('Failed to submit. Please call us at (505) 508-8203.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
})();
