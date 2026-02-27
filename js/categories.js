let categories = StorageManager.get('categories');

function saveCategories() {
    StorageManager.set('categories', categories);
}

function addCategory(name, type) {
    if (!name) return;
    categories.push({ name, type });
    saveCategories();
}

function deleteCategory(index) {
    categories.splice(index, 1);
    saveCategories();
}

function updateCategory(index, newName) {
    if (!newName) return;
    categories[index].name = newName;
    saveCategories();
}

function getCategories(type = null) {
    if (!type) return categories;
    return categories.filter(c => c.type === type);
}
