const buttonNextPokemon = document.querySelector(".nextPokemon");
const buttonPreviousPokemon = document.querySelector(".previousPokemon");
buttonNextPokemon.addEventListener("click", event => {
    reload(event)
});
buttonPreviousPokemon.addEventListener("click", event => {
    reload(event)
});
let indice = 1;
function getPokemonUrl(id) {
    return `https://pokeapi.co/api/v2/pokemon/${id}`
}
function getPokemon() {
    return fetch(getPokemonUrl(indice))
        .then(response => response.json())
}
function setImage(id) {
    const img = document.querySelector(".poke-img");
    img.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
    img.classList.forEach((cl) => {
        if (cl == "slide-in") {
            img.classList.remove("slide-in")
            img.classList.add("slide-out")
        } else if (cl == "slide-out") {
            img.classList.remove("slide-out")
            img.classList.add("slide-in")
        }
        else {
            img.classList.add("slide-in")
            console.log('oi')
        }
    })
}

const dom = {
    setData: async () => {
        let pokemon = await getPokemon();
        const pokeName = document.querySelector(".poke-name")
        const pokeId = document.querySelector(".poke-id")
        const pokeWeight = document.querySelector(".poke-weight")
        const pokeExp = document.querySelector(".poke-exp")
        let pokeAbility = document.querySelector(".poke-body-ability")
        const pokeType = document.querySelector(".poke-type")
        const pokedex = document.querySelector(".pokedex")
        const pokeHeader = document.querySelector(".poke-header")
        const bodyTitle = document.getElementsByClassName("poke-body-title")
        pokemon.abilities.forEach((ability) => {
            pokeAbility.innerHTML += `
                
                  <li>${ability.ability.name}</li> 
                `
        });
        let typePokemon = pokemon.types[0].type.name;
        let types =
            [
                "grass", "normal", "water", "fire", "flying", "fighting", "poison", "electric",
                "ground", "rock", "psychic", "ice", "bug", "ghost", "dragon", "dark", "fairy"
            ]
        types.forEach(type => {
            if (typePokemon == type) {
                pokeHeader.style.backgroundColor = `var(--${type}-main)`
                pokedex.style.borderColor = `var(--${type}-secondary)`
                pokeType.style.backgroundColor = `var(--${type}-secondary)`
                buttonNextPokemon.style.backgroundColor = `var(--${type}-main)`
                buttonPreviousPokemon.style.backgroundColor = `var(--${type}-main)`
                buttonNextPokemon.style.color = `#fff`
                buttonPreviousPokemon.style.color = `#fff`
                for (title of bodyTitle) {
                    title.style.color = `var(--${type}-main)`
                }
                console.log(buttonNextPokemon)

                buttonNextPokemon.addEventListener("mouseout", () => {
                    buttonNextPokemon.style.backgroundColor = `var(--${type}-main)`
                    buttonNextPokemon.style.color = `#fff`
                })

                buttonPreviousPokemon.addEventListener("mouseout", () => {
                    buttonPreviousPokemon.style.backgroundColor = `var(--${type}-main)`
                    buttonPreviousPokemon.style.color = `#fff`
                })
                buttonNextPokemon.addEventListener("mousemove", () => {
                    buttonNextPokemon.style.backgroundColor = `var(--${type}-secondary)`
                    buttonNextPokemon.style.color = `var(--${type}-main)`
                })
                buttonPreviousPokemon.addEventListener("mousemove", () => {
                    buttonPreviousPokemon.style.backgroundColor = `var(--${type}-secondary)`
                    buttonPreviousPokemon.style.color = `var(--${type}-main)`
                })
            }
        })
        pokeName.innerText = pokemon.name
        pokeType.innerText = typePokemon;
        pokeId.innerText = `#${pokemon.id}`
        pokeWeight.innerText = `Peso: ${pokemon.weight}`
        pokeExp.innerText = `Experiência: ${pokemon.base_experience}`

    }
}


function reload(event) {
    let move = event.target.classList.value;
    if (move == "nextPokemon") {
        if (indice == 649) indice = 1
        else indice++
    }
    else {
        if (indice == 1) indice = 649
        else indice--
    }
    getPokemon();
    setImage(indice)
    dom.setData()
    document.querySelector(".poke-body-ability").innerHTML = " "
}
function init() {
    setImage(indice)
    dom.setData()
}

init()






