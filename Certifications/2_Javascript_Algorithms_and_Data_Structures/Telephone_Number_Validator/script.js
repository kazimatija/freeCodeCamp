const input = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');

checkBtn.addEventListener('click', () => {
    const inputValue = input.value;
    input.value = "";
    if (inputValue === '') {
        alert('Please provide a phone number');
    }
    else {
        const regex = /^1?\s*(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
        const test = regex.test(inputValue);

        const resultsDiv = document.querySelector("#results-div");
        const p = document.createElement("p");
        p.textContent = test
            ? "Valid US number: " + inputValue
            : "Invalid US number: " + inputValue;
        p.style.color = test ? "green" : "red";
        resultsDiv.appendChild(p);
    }
});

clearBtn.addEventListener('click', () => {
    document.getElementById("results-div").innerHTML = "";
})