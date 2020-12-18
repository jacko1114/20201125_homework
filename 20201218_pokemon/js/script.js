const row = document.querySelector("#container .row");
const btn = document.getElementById("getAllbtn");
const btnByAppendChild = document.getElementById("getAllbtnByAppendChild");
const btnReset = document.getElementById("reset");

const getAllPokemon = () => {
    let pokemons = "";
    for (let i = 1; i < 890; i++) {
        fileName = i.toString().padStart(3, "0");
        pathName = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`;
        pokemonImg = `<img src="${pathName}" />`;
        pokemons += pokemonImg;
    }
    row.innerHTML = pokemons;
}

const getAllPokemonByAppendChild = () => {
    getData();
}

const createFirstPokemon = () => {
    template = `<div class="col-6 col-md-3 col-lg-2">
                    <div class="pokemon-item">
                        <div class="pokemon-front">
                            <div class="pokemon-pic">
                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png" alt="001">
                            </div>
                            <div class="pokemon-content">
                                <span class="serial">#001</span>
                                <h2>妙蛙種子</h2>
                                <span class="type Grass">Grass</span>                     
                                <span class="type Poison">Poison</span>                     
                            </div>
                        </div>
                        <div class="pokemon-back">
                            <div class="pokemon-back-content">
                                <h2>基礎數值</h2>
                                <span>Hp : 45</span>
                                <span>Attack : 49</span>                   
                                <span>Defense : 49</span>                   
                                <span>Sp-Attack : 65</span>                   
                                <span>Sp-Defense : 65</span>                   
                                <span>Speed : 45</span>                   
                            </div>
                        </div>
                    </div>
                </div>`;
    row.innerHTML = template;
}

const getData = () => {
    $.getJSON("./js/pokemons.json", function (res) {
        let template = "";

        for (let i = 0; i < res.length; i++) {
            fileName = res[i].id.toString().padStart(3, "0");
            template += `
                <div class="col-6 col-md-3 col-lg-2">
                    <div class="pokemon-item">
                        <div class="pokemon-front">
                            <div class="pokemon-pic">
                                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png" alt="${fileName}">
                            </div>
                            <div class="pokemon-content">
                                <span class="serial">#${fileName}</span>
                                <h2>${res[i].name.chinese}</h2>`;

            for (let j = 0; j < res[i].type.length; j++) {
                template += `<span class="type ${res[i].type[j]}">${res[i].type[j]}</span> `;
            }
            template += `</div>
                            <div class="pokemon-back">
                                <div class="pokemon-back-content">
                                    <h2>基礎數值</h2>
                                    <span>Hp : ${res[i].base.HP}</span>
                                    <span>Attack : ${res[i].base.Attack}</span>                   
                                    <span>Defense : ${res[i].base.Defense}</span>                   
                                    <span>Sp-Attack : ${res[i].base.Sp_Attack}</span>                   
                                    <span>Sp-Defense : ${res[i].base.Sp_Defense}</span>                   
                                    <span>Speed : ${res[i].base.Speed}</span>                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        row.innerHTML = template;
    })
}
const reset = () => {
    row.innerHTML = "";
    createFirstPokemon();
}

window.addEventListener("load", createFirstPokemon);

btn.addEventListener("click", getData);

btnByAppendChild.addEventListener("click", getAllPokemonByAppendChild);

btnReset.addEventListener("click", reset);


