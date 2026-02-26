function calculateMonthlyTotals(transactions) {
  let income = 0, expense = 0;
  transactions.forEach(tx => {
    if(tx.type === 'income') income += Number(tx.amount);
    else expense += Number(tx.amount);
  });
  return { income, expense, savings: income - expense };
}

function checkBudgetOverrun(transactions, budgets) {
  const overs = {};
  budgets.forEach(b => {
    const total = transactions
      .filter(tx => tx.category === b.category)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
    if(total > b.amount) overs[b.category] = total - b.amount;
  });
  return overs;
}