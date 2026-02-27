//// movements.js

/* ===== SWITCH BETWEEN TABS ===== */
function showTab(tab){
    document.getElementById('fixedTab').style.display = tab==='fixed'?'block':'none';
    document.getElementById('variableTab').style.display = tab==='variable'?'block':'none';
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.tab-btn[onclick*="'+tab+'"]').classList.add('active');
}

/* ===== LOAD EXISTING MOVEMENTS FROM GOOGLE SHEETS ===== */
async function loadMovements(){
    try{
        const movements = await getData("movements"); // api.js מחזיר מערך של תנועות
        const list = document.getElementById("movementsList");
        list.innerHTML = ""; // נקה קודם

        movements.forEach(m=>{
            const div = document.createElement("div");
            div.className = "movement-item "+m.type;
            div.innerHTML = `<span>${m.category}</span><span>₪ ${m.amount}</span><span>${m.date}</span>`;
            if(m.notes) div.innerHTML += `<span>${m.notes}</span>`;
            list.appendChild(div);
        });
    }catch(err){
        console.error("Error loading movements:", err);
    }
}

/* ===== SAVE MOVEMENT ===== */
async function saveMovement(tab){
    try{
        let type, category, amount, date, notes;
        if(tab==='fixed'){
            type = document.getElementById("fixedType").value;
            category = document.querySelector("#fixedTab input[placeholder^='לדוגמה']").value;
            amount = document.querySelector("#fixedTab input[type='number']").value;
            date = document.querySelector("#fixedTab input[type='date']").value;
            notes = "";
        } else {
            type = document.getElementById("variableType").value;
            category = document.querySelector("#variableTab input[placeholder^='לדוגמה']").value;
            amount = document.querySelector("#variableTab input[type='number']").value;
            date = document.querySelector("#variableTab input[type='date']").value;
            notes = document.querySelector("#variableTab textarea").value;
        }

        if(!category || !amount || !date){
            alert("אנא מלא את כל השדות החיוניים");
            return;
        }

        const movement = {type, category, amount, date, notes};

        await addData("movements", movement); // פונקציה ב-api.js שמכניסה ל-Google Sheets
        await loadMovements(); // רענון הרשימה

        // ניקוי השדות לאחר שמירה
        if(tab==='fixed'){
            document.querySelector("#fixedTab input[placeholder^='לדוגמה']").value = "";
            document.querySelector("#fixedTab input[type='number']").value = "";
            document.querySelector("#fixedTab input[type='date']").value = "";
            document.querySelector("#fixedTab input[type='date']:nth-of-type(2)").value = "";
        } else {
            document.querySelector("#variableTab input[placeholder^='לדוגמה']").value = "";
            document.querySelector("#variableTab input[type='number']").value = "";
            document.querySelector("#variableTab input[type='date']").value = "";
            document.querySelector("#variableTab textarea").value = "";
        }

        alert("התנועה נשמרה בהצלחה!");
    }catch(err){
        console.error("Error saving movement:", err);
    }
}

// ==== INITIAL LOAD ====
window.onload = loadMovements;
