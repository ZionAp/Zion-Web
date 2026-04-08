export async function onRequest(context) {
  return new Response(JSON.stringify({ 
    ok: true, 
    message: "Function is working!",
    method: context.request.method
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
