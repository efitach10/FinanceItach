const API_BASE_URL = "https://script.google.com/macros/s/AKfycby-ZECJQuRBmnpKu-7tOtCQPFCxDeWJoVMONdM5ZfiTVSbnBSLe9rJjTSTryu6VYvCb/exec";

async function callAPI(path, method="GET", body=null) {

    let url = API_BASE_URL;

    if(method === "GET"){
        url += "?path=" + path;
        if(body){
            Object.keys(body).forEach(key=>{
                url += `&${key}=${encodeURIComponent(body[key])}`;
            });
        }
    }

    const options = {
        method: method,
        headers: {"Content-Type":"application/json"}
    };

    if(method === "POST"){
        options.body = JSON.stringify({path, ...body});
    }

    const res = await fetch(url, options);
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
    return await callAPI("addCategory","POST",{name});
}

async function updateCategory(idx,newName){
    return await callAPI("updateCategory","POST",{idx,newName});
}

async function deleteCategory(idx){
    return await callAPI("deleteCategory","POST",{idx});
}
