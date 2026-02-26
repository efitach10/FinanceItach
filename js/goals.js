const goalsList = document.getElementById("goalsList");
const addGoalBtn = document.getElementById("addGoalBtn");
let goals = [];

async function fetchGoals() {
  try {
    const res = await fetch(CONFIG.API_URL + '?action=getGoals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: CONFIG.SECRET })
    });
    goals = await res.json() || [];
    renderGoals();
  } catch (err) {
    console.error("Error fetching goals:", err);
  }
}

function renderGoals() {
  goalsList.innerHTML = '';
  goals.forEach(goal => {
    const div = document.createElement("div");
    div.className = "bg-gray-800 p-4 rounded-lg shadow-md";
    const progress = Math.min((goal.current / goal.target) * 100, 100);
    div.innerHTML = `
      <h2 class="font-bold">${goal.name}</h2>
      <p class="text-gray-400">${goal.current} ₪ מתוך ${goal.target} ₪</p>
      <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
        <div class="bg-green-400 h-2 rounded-full" style="width:${progress}%"></div>
      </div>
    `;
    goalsList.appendChild(div);
  });
}

addGoalBtn.addEventListener("click", async () => {
  const name = prompt("שם יעד:");
  const target = prompt("סכום יעד:");
  if (!name || !target) return;
  const goal = { name, target: parseFloat(target), current: 0 };
  await fetch(CONFIG.API_URL + '?action=addGoal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: CONFIG.SECRET, goal })
  });
  fetchGoals();
});

// אתחול
fetchGoals();