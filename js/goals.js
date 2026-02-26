document.addEventListener("DOMContentLoaded", async () => {
  await loadGoals();
});

async function loadGoals() {
  const data = await apiCall("getGoals");
  State.goals = data.goals || [];
  renderGoals();
}

function renderGoals() {
  const container = document.getElementById("goalsList");
  container.innerHTML = "";

  State.goals.forEach(goal => {
    const progress = Math.min(100, Math.round((goal.saved / goal.target) * 100));
    const card = document.createElement("div");
    card.className = "card p-4 space-y-2";
    card.innerHTML = `
      <p class="font-semibold">${goal.name}</p>
      <p class="text-sm text-gray-300">יעד: ${goal.target} ₪ | חסכון נוכחי: ${goal.saved} ₪</p>
      <div class="w-full bg-gray-700 rounded-full h-3">
        <div class="bg-blue-500 h-3 rounded-full transition-all" style="width: ${progress}%"></div>
      </div>
      <p class="text-xs text-gray-400">${progress}% הושלם</p>
    `;
    container.appendChild(card);
  });
}

// הוספת יעד חדש
async function addGoal(goal) {
  const result = await apiCall("addGoal", { goal });
  if(result.success) loadGoals();
}
