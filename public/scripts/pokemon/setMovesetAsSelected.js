const load = async () => {
  let sidebarMovesets = document.querySelectorAll('#sidebar li');
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

  //update movesets
  movesets = await getDataMovesets(pokemon.name, parseInt(loadMore.dataset.id));

  let moveset = movesets.find(sameId);
  let movesetIndex = movesets.findIndex(sameId);

  //set the current moveset looks as clicked
  if(movesetIndex > loadmoreId)
  {
    console.log('load more movesets');
    loadMovesets(loadmoreId);
  }
  else
  {
    sidebarMovesets[movesetIndex].classList.add('selectedMoveset');
  }
};
