export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === "/api/submit-booking" && request.method === "POST") {
      const formData = await request.formData();
      const name = formData.get("fullName") || "";
      const email = formData.get("emailAddress") || "";
      const phone = formData.get("phoneNumber") || "";
      const appliance = formData.get("appliance") || "";
      const details = formData.get("serviceDetails") || "";
      
      if (!name || !email || !phone || !appliance) {
        return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      
      if (!env.RESEND_API_KEY) {
        return new Response(JSON.stringify({ ok: false, error: "Service unavailable. Call (505) 508-8203" }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Zion Appliance <bookings@zionappliancesolutions.com>",
            to: "zionappliance@gmail.com",
            reply_to: email,
            subject: `New Booking - ${appliance} - ${name}`,
            html: `<h1>New Booking</h1><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Appliance:</strong> ${appliance}</p><p><strong>Details:</strong> ${details}</p>`,
            text: `New Booking\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAppliance: ${appliance}\nDetails: ${details}`
          })
        });
        
        if (response.ok) {
          return new Response(JSON.stringify({ ok: true, message: "Booking submitted!" }), {
            headers: { "Content-Type": "application/json" }
          });
        } else {
          return new Response(JSON.stringify({ ok: false, error: "Failed to submit" }), {
            headers: { "Content-Type": "application/json" }
          });
        }
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: "Error: " + e.message }), {
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    
    return fetch(request);
  }
};
