async function saveTransaction() {
    const data = {
        type: document.getElementById("type").value,
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    };

    await api("addTransaction", data);
    alert("נשמר בהצלחה");
}