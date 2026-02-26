const categoriesList = document.getElementById("categoriesList");
const addCategoryBtn = document.getElementById("addCategoryBtn");
let categories = [];

async function fetchCategories() {
  try {
    const res = await fetch(CONFIG.API_URL + '?action=getCategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: CONFIG.SECRET })
    });
    categories = await res.json() || [];
    renderCategories();
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
}

function renderCategories() {
  categoriesList.innerHTML = '';
  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "bg-gray-800 p-3 rounded-lg flex justify-between items-center shadow-md";
    div.innerHTML = `
      <span>${cat.name}</span>
      <button onclick="deleteCategory('${cat.id}')" class="text-red-500">מחק</button>
    `;
    categoriesList.appendChild(div);
  });
}

addCategoryBtn.addEventListener("click", async () => {
  const name = prompt("שם קטגוריה:");
  if (!name) return;
  await fetch(CONFIG.API_URL + '?action=addCategory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: CONFIG.SECRET, category: { name } })
  });
  fetchCategories();
});

function deleteCategory(id) {
  if (!confirm("למחוק קטגוריה זו?")) return;
  fetch(CONFIG.API_URL + '?action=deleteCategory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: CONFIG.SECRET, id })
  }).then(fetchCategories);
}

// אתחול
fetchCategories();