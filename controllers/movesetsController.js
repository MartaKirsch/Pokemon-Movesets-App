const Moveset = require('../models/movesetModel.js');
const fetch = require('node-fetch');
const session = require('express-session');

//browser-side js asks for info from DB while loading movesets list
const loadMovesetsList = async (req, res) => {
  let sess = req.session;

  let id = parseInt(req.params.id, 10);
  if(req.params.account == 'true')
  {
    let data = await Moveset.find({name: req.params.name, author: sess.login})
    .skip(id)
    .limit(10)
    .sort( 'createdOn' );
    res.json(data);
  }
  else
  {
    let data = await Moveset.find({name: req.params.name}).skip(id).limit(10).sort( 'createdOn' );
    res.json(data);
  }
};

const loadAllMovesetsList = async (req, res) => {
  // let sess = req.session;

  // let id = parseInt(req.params.id, 10);
  // if(req.params.account == 'true')
  // {
  //   let data = await Moveset.find({name: req.params.name, author: sess.login})
  //   .skip(id)
  //   .limit(10)
  //   .sort( 'createdOn' );
  //   res.json(data);
  // }
  // else
  // {
    let data = await Moveset.find({name: req.params.name});
    res.json(data);
  // }
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

const deleteMoveset = async (req, res) => {
  const sess = req.session;
  const id = req.params.id;

  Moveset.findOneAndDelete({author: sess.login,_id: id}).then((docs)=>{
    res.json(docs);
  });
};

const saveMoveset = (id, ms, res)=>{
  //update the moveset to the db
  Moveset.findByIdAndUpdate(id, ms, {useFindAndModify:false})
    .then((result)=>{
      res.redirect(`/movesets/${ms.name}/${id}`);
    })
    .catch((err)=>{
      console.log(err);
    });
};

const updateMoveset = async (req,res) => {
  let sess = req.session;
  const id = req.params.id;
  
  //get the data
  const data = req.body;
  //add moves to an array
  let moves = [{name: data.move1}, {name: data.move2}, {name: data.move3}, {name: data.move4}];
  //get evs and add them to an array
  let stats = [{}];

  if (data['stat[]'][0].length>1)
  {
    for(let i=0; i<data['stat[]'].length; i++)
    {
      let val = parseInt(data['value[]'][i],10);
      let stat = data['stat[]'][i].toString();
      stats[i] = {stat: stat, value:val};
    }
  }
  else
  {
    let val = parseInt(data['value[]'],10);
    let stat = data['stat[]'].toString();
    stats[0] = {stat: stat, value:val};
  }


  //create new moveset
  const moveset = {
    "name": data.name.toLowerCase(),
    "heldItem": data.heldItem,
    "ability": data.ability,
    "EVs": stats,
    "nature": data.nature,
    "moves": moves,
    "movesetName": data.movesetName,
    "movesetNameLowercase": data.movesetName.toLowerCase(),
    "author": sess.login
  };

  if(data.movesetName=="")
  {
    //find how many movesets for this pokemon this author already has and do sth like msName = "author#(num+1)"
    let reg = new RegExp("^"+sess.login+'#\\d+$');
    Moveset.find({ name: data.name.toLowerCase(), author: sess.login, movesetName: reg}).sort( 'createdOn' ).then((docs)=>{

      //get the biggest num after # from returned docs
      let buffor = 0;
      let reg2 = /\d+$/;
      docs.forEach((ms) => {
        let num = parseInt(ms.movesetName.match(reg2).toString());
        if(num>buffor)
        {
          buffor = num;
        }
      });

      //set a new name and save
      moveset.movesetName = `${sess.login}#${buffor+1}`;
      moveset.movesetNameLowercase = `${sess.login}#${buffor+1}`.toLowerCase();
      saveMoveset(id, moveset, res);

    });
  }
  else
  {
    saveMoveset(id, moveset, res);
  }
};

module.exports = {
  loadMovesetsList,
  loadMoveset,
  loadAllMovesetsList,
  deleteMoveset,
  updateMoveset
}
