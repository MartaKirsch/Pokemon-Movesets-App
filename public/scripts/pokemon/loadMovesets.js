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

  //in chrome there's an error involving cors, it makes it work
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  // get pokemon in pokedex order
  let [dbpoke, movesets] = await Promise.all([
    fetch(proxyUrl+"http://pokeapi.co/api/v2/pokemon/"+pokeName+"").then(value => value.json()),
    fetch(`/movesets/load/${pokeName}/${id}`, {method: 'GET'}).then(value => value.json())
  ]);

  //set the global variable equal to the received info
  dbpokemon = dbpoke;

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
      if(dbpokemon.types.length==1)
      {
        newContent += `<a href="/movesets/${dbpoke.name}/${moveset._id}"><li>
          <img src="${dbpokemon.sprites.front_default}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${moveset.movesetName}</div>
            <div class="types">
              <div class="type ${dbpokemon.types[0].type.name}">${dbpokemon.types[0].type.name}</div>
              <div style="clear:both"></div>
            </div>
            <div style="clear:both"></div>
          </div>
        </li></a>`;
      }
      else
      {
        newContent += `<a href="/movesets/${dbpoke.name}/${moveset.id}"><li>
          <img src="${dbpokemon.sprites.front_default}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${moveset.movesetName}</div>
            <div class="types">
              <div class="type ${dbpokemon.types[0].type.name}">${dbpokemon.types[0].type.name}</div>
              <div class="type ${dbpokemon.types[1].type.name}">${dbpokemon.types[1].type.name}</div>
              <div style="clear:both"></div>
            </div>
            <div style="clear:both"></div>
          </div>
        </li></a>`;
      }
    });

  }
  console.log(id);
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
