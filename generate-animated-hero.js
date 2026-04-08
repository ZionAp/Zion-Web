const fs = require('fs');
const path = require('path');

const animatedHeroCSS = `
/* Animated Hero Background */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0a0f1a 0%, #1e3a5f 50%, #0f172a 100%);
  z-index: -3;
}

.hero-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(74, 222, 128, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(217, 74, 30, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse 50% 50% at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  animation: meshPulse 8s ease-in-out infinite;
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(74, 222, 128, 0.08) 0%, transparent 25%),
    radial-gradient(circle at 70% 70%, rgba(217, 74, 30, 0.06) 0%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 30%);
  animation: orbFloat 12s ease-in-out infinite;
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(74, 222, 128, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 222, 128, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: -2;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 70%);
}

#particles-canvas {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

@keyframes meshPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes orbFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(2deg); }
  66% { transform: translateY(10px) rotate(-1deg); }
}

.hero::before {
  content: '';
  position: absolute;
  top: 20%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  animation: glowPulse 6s ease-in-out infinite;
  z-index: -1;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 20%;
  right: 10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(217, 74, 30, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(50px);
  animation: glowPulse 8s ease-in-out infinite reverse;
  z-index: -1;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.hero-content {
  position: relative;
  max-width: 700px;
  z-index: 1;
}

.hero-content::before {
  content: '';
  position: absolute;
  inset: -50px;
  background: radial-gradient(ellipse at center, rgba(74, 222, 128, 0.05) 0%, transparent 60%);
  z-index: -1;
}
`;

fs.writeFileSync(path.join(__dirname, 'assets', 'hero-animated.css'), animatedHeroCSS);
console.log('Created: assets/hero-animated.css');

const particleJS = `
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
`;

fs.writeFileSync(path.join(__dirname, 'assets', 'particles.js'), particleJS);
console.log('Created: assets/particles.js');
console.log('Done!');
