let categories = [];

async function loadCategories(){
    categories = await getCategories();
    renderCategories();
}

async function createCategory(name){
    await addCategory(name);
    await loadCategories();
}

async function editCategory(idx,newName){
    await updateCategory(idx,newName);
    await loadCategories();
}

async function removeCategory(idx){
    await deleteCategory(idx);
    await loadCategories();
}
