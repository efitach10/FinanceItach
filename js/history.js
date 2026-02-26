const historyTable = document.getElementById("historyTable");
const historySearch = document.getElementById("historySearch");
let allTransactions = [];

async function fetchHistory() {
  try {
    const res = await fetch(CONFIG.API_URL + '?action=getAllTransactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: CONFIG.SECRET })
    });
    const data = await res.json();
    allTransactions = data || [];
    renderHistory(allTransactions);
  } catch (err) {
    console.error("Error fetching history:", err);
  }
}

function renderHistory(list) {
  historyTable.innerHTML = '';
  list.forEach(tx => {
    const tr = document.createElement("tr");
    tr.className = "bg-gray-800";
    tr.innerHTML = `
      <td class="px-4 py-2">${tx.category}</td>
      <td class="px-4 py-2 ${tx.type === 'income' ? 'text-green-400' : 'text-red-500'}">${tx.amount} ₪</td>
      <td class="px-4 py-2">${tx.description || '-'}</td>
      <td class="px-4 py-2">${tx.date}</td>
    `;
    historyTable.appendChild(tr);
  });
}

// חיפוש
historySearch.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = allTransactions.filter(tx =>
    tx.category.toLowerCase().includes(query) ||
    (tx.description && tx.description.toLowerCase().includes(query)) ||
    tx.amount.toString().includes(query)
  );
  renderHistory(filtered);
});

// אתחול
fetchHistory();