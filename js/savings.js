let savings = StorageManager.get('savings');

function saveSavings() {
    StorageManager.set('savings', savings);
}

function addSaving(name, target = null, targetDate = null) {
    savings.push({
        id: Date.now(),
        name,
        current: 0,
        target,
        targetDate
    });

    saveSavings();
}

function updateSavingAmount(id, newAmount) {
    const saving = savings.find(s => s.id === id);
    if (!saving) return;

    saving.current = Number(newAmount);
    saveSavings();
}

function getAllSavings() {
    return savings;
}
