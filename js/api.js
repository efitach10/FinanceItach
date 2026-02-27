// api.js – שכבת תקשורת אחידה עם Google Sheets
// כל הדפים ישתמשו בזה

const API_URL = "PASTE_YOUR_WEB_APP_URL_HERE"; // כאן הדבק את ה-URL של ה-Web App

/**
 * GET כל הנתונים מטבלת Sheet מסוימת
 * @param {string} sheetName - שם ה-Sheet
 * @returns {Promise<Array>} מערך אובייקטים
 */
async function getData(sheetName) {
    const url = `${API_URL}?action=get&sheet=${sheetName}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching data: " + res.status);
    return await res.json();
}

/**
 * POST – הוספת שורה ל-Sheet
 * @param {string} sheetName - שם ה-Sheet
 * @param {Object} data - אובייקט עם הנתונים
 */
async function addData(sheetName, data) {
    const body = {
        action: "add",
        sheet: sheetName,
        data
    };
    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Error adding data: " + res.status);
    return await res.json();
}

/**
 * POST – עדכון שדה בחסכון
 * @param {number|string} id - id של השורה ב-Sheet savings
 * @param {number} newAmount - סכום חדש
 */
async function updateSaving(id, newAmount) {
    const body = {
        action: "updateSaving",
        id,
        newAmount
    };
    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Error updating saving: " + res.status);
    return await res.json();
}

/**
 * POST – מחיקת שורה מטבלה
 * @param {string} sheetName - שם ה-Sheet
 * @param {number|string} id - מזהה השורה
 */
async function deleteData(sheetName, id) {
    const body = {
        action: "delete",
        sheet: sheetName,
        id
    };
    const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Error deleting data: " + res.status);
    return await res.json();
}

/**
 * פונקציה עזר: מחזיר אובייקט ריק עם כל השדות מטבלת Sheet
 * שימושי ליצירת טפסים דינמיים
 * @param {Array} headers
 */
function createEmptyRow(headers) {
    const obj = {};
    headers.forEach(h => obj[h] = "");
    return obj;
}
