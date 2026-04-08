function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

function validateName(name) {
  return name && name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name.trim());
}

export async function onRequest(context) {
  const headers = {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff"
  };

  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), { status: 405, headers });
  }

  try {
    const contentType = context.request.headers.get("content-type") || "";
    if (!contentType.includes("application/x-www-form-urlencoded") && !contentType.includes("multipart/form-data")) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid content type." }), { status: 400, headers });
    }

    const formData = await context.request.formData();

    const name      = escapeHtml(formData.get("fullName")?.trim() || "");
    const email     = escapeHtml(formData.get("emailAddress")?.trim() || "");
    const phone     = escapeHtml(formData.get("phoneNumber")?.trim() || "");
    const appliance = escapeHtml(formData.get("appliance")?.trim() || "");
    const details   = escapeHtml(formData.get("serviceDetails")?.trim() || "");
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Denver' });

    if (!name || !email || !phone || !appliance) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields." }), { status: 400, headers });
    }

    if (!validateName(name)) {
      return new Response(JSON.stringify({ ok: false, error: "Please enter a valid name (at least 2 characters)." }), { status: 400, headers });
    }

    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Please enter a valid email address." }), { status: 400, headers });
    }

    if (!validatePhone(phone)) {
      return new Response(JSON.stringify({ ok: false, error: "Please enter a valid phone number (at least 10 digits)." }), { status: 400, headers });
    }

    const allowedAppliances = ["Washer", "Dryer", "Oven", "Refrigerator", "Dishwasher", "Freezer", "Microwave", "Other"];
    if (!allowedAppliances.includes(appliance)) {
      return new Response(JSON.stringify({ ok: false, error: "Please select a valid appliance type." }), { status: 400, headers });
    }

    if (!context.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(JSON.stringify({ ok: false, error: "Service temporarily unavailable. Please call us at (505) 508-8203." }), { status: 500, headers });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Zion Appliance <bookings@zionappliancesolutions.com>",
        to: "zionappliance@gmail.com",
        reply_to: email,
        subject: `New Service Booking - ${appliance} - ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Booking Request</h1>
              <p style="color: #94a3b8; margin: 10px 0 0 0;">Zion Appliance Solutions</p>
            </div>
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px; font-weight: bold; background: #1e3a5f; color: white; border-radius: 6px 0 0 6px;">Submitted:</td>
                  <td style="padding: 12px; background: #f1f5f9; border-radius: 0 6px 6px 0;">${timestamp}</td>
                </tr>
              </table>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; font-weight: bold; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; width: 35%;">Name</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; background: #f1f5f9; border-bottom: 1px solid #e2e8f0;">Email</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; background: #f1f5f9; border-bottom: 1px solid #e2e8f0;">Phone</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; background: #f1f5f9; border-bottom: 1px solid #e2e8f0;">Appliance</td>
                  <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><strong>${appliance}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; background: #f1f5f9; vertical-align: top;">Details</td>
                  <td style="padding: 12px;">${details || "None provided"}</td>
                </tr>
              </table>
              <div style="margin-top: 25px; padding: 15px; background: #ecfdf5; border-radius: 8px; border-left: 4px solid #10b981;">
                <strong style="color: #065f46;">Quick Action:</strong>
                <a href="tel:5055088203" style="color: #059669; font-size: 18px; text-decoration: none; font-weight: bold; margin-left: 10px;">Call (505) 508-8203</a>
              </div>
            </div>
            <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 20px;">
              This booking was submitted through zionappliancesolutions.com
            </p>
          </body>
          </html>
        `,
        text: `
New Booking Request - Zion Appliance Solutions
===============================================

Submitted: ${timestamp}

Name: ${name}
Email: ${email}
Phone: ${phone}
Appliance: ${appliance}
Details: ${details || "None provided"}

Quick Call: (505) 508-8203
        `
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Resend API error:", response.status, errorData);
      throw new Error(`Resend API error: ${response.status}`);
    }

    return new Response(JSON.stringify({ ok: true, message: "Booking submitted successfully! We'll contact you shortly." }), { status: 200, headers });

  } catch (error) {
    console.error("Booking submission error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Failed to submit booking. Please call us directly at (505) 508-8203." }),
      { status: 500, headers }
    );
  }
}
