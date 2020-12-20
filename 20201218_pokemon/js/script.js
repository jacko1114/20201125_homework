const row = document.querySelector("#container .row");
const btn = document.getElementById("getAllBtn");
const btnByAppendChild = document.getElementById("getAllBtnByAppendChild");
const btnMore = document.querySelector("#getMoreBtn");
const btnReset = document.getElementById("reset");

let number_record = 0;

const attributeTransform = (eng) =>{
    switch(eng){
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
    for (let i = 2; i < 890; i++) {
        img = document.createElement("img");
        fileName = i.toString().padStart(3, "0");
        pathName = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png`;
        img.src = pathName;
        row.appendChild(img);
    }
    
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
                                <span class="type Grass">草</span>                     
                                <span class="type Poison">毒</span>                     
                            </div>
                        </div>
                        <div class="pokemon-back">
                            <div class="pokemon-back-content">
                                <h2>基礎數值</h2>
                                <span class="base-hp">Hp : 45</span>
                                <span class="base-at">Attack : 49</span>                   
                                <span class="base-de">Defense : 49</span>                   
                                <span class="base-sat">Sp-Attack : 65</span>                   
                                <span class="base-sde">Sp-Defense : 65</span>                   
                                <span class="base-sp">Speed : 45</span>                   
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
                template += `<span class="type ${res[i].type[j]}">${attributeTransform(res[i].type[j])}</span> `;
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

const showMorePokemon = (start_number) => {
    return function(more_number){
        $.getJSON("./js/pokemons.json", function (res) {
            let template = "";
            let end_number = start_number + more_number;
            
            res.forEach((item,index)=>{
                if(index>=end_number){ return;}
                
                let fileName = item.id.toString().padStart(3, "0");
                template += `<div class="col-6 col-md-3 col-lg-2">
                        <div class="pokemon-item">
                            <div class="pokemon-front">
                                <div class="pokemon-pic">
                                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${fileName}.png" alt="${fileName}">
                                </div>
                                <div class="pokemon-content">
                                    <span class="serial">#${fileName}</span>
                                    <h2>${item.name.chinese}</h2>`;

                for (let j = 0; j < item.type.length; j++) {
                    template += `<span class="type ${item.type[j]}">${attributeTransform(item.type[j])}</span> `;
                }

                template += `</div>
                                <div class="pokemon-back">
                                    <div class="pokemon-back-content">
                                        <h2>基礎數值</h2>
                                        <span class="base-hp">Hp : ${item.base.HP}</span>
                                        <span class="base-at">Attack : ${item.base.Attack}</span>                   
                                        <span class="base-de">Defense : ${item.base.Defense}</span>                   
                                        <span class="base-sat">Sp-Attack : ${item.base.Sp_Attack}</span>                   
                                        <span class="base-sde">Sp-Defense : ${item.base.Sp_Defense}</span>                   
                                        <span class="base-sp">Speed : ${item.base.Speed}</span>                             
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            })
            row.innerHTML = template;
        })
    }
}

let showTenPokemon = showMorePokemon(1);

window.addEventListener("load", createFirstPokemon);

btn.addEventListener("click", getData);

btnByAppendChild.addEventListener("click", getData);

btnReset.addEventListener("click", reset);

btnMore.addEventListener("click",function(e){
    number_record < 10 ? number_record = parseInt(e.target.dataset.more) : number_record += 10;
    showTenPokemon(number_record);
});
