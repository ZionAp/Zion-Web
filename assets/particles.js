
(function() {
  'use strict';
  
  const Particles = {
    canvas: null,
    ctx: null,
    particles: [],
    
    init: function() {
      this.canvas = document.getElementById('particles-canvas');
      if (!this.canvas) return;
      
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.createParticles();
      this.animate();
      
      window.addEventListener('resize', function() { this.resize(); }.bind(this));
    },
    
    resize: function() {
      if (!this.canvas) return;
      var hero = document.querySelector('.hero');
      if (hero) {
        this.canvas.width = hero.offsetWidth;
        this.canvas.height = hero.offsetHeight;
      }
    },
    
    createParticles: function() {
      if (!this.canvas) return;
      this.particles = [];
      var count = Math.floor(this.canvas.width / 20);
      
      for (var i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.1
        });
      }
    },
    
    animate: function() {
      var self = this;
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.particles.forEach(function(p) {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;
        
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(74, 222, 128, ' + p.opacity + ')';
        this.ctx.fill();
      }.bind(this));
      
      this.particles.forEach(function(p1, i) {
        this.particles.slice(i + 1).forEach(function(p2) {
          var dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = 'rgba(74, 222, 128, ' + (0.08 * (1 - dist / 120)) + ')';
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }.bind(this));
      }.bind(this));
      
      requestAnimationFrame(function() { self.animate(); });
    }
  };
  
  document.addEventListener('DOMContentLoaded', function() {
    Particles.init();
  });
})();
