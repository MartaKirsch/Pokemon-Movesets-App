//get the submit button
const submitButton = document.querySelector('#addMoveset');


//get all the inputs needed
let evTextInputs = document.querySelectorAll('#EVul input[type=text]');
let evSelects = document.querySelectorAll('#EVul select');
const textInputs = document.querySelectorAll('.main-text-input');
const rows = document.querySelectorAll('.row');


//get the ev number select (1-6)
const select = document.querySelector('.row select');

//boolean table for all the inputs
let tab = [0,1,0,0,0,0,0,0,0,1,0,0];
let evtab = [];

//empty objects for pokemon, ability and moves
let pokemon = {};
let ability = {};
let moves = [{},{},{},{}];

//functions for getting data from async functions
const setPoke = async (data)=>{
  pokemon = data;
  console.log(pokemon);
};

const setAbility = async (data)=>{
  ability = data;
};

const setMove = async (data, index)=>{
  moves[index] = data;
};
