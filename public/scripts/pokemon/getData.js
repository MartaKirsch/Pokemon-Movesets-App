const pokeimg = document.querySelector('#poke-img img');


const getData = async (name, id)=> {
  //other than regular pokemon forms (alolan or eg rotom wash etc) contain '-'. pokemon-species doesn't exist for them, only for their base forms

  if(name.includes('-'))
  {
    let newname = "";
    for(let i=0;i<name.length;i++)
    {
      if(name.charAt(i)=='-')
      {
        break;
      }

      newname+=name.charAt(i);
    }

    let tab = await Promise.all([
      fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()).catch(err=>console.log(err)),
      fetch("http://pokeapi.co/api/v2/pokemon-species/"+newname+"").then(value => value.json()).catch(err=>console.log(err)),
      fetch("http://pokeapi.co/api/v2/pokemon-form/"+name+"").then(value => value.json()).catch(err=>console.log(err)),
      fetch(`/movesets/load/${name}/${id}/false`, {method: 'GET'}).then(value => value.json()).catch(err=>console.log(err))
    ]);

    tab[4] = await fetch(tab[1].evolution_chain.url).then(value => value.json()).catch(err=>console.log(err));

    return tab;
  }
  else
  {
    let tab = await Promise.all([
      fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()).catch(err=>console.log(err)),
      fetch(`/movesets/load/${name}/${id}/false`, {method: 'GET'}).then(value => value.json())
    ]);

    let species = await fetch("http://pokeapi.co/api/v2/pokemon-species/"+name).then(value => value.json()).catch(err=>console.log(err));

    tab[3] = tab[1];
    tab[1] = tab[0];
    tab[2] = tab[0];

    tab[4] = await fetch(species.evolution_chain.url).then(value => value.json()).catch(err=>console.log(err));

    return tab;
  }


};

const getDataMovesets = async (name, id)=> {
  let tab = await fetch(`/movesets/load/${name}/${id}/false`, {method: 'GET'})
  .then(value => value.json())
  .catch(err=>console.log(err));

  return tab;

};

const getDataAllMovesets = async (name)=> {
  let tab = await fetch(`/movesets/loadAll/${name}`, {method: 'GET'})
  .then(value => value.json())
  .catch(err=>console.log(err));

  return tab;

};
