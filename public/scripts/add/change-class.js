//functions for changing classes
const changeClassOn = (index)=>{
  rows[index].classList.add('typing');
};

const changeClassOff = (index)=>{
  rows[index].classList.remove('typing');
};

//adding the event listeners for inputs
for(let i=0; i<textInputs.length;i++)
{
  let id = textInputs[i].id;

  //exception for 10+
  if(id.slice(id.length-2, id.length-1)!="-")
  {
    id = id.slice(id.length-2, id.length);
  }
  //single char numbers
  else
  {
    id = id.slice(id.length-1, id.length);
  }

  textInputs[i].addEventListener('focus', ()=>{changeClassOn(id)});
  textInputs[i].addEventListener('focusout', ()=>{changeClassOff(id)});
}

//function for the ev section
const evFunction = ()=>{

  const evInputs = document.querySelectorAll('#EVul input[type=text]');
  const evSelects = document.querySelectorAll('#EVul select');

  for(let i=0; i<evInputs.length;i++)
  {
    evInputs[i].addEventListener('focus', ()=>{changeClassOn(3)});
    evInputs[i].addEventListener('focusout', ()=>{changeClassOff(3)});
  }

  for(let i=0; i<evSelects.length;i++)
  {
    evSelects[i].addEventListener('focus', ()=>{changeClassOn(3)});
    evSelects[i].addEventListener('focusout', ()=>{changeClassOff(3)});
  }
};

//listener for the ev section
document.querySelector('#howManyEVs').addEventListener('click', evFunction);
