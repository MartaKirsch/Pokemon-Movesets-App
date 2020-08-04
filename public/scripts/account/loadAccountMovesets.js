
const loadAccountMovesets = async (id)=>{

  //if id(e) type is click it means the event comes from the button so we need to take the id from here
  if(id.type=='click')
  {
    id = loadMore.dataset.id;
  }

  //make id an int
  id = parseInt(id, 10);

  // get movesets of a user
  let movesets = await fetch('/account/load-movesets/'+id).then(value => value.json());

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
  loadMore.dataset.id = id+10;
};



window.onload = loadAccountMovesets(1);

loadMore.addEventListener('click', loadAccountMovesets);
