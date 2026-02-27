let movements = StorageManager.get('movements');

function saveMovements() {
    StorageManager.set('movements', movements);
}

function addMovement(type, category, amount, date, notes = '') {
    movements.push({
        id: Date.now(),
        type,
        category,
        amount: Number(amount),
        date,
        notes
    });

    saveMovements();
}

function getMovementsByMonth(monthIndex) {
    return movements.filter(m =>
        new Date(m.date).getMonth() === monthIndex
    );
}

function getAllMovements() {
    return movements;
}
