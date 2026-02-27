// history.js

let currentDate = new Date(); // התאריך הנוכחי

// שמות החודשים בעברית
const months = [
    "ינואר","פברואר","מרץ","אפריל","מאי","יוני",
    "יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"
];

// מחליף חודש
function changeMonth(offset){
    currentDate.setMonth(currentDate.getMonth() + offset);
    updateMonthDisplay();
    loadHistoryData(); // טוען את הנתונים מה-Sheets בהתאם לחודש החדש
}

// מעדכן את תצוגת החודש
function updateMonthDisplay(){
    const monthName = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    document.getElementById("currentMonth").textContent = `${monthName} ${year}`;
}

// טוען את הנתונים מה-Sheets
function loadHistoryData(){
    // דוגמה – כאן תעשה fetch או קריאה ל-API שלך
    // לדוגמה: api.getHistory(currentDate.getFullYear(), currentDate.getMonth()+1)
    console.log("טוען נתונים עבור:", currentDate);
    // כאן תעדכן את summary cards והגרף
}

// אתחול בעת טעינת הדף
window.addEventListener("DOMContentLoaded", () => {
    updateMonthDisplay();
    loadHistoryData();
});
