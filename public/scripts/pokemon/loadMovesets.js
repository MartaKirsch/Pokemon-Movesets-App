const loadMovesets = async (id)=>{

  //if id(e) type is click it means the event comes from the button so we need to take the id from here
  if(id.type=='click')
  {
    id = loadMore.dataset.id;
  }

  //make id an int
  id = parseInt(id, 10);

  // get sidebar
  const sidebar = document.querySelector('#sidebar ul');

  //get searched pokemon name
  const pokeName = document.querySelector('#pokeName').innerHTML;

  //get all data
  let tab = await getData(pokeName, id);

  //set the global variable equal to the received info
  pokemon = tab[0];
  pokemonSpecies = tab[1];
  pokemonForm = tab[2];
  movesets = tab[3];


  let newContent = "";

  //create new li elements
  if(movesets.length==0)
  {
    newContent += `<a href=""><li>
      <img src="" alt="">
      <div class="sidebarContent">
        <div class="sidebarName">No Movesets Yet!</div>
        <div class="types">
          <div class="type"></div>
          <div style="clear:both"></div>
        </div>
        <div style="clear:both"></div>
      </div>
    </li></a>`;
  }
  else
  {
    movesets.forEach((moveset)=>{
      if(pokemon.types.length==1)
      {
        newContent += `<a href="/movesets/${pokemon.name}/${moveset._id}"><li>
          <img src="${pokemonForm.sprites.front_default}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${moveset.movesetName}</div>
            <div class="types">
              <div class="type ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</div>
              <div style="clear:both"></div>
            </div>
            <div style="clear:both"></div>
          </div>
        </li></a>`;
      }
      else
      {
        newContent += `<a href="/movesets/${pokemon.name}/${moveset.id}"><li>
          <img src="${pokemon.sprites.front_default}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${moveset.movesetName}</div>
            <div class="types">
              <div class="type ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</div>
              <div class="type ${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</div>
              <div style="clear:both"></div>
            </div>
            <div style="clear:both"></div>
          </div>
        </li></a>`;
      }
    });

  }
  //set display of the loadmore button as block
  if(movesets.length >= (id + 9))
  {
    loadMore.style.display = "block";
  }
  else
  {
    loadMore.style.display = "none";
  }

  //put the new sidebar content on the page
  sidebar.innerHTML =  newContent;

  //set the data id param on the loadmore button for loading next pokemon from pokedex
  loadMore.dataset.id = movesets.length;
};


loadMore.addEventListener('click', loadMovesets);
window.onload = loadMovesets(1);
