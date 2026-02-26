document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchHistory");
  await loadHistory();

  searchInput.addEventListener("input", () => {
    filterHistory(searchInput.value);
  });
});

async function loadHistory() {
  const data = await apiCall("getTransactions");
  State.history = [...(data.recurring || []), ...(data.oneTime || [])];
  renderHistory(State.history);
}

function renderHistory(transactions) {
  const container = document.getElementById("historyTable");
  container.innerHTML = "";

  transactions.sort((a,b) => new Date(b.date) - new Date(a.date));

  transactions.forEach(tx => {
    const card = document.createElement("div");
    card.className = `card flex justify-between items-center`;
    card.innerHTML = `
      <div>
        <p class="font-semibold">${tx.category}</p>
        <p class="text-sm text-gray-300">${tx.description || "-"}</p>
        <p class="text-xs text-gray-400">${tx.date}</p>
      </div>
      <p class="${tx.type === 'income' ? 'income' : 'expense'} font-bold text-lg">
        ${tx.type === 'income' ? '+' : '-'}${tx.amount} ₪
      </p>
    `;
    container.appendChild(card);
  });
}

function filterHistory(searchText) {
  const filtered = State.history.filter(tx => 
    tx.category.toLowerCase().includes(searchText.toLowerCase()) ||
    (tx.description && tx.description.toLowerCase().includes(searchText.toLowerCase()))
  );
  renderHistory(filtered);
}
