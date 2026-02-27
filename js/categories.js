// categories.js

/* ===== CATEGORY MANAGEMENT ===== */
// כאן נשמור זמנית את הקטגוריות – בהמשך יתחבר ל-Google Sheets דרך api.js
const categories = [];

// API לדפים אחרים (Movements, Budgets וכו')
const api = {
    getCategories: function() {
        // מחזיר עותק כדי למנוע שינוי ישיר
        return [...categories];
    },
    addCategory: function(name){
        categories.push(name);
        // כאן אפשר להוסיף קריאה ל-Google Sheets כדי לשמור
        // e.g., googleApi.addCategoryToSheet(name)
    },
    updateCategory: function(idx, newName){
        if(idx >=0 && idx < categories.length){
            categories[idx] = newName;
            // כאן אפשר לעדכן את ה-Sheet
            // e.g., googleApi.updateCategoryInSheet(idx, newName)
        }
    },
    deleteCategory: function(idx){
        if(idx >=0 && idx < categories.length){
            categories.splice(idx, 1);
            // כאן אפשר למחוק מה-Sheet
            // e.g., googleApi.deleteCategoryFromSheet(idx)
        }
    }
};

// אתחול לדוגמה (ניתן למחוק כשמחוברים ל-Sheets)
categories.push("שכירות");
categories.push("אוכל");
categories.push("תחבורה");
categories.push("בידור");
