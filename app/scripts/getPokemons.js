// Using fetch API
const cards = document.querySelector('.cards');

showContent('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12');

async function getContent(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function showContent(url) {
    const pokemons = await getContent(url);
    const nextList = pokemons.next;

    pokemons.results.forEach(async pokemon => {
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
        // const image = data.sprites.front_default;

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
                <div class="attribute-item">
                    <h3><span>HP&nbsp;</span>${hp}</h3>
                </div>
                <div class="attribute-item">
                    <h3><span>W&nbsp;</span>${weight} kg</h3>
                </div>
                <div class="attribute-item">
                    <h3><span>H&nbsp;</span>${height} m</h3>
                </div>
        `;

        const typesList = document.createElement('div');
        typesList.classList.add('attributes');
        typesList.id = 'types';

        for(item of types) {
            const type = item.type.name;
            
            typesList.innerHTML += `
                <div class="attribute-item ${type}">
                    <h3>${type[0].toUpperCase() + type.slice(1)}</h3>
                </div>
            `;
        };

        infos.appendChild(statsList);
        infos.appendChild(typesList);
        pokemonInfo.appendChild(infos);
        pokemonCard.appendChild(pokemonInfo);

        const pokemonImage = document.createElement('div');
        pokemonImage.classList.add('pokemon-img');

        const img = trimImage(image);

        pokemonImage.appendChild(img);

        pokemonCard.appendChild(pokemonImage);
        cards.appendChild(pokemonCard);
    });
    
    document.querySelector('button').setAttribute('onclick', `showContent('${nextList}')`);
}