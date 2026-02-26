async function updateDashboard() {
  const data = await apiCall("getTransactions");
  State.recurringTransactions = data.recurring || [];
  State.oneTimeTransactions = data.oneTime || [];

  const totals = calculateMonthlyTotals([...State.recurringTransactions, ...State.oneTimeTransactions]);

  document.getElementById("income").innerText = `${totals.income} ₪`;
  document.getElementById("expenses").innerText = `${totals.expense} ₪`;
  document.getElementById("savings").innerText = `${totals.savings} ₪`;

  const ctx = document.getElementById("dashboardChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["הכנסות","הוצאות","חיסכון"],
      datasets: [{
        label: "₪",
        data: [totals.income, totals.expense, totals.savings],
        backgroundColor: ["#22C55E","#EF4444","#3B82F6"]
      }]
    },
    options: { responsive:true, plugins:{ legend:{ display:false } } }
  });
}

updateDashboard();
