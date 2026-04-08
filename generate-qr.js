const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

async function generateQRCodes() {
  const phoneNumber = 'tel:+15055088203';
  const whatsappNumber = 'https://wa.me/15055088203';
  
  // Generate phone QR code
  await QRCode.toFile(path.join(__dirname, 'assets', 'phone-qr.png'), phoneNumber, {
    color: {
      dark: '#1e3a5f',
      light: '#ffffff'
    },
    width: 400,
    margin: 2
  });
  console.log('✅ Generated: assets/phone-qr.png');
  
  // Generate WhatsApp QR code
  await QRCode.toFile(path.join(__dirname, 'assets', 'whatsapp-qr.png'), whatsappNumber, {
    color: {
      dark: '#25D366',
      light: '#ffffff'
    },
    width: 400,
    margin: 2
  });
  console.log('✅ Generated: assets/whatsapp-qr.png');
  
  // Generate vCard QR code
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Zion Appliance Solutions
TEL:+15055088203
EMAIL:zionappliance@gmail.com
URL:https://zionappliance.com
ORG:Zion Appliance Solutions
NOTE:Same-day appliance repair in Albuquerque
END:VCARD`;
  
  await QRCode.toFile(path.join(__dirname, 'assets', 'contact-qr.png'), vCard, {
    color: {
      dark: '#1e3a5f',
      light: '#ffffff'
    },
    width: 400,
    margin: 2
  });
  console.log('✅ Generated: assets/contact-qr.png');
  
  console.log('\n📱 QR codes generated successfully!');
  console.log('- phone-qr.png: Scan to call');
  console.log('- whatsapp-qr.png: Scan to message on WhatsApp');
  console.log('- contact-qr.png: Scan to save contact');
}

generateQRCodes().catch(console.error);
