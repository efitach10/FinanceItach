async function apiCall(action, payload = {}) {
  try {
    const res = await fetch(`${CONFIG.API_URL}?action=${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: CONFIG.SECRET, ...payload })
    });
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}