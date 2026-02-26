// משתנים עיקריים
const recurringListEl = document.getElementById("recurringList");
const oneTimeListEl = document.getElementById("oneTimeList");
const addRecurringBtn = document.getElementById("addRecurringBtn");
const addOneTimeBtn = document.getElementById("addOneTimeBtn");

// רשימות בזיכרון (ימולאו מה-API)
let recurringTransactions = [];
let oneTimeTransactions = [];

// -------------------- פונקציות API --------------------
// פונקציות אלו קוראות ל-Google Apps Script דרך API_URL
async function fetchTransactions() {
  // קבלת תנועות קבועות ולא קבועות
  try {
    const res = await fetch(CONFIG.API_URL + '?action=getTransactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: CONFIG.SECRET })
    });
    const data = await res.json();
    recurringTransactions = data.recurring || [];
    oneTimeTransactions = data.oneTime || [];
    renderRecurring();
    renderOneTime();
  } catch (err) {
    console.error("Error fetching transactions:", err);
  }
}

// -------------------- Render --------------------
function renderRecurring() {
  recurringListEl.innerHTML = '';
  recurringTransactions.forEach(tx => {
    const div = document.createElement("div");
    div.className = "bg-gray-800 p-3 rounded-lg shadow-md flex justify-between items-center";
    div.innerHTML = `
      <div>
        <p class="font-bold">${tx.category} - ${tx.amount} ₪</p>
        <p class="text-gray-400 text-sm">${tx.description} (${tx.startDate} → ${tx.endDate})</p>
      </div>
      <div>
        <button onclick="editRecurring('${tx.id}')" class="text-blue-500 mr-2">ערוך</button>
        <button onclick="deleteRecurring('${tx.id}')" class="text-red-500">מחק</button>
      </div>
    `;
    recurringListEl.appendChild(div);
  });
}

function renderOneTime() {
  oneTimeListEl.innerHTML = '';
  oneTimeTransactions.forEach(tx => {
    const div = document.createElement("div");
    div.className = "bg-gray-800 p-3 rounded-lg shadow-md flex justify-between items-center";
    div.innerHTML = `
      <div>
        <p class="font-bold">${tx.category} - ${tx.amount} ₪</p>
        <p class="text-gray-400 text-sm">${tx.description} (${tx.date})</p>
      </div>
      <div>
        <button onclick="editOneTime('${tx.id}')" class="text-blue-500 mr-2">ערוך</button>
        <button onclick="deleteOneTime('${tx.id}')" class="text-red-500">מחק</button>
      </div>
    `;
    oneTimeListEl.appendChild(div);
  });
}

// -------------------- הוספת תנועה --------------------
addRecurringBtn.addEventListener("click", async () => {
  const category = prompt("קטגוריה:");
  const amount = prompt("סכום:");
  const description = prompt("תיאור:");
  const startDate = prompt("תאריך התחלה (YYYY-MM-DD):");
  const endDate = prompt("תאריך סיום (YYYY-MM-DD):");

  if (!category || !amount || !startDate || !endDate) return;

  const tx = { category, amount, description, startDate, endDate };

  await fetch(CONFIG.API_URL + '?action=addRecurring', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: CONFIG.SECRET, transaction: tx })
  });

  fetchTransactions();
});

addOneTimeBtn.addEventListener("click", async () => {
  const category = prompt("קטגוריה:");
  const amount = prompt("סכום:");
  const description = prompt("תיאור:");
  const date = new Date().toISOString().split('T')[0]; // חודש נוכחי

  if (!category || !amount) return;

  const tx = { category, amount, description, date };

  await fetch(CONFIG.API_URL + '?action=addOneTime', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: CONFIG.SECRET, transaction: tx })
  });

  fetchTransactions();
});

// -------------------- עריכה ומחיקה --------------------
function editRecurring(id) {
  alert("עריכת תנועה קבועה תתבצע כאן – ניתן להוסיף modal מתקדם");
}

function deleteRecurring(id) {
  if (!confirm("האם למחוק תנועה זו?")) return;
  fetch(CONFIG.API_URL + '?action=deleteRecurring', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: CONFIG.SECRET, id })
  }).then(fetchTransactions);
}

function editOneTime(id) {
  alert("עריכת תנועה לא קבועה תתבצע כאן – ניתן להוסיף modal מתקדם");
}

function deleteOneTime(id) {
  if (!confirm("האם למחוק תנועה זו?")) return;
  fetch(CONFIG.API_URL + '?action=deleteOneTime', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: CONFIG.SECRET, id })
  }).then(fetchTransactions);
}

// -------------------- הכנסת תנועות קבועות אוטומטית לחודש --------------------
async function insertRecurringMonthly() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  recurringTransactions.forEach(async tx => {
    const start = new Date(tx.startDate);
    const end = new Date(tx.endDate);
    if (today >= start && today <= end) {
      // הכנס תנועה לא קבועה לחודש הנוכחי
      const oneTimeTx = {
        category: tx.category,
        amount: tx.amount,
        description: tx.description,
        date: `${year}-${String(month).padStart(2,'0')}-10` // תאריך תחילת חודש מותאם
      };
      await fetch(CONFIG.API_URL + '?action=addOneTime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: CONFIG.SECRET, transaction: oneTimeTx })
      });
    }
  });
}

// -------------------- אתחול --------------------
(async function init() {
  await fetchTransactions();
  await insertRecurringMonthly();
})();