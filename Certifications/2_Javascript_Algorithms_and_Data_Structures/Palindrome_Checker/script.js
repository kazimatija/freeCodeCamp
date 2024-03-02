const input = document.getElementById("text-input");
const button = document.getElementById("check-btn");
const result = document.getElementById("result-output");

const palindromeChecker = (input) => {

    if(input.value === "") {
        alert("Please input a value");
        return;
    }

    const phrase = input.value.toLowerCase().replace(/[^A-Za-z0-9]/gi, "");
    const reversedPhrase = phrase
        .split("")
        .reverse()
        .join("");

    if (reversedPhrase === phrase) {
        result.innerHTML = `<strong>${input.value}</strong> is a palindrome`;
    } else {
        result.innerHTML = `<strong>${input.value}</strong> is not a palindrome`;
    }

    result.classList.remove('hidden');
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      palindromeChecker(input);
      input.value = '';
    }
});

button.addEventListener('click', (event) => {
    event.preventDefault();
    palindromeChecker(input);
    input.value = '';
});