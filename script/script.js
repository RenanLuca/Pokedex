const fetchPokemon = {
    indice: 1,    
    getPokemonUrl: id => `https://pokeapi.co/api/v2/pokemon/${id}`,
    getPokemon: () => {
        fetch( fetchPokemon.getPokemonUrl(fetchPokemon.indice))
        .then( response => response.json())
        .then( pokemon => console.log(pokemon))
    }
}


fetchPokemon.getPokemon()









