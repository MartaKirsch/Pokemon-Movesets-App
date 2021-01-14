const Moveset = require('../models/movesetModel.js');
const fetch = require('node-fetch');
const axios = require('axios');


const loadData = async (res, name)=>{

  //in chrome there's an error involving cors, it makes it work
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  // other than regular pokemon forms (alolan or eg rotom wash etc) contain '-'. pokemon-species doesn't exist for them, only for their base forms
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
    let [pokemon, species, forms] = await Promise.all([
      fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()),
      fetch("http://pokeapi.co/api/v2/pokemon-species/"+newname+"").then(value => value.json()),
      fetch("http://pokeapi.co/api/v2/pokemon-form/"+name+"").then(value => value.json())
    ]).catch(err=>{console.log(err); res.render('404');});

    let evol = await fetch(species.evolution_chain.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); evol = {name: 'none'}});

    let tab = [pokemon, species, forms, evol]
    return tab;
  }

  //mega evolutions
  else if(parseInt(name)>10000)
  {
    let pokemon = await fetch("http://pokeapi.co/api/v2/pokemon/"+name+"")
    .then(value => value.json())
    .catch(err=>{console.log(err); pokemon = {name: 'none'}});

    let species = await fetch(pokemon.species.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); res.render('404');});

    let forms = await fetch(pokemon.forms[0].url)
    .then(value => value.json())
    .catch(err=>{console.log(err); forms = {name: 'none'}});

    let evolution = await fetch(species.evolution_chain.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); evolution = {name: 'none'}});

    let tab = [pokemon,species,forms,evolution];

    return tab;
  }

  else
  {

    let species = await fetch("http://pokeapi.co/api/v2/pokemon-species/"+name+"")
    .then(value => value.json())
    .catch(err=>{console.log(err); res.render('404');});

    let pokemon = await fetch(species.varieties[0].pokemon.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); pokemon = {name: 'none'}});

    let forms = await fetch(pokemon.forms[0].url)
    .then(value => value.json())
    .catch(err=>{console.log(err); forms = {name: 'none'}});

    let evolution = await fetch(species.evolution_chain.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); evolution = {name: 'none'}});

    let tab = [pokemon,species,forms,evolution];

    return tab;
  }

};

const loadPokeDBinfo = async (req, res) => {

  const name =  req.params.name;

  //get pokemon API info
  loadData(res, name).then((tab)=>{
    const pokemon = tab[0];
    const pokemonSpecies = tab[1];
    const pokemonForm = tab[2];
    const pokemonEvolution = tab[3];

    res.render('pokemon', {pokemon, pokemonSpecies, pokemonForm, pokemonEvolution});

  });

};


const loadInfo = (req,res)=>{
  //console.log(req.params);
  axios.get("http://pokeapi.co/api/v2/pokemon/"+req.params.id+"").then(value => {
    //console.log(value.data);
    res.json(value.data);
  });
};

const check = (req,res)=>{
  //console.log('checking');
  axios.get(req.body.url).then(doc=>{
    if(doc.statusText!=="OK"||doc.isAxiosError)
    {
      throw Error('could not fetch data');
    }
    //console.log(doc.data);
    res.json({data:doc.data,ok:true});
  }).catch(err=>{
    console.log(err);

    res.status(404).json({ok:false});
  })
};

module.exports = {
  loadPokeDBinfo,
  loadInfo,
  check
}
