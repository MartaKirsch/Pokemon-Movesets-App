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
    .sort({ 'rates.average' : -1});
    res.json(data);
  }
  else
  {
    let data = await Moveset.find({name: req.params.name}).skip(id).limit(10).sort({ 'rates.average' : -1});
    res.json(data);
  }
};

const loadAllMovesetsList = async (req, res) => {

  let data = await Moveset.find({name: req.params.name}).sort({ 'rates.average' : -1});
  res.json(data);
};

//load single moveset info and render a view
const loadMoveset = async (req, res) => {
  let sess = req.session;

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


  Moveset.find({_id: req.params.id})
  .then(data=>{

    //check if user has rated this moveset
    let index = data[0].rates.author.indexOf(sess.login);
    let userRate = 0;

    //save the old rate if it is an update
    if(index >= 0)
    {
      userRate = data[0].rates.rate[index];
    }
    else
    {
      userRate = 0;
    }

    res.render('pokemon-moveset', {pokemon, pokemonSpecies: species, pokemonEvolution: evol, pokemonForm:forms, id: req.params.id, moveset:data[0], userRate});
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

const addRate = (req, res) => {

  let sess = req.session;

  //check if a user is logged in
  if(sess.login)
  {
    const rate = parseInt(req.params.rate);
    const id = req.params.id;

    //find a moveset that the user wants to update
    Moveset.findOne({_id: id}).then(docs=>{

      //check if he hasn't done so already
      let index = docs.rates.author.indexOf(sess.login);
      let oldRate = 0;

      //save the old rate if it is an update
      if(index >= 0)
      {
        oldRate = docs.rates.rate[index];
        docs.rates.rate[index] = rate;
      }
      else
      {
        oldRate = 0;
        docs.rates.rate.push(rate);
        docs.rates.author.push(sess.login);
      }

      //change the average rate
      let sum = 0;
        docs.rates.rate.forEach(rate=>{
          sum += rate;
        });

      let num_of_votes = docs.rates.rate.length;

      if(num_of_votes==0)
      {
        num_of_votes = 1;
      }

      sum /= num_of_votes;

      //get the sum to a format of x.xx
      sum *=100;
      sum = Math.round(sum);
      sum /=100;

      docs.rates.average = sum;

      Moveset.findByIdAndUpdate(id, docs, {useFindAndModify:false}).then(()=>{

        res.json({mssg: 'logged-in', oldRate:oldRate});
      });

    });

  }
  else
  {
    res.json({mssg: 'not-logged-in'});
  }

};

module.exports = {
  loadMovesetsList,
  loadMoveset,
  loadAllMovesetsList,
  deleteMoveset,
  updateMoveset,
  addRate
}
