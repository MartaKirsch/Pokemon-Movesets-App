const mongoose = require('mongoose');
const Schema = mongoose.Schema

const movesetSchema = new Schema({
  "name": {
    type: String,
    required: true
  },
  "heldItem": {
    type: String,
    required: false
  },
  "ability": {
    type: String,
    required: true
  },
  "EVs": [{stat: {type:String, required:true}, value: {type:Number, required:true}}],
  "nature": {
    type: String,
    required: true
  },
  "moves": [{name: {type:String, required:true}}],
  "movesetName": {
    type: String,
    required: true
  },
  "author": {
    type: String,
    required: true
  }
  "password": {
    type: String,
    required: true
  }
});

//create model
const Moveset = mongoose.model('Moveset', movesetSchema);

module.exports = Moveset;
