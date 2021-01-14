let pokedex = {};

const loadDex = async ()=>{

  pokedex = await fetch(`/pokemon/check`, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url:`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964`})
   })
  .then(data=>data.json())
  .then(res=>{
    if(!res.ok)
    {
      throw Error('could not fetch data');
    }
    return(res.data);
  })
  .catch(err=>console.log(err.message));
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
