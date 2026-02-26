async function loadGoals() {

    const goals = await api("getGoals");
    const list = document.getElementById("goalsList");
    list.innerHTML = "";

    goals.forEach(g => {

        const remaining = g.target_amount - g.current_amount;
        const monthsLeft = Math.max(1,
            (new Date(g.deadline) - new Date()) / (1000*60*60*24*30)
        );

        const neededPerMonth = (remaining / monthsLeft).toFixed(0);

        const progress = (g.current_amount / g.target_amount) * 100;

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3 class="font-bold">${g.name}</h3>
            <p>₪ ${g.current_amount} / ₪ ${g.target_amount}</p>
            <div class="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div class="bg-blue-500 h-3 rounded-full"
                     style="width:${progress}%"></div>
            </div>
            <p class="text-sm mt-2">
                צריך לחסוך ₪ ${neededPerMonth} לחודש
            </p>
        `;

        list.appendChild(div);
    });
}

async function addGoal() {

    const data = {
        name: document.getElementById("goalName").value,
        target_amount: Number(document.getElementById("goalTarget").value),
        deadline: document.getElementById("goalDeadline").value
    };

    await api("addGoal", data);
    alert("יעד נוסף בהצלחה");
    loadGoals();
}

loadGoals();