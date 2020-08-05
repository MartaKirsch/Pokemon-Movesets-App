
const loadPokemonMovesets = async ()=>{

  let id = parseInt(search.dataset.id);

  let name = search.value.toLowerCase();

  // console.log("loadpokemon"+id);
  let movesets = await fetch(`/movesets/load/${name}/${id}/true`, {method:'GET'}).then(res=>res.json());

  generateLis(movesets, 0);

  //set display of the loadmore button as block
  if(movesets.length >= (id + 10))
  {
    loadMore.style.display = "block";
  }
  else
  {
    loadMore.style.display = "none";
  }

  //set the data id param on the loadmore button for loading next pokemon from pokedex
  search.dataset.id = id+10;
};
