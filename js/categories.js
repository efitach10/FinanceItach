// categories.js

/* ===== CATEGORY MANAGEMENT ===== */
// מחזיק את רשימת הקטגוריות בזיכרון המקומי (עד שהטעננו מ-Sheets)
let categories = [];

/* ===== פונקציות API ===== */
const categoryAPI = {
    
    // טען קטגוריות מה-Google Sheets
    loadCategories: async function() {
        try {
            categories = await getCategories(); // פונקציה מ-api.js
            return [...categories];
        } catch(err){
            console.error("Failed to load categories:", err);
            return [];
        }
    },

    // החזר עותק של הקטגוריות
    getCategories: function() {
        return [...categories];
    },

    // הוסף קטגוריה חדשה גם לזיכרון וגם ל-Google Sheets
    addCategory: async function(name) {
        try {
            const res = await addCategory(name); // api.js
            if(res.success){
                categories.push(name);
            }
            return res;
        } catch(err){
            console.error("Failed to add category:", err);
            throw err;
        }
    },

    // עדכן קטגוריה קיימת לפי אינדקס
    updateCategory: async function(idx, newName){
        try {
            const res = await updateCategory(idx, newName); // api.js
            if(res.success){
                if(idx >=0 && idx < categories.length){
                    categories[idx] = newName;
                }
            }
            return res;
        } catch(err){
            console.error("Failed to update category:", err);
            throw err;
        }
    },

    // מחק קטגוריה לפי אינדקס
    deleteCategory: async function(idx){
        try {
            const res = await deleteCategory(idx); // api.js
            if(res.success){
                if(idx >=0 && idx < categories.length){
                    categories.splice(idx,1);
                }
            }
            return res;
        } catch(err){
            console.error("Failed to delete category:", err);
            throw err;
        }
    }

};
