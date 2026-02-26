document.addEventListener("DOMContentLoaded", async () => {
  const btnAdd = document.getElementById("addCategoryBtn");
  await loadCategories();

  btnAdd.addEventListener("click", async () => {
    const name = prompt("שם הקטגוריה החדשה:");
    if(name) {
      const result = await apiCall("addCategory", { name });
      if(result.success) loadCategories();
    }
  });
});

async function loadCategories() {
  const data = await apiCall("getCategories");
  State.categories = data.categories || [];

  const container = document.getElementById("categoriesList");
  container.innerHTML = "";
  State.categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "card flex justify-between items-center";
    div.innerHTML = `
      <p class="font-semibold">${cat}</p>
      <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition" onclick="deleteCategory('${cat}')">מחק</button>
    `;
    container.appendChild(div);
  });
}

async function deleteCategory(name) {
  const result = await apiCall("deleteCategory", { name });
  if(result.success) loadCategories();
}
