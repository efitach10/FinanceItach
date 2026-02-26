async function loadDashboard() {

    state.transactions = await api("getTransactions");
    state.recurring = await api("getRecurring");
    state.budgets = await api("getBudgets");
    state.goals = await api("getGoals");

    const totals = calculateMonthlyTotals();

    document.getElementById("incomeTotal").innerText = "₪ " + totals.income;
    document.getElementById("expenseTotal").innerText = "₪ " + totals.expense;

    const balance = totals.income - totals.expense;
    document.getElementById("balance").innerText = "₪ " + balance;

    document.getElementById("forecast").innerText = "₪ " + balance;

    document.getElementById("currentMonth").innerText =
        state.currentMonth.toLocaleString("he-IL", { month: "long", year: "numeric" });
}

function changeMonth(direction) {
    state.currentMonth.setMonth(state.currentMonth.getMonth() + direction);
    loadDashboard();
}

loadDashboard();