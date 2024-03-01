const input = document.getElementById("phrase");
const button = document.getElementById("check");
const result = document.getElementById("result");

const palindromeChecker = (input) => {

    if(input.value === "") {
        result.innerHTML = "Please enter a phrase";
        return;
    }

    const phrase = input.value.toLowerCase().replace(/\s/g, "");
    const reversedPhrase = phrase
        .split("")
        .reverse()
        .join("");

    if (reversedPhrase === phrase) {
        result.innerHTML = `The phrase "<strong>${input.value}</strong>" is a palindrome`;
    } else {
        result.innerHTML = `The phrase "<strong>${input.value}</strong>" is not a palindrome`;
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