const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

//change code to different kind of loop
for (let i = 1; i <= count; i++) {
  rows.push(padRow(i, count));
}

let result = ""

for (const row of rows) {
  result = result + "\n" + row;
}

console.log(result);