const loadMore = document.querySelector("#loadMore");

const loadPokedex = async (id)=>{

  //if id(e) type is click it means the event comes from the button so we need to take the id from here
  if(id.type=='click')
  {
    id = loadMore.dataset.id;
    document.body.style.cursor = "wait";
  }

  //make id an int
  id = parseInt(id, 10);

  // get old sidebar
  const sidebar = document.querySelector('#sidebar ul');
  const oldContent = sidebar.innerHTML;

  //in chrome there's an error involving cors, it makes it work

  let tab = await Promise.all([
    fetch("/pokemon/loadInfo/"+id+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 1)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 2)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 3)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 4)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 5)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 6)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 7)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 8)+"").then(value => value.json()),
    fetch("/pokemon/loadInfo/"+(id + 9)+"").then(value => value.json())
  ]);

  let newContent = "";

  //create new li elements
  tab.forEach((pokemon)=>{
    if(pokemon.types.length==1)
    {
      newContent += `<a href="/pokemon/${pokemon.name}">
        <img src="${pokemon.sprites.front_default}" alt="">
        <div class="sidebarContent">
          <div class="sidebarName">#${pokemon.id} ${pokemon.name}</div>
          <div class="types">
            <div class="type ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</div>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </a>`;
    }
    else
    {
      newContent += `<a href="/pokemon/${pokemon.name}">
        <img src="${pokemon.sprites.front_default}" alt="">
        <div class="sidebarContent">
          <div class="sidebarName">#${pokemon.id} ${pokemon.name}</div>
          <div class="types">
            <div class="type ${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</div>
            <div class="type ${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</div>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </a>`;
    }
  });

  //put the new sidebar content on the page
  sidebar.innerHTML = oldContent + newContent;

  //set the data id param on the loadmore button for loading next pokemon from pokedex
  loadMore.dataset.id = id+10;

  document.body.style.cursor = "default";
};

window.onload = loadPokedex(1);

loadMore.addEventListener('click', loadPokedex);
