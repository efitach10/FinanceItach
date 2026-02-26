function getMonthRange(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const start = new Date(year, month, CONFIG.MONTH_START_DAY);
    const end = new Date(year, month + 1, CONFIG.MONTH_START_DAY - 1);
    return { start, end };
}

function calculateMonthlyTotals() {
    const { start, end } = getMonthRange(state.currentMonth);

    const filtered = state.transactions.filter(t => {
        const d = new Date(t.date);
        return d >= start && d <= end;
    });

    const income = filtered
        .filter(t => t.type === "income")
        .reduce((s, t) => s + Number(t.amount), 0);

    const expense = filtered
        .filter(t => t.type === "expense")
        .reduce((s, t) => s + Number(t.amount), 0);

    return { income, expense };
}