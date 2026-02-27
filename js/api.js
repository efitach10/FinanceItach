const API_BASE_URL = "https://script.google.com/macros/s/AKfycby-ZECJQuRBmnpKu-7tOtCQPFCxDeWJoVMONdM5ZfiTVSbnBSLe9rJjTSTryu6VYvCb/exec";

async function callAPI(path, params = {}) {

    let url = API_BASE_URL + "?path=" + path;

    Object.keys(params).forEach(key=>{
        url += `&${key}=${encodeURIComponent(params[key])}`;
    });

    const res = await fetch(url);   // 🔥 אין POST יותר
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
