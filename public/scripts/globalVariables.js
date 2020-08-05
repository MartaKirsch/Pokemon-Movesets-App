let pokedex = {};

const loadDex = async ()=>{
  pokedex = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964',{method:'GET'})
  .then(res=>res.json());
  console.log(pokedex);
};

loadDex();
