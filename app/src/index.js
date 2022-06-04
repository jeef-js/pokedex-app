// // Using XMLHttpRequest
// const content = document.querySelector('.content');
// const url = 'https://pokeapi.co/api/v2/generation/1';
// const xhr = new XMLHttpRequest();
// xhr.open('GET', url);
// xhr.send();
// xhr.onload = function() {
//     const data = JSON.parse(xhr.responseText);
//     const pokemon = data.pokemon_species;
//     pokemon.forEach(function(pokemon) {
//         const pokemonName = pokemon.name;
//         const pokemonUrl = pokemon.url;
//         const pokemonId = pokemonUrl.split('/')[6];
//         const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
//         const pokemonCard = `
//             <div class="pokemon-card">
//                 <div class="pokemon-image">
//                     <img src="${pokemonImage}" alt="${pokemonName}">
//                 </div>
//                 <div class="pokemon-name">
//                     <h2>${pokemonName}</h2>
//                 </div>
//             </div>
//         `;
//         content.innerHTML += pokemonCard;
//     });
// }

// Using fetch API
const main = document.querySelector('main');
getPokemons();

async function getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    const response = await fetch(url);

    const data = await response.json();
    const pokemons = data.results;

    const cards = document.createElement('div');
    cards.setAttribute('class', 'cards');

    pokemons.forEach(async (pokemon) => {
        const pokemonName = pokemon.name;
        const pokemonUrl = pokemon.url;
        const pokemonId = pokemonUrl.split('/')[6];

        const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        const pokemonCard = `
            <div class="pokemon-card">
                <div class="pokemon-id">
                    <img src="../images/pokeball.svg" alt="${pokemonId}">
                    <h2>#${pokemonId.padStart(3, '0')}</h2>
                </div>
                <div class="pokemon-image">
                    <img src="${pokemonImage}" alt="${pokemonName}">
                </div>
                <div class="pokemon-name">
                    <h2>${pokemonName}</h2>
                </div>
            </div>
        `;
        cards.innerHTML += pokemonCard;
    });
    main.appendChild(cards);

    const pokemonImages = document.querySelectorAll('.pokemon-id img');

    pokemonImages.forEach(async (img) => {
        img.addEventListener('load', async () => {
            const vibrant = new Vibrant(img);
            const swatches = await vibrant.swatches();
            const pallete = []
            for (swatch in swatches) {
                if (swatches[swatch] && swatches.hasOwnProperty(swatch)) {
                    pallete.push(swatches[swatch].getHex());
                }
            }
            console.log(pallete);
        });
    });
}