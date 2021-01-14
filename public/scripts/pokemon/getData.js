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
      fetch(`/pokemon/check`, {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:`http://pokeapi.co/api/v2/pokemon/${name}/`})
       })
      .then(data=>data.json()).then(res=>{
        if(!res.ok){
          throw Error('could not fetch data');
        }
        return(res.data);
      }).catch(err=>console.log(err.message)),
      fetch(`/pokemon/check`, {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:`http://pokeapi.co/api/v2/pokemon-species/${newName}/`})
       })
      .then(data=>data.json()).then(res=>{
        if(!res.ok){
          throw Error('could not fetch data');
        }
        return(res.data);
      }).catch(err=>console.log(err.message)),
      fetch(`/pokemon/check`, {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:`http://pokeapi.co/api/v2/pokemon-form/${name}/`})
       })
      .then(data=>data.json()).then(res=>{
        if(!res.ok){
          throw Error('could not fetch data');
        }
        return(res.data);
      }).catch(err=>console.log(err.message)),
      fetch(`/movesets/load/${name}/${id}/false`, {method: 'GET'}).then(value => value.json()).catch(err=>console.log(err))
    ]);

    tab[4] = await fetch(tab[1].evolution_chain.url).then(value => value.json()).catch(err=>console.log(err));

    return tab;
  }
  else
  {
    let tab = await Promise.all([
      fetch(`/pokemon/check`, {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:`http://pokeapi.co/api/v2/pokemon/${name}/`})
       })
      .then(data=>data.json()).then(res=>{
        if(!res.ok){
          throw Error('could not fetch data');
        }
        return(res.data);
      }).catch(err=>console.log(err.message)),
      fetch(`/movesets/load/${name}/${id}/false`, {method: 'GET'}).then(value => value.json()).catch(err=>console.log(err.message))
    ]);

    let species = await fetch(`/pokemon/check`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url:`http://pokeapi.co/api/v2/pokemon-species/${name}/`})
     })
    .then(data=>data.json()).then(res=>{
      if(!res.ok){
        throw Error('could not fetch data');
      }
      return(res.data);
    }).catch(err=>console.log(err.message));

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
