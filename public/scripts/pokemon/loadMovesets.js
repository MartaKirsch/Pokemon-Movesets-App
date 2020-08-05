const setData = async (pokeName, id) => {
  if(!sessionStorage.getItem('pokemon') || JSON.parse(sessionStorage.getItem("pokemon")).name != pokeName)
  {
    console.log('we need to load data');

    //get all data
    let tab = await getData(pokeName, id);

    //set the global variable equal to the received info
    pokemon = tab[0];
    pokemonSpecies = tab[1];
    pokemonForm = tab[2];
    movesets = tab[3];
    pokemonEvolution = tab[4];


    sessionStorage.setItem('pokemon', JSON.stringify(pokemon));
    sessionStorage.setItem('pokemonSpecies', JSON.stringify(pokemonSpecies));
    sessionStorage.setItem('pokemonForm', JSON.stringify(pokemonForm));
    sessionStorage.setItem('pokemonEvolution', JSON.stringify(pokemonEvolution));

  }
  else
  {
    console.log(' we need to load only movesets');

    pokemon = JSON.parse(sessionStorage.getItem("pokemon"));
    pokemonSpecies = JSON.parse(sessionStorage.getItem("pokemonSpecies"));
    pokemonForm = JSON.parse(sessionStorage.getItem("pokemonForm"));
    pokemonEvolution = JSON.parse(sessionStorage.getItem("pokemonEvolution"));

    movesets = await getDataMovesets(pokeName, id);


  }
};

const stateChanges = async (id) => {
  // get sidebar
  const sidebar = document.querySelector('#sidebar ul');

  //we get the old one so that the selected moveset doesn't lose his class and looks
  let oldContent = sidebar.innerHTML;
  let newContent = "";
  let sidebarLength = 0;

  if(sidebar.innerHTML != "")
  {
    sidebarLength = sidebar.childElementCount;
  }

  //create new li elements
  if(movesets.length==0 && oldContent != "")
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
    for(let i=0;i<movesets.length;i++)
    {
      if(pokemon.types.length==1)
      {
        newContent += `<a href="/movesets/${pokemon.name}/${movesets[i]._id}"><li>
          <img src="${pokemonForm.sprites.front_default}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${movesets[i].movesetName}</div>
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
        newContent += `<a href="/movesets/${pokemon.name}/${movesets[i]._id}"><li>
          <img src="${pokemon.sprites.front_default}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${movesets[i].movesetName}</div>
            <div class="types">
              <div class="type ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</div>
              <div class="type ${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</div>
              <div style="clear:both"></div>
            </div>
            <div style="clear:both"></div>
          </div>
        </li></a>`;
      }
    }

  }
  //set display of the loadmore button as block
  if(movesets.length >= (id + 10))
  {
    loadMore.style.display = "block";
  }
  else
  {
    loadMore.style.display = "none";
  }

  //put the new sidebar content on the page
  sidebar.innerHTML = oldContent + newContent;

  //set the data id param on the loadmore button for loading next pokemon from pokedex
  loadMore.dataset.id = id + 10;
};

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

  //load data, set poke info if it's the main page of a pokemon and state changes (loadmore button etc)
  setData(pokeName, id).then(()=>{
    if(document.querySelector('#siteType').innerHTML=="db")
    {
      stateChanges(id);
    }
    else
    {
      stateChanges(id).then(()=>{load();});
    }

  });




};


loadMore.addEventListener('click', loadMovesets);
window.onload = loadMovesets(0);
