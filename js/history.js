function calculateMonthlySummary(monthIndex) {

    const monthMovements = getMovementsByMonth(monthIndex);

    const income = monthMovements
        .filter(m => m.type === 'income')
        .reduce((sum, m) => sum + m.amount, 0);

    const expenses = monthMovements
        .filter(m => m.type === 'expense')
        .reduce((sum, m) => sum + m.amount, 0);

    const totalSavings = getAllSavings()
        .reduce((sum, s) => sum + s.current, 0);

    return {
        income,
        expenses,
        totalSavings,
        net: income - expenses
    };
}
