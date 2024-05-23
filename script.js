document.getElementById('search-button').addEventListener('click', searchPokemon);

async function searchPokemon() 
{
    const search_input = document.getElementById('search-input').value.trim().toLowerCase();

    if (search_input === '') 
    {
        alert('Please enter a Pokémon name or ID.');
        return;
    }

    const api_url = `https://pokeapi.co/api/v2/pokemon/${search_input}`;

    try 
    {
        const response = await fetch(api_url);
        if (!response.ok) 
            throw new Error('Pokémon not found');

        const data = await response.json();
        displayPokemonInfo(data);
    } 
    catch (error)
    {
        alert(error.message);
    }
}

function displayPokemonInfo(data) 
{
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = `Weight: ${data.weight}`;
    document.getElementById('height').textContent = `Height: ${data.height}`;
    document.getElementById('hp').textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
    document.getElementById('attack').textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
    document.getElementById('defense').textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
    document.getElementById('special-attack').textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    document.getElementById('special-defense').textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    document.getElementById('speed').textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

    const typesDiv = document.getElementById('types');
    typesDiv.innerHTML = '';
    data.types.forEach(typeInfo => 
    {
        const typeElement = document.createElement('div');
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        typesDiv.appendChild(typeElement);
    });

    let spriteImg = document.getElementById('sprite');
    if (!spriteImg) 
    {
        spriteImg = document.createElement('img');
        spriteImg.id = 'sprite';
        document.body.appendChild(spriteImg);
    }
    spriteImg.src = data.sprites.front_default;
    document.getElementById('sprite').textContent = data.sprites.front_default;
}
