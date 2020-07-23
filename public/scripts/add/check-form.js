//set the button's type as 'button' so the form can't be submitted if sth is missing
submitButton.type = 'button';



//'live' check on text inputs' entered data
const inputValidation = async (e)=>{

  //get the number of the input
  let index = 0;
  //exception for 10+
  if(e.target.id.slice(e.target.id.length-2, e.target.id.length-1)!="-")
  {
    index = e.target.id.slice(e.target.id.length-2, e.target.id.length);
  }
  //single char numbers
  else
  {
    index = e.target.id.slice(e.target.id.length-1, e.target.id.length);
  }

  //get the entered value
  let value = e.target.value;
  let wrongDiv = e.target.nextElementSibling.nextElementSibling;
  let parentDiv = e.target.parentNode;
  let pokemon = {};

  //reset the tab
  tab[index] = 0;

  //check all the cases
  if(index==0)
  {
    if(value == "")
    {
      tab[index] = 0;
      wrongDiv.innerHTML = "You need to insert a Pokemon's name!";
      wrongDiv.style.visibility = "visible";
      parentDiv.style.border = "1px solid #e36c3d";
    }
    else
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

      fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`, {method: "GET"})
        .then((res)=>{
          if(!res.ok)
          {
            tab[index] = 0;
            wrongDiv.innerHTML = "Wrong name! This pokemon doesn't exist!";
            wrongDiv.style.visibility = "visible";
            parentDiv.style.border = "1px solid #e36c3d";
          }
          else
          {
            tab[index] = 1;
            wrongDiv.innerHTML = "";
            wrongDiv.style.visibility = "hidden";
            parentDiv.style.border = "none";

            //set the global pokemon object equal to the received data
            res.json().then((data)=>{setPoke(data)});
          }
        });
    }
  }

  else if(index==2)
  {
    if(value == "")
    {
      tab[index] = 0;
      wrongDiv.innerHTML = "You need to insert an Ability!";
      wrongDiv.style.visibility = "visible";
      parentDiv.style.border = "1px solid #e36c3d";
    }
    else
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

      fetch(`https://pokeapi.co/api/v2/ability/${name}/`, {method: "GET"})
        .then((res)=>{
          if(!res.ok)
          {
            tab[index] = 0;
            wrongDiv.innerHTML = "Wrong name! This ability doesn't exist!";
            wrongDiv.style.visibility = "visible";
            parentDiv.style.border = "1px solid #e36c3d";
          }
          else
          {
            tab[index] = 1;
            wrongDiv.innerHTML = "";
            wrongDiv.style.visibility = "hidden";
            parentDiv.style.border = "none";

            //set the global ability object equal to the received data
            res.json().then((data)=>{setAbility(data)});
          }
        });
    }
  }

  else if(index==4)
  {
    if(value == "")
    {
      tab[index] = 0;
      wrongDiv.innerHTML = "You need to insert a Nature!";
      wrongDiv.style.visibility = "visible";
      parentDiv.style.border = "1px solid #e36c3d";
    }
    else
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

      fetch(`https://pokeapi.co/api/v2/nature/${name}/`, {method: "GET"})
        .then((res)=>{
          if(!res.ok)
          {
            tab[index] = 0;
            wrongDiv.innerHTML = "Wrong name! This nature doesn't exist!";
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
  }

  else if(index>=5 && index<=8)
  {
    if(value == "")
    {
      tab[index] = 0;
      wrongDiv.innerHTML = "You need to insert a Move!";
      wrongDiv.style.visibility = "visible";
      parentDiv.style.border = "1px solid #e36c3d";
    }
    else
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

      fetch(`https://pokeapi.co/api/v2/move/${name}/`, {method: "GET"})
        .then((res)=>{
          if(!res.ok)
          {
            tab[index] = 0;
            wrongDiv.innerHTML = "Wrong name! This move doesn't exist!";
            wrongDiv.style.visibility = "visible";
            parentDiv.style.border = "1px solid #e36c3d";
          }
          else
          {
            tab[index] = 1;
            wrongDiv.innerHTML = "";
            wrongDiv.style.visibility = "hidden";
            parentDiv.style.border = "none";

            //set the global move object equal to the received data
            res.json().then((data)=>{setMove(data,index-5)});
          }
        });
    }
  }

  else if(index==10)
  {
    if(value == "")
    {
      tab[index] = 0;
      wrongDiv.innerHTML = "You need to insert a Name!";
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

  else if(index==11)
  {
    if(value == "")
    {
      tab[index] = 0;
      wrongDiv.innerHTML = "You need to insert a Password!";
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

  //get the wrong info div
  let wrongDiv;
  if(e.target.type == "text")
  {
    wrongDiv = e.target.parentNode.nextElementSibling.nextElementSibling;
  }
  else
  {
    wrongDiv = e.target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;;
  }

  //get the number of the input
  let index = e.target.id.slice(e.target.id.length-1, e.target.id.length);

  //get the number value
  let value = evTextInputs[index].value;

  //reset all of the wrongDivs
  evTextInputs.forEach((input) => {
    let div = input.parentNode.nextElementSibling.nextElementSibling;
    if(div.innerHTML.charAt(0)!='W' && div.innerHTML.charAt(0)!='S')
    {
      div.innerHTML = "";
      div.style.visibility = "hidden";
    }
  });
  evSelects.forEach((input) => {
    let div = input.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;
    if(div.innerHTML.charAt(0)!='W')
    {
      div.innerHTML = "";
      div.style.visibility = "hidden";
    }
  });

  //check if some stats double
  let doublesCheck = false;
  for(let i=0;i<evSelects.length;i++)
  {
    for (let j=0;j<evSelects.length;j++)
    {
      if(i!=j && evSelects[i].value==evSelects[j].value && evSelects[j].value!="empty")
      {
        doublesCheck = true;
      }
    }
  }

  if(doublesCheck == true)
  {
    evtab[index] = 0;
    wrongDiv.innerHTML = "Stats cannot double!";
    wrongDiv.style.visibility = "visible";
  }

  //check if it's between 1-252
  else if(doublesCheck == false && value>=1 && value<=252)
  {
    //check if sum is 1-510
    let sum = 0;
    for(let i=0;i<evTextInputs.length;i++)
    {
      if(evTextInputs[i].value=="")
      {
        sum=200;
        break;
      }
      sum += parseInt(evTextInputs[i].value);
    }

    console.log(evSelects[index].value);

    console.log(sum);

    if(sum>=1 && sum<=510 && evSelects[index].value != "empty")
    {
      evtab[index] = 1;
      wrongDiv.innerHTML = "";
      wrongDiv.style.visibility = "hidden";
    }

    else if(evSelects[index].value == "empty")
    {
      evtab[index] = 0;
      wrongDiv.innerHTML = "The stat type cannot be empty!";
      wrongDiv.style.visibility = "visible";
    }

    else
    {
      evtab[index] = 0;
      wrongDiv.innerHTML = "The sum of all EVs needs to be 1-510!";
      wrongDiv.style.visibility = "visible";
    }

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

//check if set pokemon has set ability and moves
const pokemonCheck = () => {

  //ability check
  let abCheck = false;
  pokemon.abilities.forEach((ab) => {
    if(ab.ability.name == ability.name)
    {
      abCheck = true;
    }
  });

  if(abCheck==false)
  {
    alert(`This pokemon doesn't have this ability!`)
    return false;
  }

  //moves check
  else
  {
    //check if some moves double
    let doublesCheck = false;
    for(let i=0;i<4;i++)
    {
      for (let j=0;j<4;j++)
      {
        if(i!=j && moves[i].name==moves[j].name)
        {
          doublesCheck = true;
        }
      }
    }

    if(doublesCheck == true)
    {
      alert(`Some moves double!`)
      return false;
    }
    //if they don't double, check if the pokemon has all of them
    else
    {
      let moveCheck = [false,false,false,false];
      let counter = 0;

      moves.forEach((move)=>{
        pokemon.moves.forEach(pmove=>{
          if(pmove.move.name == move.name)
          {
            moveCheck[counter] = true;
          }
        });
        counter++;
      });


      counter = 1;
      let wrongIndex = 0;
      let isOK = true;

      moveCheck.forEach(item=>{
        if(item==false)
        {
          wrongIndex = counter;
          isOK=false;
        }
        counter++;
      });

      if(isOK==false)
      {
        alert(`This pokemon doesn't have the move #${wrongIndex}!`)
        return false;
      }
      else {
        return true;
      }
    }

  }

};



//check if everything is done correctly
const checkForm = ()=>{

  //check if sth is empty
  let isOK = true;

  for(let i=0;i<tab.length;i++)
  {
    if(tab[i]==0)
    {
      isOK=false;
      if(i>2)
      {
        textInputs[i-1].nextElementSibling.nextElementSibling.innerHTML = "You need to correct this!";
        textInputs[i-1].nextElementSibling.nextElementSibling.style.visibility = "visible";
        textInputs[i-1].parentNode.style.border = "1px solid #e36c3d";
      }
      else
      {
        textInputs[i].nextElementSibling.nextElementSibling.innerHTML = "You need to correct this!";
        textInputs[i].nextElementSibling.nextElementSibling.style.visibility = "visible";
        textInputs[i].parentNode.style.border = "1px solid #e36c3d";
      }
    }
  }

  //if isOK is true, change button type to 'submit'
  if(isOK==true)
  {
    if(pokemonCheck())
    {
      submitButton.type = 'submit';
    }
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
