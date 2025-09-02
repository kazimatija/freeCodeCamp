const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const abilityName = document.getElementById("ability-name");
const abilityDescription = document.getElementById("ability-description");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchCreature = async (idOrName) => {
    try {
        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${idOrName}`)
        const data = await res.json();
        displayCreature(data);
    }
    catch (err) {
        removeData();
        alert('Creature not found');
    }
};

const displayCreature = (data) => {
    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    types.innerHTML = data.types
      .map(object => `<span class="type ${object.name}">${object.name}</span>`)
      .join('');
    abilityName.textContent = data.special?.name;
    abilityDescription.textContent = data.special?.description;

    hp.textContent = data.stats[0]?.base_stat;
    attack.textContent = data.stats[1]?.base_stat;
    defense.textContent = data.stats[2]?.base_stat;
    specialAttack.textContent = data.stats[3]?.base_stat;
    specialDefense.textContent = data.stats[4]?.base_stat;
    speed.textContent = data.stats[5]?.base_stat;
};

const removeData = () => {
    creatureName.textContent = "";
    creatureId.textContent = ""; 
    weight.textContent = "";
    height.textContent = "";
    types.innerHTML = "";
    abilityName.textContent = "";
    abilityDescription.textContent = "";

    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const idOrName = searchInput.value.toLowerCase();
    fetchCreature(idOrName);
});