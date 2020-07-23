const Moveset = require('../models/movesetModel.js');

const add_index = (req, res) => {
  res.render('add');
};

const add_post = (req, res) => {
  console.log(req.body);
  res.render('index');
};

module.exports = {
  add_index,
  add_post
}
