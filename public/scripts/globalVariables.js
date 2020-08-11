let pokedex = {};

const loadDex = async ()=>{
  pokedex = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964',{method:'GET'})
  .then(res=>res.json());
  console.log(pokedex);
};

loadDex().then(()=>{
  document.querySelector('#searchinput').addEventListener('keyup', showHints);
  document.querySelector('#searchinput').addEventListener('focus', showHints);

  document.addEventListener("click", (evt) => {
    const ul = document.getElementById("hints");
    const input = document.getElementById("searchinput");
    let targetElement = evt.target; // clicked element

    if (targetElement != ul && targetElement != input)
    {
      // This is a click outside
      hideHints();
    }

});
});
