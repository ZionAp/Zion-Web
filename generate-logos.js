const fs = require('fs');
const path = require('path');

// Logo variations generator
const logos = [
  {
    name: 'logo-horizontal.svg',
    width: 300,
    height: 80,
    viewBox: '0 0 300 80',
    content: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80">
        <rect x="10" y="15" width="50" height="50" rx="8" fill="#1e3a5f"/>
        <rect x="18" y="23" width="34" height="34" rx="4" fill="white"/>
        <rect x="22" y="27" width="12" height="12" rx="2" fill="#4ade80"/>
        <rect x="36" y="27" width="10" height="4" rx="1" fill="#ff6b35"/>
        <rect x="36" y="33" width="10" height="4" rx="1" fill="#4ade80"/>
        <text x="75" y="42" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1e3a5f">Zion Appliance</text>
        <text x="75" y="60" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Solutions</text>
      </svg>
    `
  },
  {
    name: 'logo-icon-only.svg',
    width: 512,
    height: 512,
    viewBox: '0 0 512 512',
    content: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <rect width="512" height="512" rx="64" fill="#1e3a5f"/>
        <rect x="100" y="80" width="312" height="352" rx="32" fill="white"/>
        <rect x="130" y="120" width="120" height="120" rx="16" fill="#4ade80"/>
        <rect x="262" y="120" width="100" height="50" rx="8" fill="#ff6b35"/>
        <rect x="262" y="180" width="100" height="50" rx="8" fill="#4ade80"/>
        <rect x="130" y="270" width="232" height="50" rx="8" fill="#1e3a5f"/>
        <rect x="130" y="340" width="180" height="50" rx="8" fill="#d94a1e"/>
      </svg>
    `
  },
  {
    name: 'logo-dark.svg',
    width: 200,
    height: 50,
    viewBox: '0 0 200 50',
    content: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
        <rect x="5" y="5" width="40" height="40" rx="6" fill="#4ade80"/>
        <rect x="10" y="10" width="30" height="30" rx="3" fill="white"/>
        <rect x="14" y="14" width="10" height="10" rx="2" fill="#4ade80"/>
        <rect x="26" y="14" width="8" height="4" rx="1" fill="#ff6b35"/>
        <rect x="26" y="20" width="8" height="4" rx="1" fill="#4ade80"/>
        <text x="55" y="32" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">Zion Appliance</text>
      </svg>
    `
  },
  {
    name: 'logo-service-badge.svg',
    width: 200,
    height: 60,
    viewBox: '0 0 200 60',
    content: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
        <rect width="200" height="60" rx="12" fill="#1e3a5f"/>
        <circle cx="30" cy="30" r="20" fill="#4ade80"/>
        <path d="M22 30 L28 36 L38 24" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
        <text x="60" y="28" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white">LICENSED & INSURED</text>
        <text x="60" y="46" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8">Zion Appliance Solutions</text>
      </svg>
    `
  }
];

// Generate all logos
logos.forEach(logo => {
  const fullContent = `<?xml version="1.0" encoding="UTF-8"?>\n${logo.content.trim()}`;
  fs.writeFileSync(path.join(__dirname, 'assets', logo.name), fullContent);
  console.log(`✅ Generated: assets/${logo.name}`);
});

console.log('\n🎨 Logo variations created!');

// Also create a simple favicon
const favicon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1e3a5f"/>
  <rect x="6" y="6" width="20" height="20" rx="3" fill="white"/>
  <rect x="9" y="9" width="6" height="6" rx="1" fill="#4ade80"/>
  <rect x="17" y="9" width="5" height="2" rx="0.5" fill="#ff6b35"/>
  <rect x="17" y="13" width="5" height="2" rx="0.5" fill="#4ade80"/>
  <rect x="9" y="17" width="13" height="6" rx="1" fill="#1e3a5f"/>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'favicon.svg'), favicon);
console.log('✅ Generated: favicon.svg');

console.log('\n✨ All logos and icons generated!');
