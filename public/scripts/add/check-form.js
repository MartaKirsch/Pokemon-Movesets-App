//set the button's type as 'button' so the form can't be submitted if sth is missing
submitButton.type = 'button';



//'live' check on text inputs' entered data
const inputValidation = (e)=>{
  console.log(e.target.id);
};

//'live' check on optional text inputs' entered data
const optionalInputValidation = async (e)=>{

  //get the number of the input
  let index = e.target.id.slice(e.target.id.length-1, e.target.id.length);

  //get the entered value
  let value = e.target.value;
  let wrongDiv = e.target.nextElementSibling.nextElementSibling;
  let parentDiv = e.target.parentNode;

  //reset the tab
  tab[index] = 0;

  //check if the entered value is correct
  if(value == "")
  {
    tab[index] = 1;
    wrongDiv.innerHTML = "";
    wrongDiv.style.visibility = "hidden";
    parentDiv.style.border = "none";
  }
  //check for the name length
  else if(index==9)
  {
    if(value.length>2)
    {
      tab[index] = 0;
      wrongDiv.innerHTML = "Too long! The name must be less than 20 chars!";
      wrongDiv.style.visibility = "visible";
      parentDiv.style.border = "1px solid #e36c3d";
    }
    else
    {
      tab[index] = 1;
      wrongDiv.innerHTML = "";
      wrongDiv.style.visibility = "hidden";
      parentDiv.style.border = "none";
    }
  }
  //check if the item exists
  else if(index==1)
  {
    let name = "";

    //change the entered name to the api standards
    for(let i=0; i<value.length;i++)
    {
      if(value.charAt(i)==' ')
      {
        name+= '-';
      }
      else
      {
        name+=value.charAt(i).toLowerCase();
      }
    }

    //try to get the wanted item to check if it exists

    fetch(`https://pokeapi.co/api/v2/item/${name}/`, {method: "GET"})
      .then((res)=>{
        if(!res.ok)
        {
          tab[index] = 0;
          wrongDiv.innerHTML = "Wrong name! This item doesn't exist!";
          wrongDiv.style.visibility = "visible";
          parentDiv.style.border = "1px solid #e36c3d";
        }
        else
        {
          tab[index] = 1;
          wrongDiv.innerHTML = "";
          wrongDiv.style.visibility = "hidden";
          parentDiv.style.border = "none";
        }
      });
  }

};

//'live' check on ev number inputs' entered data
const evInputValidation = (e)=>{

  //reset the tab for ev
  tab[3] = 0;

  //get entered value and the wrong info div
  let value = e.target.value;
  let wrongDiv = e.target.parentNode.nextElementSibling.nextElementSibling;

  //get the number of the input
  let index = e.target.id.slice(e.target.id.length-1, e.target.id.length);

  //check if it's between 1-252
  if(value>=1 && value<=252)
  {
    evtab[index] = 1;
    wrongDiv.innerHTML = "";
    wrongDiv.style.visibility = "hidden";
  }
  else
  {
    evtab[index] = 0;
    wrongDiv.innerHTML = "Wrong value! It needs to be 1-252!";
    wrongDiv.style.visibility = "visible";
  }

  //check if all the ev values are correct
  let isOK = true;

  evtab.forEach((item)=>{
    if(item==0)
    {
      isOK=false;
    }
  });

  //if isOK is true, change the main tab
  if(isOK==true)
  {
    tab[3]=1;
  }

};


//check if everything is done correctly
const checkForm = ()=>{

  //check if everything is set as supposed to
  let isOK = true;

  tab.forEach((item)=>{
    if(item==0)
    {
      isOK=false;
    }
  });

  //if isOK is true, change the main tab
  if(isOK==true)
  {
    submitButton.type = 'submit';
  }
  else
  {
    alert('You have to correctly enter all the data!');
  }
};


//adding event listeners
textInputs.forEach((input)=>{
  if(!input.previousElementSibling.classList.contains('optional'))
  {
    input.addEventListener('change', inputValidation);
  }
  else
  {
    input.addEventListener('change', optionalInputValidation);
  }
});

submitButton.addEventListener('click', checkForm);