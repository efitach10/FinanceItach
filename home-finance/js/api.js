async function api(action, payload = {}) {
    const res = await fetch(CONFIG.API_URL, {
        method: "POST",
        body: JSON.stringify({
            secret: CONFIG.SECRET,
            action,
            ...payload
        })
    });
    return await res.json();
}