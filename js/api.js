//////////////////////////////////////////////////
// api.js - מחבר את האפליקציה ל-Google Sheets
//////////////////////////////////////////////////

const api = (function(){

    // תצורת הגיליונות (IDs של הגיליון והטבלאות)
    const SPREADSHEET_ID = "https://script.google.com/macros/s/AKfycbzN421EIrFI6mSk1x5nrUolgNQ40_vzP7n7FrQ9rhndYT4G3A6sJ8Ac-XIsByu0dpFo/exec"; // שנה למזהה האמיתי
    const SHEETS = {
        movements: "Movements",
        budgets: "Budgets",
        savings: "Savings",
        categories: "Categories",
        history: "History"
    };

    ////////////////////////
    // קטגוריות
    ////////////////////////
    function getCategories() {
        // כאן תעשה קריאה ל-Google Apps Script
        // לדוגמה, api.gs יחזיר מערך קטגוריות
        return fetchCategoryDataFromSheets();
    }

    function addCategory(name){
        fetch("/gs-api/addCategory", {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {'Content-Type':'application/json'}
        }).then(()=>console.log("Category added"));
    }

    function updateCategory(idx, newName){
        fetch("/gs-api/updateCategory", {
            method: "POST",
            body: JSON.stringify({idx,newName}),
            headers: {'Content-Type':'application/json'}
        }).then(()=>console.log("Category updated"));
    }

    function deleteCategory(idx){
        fetch("/gs-api/deleteCategory", {
            method: "POST",
            body: JSON.stringify({idx}),
            headers: {'Content-Type':'application/json'}
        }).then(()=>console.log("Category deleted"));
    }

    ////////////////////////
    // תנועות
    ////////////////////////
    function getMovements(month, year){
        return fetch(`/gs-api/getMovements?month=${month}&year=${year}`)
            .then(res=>res.json());
    }

    function addMovement(movement){
        // movement = {type, category, amount, date, notes, recurring}
        return fetch("/gs-api/addMovement", {
            method:"POST",
            body: JSON.stringify(movement),
            headers:{'Content-Type':'application/json'}
        });
    }

    ////////////////////////
    // חסכונות
    ////////////////////////
    function getSavings(){
        return fetch("/gs-api/getSavings").then(res=>res.json());
    }

    function addSaving(saving){
        // saving = {name, targetAmount, targetDate, currentAmount}
        return fetch("/gs-api/addSaving", {
            method:"POST",
            body: JSON.stringify(saving),
            headers:{'Content-Type':'application/json'}
        });
    }

    function updateSaving(idx, data){
        return fetch("/gs-api/updateSaving", {
            method:"POST",
            body: JSON.stringify({idx,data}),
            headers:{'Content-Type':'application/json'}
        });
    }

    ////////////////////////
    // תקציבים
    ////////////////////////
    function getBudgets(){
        return fetch("/gs-api/getBudgets").then(res=>res.json());
    }

    function addBudget(budget){
        return fetch("/gs-api/addBudget", {
            method:"POST",
            body: JSON.stringify(budget),
            headers:{'Content-Type':'application/json'}
        });
    }

    function updateBudget(idx, data){
        return fetch("/gs-api/updateBudget", {
            method:"POST",
            body: JSON.stringify({idx,data}),
            headers:{'Content-Type':'application/json'}
        });
    }

    ////////////////////////
    // היסטוריה
    ////////////////////////
    function getHistory(month, year){
        return fetch(`/gs-api/getHistory?month=${month}&year=${year}`)
            .then(res=>res.json());
    }

    ////////////////////////
    // PUBLIC API
    ////////////////////////
    return {
        getCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        getMovements,
        addMovement,
        getSavings,
        addSaving,
        updateSaving,
        getBudgets,
        addBudget,
        updateBudget,
        getHistory
    }

})();
