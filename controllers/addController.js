const Moveset = require('../models/movesetModel.js');

const add_index = (req, res) => {
  res.render('add');
};

const saveMoveset = (moveset, res) =>
{
  //save the moveset to the db
  moveset.save()
    .then((result)=>{
      res.redirect('/');
    })
    .catch((err)=>{
      console.log(err);
    });
};

const add_post = (req, res) => {

  //get the data
  const data = req.body;
  //add moves to an array
  let moves = [{name: data.move1}, {name: data.move2}, {name: data.move3}, {name: data.move4}];
  //get evs and add them to an array
  let stats = [{}];
  if (stats.length==1)
  {
    stats[0] = {stat: data['stat[]'][0], value:data['value[]'][0]}
  }
  else
  {
    for(let i=0; i<6; i++)
    {
      if(data['stat[]'][i])
      {
        stats[i] = {stat: data['stat[]'][i], value:data['value[]'][i]};
      }
      else
      {
        break;
      }
    }
  }


  //create new moveset
  const moveset = new Moveset({
    "name": data.name,
    "heldItem": data.heldItem,
    "ability": data.ability,
    "EVs": stats,
    "nature": data.nature,
    "moves": moves,
    "movesetName": data.movesetName,
    "author": data.author,
    "password": data.password
  });

  if(data.movesetName=="")
  {
    //find how many movesets for this pokemon this author already has and do sth like msName = "author#(num+1)"
    Moveset.find({ name: data.name, author: data.author}, (err, docs)=>{
      moveset.movesetName = `${data.author}#${docs.length+1}`;
      saveMoveset(moveset, res);
    });
  }
  else
  {
    saveMoveset(moveset, res);
  }
};

const add_check = (req, res) => {
  let name = req.params.name;
  // let re = new RegExp(name, 'i');
  name = name.toLowerCase();

  //check if moveset with identical name exists
  Moveset.find({ movesetName: name}, (err, docs)=>{
    if(docs.length==0)
    {
      res.json({value: "no-exist"});
    }
    else
    {
      res.json({value: "exists"});
    }
  });
};



module.exports = {
  add_index,
  add_post,
  add_check
}
