const API_BASE_URL = "https://script.google.com/macros/s/AKfycby-ZECJQuRBmnpKu-7tOtCQPFCxDeWJoVMONdM5ZfiTVSbnBSLe9rJjTSTryu6VYvCb/exec";

async function callAPI(path, params = {}) {

    let url = API_BASE_URL + "?path=" + path;

    Object.keys(params).forEach(key=>{
        url += `&${key}=${encodeURIComponent(params[key])}`;
    });

    const res = await fetch(url);
    const data = await res.json();

    if(!res.ok){
        console.error("API Error:", data);
        throw new Error("API request failed");
    }

    return data;
}

/* ===== Categories ===== */

async function getCategories(){
    return await callAPI("getCategories");
}

async function addCategory(name){
    return await callAPI("addCategory",{name});
}

async function updateCategory(idx,newName){
    return await callAPI("updateCategory",{idx,newName});
}

async function deleteCategory(idx){
    return await callAPI("deleteCategory",{idx});
}
🔥 2️⃣ עכשיו צריך לעדכן את Code.gs

במקום להשתמש ב-doPost
נעביר הכל ל-doGet

תשנה את ה-doGet שלך לזה:

function doGet(e){

  const path = e.parameter.path;

  switch(path){

    case "getCategories":
      return json(getCategories());

    case "addCategory":
      addCategory(e.parameter.name);
      return json({success:true});

    case "updateCategory":
      updateCategory(parseInt(e.parameter.idx), e.parameter.newName);
      return json({success:true});

    case "deleteCategory":
      deleteCategory(parseInt(e.parameter.idx));
      return json({success:true});

    default:
      return json({error:"Unknown path"});
  }
}

function json(data){
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

ואפשר למחוק את doPost לגמרי.

🚀 למה זה עובד?

GET לא שולח Preflight
אין OPTIONS
אין CORS חסום
Google מאפשר את זה בלי בעיה

📌 אחרי זה:

Deploy → New Version

תעתיק את ה-URL החדש

תדביק ב-api.js

תנסה שוב

🎯 זה אמור לעבוד מיד.

אם זה עדיין לא עובד —
אז נעשה פתרון Enterprise עם CORS headers מלאים.

אבל 99% שזה יפתור את הבעיה עכשיו.

תעדכן אותי 👇
