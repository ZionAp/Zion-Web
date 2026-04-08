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
  var navLinks = document.querySelector('.nav-links');
  mobileBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
      }
    });
  });
})();
