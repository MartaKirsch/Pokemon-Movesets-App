const load = async () => {
  let sidebarMovesets = document.querySelectorAll('#sidebar a');
  let loadmoreId = loadMore.dataset.id;

  //get moveset id
  let id = document.querySelector('#movesetId').innerHTML;

  //get the moveset
  const sameId = (moveset)=>{
    if(moveset._id == id)
    {
      return moveset;
    }
  };

  //get all movesets
  let allMovesets = await getDataAllMovesets(pokemon.name);

  let moveset = allMovesets.find(sameId);
  let movesetIndex = allMovesets.findIndex(sameId);

  //set the current moveset looks as clicked
  if(movesetIndex > loadmoreId-1)
  {
    console.log('load more movesets');
    loadMovesets(loadmoreId);
  }
  else
  {
    sidebarMovesets[movesetIndex].classList.add('selectedMoveset');
  }
};
