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

  // if(name.includes('-'))
  // {
  //   let newname = "";
  //   for(let i=0;i<name.length;i++)
  //   {
  //     if(name.charAt(i)=='-')
  //     {
  //       break;
  //     }
  //
  //     newname+=name.charAt(i);
  //   }
  //   let [pokemon, pokemonSpecies, pokemonForm] = await Promise.all([
  //     fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
  //     fetch("http://pokeapi.co/api/v2/pokemon-species/"+newname+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
  //     fetch("http://pokeapi.co/api/v2/pokemon-form/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
  //   ]);
  //
  // }
  // else
  // {
  //   [pokemon, pokemonSpecies, pokemonForm] = await Promise.all([
  //     fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
  //     fetch("http://pokeapi.co/api/v2/pokemon-species/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
  //     fetch("http://pokeapi.co/api/v2/pokemon-form/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
  //   ]);
  //
  // }
};

module.exports = {
  loadMovesetsList,
  loadMoveset
}
