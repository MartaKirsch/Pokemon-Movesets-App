const updateInput = async (e)=>{
  const input = document.querySelector('#searchinput');
  console.log(e.target.innerHTML);
  input.value = e.target.innerHTML;
};

const showHints = async (e)=>{

  //get the input
  const input = e.target;

  //get the ul
  const ul = document.querySelector('#hints');

  //get entered value
  const val = e.target.value;

  if(val=="")
  {
    ul.style.display = "none";
    ul.innerHTML="";
  }
  else
  {
    ul.style.display = "block";

    //get pokemon that match the entered value
    let reg = new RegExp("^"+val,"i");
    let reg2 = new RegExp(val,"i");

    //create an array with hints
    let hints = [];
    pokedex.results.forEach((pokemon) => {
      if(reg.test(pokemon.name))
      {
        hints.push(pokemon.name);
      }
    });

    //create li elements
    let string = "";

    hints.forEach((name) => {
      if(input.name == "account")
      {
        string+=`
        <li>${name}</li>
        `;
      }

      else
      {
        string+=`
        <a href="/pokemon/${name}"><li>${name}</li></a>
        `;
      }
    });

    //display hints
    ul.innerHTML = string;

    //if it's the account page, add event listeners to the li elements for updating the input
    if(input.name == "account")
    {
      let lis = document.querySelectorAll('#hints li');
      lis.forEach((li) => {
        li.addEventListener('click', updateInput);
      });

    }
  }


};

const hideHints = ()=>{

  //get the ul
  const ul = document.querySelector('#hints');

  ul.style.display = "none";
  ul.innerHTML="";

};
