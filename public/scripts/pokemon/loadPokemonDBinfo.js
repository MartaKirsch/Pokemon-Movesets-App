const pokeimg = document.querySelector('#poke-img img');


window.onload = loadMovesets(1).then(async ()=>{

  //set the pokemon img
  pokeimg.src = dbpokemon.sprites.front_default;

  //in chrome there's an error involving cors, it makes it work
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  let dbpokemonSpecies = await fetch(proxyUrl+"http://pokeapi.co/api/v2/pokemon-species/"+dbpokemon.name+"")
  .then(value => value.json());

  console.log(dbpokemon);
  console.log(dbpokemonSpecies);

  //set the pokemon forms
  let ragForms = document.querySelectorAll('#rag-forms ul li');
  let otherForms = document.querySelector('#other-forms ul');

  let string = "";

  for(let i=0;i<dbpokemonSpecies.varieties.length;i++)
  {
    //set the regular-alolan-galarian forms
    if(dbpokemonSpecies.varieties[i].pokemon.name==`${dbpokemon.name}-alola`||dbpokemonSpecies.varieties[i].pokemon.name==`${dbpokemon.name}`)
    {
      ragForms[i].classList.remove('no-form');
    }
  }

  for(let i=0;i<dbpokemonSpecies.varieties.length;i++)
  {
    if(dbpokemonSpecies.varieties[i].pokemon.name!=`${dbpokemon.name}-alola`)
    {
      string+=`<li>${dbpokemonSpecies.varieties[i].pokemon.name}</li>`;
    }
  }

  otherForms.innerHTML = string;



});
