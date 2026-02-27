// savings.js

// ===== SAVE NEW SAVING =====
async function saveSaving(){
    try{
        const name = document.getElementById("savingName").value;
        const target = document.getElementById("savingTarget").value;
        const targetDate = document.getElementById("savingTargetDate").value;

        if(!name){
            alert("אנא מלא שם לחסכון");
            return;
        }

        const saving = {
            name,
            target: target || 0,
            targetDate: targetDate || null,
            current: 0
        };

        await addData("savings", saving); // api.js
        alert("חסכון נוצר בהצלחה!");
        loadSavings();
        document.getElementById("savingName").value="";
        document.getElementById("savingTarget").value="";
        document.getElementById("savingTargetDate").value="";
    } catch(err){
        console.error("Error saving saving:", err);
    }
}

// ===== LOAD EXISTING SAVINGS =====
async function loadSavings(){
    try{
        const savings = await getData("savings");
        const list = document.getElementById("savingsList");
        list.innerHTML = "";

        savings.forEach((s, idx)=>{
            const div = document.createElement("div");
            div.className = "saving-item";

            const progressPercent = s.target>0 ? Math.min((s.current/s.target)*100, 100) : 0;

            div.innerHTML = `
                <span><b>${s.name}</b></span>
                ${s.target>0 ? `<span>יעד: ₪${s.target} | חסכתי: ₪${s.current}</span>` : `<span>חסכתי: ₪${s.current}</span>`}
                ${s.target>0 ? `<div class="progress-bar"><div class="progress" style="width:${progressPercent}%"></div></div>` : ""}
                <span class="edit-btn" onclick="addToSaving(${idx})">✏️</span>
            `;

            list.appendChild(div);
        });
    } catch(err){
        console.error("Error loading savings:", err);
    }
}

// ===== ADD TO SAVING =====
async function addToSaving(idx){
    try{
        const savings = await getData("savings");
        const s = savings[idx];
        const amount = prompt(`הוסף סכום לחסכון: ${s.name}`, "0");
        if(amount && !isNaN(amount)){
            s.current += parseFloat(amount);
            await updateData("savings", idx, s); // api.js
            loadSavings();
        }
    } catch(err){
        console.error("Error adding to saving:", err);
    }
}

// ===== INITIAL LOAD =====
window.onload = async function(){
    loadSavings();
};
