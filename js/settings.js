async function addCategory() {

    const data = {
        name: document.getElementById("categoryName").value,
        type: document.getElementById("categoryType").value
    };

    await api("addCategory", data);
    alert("קטגוריה נוספה");
}