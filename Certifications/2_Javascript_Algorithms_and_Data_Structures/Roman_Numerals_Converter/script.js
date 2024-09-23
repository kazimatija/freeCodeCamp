document.getElementById('convert-btn').addEventListener('click', convertToRoman);
document.getElementById('number').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        convertToRoman();
    }
});

function convertToRoman() {
    const numberInput = document.getElementById('number').value;
    const output = document.getElementById('output');
    
    output.classList.remove('error', 'success');
    
    if (numberInput === '') {
        output.textContent = 'Please enter a valid number';
        output.classList.add('error');
        return;
    }

    const number = parseInt(numberInput);
    if (number <= 0) {
        output.textContent = 'Please enter a number greater than or equal to 1';
        output.classList.add('error');
        return;
    } else if (number >= 4000) {
        output.textContent = 'Please enter a number less than or equal to 3999';
        output.classList.add('error');
        return;
    }
    
    const romanNumerals = [
        ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
        ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
        ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
    ];
    
    let roman = '';
    let num = number;
    
    for (let [letter, value] of romanNumerals) {
        while (num >= value) {
            roman += letter;
            num -= value;
        }
    }
    
    output.textContent = roman;
    output.classList.add('success');
}
