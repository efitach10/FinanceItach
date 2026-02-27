// movements.js

// ===== LOAD CATEGORIES INTO DROPDOWN =====
async function loadMovementCategories() {
    try {
        const categories = await getData("categories"); // מחובר למסך ההגדרות

        // Fixed Tab
        const fixedSelect = document.getElementById("fixedCategory");
        fixedSelect.innerHTML = "";
        categories.forEach(c => {
            const option = document.createElement("option");
            option.value = c.name;
            option.textContent = c.name;
            fixedSelect.appendChild(option);
        });

        // Variable Tab
        const variableSelect = document.getElementById("variableCategory");
        variableSelect.innerHTML = "";
        categories.forEach(c => {
            const option = document.createElement("option");
            option.value = c.name;
            option.textContent = c.name;
            variableSelect.appendChild(option);
        });

    } catch (err) {
        console.error("Error loading categories:", err);
    }
}

// ===== ADD MOVEMENT =====
async function saveMovement(type){
    try{
        let movement = {};
        if(type==='fixed'){
            movement = {
                type: document.getElementById('fixedType').value,
                category: document.getElementById('fixedCategory').value,
                amount: document.getElementById('fixedAmount').value,
                dateStart: document.getElementById('fixedDateStart').value,
                dateEnd: document.getElementById('fixedDateEnd').value,
            };
        } else {
            movement = {
                type: document.getElementById('variableType').value,
                category: document.getElementById('variableCategory').value,
                amount: document.getElementById('variableAmount').value,
                date: document.getElementById('variableDate').value,
                notes: document.getElementById('variableNotes').value,
            };
        }

        if(!movement.category || !movement.amount){
            alert("אנא מלא את כל השדות");
            return;
        }

        await addData("movements", movement); // api.js
        alert("התנועה נשמרה בהצלחה!");
        loadMovements(); // טען מחדש את הרשימה
    } catch(err){
        console.error("Error saving movement:", err);
    }
}

// ===== LOAD MOVEMENTS =====
async function loadMovements(){
    try{
        const movements = await getData("movements");
        const list = document.getElementById("movementsList");
        list.innerHTML = "";
        movements.forEach(m=>{
            const div = document.createElement("div");
            div.className = "movement-item " + m.type;
            div.innerHTML = `<span>${m.category}</span><span>₪ ${m.amount}</span>`;
            if(m.date) div.innerHTML += `<span>${m.date}</span>`;
            if(m.notes) div.innerHTML += `<span>${m.notes}</span>`;
            list.appendChild(div);
        });
    } catch(err){
        console.error("Error loading movements:", err);
    }
}

// ===== INITIAL LOAD =====
window.onload = async function(){
    await loadMovementCategories();
    await loadMovements();
};
