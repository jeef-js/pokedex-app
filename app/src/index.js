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
const cards = document.querySelector('.cards');
getPokemons();

async function getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';
    const response = await fetch(url);

    const data = await response.json();
    const pokemons = data.results;

    pokemons.forEach(async pokemon => {
        const url = pokemon.url;

        const response = await fetch(url);
        const data = await response.json();

        const name = data.name[0].toUpperCase() + data.name.slice(1);
        const id = data.id;
        const hp = data.stats[0].base_stat;
        const height = data.height/10; // convert to meters
        const weight = data.weight/10; // convert to kilograms
        const types = data.types;
        const image = data.sprites.other['official-artwork'].front_default;

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const pokemonInfo = document.createElement('div');
        pokemonInfo.classList.add('pokemon-info');


        pokemonInfo.innerHTML += `
            <div class="title">
                <h1>${name}</h1>
                <h2><span>#</span>${String(id).padStart(3,'0')}</h2>
            </div>
        `;

        const infos = document.createElement('div');

        const statsList = document.createElement('div');
        statsList.classList.add('attributes');
        statsList.id = 'stats';
        statsList.innerHTML += `
            <div class="attributes" id="stats">
                <div class="attribute-item">
                    <h3><span>HP&nbsp;</span>${hp}</h3>
                </div>
                <div class="attribute-item">
                    <h3><span>W&nbsp;</span>${weight} kg</h3>
                </div>
                <div class="attribute-item">
                    <h3><span>H&nbsp;</span>${height} m</h3>
                </div>
            </div>
        `;

        const typesList = document.createElement('div');
        typesList.classList.add('attributes');
        typesList.id = 'types';

        for(item of types) {
            const type = item.type.name;
            
            typesList.innerHTML += `
                <div class="attribute-item ${type}">
                    <h3>${type}</h3>
                </div>
            `;
        };

        infos.appendChild(statsList);
        infos.appendChild(typesList);
        pokemonInfo.appendChild(infos);
        pokemonCard.appendChild(pokemonInfo);

        const pokemonImage = document.createElement('div');
        pokemonImage.classList.add('pokemon-img');

        pokemonImage.innerHTML += `
            <a href="https://www.pokemon.com/br/pokedex/${name}" target="_blank">
                <img src="${image}" alt="wartortle">
            </a>
        `;

        pokemonCard.appendChild(pokemonImage);
        cards.appendChild(pokemonCard);
    });
}