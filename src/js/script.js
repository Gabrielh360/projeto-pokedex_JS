/* NOME E ID DO POKÉMON NA POKEDEX */
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemom__number');

/* IMAGEM ANIMADA DOS POKEMONS */
const pokemonImage = document.querySelector('.pokemom__image'); 

/* BOTÃO DE PESQUISA */
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

/* BOTÕES DIRECIONAIS PRA SELECIONAR O POKÉMON */
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext= document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => { 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } 
};


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';


    const data = await fetchPokemon(pokemon);



    if (data) {

    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    input.value = '';
  }else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não foi enontrado';
    pokemonNumber.innerHTML = '';

    pokemonNameCard.innerHTML = 'Não foi enontrado';
    pokemonNumberCard.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon('1');



