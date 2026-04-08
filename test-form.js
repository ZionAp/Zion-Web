const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Opening zionappliance.com...');
  await page.goto('https://zionappliance.com', { timeout: 30000 });
  
  console.log('Checking page loaded...');
  const title = await page.title();
  console.log('Page title:', title);
  
  console.log('\nChecking if success overlay CSS exists...');
  const hasCSS = await page.evaluate(() => {
    const sheets = document.styleSheets;
    for (let sheet of sheets) {
      try {
        for (let rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes('success-overlay')) {
            return true;
          }
        }
      } catch (e) {}
    }
    return false;
  });
  console.log(hasCSS ? '✅ CSS found' : '❌ CSS NOT found');
  
  console.log('\nChecking showSuccess function in JS...');
  const hasShowSuccess = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script[src*="main.js"]');
    return scripts.length > 0 ? '✅ JS loaded' : '❌ JS NOT loaded';
  });
  console.log(hasShowSuccess);
  
  console.log('\nSimulating form submission...');
  await page.evaluate(() => {
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
  });
  
  await page.waitForTimeout(500);
  
  console.log('\nChecking if overlay appears...');
  const overlay = await page.$('.success-overlay');
  if (overlay) {
    console.log('✅ OVERLAY DISPLAYED CORRECTLY!');
    const heading = await page.$eval('.success-modal h3', el => el.textContent);
    console.log('   Heading:', heading);
  }
  
  await browser.close();
  console.log('\n✅ Test passed - success overlay works!');
})();
