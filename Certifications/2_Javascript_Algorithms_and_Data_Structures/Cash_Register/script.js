let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const unitValues = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.10,
  'QUARTER': 0.25,
  'ONE': 1.00,
  'FIVE': 5.00,
  'TEN': 10.00,
  'TWENTY': 20.00,
  'ONE HUNDRED': 100.00
};
const changeDue = document.getElementById('change-due')
const cashInput = document.getElementById('cash');
const purchaseButton = document.getElementById('purchase-btn');
const totalSpan = document.getElementById('total-span');
const pennies = document.getElementById('pennies');
const nickels = document.getElementById('nickels');
const dimes = document.getElementById('dimes');
const quarters = document.getElementById('quarters');
const ones = document.getElementById('ones');
const fives = document.getElementById('fives');
const tens = document.getElementById('tens');
const twenties = document.getElementById('twenties');
const hundreds = document.getElementById('hundreds');

function loadValues() {
  totalSpan.textContent = `$${price}`;
  pennies.textContent = `$${cid[0][1]}`;
  nickels.textContent = `$${cid[1][1]}`;
  dimes.textContent = `$${cid[2][1]}`;
  quarters.textContent = `$${cid[3][1]}`;
  ones.textContent = `$${cid[4][1]}`;
  fives.textContent = `$${cid[5][1]}`;
  tens.textContent = `$${cid[6][1]}`;
  twenties.textContent = `$${cid[7][1]}`;
  hundreds.textContent = `$${cid[8][1]}`;
}

function checkAvailability() {
  const cash = Number(cashInput.value);
  let totalChange = cash - price;

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return "insufficient";
  }
  if (cash === price) {
    changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>";
    return "insufficient";
  }

  let allCashInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
    allCashInDrawer += cid[i][1];
  }
  if (allCashInDrawer < totalChange) {
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return "insufficient";
  }
  if (allCashInDrawer === totalChange) {
    changeDue.innerHTML = "<p>Status: CLOSED</p>";
    return "closed";
  }

  const cashMap = new Map(
    cid
      .slice()
      .reverse()
      .map(([name, amount]) => [unitValues[name], amount])
  );

  let countEmpty = 0;
  for (let [unitValue, totalAmount] of cashMap) {
    const changeUnits = Math.floor(totalChange / unitValue) > totalAmount / unitValue
      ? Number(totalAmount.toFixed(2))
      : Math.floor(totalChange / unitValue) * unitValue;
    totalAmount = Number((totalAmount - changeUnits).toFixed(2));
    totalChange = Number((totalChange - changeUnits).toFixed(2));
    if (totalAmount === 0) {
      countEmpty++;
    }
  }

  if (totalChange !== 0) {
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
    return "insufficient";
  } else if (countEmpty === 9) {
    changeDue.innerHTML = "<p>Status: CLOSED</p>";
    return "closed";
  } else if (totalChange === 0) {
    changeDue.innerHTML = "<p>Status: OPEN</p>";
    return "open";
  }
}

function makeTransaction() {
  const availible = checkAvailability();
  if (availible === "insufficient") return;

  const cash = cashInput.value;
  let totalChange = parseFloat((cash - price).toFixed(2));

  for (let i = cid.length - 1; i >= 0; i--) {
    const unitName = cid[i][0];
    const unitValue = unitValues[unitName];
    let amountAvailable = cid[i][1];

    let amountToReturn = 0;

    while (totalChange >= unitValue && amountAvailable >= unitValue) {
      totalChange = parseFloat((totalChange - unitValue).toFixed(2));
      amountAvailable = parseFloat((amountAvailable - unitValue).toFixed(2));
      amountToReturn = parseFloat((amountToReturn + unitValue).toFixed(2));
    }

    if (amountToReturn !== 0) {
      changeDue.innerHTML += `<p>${unitName}: $${amountToReturn}</p>`;
    }
    cid[i][1] = amountAvailable;
  }
}

window.onload = loadValues();

purchaseButton.addEventListener('click', () => {
  makeTransaction();
  loadValues();
})