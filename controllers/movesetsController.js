const Moveset = require('../models/movesetModel.js');

const loadMovesetsList = async (req, res) => {


  let data = await  Moveset.find({name: req.params.name}).limit(10);
  res.json(data);
  // Moveset.find({name: req.params.name},  (err,docs)=>{
  //   console.log(docs);
  //   res.json(docs);
  // });
};

module.exports = {
  loadMovesetsList
}
