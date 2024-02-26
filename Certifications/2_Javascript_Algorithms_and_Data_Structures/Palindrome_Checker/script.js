const input = document.getElementById("phrase");
const button = document.getElementById("check");
const result = document.getElementById("result");

const palindromeChecker = (input) => {
    const phrase = input.value;
    const reversedPhrase = phrase
        .split("")
        .reverse()
        .join("");

    if (reversedPhrase === phrase) {
        result.innerHTML = "The phrase is a palindrome";
    } else {
        result.innerHTML = "The phrase is not a palindrome";
    }
};