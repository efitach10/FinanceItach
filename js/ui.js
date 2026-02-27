function formatCurrency(amount) {
    const currency = localStorage.getItem('currency') || '₪';
    return currency + ' ' + amount.toLocaleString();
}

function populateCategorySelect(selectId, type) {

    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = '';

    getCategories(type).forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}
