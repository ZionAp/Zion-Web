const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Collect console messages
  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  
  // Track network requests
  const requests = [];
  page.on('request', req => {
    if (req.url().includes('web3forms') || req.url().includes('formspree')) {
      requests.push(`Request: ${req.url()}`);
    }
  });
  page.on('response', res => {
    if (res.url().includes('web3forms') || res.url().includes('formspree')) {
      requests.push(`Response: ${res.status()} ${res.url()}`);
    }
  });
  
  console.log('Opening zionappliance.com...');
  await page.goto('https://zionappliance.com', { waitUntil: 'networkidle' });
  
  // Check if BookingForm exists
  console.log('\nChecking if JS module loaded...');
  const bookingFormExists = await page.evaluate(() => {
    // Check if the IIFE executed
    return typeof BookingForm !== 'undefined' || document.querySelector('#booking-form') !== null;
  });
  console.log('Form element exists:', bookingFormExists);
  
  console.log('\nFilling form...');
  await page.fill('#fullName', 'Test User');
  await page.fill('#emailAddress', 'test@example.com');
  await page.fill('#phoneNumber', '555-555-5555');
  await page.selectOption('#appliance', 'Refrigerator');
  
  console.log('\nAdding click listener to debug...');
  await page.evaluate(() => {
    const form = document.querySelector('#booking-form');
    form.addEventListener('submit', (e) => {
      console.log('Form submit event fired!');
      console.log('Form action:', form.action);
    }, true);
  });
  
  console.log('Clicking submit...');
  await page.click('button[type="submit"]');
  
  await page.waitForTimeout(3000);
  
  console.log('\n--- Console Logs ---');
  logs.forEach(log => console.log(log));
  
  console.log('\n--- Network Requests ---');
  requests.forEach(req => console.log(req));
  
  await browser.close();
})();
