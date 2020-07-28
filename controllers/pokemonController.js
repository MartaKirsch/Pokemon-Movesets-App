const Moveset = require('../models/movesetModel.js');
const fetch = require('node-fetch');

const loadData = async (res, name)=>{

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
      fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
      fetch("http://pokeapi.co/api/v2/pokemon-species/"+newname+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
      fetch("http://pokeapi.co/api/v2/pokemon-form/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
    ]);

    return tab;
  }
  else
  {
    let tab = await Promise.all([
      fetch("http://pokeapi.co/api/v2/pokemon/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
      fetch("http://pokeapi.co/api/v2/pokemon-species/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
      fetch("http://pokeapi.co/api/v2/pokemon-form/"+name+"").then(value => value.json()).catch(err=>{console.log(err); res.render('404');}),
    ]);

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


    res.render('pokemon', {pokemon, pokemonSpecies, pokemonForm});

  });

};

module.exports = {
  loadPokeDBinfo
}
