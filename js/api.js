//////////////////////////////////////////////////
// api.js - מנוע חיבור ל-Google Sheets
//////////////////////////////////////////////////

const API_BASE_URL = "https://script.google.com/macros/s/AKfycbzN421EIrFI6mSk1x5nrUolgNQ40_vzP7n7FrQ9rhndYT4G3A6sJ8Ac-XIsByu0dpFo/exec"; // החלף בכתובת Web App שלך

// ======= קטגוריות =======
async function getCategories() {
  const res = await fetch(`${API_BASE_URL}?path=getCategories`);
  if(!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
}

async function addCategory(name){
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"addCategory", name})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to add category");
  return data;
}

async function updateCategory(idx, newName){
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"updateCategory", idx, newName})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to update category");
  return data;
}

async function deleteCategory(idx){
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"deleteCategory", idx})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to delete category");
  return data;
}

//////////////////////////////////////////////////
// תנועות
//////////////////////////////////////////////////
async function getMovements(month, year){
  const res = await fetch(`${API_BASE_URL}?path=getMovements&month=${month}&year=${year}`);
  if(!res.ok) throw new Error("Failed to fetch movements");
  return await res.json();
}

async function addMovement(movement){
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"addMovement", ...movement})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to add movement");
  return data;
}

//////////////////////////////////////////////////
// חסכונות
//////////////////////////////////////////////////
async function getSavings(){
  const res = await fetch(`${API_BASE_URL}?path=getSavings`);
  if(!res.ok) throw new Error("Failed to fetch savings");
  return await res.json();
}

async function addSaving(saving){
  const res = await fetch(API_BASE_URL, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"addSaving", ...saving})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to add saving");
  return data;
}

async function updateSaving(idx, dataObj){
  const res = await fetch(API_BASE_URL, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"updateSaving", idx, data: dataObj})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to update saving");
  return data;
}

//////////////////////////////////////////////////
// תקציבים
//////////////////////////////////////////////////
async function getBudgets(){
  const res = await fetch(`${API_BASE_URL}?path=getBudgets`);
  if(!res.ok) throw new Error("Failed to fetch budgets");
  return await res.json();
}

async function addBudget(budget){
  const res = await fetch(API_BASE_URL, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"addBudget", ...budget})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to add budget");
  return data;
}

async function updateBudget(idx, dataObj){
  const res = await fetch(API_BASE_URL, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({path:"updateBudget", idx, data: dataObj})
  });
  const data = await res.json();
  if(!data.success) throw new Error("Failed to update budget");
  return data;
}

//////////////////////////////////////////////////
// היסטוריה
//////////////////////////////////////////////////
async function getHistory(month, year){
  const res = await fetch(`${API_BASE_URL}?path=getHistory&month=${month}&year=${year}`);
  if(!res.ok) throw new Error("Failed to fetch history");
  return await res.json();
}

//////////////////////////////////////////////////
// פונקציות עזר
//////////////////////////////////////////////////
async function testAPI() {
  try{
    const categories = await getCategories();
    console.log("Categories:", categories);
  } catch(err){
    console.error(err);
  }
}
