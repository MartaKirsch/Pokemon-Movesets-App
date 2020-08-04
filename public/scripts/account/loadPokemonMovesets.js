
const searchAccountMovesets = async (e)=>{

  let id = parseInt(search.dataset.id);

  let name = search.value.toLowerCase();

  if(name=="")
  {
    loadAccountMovesets(1);
  }

  else
  {

    let movesets = await fetch(`/movesets/load/${name}/${id}/true`, {method:'GET'}).then(res=>res.json());

    generateLis(movesets);

    //set display of the loadmore button as block
    if(movesets.length >= (id + 9))
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
