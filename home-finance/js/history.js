async function loadHistory() {

    const transactions = await api("getTransactions");

    const list = document.getElementById("historyList");
    const search = document.getElementById("searchInput").value.toLowerCase();
    const monthValue = document.getElementById("monthFilter").value;

    let filtered = transactions;

    if (monthValue) {
        const selected = new Date(monthValue + "-01");
        filtered = filtered.filter(t => {
            const d = new Date(t.date);
            return d.getMonth() === selected.getMonth() &&
                   d.getFullYear() === selected.getFullYear();
        });
    }

    if (search) {
        filtered = filtered.filter(t =>
            t.description?.toLowerCase().includes(search)
        );
    }

    list.innerHTML = "";

    filtered.sort((a,b) => new Date(b.date) - new Date(a.date));

    filtered.forEach(t => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <div class="flex justify-between">
                <strong>${t.type === "expense" ? "🔴" : "🟢"} ₪ ${t.amount}</strong>
                <span>${t.date}</span>
            </div>
            <div>${t.description || ""}</div>
        `;

        list.appendChild(div);
    });
}

document.getElementById("searchInput")
?.addEventListener("input", loadHistory);

document.getElementById("monthFilter")
?.addEventListener("change", loadHistory);

loadHistory();