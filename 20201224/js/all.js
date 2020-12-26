let index = 0;
let pokemonArray = [];
let newPokemonArray = [];
let pokemonData = [];
let newPokemonData = [];
const addOne = document.querySelector("#addOne");
const removeOne = document.querySelector("#removeOne");
const addAll = document.querySelector("#addAll");
const reset = document.querySelector("#reset");
const row = document.querySelector(".row:last-child");

const addPokemon = (id) => {
    clean();
    newPokemonArray.forEach((item, index) => {
        if (index + 1 > id) return;
        let card = document.querySelector("#pokemonTemplate");
        let cloneContent = card.content.cloneNode(true);
        cloneContent.querySelector(".pokemon-id").innerText = item.id;
        cloneContent.querySelector(".pokemon-name").innerText = item.name;
        cloneContent.querySelector("img").src = item.img;
        cloneContent.querySelector(".btn").setAttribute("data-toggle", "modal");
        cloneContent.querySelector(".btn").setAttribute("data-target", ".modal");

        dataToModal(cloneContent, index);

        row.appendChild(cloneContent);
    })
}
const getPokemonJSON = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.githubusercontent.com/jacko1114/20201125_homework/main/20201218_pokemon/js/pokemons.json");
    xhr.send();
    xhr.addEventListener("load", function () {
        pokemonArray = JSON.parse(this.responseText);
        newPokemonArray = getNewPokemonData();
        addPokemon(1);
        console.log(newPokemonArray);
    })
}
const getNewPokemonData = () => {
    let newArray = pokemonArray.map((item, index) => {
        return {
            id: item.id.toString().padStart(3, "0"),
            name: item.name.chinese,
            hp: item.base.HP,
            attack: item.base.Attack,
            defense: item.base.Defense,
            sp_attack: item.base["Sp_Attack"],
            sp_defense: item.base["Sp_Defense"],
            speed: item.base.Speed,
            img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${item.id.toString().padStart(3, "0")}.png`,
            type: item.type,
            evolution: item.evolution,
            genus: item.genus,
        }
    })
    return newArray;
}

const dataToModal = (clone, index) => {
    clone.querySelector(".btn").addEventListener("click", function () {
        
        let modal = document.querySelector(".modal");
        modal.querySelector("h5").innerText = `No.${newPokemonArray[index].id} ． ${newPokemonArray[index].name}`;
        modal.querySelector("#pokemonImage").src = newPokemonArray[index].img;
        modal.querySelector("#hp").textContent = newPokemonArray[index].hp;
        modal.querySelector("#attack").textContent = newPokemonArray[index].attack;
        modal.querySelector("#defense").textContent = newPokemonArray[index].defense;
        modal.querySelector("#spAttack").textContent = newPokemonArray[index].sp_attack;
        modal.querySelector("#spDefense").textContent = newPokemonArray[index].sp_defense;
        modal.querySelector("#speed").textContent = newPokemonArray[index].speed;
        modal.querySelector(".genus span").textContent = newPokemonArray[index].genus
        
        let types = document.querySelector(".types");
        types.innerHTML = "";
        newPokemonArray[index].type.forEach(type => {
            let span = document.createElement("span");
            span.textContent = attributeTransform(type);
            span.classList.add("type", `${type}`, "py-2", "px-3", "text-white", "mx-3", "rounded-pill", "h6");
            types.appendChild(span);
        })
        let evolution = document.querySelector(".evolution");
        newPokemonArray[index].evolution.forEach(item=>{
            let img = document.createElement("img");
            let div = document.createElement("div");
            div.classList.add("py-5","my-5","h4");

            img.src = item.id.toString().padStart(3,"0") != "000" ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${newPokemonArray[index].evolution}.png` : null

            div.innerText = item.id.toString().padStart(3,"0") == "000" ? "無法進化" : null

            evolution.append(img,div);
        })  
    })
}
const clean = () => { 
    row.innerHTML = "";
}

const attributeTransform = (eng) => {
    switch (eng) {
        case "Normal":
            return "一般";
        case "Grass":
            return "草";
        case "Poison":
            return "毒";
        case "Fire":
            return "火焰";
        case "Electric":
            return "雷電";
        case "Dragon":
            return "龍";
        case "Fighting":
            return "格鬥";
        case "Ground":
            return "地面";
        case "Ghost":
            return "鬼";
        case "Water":
            return "水";
        case "Psychic":
            return "超能力";
        case "Dark":
            return "惡";
        case "Flying":
            return "飛行";
        case "Rock":
            return "岩石";
        case "Steel":
            return "鋼鐵";
        case "Ice":
            return "冰";
        case "Fairy":
            return "妖精";
        case "Bug":
            return "蟲";
    }
}

//事件監聽
window.addEventListener("load", getPokemonJSON)
addOne.addEventListener("click", function () {
    index++;
    addPokemon(index);
})
removeOne.addEventListener("click", function () {
    index = index <= 0 ? 0 : --index;
    addPokemon(index);
});
addAll.addEventListener("click", function () {
    index = newPokemonArray.length;
    addPokemon(index);
});
reset.addEventListener("click", function () {
    index = 0;
    clean();
});
