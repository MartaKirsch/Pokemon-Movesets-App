//get the submit button
const submitButton = document.querySelector('#addMoveset');


//get all the inputs needed
let evTextInputs = document.querySelectorAll('#EVul input[type=text]');
let evSelects = document.querySelectorAll('#EVul select');

//get the ev number select (1-6)
const select = document.querySelector('.row select');

//boolean table for all the inputs
let tab = [0,1,0,0,0,0,0,0,0,1,0];
let evtab = [];
