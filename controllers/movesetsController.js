const Moveset = require('../models/movesetModel.js');
const fetch = require('node-fetch');

//browser-side js asks for info from DB while loading movesets list
const loadMovesetsList = async (req, res) => {
  let id = parseInt(req.params.id, 10);
  let data = await  Moveset.find({name: req.params.name}).limit(9+id);
  res.json(data);
};

//load single moveset info and render a view
const loadMoveset = async (req, res) => {


  let name = req.params.name;
  let pokemon,species,forms,evol;

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
    [pokemon, species, forms] = await Promise.all([
      fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()),
      fetch("http://pokeapi.co/api/v2/pokemon-species/"+newname+"").then(value => value.json()),
      fetch("http://pokeapi.co/api/v2/pokemon-form/"+name+"").then(value => value.json())
    ]).catch(err=>{console.log(err); res.render('404');});

    evol = await fetch(species.evolution_chain.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); evol = {name: 'none'}});

  }
  else
  {

    species = await fetch("http://pokeapi.co/api/v2/pokemon-species/"+name+"")
    .then(value => value.json())
    .catch(err=>{console.log(err); res.render('404');});

    pokemon = await fetch(species.varieties[0].pokemon.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); pokemon = {name: 'none'}});

    forms = await fetch(pokemon.forms[0].url)
    .then(value => value.json())
    .catch(err=>{console.log(err); forms = {name: 'none'}});

    evolution = await fetch(species.evolution_chain.url)
    .then(value => value.json())
    .catch(err=>{console.log(err); evolution = {name: 'none'}});

  }

  // let species = await fetch("http://pokeapi.co/api/v2/pokemon-species/"+name+"")
  // .then(value => value.json())
  // .catch(err=>{console.log(err); res.render('404');});
  //
  // let pokemon = await fetch(species.varieties[0].pokemon.url)
  // .then(value => value.json())
  // .catch(err=>{console.log(err); pokemon = {name: 'none'}});
  //
  // let forms = await fetch(pokemon.forms[0].url)
  // .then(value => value.json())
  // .catch(err=>{console.log(err); forms = {name: 'none'}});
  //
  // let evolution = await fetch(species.evolution_chain.url)
  // .then(value => value.json())
  // .catch(err=>{console.log(err); evolution = {name: 'none'}});

  Moveset.find({_id: req.params.id})
  .then(data=>{
    
    res.render('pokemon-moveset', {pokemon, pokemonSpecies: species, pokemonEvolution: evol, pokemonForm:forms, id: req.params.id, moveset:data[0]});
  })
  .catch(err=>{console.log(err);res.render('404');});


};

module.exports = {
  loadMovesetsList,
  loadMoveset
}
