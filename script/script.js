 let indice = 1;
    function getPokemonUrl (id) {
        return `https://pokeapi.co/api/v2/pokemon/${id}`
    } 
    function getPokemon(){
        return fetch(getPokemonUrl(indice))
            .then( response => response.json())
    }
    function setImage (id){
        const img = document.querySelector(".poke-img");
         img.src=`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`
         
    }

    function nextPokemon(){
        indice++;
        getPokemon();
        setImage(indice)
        dom.setData()
        document.querySelector(".poke-body-ability").innerHTML = " "
    }
    function previousPokemon(){
        indice--;
        getPokemon();
        setImage(indice)
        dom.setData()
        document.querySelector(".poke-body-ability").innerHTML = " "
        
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

            
            pokeName.innerText = pokemon.name
            pokeType.innerText = pokemon.types[0].type.name
            pokeId.innerText = `#${pokemon.id}`
            pokeWeight.innerText = `Peso: ${pokemon.weight}`
            pokeExp.innerText = `Experiência: ${pokemon.base_experience}`

            pokemon.abilities.forEach((ability, index) => {
                pokeAbility.innerHTML += `
                
                  <li>${ability.ability.name}</li> 
                `
            });
        }
    }

    function init(){
        setImage(indice)
        dom.setData()
    }

    init()






