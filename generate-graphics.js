const fs = require('fs');
const path = require('path');

// ============================================
// BEAUTIFUL SVG BACKGROUNDS
// ============================================

const backgrounds = [
  {
    name: 'hero-gradient.svg',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f"/>
      <stop offset="50%" style="stop-color:#2d5a87"/>
      <stop offset="100%" style="stop-color:#1e3a5f"/>
    </linearGradient>
    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle cx="50" cy="50" r="2" fill="rgba(74,222,128,0.1)"/>
      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(74,222,128,0.05)" stroke-width="1"/>
      <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(74,222,128,0.05)" stroke-width="1"/>
    </pattern>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1920" height="1080" fill="url(#g1)"/>
  <rect width="1920" height="1080" fill="url(#circuit)"/>
  <circle cx="200" cy="200" r="300" fill="rgba(74,222,128,0.03)" filter="url(#glow)"/>
  <circle cx="1700" cy="800" r="400" fill="rgba(217,74,30,0.03)" filter="url(#glow)"/>
</svg>`
  },
  {
    name: 'hero-mesh.svg',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="mesh1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e3a5f"/>
    </linearGradient>
    <radialGradient id="glow1" cx="20%" cy="30%">
      <stop offset="0%" style="stop-color:#4ade80;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#4ade80;stop-opacity:0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="70%">
      <stop offset="0%" style="stop-color:#d94a1e;stop-opacity:0.1"/>
      <stop offset="100%" style="stop-color:#d94a1e;stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#mesh1)"/>
  <ellipse cx="384" cy="324" rx="500" ry="400" fill="url(#glow1)"/>
  <ellipse cx="1536" cy="756" rx="600" ry="500" fill="url(#glow2)"/>
  <line x1="0" y1="1080" x2="1920" y2="0" stroke="rgba(74,222,128,0.05)" stroke-width="2"/>
  <line x1="0" y1="540" x2="1920" y2="540" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
  <line x1="960" y1="0" x2="960" y2="1080" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
</svg>`
  },
  {
    name: 'hero-abstract.svg',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="abs1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f"/>
      <stop offset="100%" style="stop-color:#152a45"/>
    </linearGradient>
    <linearGradient id="abs2" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#2d5a87;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#2d5a87;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#abs1)"/>
  <path d="M0 0 L400 0 L200 400 L0 200 Z" fill="url(#abs2)"/>
  <path d="M1920 1080 L1520 1080 L1720 680 L1920 880 Z" fill="rgba(74,222,128,0.05)"/>
  <circle cx="300" cy="800" r="200" fill="rgba(217,74,30,0.08)"/>
  <circle cx="1600" cy="300" r="150" fill="rgba(74,222,128,0.05)"/>
  <rect x="100" y="500" width="300" height="300" rx="50" fill="rgba(255,255,255,0.02)" transform="rotate(15, 250, 650)"/>
</svg>`
  },
  {
    name: 'hero-waves.svg',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#wave1)"/>
  <path d="M0 800 Q480 700 960 800 T1920 800 L1920 1080 L0 1080 Z" fill="rgba(74,222,128,0.05)"/>
  <path d="M0 850 Q480 780 960 850 T1920 850 L1920 1080 L0 1080 Z" fill="rgba(74,222,128,0.03)"/>
  <path d="M0 900 Q480 850 960 900 T1920 900 L1920 1080 L0 1080 Z" fill="rgba(74,222,128,0.02)"/>
  <circle cx="1500" cy="200" r="100" fill="rgba(217,74,30,0.1)"/>
</svg>`
  }
];

// ============================================
// ENHANCED LOGO
// ============================================

const logo = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120">
  <defs>
    <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4ade80"/>
      <stop offset="100%" style="stop-color:#22c55e"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Logo Icon -->
  <g filter="url(#shadow)">
    <rect x="10" y="20" width="80" height="80" rx="16" fill="#1e3a5f"/>
    <rect x="20" y="30" width="60" height="60" rx="8" fill="white"/>
    <rect x="28" y="38" width="18" height="18" rx="4" fill="url(#logo-grad)"/>
    <rect x="50" y="38" width="24" height="8" rx="2" fill="#d94a1e"/>
    <rect x="50" y="50" width="24" height="8" rx="2" fill="url(#logo-grad)"/>
    <rect x="28" y="66" width="46" height="14" rx="3" fill="#1e3a5f"/>
  </g>
  
  <!-- Text -->
  <text x="110" y="50" font-family="Arial, sans-serif" font-size="32" font-weight="800" fill="#1e3a5f">ZION APPLIANCE</text>
  <text x="110" y="75" font-family="Arial, sans-serif" font-size="16" font-weight="500" fill="#64748b">SOLUTIONS</text>
  
  <!-- Accent dot -->
  <circle cx="280" cy="40" r="6" fill="#d94a1e"/>
</svg>`;

const logoIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f"/>
      <stop offset="100%" style="stop-color:#2d5a87"/>
    </linearGradient>
    <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4ade80"/>
      <stop offset="100%" style="stop-color:#22c55e"/>
    </linearGradient>
    <filter id="fshadow">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Background circle -->
  <circle cx="256" cy="256" r="240" fill="url(#lg1)" filter="url(#fshadow)"/>
  
  <!-- Inner shapes -->
  <rect x="100" y="120" width="180" height="180" rx="24" fill="white"/>
  <rect x="130" y="150" width="50" height="50" rx="8" fill="url(#lg2)"/>
  <rect x="190" y="150" width="70" height="25" rx="4" fill="#d94a1e"/>
  <rect x="190" y="185" width="70" height="25" rx="4" fill="url(#lg2)"/>
  <rect x="130" y="230" width="130" height="40" rx="8" fill="#1e3a5f"/>
  
  <!-- Gear accent -->
  <circle cx="380" cy="380" r="80" fill="url(#lg2)" opacity="0.8"/>
  <circle cx="380" cy="380" r="50" fill="white" opacity="0.3"/>
  <circle cx="380" cy="380" r="30" fill="url(#lg2)"/>
</svg>`;

const faviconNew = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#1e3a5f"/>
  <rect x="12" y="12" width="40" height="40" rx="6" fill="white"/>
  <rect x="18" y="18" width="12" height="12" rx="2" fill="#4ade80"/>
  <rect x="32" y="18" width="16" height="6" rx="1" fill="#d94a1e"/>
  <rect x="32" y="26" width="16" height="6" rx="1" fill="#4ade80"/>
  <rect x="18" y="34" width="30" height="10" rx="2" fill="#1e3a5f"/>
</svg>`;

// ============================================
// GENERATE ALL FILES
// ============================================

console.log('🎨 Generating backgrounds...\n');
backgrounds.forEach(bg => {
  fs.writeFileSync(path.join(__dirname, 'assets', bg.name), bg.content);
  console.log(`✅ ${bg.name}`);
});

console.log('\n🔷 Generating logos...\n');
fs.writeFileSync(path.join(__dirname, 'assets', 'logo-main.svg'), logo);
console.log('✅ logo-main.svg');

fs.writeFileSync(path.join(__dirname, 'assets', 'logo-icon-new.svg'), logoIcon);
console.log('✅ logo-icon-new.svg');

fs.writeFileSync(path.join(__dirname, 'favicon.svg'), faviconNew);
console.log('✅ favicon.svg (updated)');

console.log('\n✨ All assets generated!');
