//set the button's type as 'button' so the form can't be submitted if sth is missing
submitButton.type = 'button';
//in chrome there's an error involving cors, it makes it work
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';



//'live' check on text inputs' entered data
const inputValidation = async (e)=>{


  if(e.type!='change')
  {
    e.target = e;
  }

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
  let wrongDiv = e.target.parentNode.nextElementSibling;
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

      fetch(proxyUrl+`https://pokeapi.co/api/v2/pokemon/${name}/`, {method: "GET"})
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

      fetch(proxyUrl+`https://pokeapi.co/api/v2/ability/${name}/`, {method: "GET"})
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

      fetch(proxyUrl+`https://pokeapi.co/api/v2/nature/${name}/`, {method: "GET"})
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

      fetch(proxyUrl+`https://pokeapi.co/api/v2/move/${name}/`, {method: "GET"})
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

};

//'live' check on optional text inputs' entered data
const optionalInputValidation = async (e)=>{

  //get the number of the input
  let index = e.target.id.slice(e.target.id.length-1, e.target.id.length);

  //get the entered value
  let value = e.target.value;
  let wrongDiv = e.target.parentNode.nextElementSibling;
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
    if(value.length>20)
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

    //check if a moveset with this name already exists
    fetch(`add/check`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: value})
     })
      .then(data=>data.json())
      .then((res)=>{
        if(res.value == "exists")
        {
          tab[index] = 0;
          wrongDiv.innerHTML = "Moveset with this name already exists!";
          wrongDiv.style.visibility = "visible";
          parentDiv.style.border = "1px solid #e36c3d";
        }
        else if(res.value == "prohibited")
        {
          tab[index] = 0;
          wrongDiv.innerHTML = "This moveset name is prohibited (nick#num)!";
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

    fetch(`/pokemon/getItem/${name}/`, {method: "GET"})
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
      }).catch(err=>console.log(err.message));
  }

};

//'live' check on ev number inputs' entered data
const evInputValidation = (e)=>{

  if(e.type!='change')
  {
    e.target = e;
  }

  //reset the tab for ev
  tab[3] = 0;

  //get the number of the input
  let index = e.target.id.slice(e.target.id.length-1, e.target.id.length);

  //get the number value
  let value = evTextInputs[index].value;

  //reset all of the wrongDivs error messages
  wrongDivs.forEach((div) => {

    div.innerHTML = "";
    div.style.visibility = "hidden";

  });

  //check all the evs rows flags
  for(let i=0;i<evSelects.length;i++)
  {
    //reset double flags
    for(let j=0;j<evSelects.length;j++)
    {
      evflags[j].double = 0;
    }

    //check if some stats double
    for(let j=0;j<evSelects.length;j++)
    {
      for(let k=0;k<evSelects.length;k++)
      {
        if(j!=k && evSelects[j].value==evSelects[k].value && evSelects[k].value!="empty")
        {
          evflags[j].double = 1;
          evflags[k].double = 1;
        }
      }
    }

    //3 checks at once
    for(let j=0;j<evSelects.length;j++)
    {
      let numValue = parseInt(evTextInputs[j].value);

      //check if there's an empty num
      if(evTextInputs[j].value=="")
      {
        evflags[j].emptyNum = 1;
      }
      else
      {
        evflags[j].emptyNum = 0;
      }

      //check if there's an empty stat
      if(evSelects[j].value=="empty")
      {
        evflags[j].emptyStat = 1;
      }
      else
      {
        evflags[j].emptyStat = 0;
      }

      //check if entered values are correct (1-252)
      if(numValue>=1 && numValue<=252 && evSelects[j].value!="empty")
      {
        evflags[j].wrongNum = 0;
      }
      else if(evSelects[j].value=="empty")
      {
        evflags[j].wrongNum = 0;
      }
      else
      {
        evflags[j].wrongNum = 1;
      }

    }

    //check if sum of the evs is correct (1-510)
    let sum = 0;
    for(let j=0;j<evTextInputs.length;j++)
    {
      if(evTextInputs[j].value=="")
      {
        sum=200;
        break;
      }
      sum += parseInt(evTextInputs[j].value);
    }

    if(sum>=1 && sum<=510)
    {
      evflags[i].wrongSum = 0;
    }
    else
    {
      evflags[i].wrongSum = 1;
    }

  }


  //display error messages depending on the evflags
  for(let i=0;i<evSelects.length;i++)
  {
    //reset the OK status of a row of evs
    evtab[i] = 0;

    if(evflags[i].double==1)
    {
      wrongDivs[i].innerHTML = "Stats cannot double!";
      wrongDivs[i].style.visibility = "visible";
    }

    else if(evflags[i].emptyNum==1 && evSelects[i].value!="empty")
    {
      wrongDivs[i].innerHTML = "Enter the number of EVs!";
      wrongDivs[i].style.visibility = "visible";
    }

    else if(evflags[i].emptyStat==1  && evTextInputs[i].value!="")
    {
      wrongDivs[i].innerHTML = "The stat type cannot be empty!";
      wrongDivs[i].style.visibility = "visible";
    }

    else if(evflags[i].wrongNum==1)
    {
      wrongDivs[i].innerHTML = "Wrong value! It needs to be 1-252!";
      wrongDivs[i].style.visibility = "visible";
    }

    else if(evflags[i].wrongSum==1)
    {
      wrongDivs[index].innerHTML = "The sum of all EVs needs to be 1-510!";
      wrongDivs[index].style.visibility = "visible";
    }

    //everything is OK
    else
    {
      evtab[i] = 1;
    }

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
      let index=i;
      if(i>2)
      {
        index=i-1;
      }
      textInputs[i].parentNode.nextElementSibling.innerHTML = "You need to correct this!";
      textInputs[i].parentNode.nextElementSibling.style.visibility = "visible";
      textInputs[i].parentNode.style.border = "1px solid #e36c3d";

    }
  }

  //if isOK is true, change button type to 'submit'
  if(isOK==true)
  {
    if(pokemonCheck())
    {
      document.getElementById('main-text-0').disabled = false;
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
