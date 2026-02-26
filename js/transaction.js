document.addEventListener("DOMContentLoaded", () => {
  const recurringTab = document.getElementById("tabRecurring");
  const oneTimeTab = document.getElementById("tabOneTime");
  const recurringSection = document.getElementById("recurringSection");
  const oneTimeSection = document.getElementById("oneTimeSection");

  // Tab switch
  recurringTab.addEventListener("click", () => {
    recurringSection.classList.remove("hidden");
    oneTimeSection.classList.add("hidden");
  });

  oneTimeTab.addEventListener("click", () => {
    recurringSection.classList.add("hidden");
    oneTimeSection.classList.remove("hidden");
  });

  // Load transactions
  loadTransactions();
});

async function loadTransactions() {
  const data = await apiCall("getTransactions");
  State.recurringTransactions = data.recurring || [];
  State.oneTimeTransactions = data.oneTime || [];

  renderTransactions(State.recurringTransactions, "recurringSection");
  renderTransactions(State.oneTimeTransactions, "oneTimeSection");
}

function renderTransactions(transactions, sectionId) {
  const container = document.getElementById(sectionId);
  container.innerHTML = "";

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

// Add transaction function
async function addTransaction(tx, isRecurring = false) {
  const action = isRecurring ? "addRecurring" : "addOneTime";
  const result = await apiCall(action, { transaction: tx });
  if(result.success) loadTransactions();
}
