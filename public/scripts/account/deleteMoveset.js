const deleteMoveset = async (id) => {

  let data = await fetch(`/movesets/${id}`, {method: 'DELETE'}).then(res=>res.json());
  if(data)
  {
    window.location.replace("/account");
  }
};

const showOptions = (e) => {

  //get the main panel
  const mainpanel = document.querySelector('#mainpanel');

  //create the innerHTML
  let string = `
  <div id="deleteWrapper" class="col">
    Are you sure you want to delete <a target="_blank" href="/movesets/${e.target.dataset.name}/${e.target.dataset.id}">this</a> moveset?
  </div>
  <div id="deleteOptions">
    <div class="yes deleteOption">Yes</div>
    <a href="/account"><div class="no deleteOption">No</div></a>
  </div>
  `;

  //show the options on page
  mainpanel.innerHTML = string;

  //add event listener for 'yes' option
  document.querySelector('.yes').addEventListener('click', ()=>{deleteMoveset(e.target.dataset.id)});

};


const addDeleteEventListeners = () => {
  let deletes = document.querySelectorAll('.liBottomRight');

  deletes.forEach((div) => {
    div.addEventListener('click', showOptions);
  });

};
