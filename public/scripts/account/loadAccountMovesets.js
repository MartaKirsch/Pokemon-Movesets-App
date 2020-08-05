
const loadAccountMovesets = async (id, isRedirect = 1)=>{

  //if id(e) type is click it means the event comes from the button so we need to take the id from here
  if(id.type=='click')
  {
    id = loadMore.dataset.id;
  }
  
  // console.log("account"+id);
  //make id an int
  id = parseInt(id, 10);

  // get movesets of a user
  let movesets = await fetch('/account/load-movesets/'+id).then(value => value.json());

  generateLis(movesets, isRedirect);

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
  loadMore.dataset.id = id+10;
};



window.onload = loadAccountMovesets(0);

loadMore.addEventListener('click', loadAccountMovesets);
