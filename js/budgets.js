// budgets.js

// ===== LOAD CATEGORIES INTO DROPDOWN =====
async function loadBudgetCategories() {
    try {
        const categories = await getData("categories"); // מחובר למסך ההגדרות
        const select = document.getElementById("budgetCategory");
        select.innerHTML = ""; // נקה קודם
        categories.forEach(c => {
            const option = document.createElement("option");
            option.value = c.name;
            option.textContent = c.name;
            select.appendChild(option);
        });
    } catch (err) {
        console.error("Error loading categories:", err);
    }
}

// ===== LOAD EXISTING BUDGETS =====
async function loadBudgets() {
    try {
        const budgets = await getData("budgets");
        const list = document.getElementById("budgetsList");
        list.innerHTML = "";

        budgets.forEach(b => {
            const div = document.createElement("div");
            div.className = "budget-item";
            
            let statusColor = "";
            if (parseFloat(b.spent) > parseFloat(b.amount)) {
                statusColor = "style='color:#ef4444;'"; // אדום – חריגה
            } else if (parseFloat(b.spent) / parseFloat(b.amount) > 0.75) {
                statusColor = "style='color:#f59e0b;'"; // כתום – מעל 75%
            } else {
                statusColor = "style='color:#10b981;'"; // ירוק
            }

            div.innerHTML = `
                <span>${b.category}</span>
                <span>תקציב: ₪${b.amount}</span>
                <span ${statusColor}>שולם: ₪${b.spent}</span>
            `;
            list.appendChild(div);
        });
    } catch (err) {
        console.error("Error loading budgets:", err);
    }
}

// ===== SAVE NEW BUDGET =====
async function saveBudget() {
    try {
        const category = document.getElementById("budgetCategory").value;
        const amount = document.getElementById("budgetAmount").value;

        if (!category || !amount) {
            alert("אנא מלא את כל השדות");
            return;
        }

        const budget = {
            category,
            amount,
            spent: 0
        };

        await addData("budgets", budget); // api.js
        await loadBudgets();

        document.getElementById("budgetAmount").value = "";

        alert("תקציב נשמר בהצלחה!");
    } catch (err) {
        console.error("Error saving budget:", err);
    }
}

// ==== INITIAL LOAD ====
window.onload = async function() {
    await loadBudgetCategories();
    await loadBudgets();
};
