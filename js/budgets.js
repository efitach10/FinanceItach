let budgets = StorageManager.get('budgets');

function saveBudgets() {
    StorageManager.set('budgets', budgets);
}

function setBudget(category, amount) {

    const existing = budgets.find(b => b.category === category);

    if (existing) {
        existing.amount = Number(amount);
    } else {
        budgets.push({
            category,
            amount: Number(amount)
        });
    }

    saveBudgets();
}

function getBudget(category) {
    return budgets.find(b => b.category === category);
}

function getAllBudgets() {
    return budgets;
}
