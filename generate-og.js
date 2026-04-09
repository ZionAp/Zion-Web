const fs = require('fs');
const path = require('path');

// Generate OG Image (Open Graph image for social sharing)
const ogImage = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f"/>
      <stop offset="100%" style="stop-color:#2d5a87"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <circle cx="30" cy="30" r="2" fill="rgba(255,255,255,0.1)"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  
  <!-- Logo Icon -->
  <rect x="80" y="200" width="120" height="120" rx="20" fill="#4ade80"/>
  <rect x="100" y="220" width="80" height="80" rx="10" fill="white"/>
  <rect x="115" y="235" width="25" height="25" rx="5" fill="#4ade80"/>
  <rect x="145" y="235" width="20" height="10" rx="2" fill="#ff6b35"/>
  <rect x="145" y="250" width="20" height="10" rx="2" fill="#4ade80"/>
  <rect x="115" y="275" width="50" height="15" rx="3" fill="#1e3a5f"/>
  
  <!-- Title -->
  <text x="240" y="260" font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="white">ZION APPLIANCE</text>
  <text x="240" y="310" font-family="Arial, sans-serif" font-size="36" fill="#4ade80">SOLUTIONS</text>
  
  <!-- Divider -->
  <rect x="240" y="340" width="400" height="4" rx="2" fill="#4ade80"/>
  
  <!-- Tagline -->
  <text x="240" y="400" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)">Same-Day Appliance Repair</text>
  <text x="240" y="445" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.7)">in Albuquerque, NM</text>
  
  <!-- Contact Info Box -->
  <rect x="750" y="420" width="370" height="140" rx="12" fill="rgba(255,255,255,0.1)"/>
  <text x="780" y="465" font-family="Arial, sans-serif" font-size="22" fill="white">📞 (505) 456-3046</text>
  <text x="780" y="500" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.8)">zionappliance@gmail.com</text>
  <text x="780" y="535" font-family="Arial, sans-serif" font-size="16" fill="#4ade80">zionappliance.com</text>
  
  <!-- Rating Badge -->
  <rect x="80" y="420" width="150" height="60" rx="30" fill="#4ade80"/>
  <text x="115" y="458" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">4.9/5 ⭐</text>
  
  <!-- Services Preview -->
  <text x="80" y="550" font-family="Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.6)">Washers • Dryers • Ovens • Refrigerators • Dishwashers</text>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'og-image.svg'), ogImage);
console.log('✅ Generated: og-image.svg (vector, scalable)');

// Also create a simpler PNG-friendly version info
console.log('\n📝 Note: For PNG output, use https://cloudconvert.com/svg-to-png or similar service');
console.log('   The SVG version can be used directly in browsers and is resolution-independent.');

console.log('\n🎨 OG Image generated!');
