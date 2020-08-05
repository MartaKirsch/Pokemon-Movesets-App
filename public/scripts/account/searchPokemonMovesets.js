
const searchAccountMovesets = async (e)=>{

  //reset the loadmore button
  loadMore.dataset.id = 0;

  //remove old event listener
  loadMore.removeEventListener('click', loadAccountMovesets);

  //add a new one
  loadMore.addEventListener('click', loadPokemonMovesets);

  let id = 0;
  search.dataset.id = 0;

  let name = search.value.toLowerCase();

  if(name=="")
  {
    loadMore.addEventListener('click', loadAccountMovesets);
    loadMore.removeEventListener('click', loadPokemonMovesets);
    loadAccountMovesets(0, 0);
  }

  else
  {
    // console.log("searchpokemon"+id);
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

  }

};

search.addEventListener('search', searchAccountMovesets);
