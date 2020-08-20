const rateMe = async (e)=>{
  //get the button and select element
  const rateButton = e.target;
  const rateSelect = document.querySelector('#rateIt select');
  const popup = document.querySelector('#popup');
  const movesetId = document.querySelector('#movesetId');

  if(!popup.classList.contains('visible'))
  {
    popup.classList.add('visible');
  }

  fetch(`/movesets/add-rate/${rateSelect.value}/${movesetId.innerHTML}`, {method: 'GET'})
  .then(blob=>blob.json())
  .then(res=>{

    //if a user is logged in, give a notification of updating a rate
    if(res.mssg=="logged-in")
    {
      if(res.oldRate == 0)
      {
        popup.innerHTML =
        `
          <div id="popup-header">
            Congratulations!
          </div>
          You have rated this moveset by the rate of ${rateSelect.value}!
          <div id="popup-options">
            <div class="yes">CLOSE</div>
          </div>

        `
        ;
      }
      else
      {
        popup.innerHTML =
        `
          <div id="popup-header">
            Congratulations!
          </div>
          You have updated the rate of this moveset from ${res.oldRate} to ${rateSelect.value}!
          <div id="popup-options">
            <div class="yes">CLOSE</div>
          </div>

        `
        ;
      }


      //add event listener for the 'yes' option that closes the popup and refreshes the page
      document.querySelector('#popup .yes').addEventListener('click', ()=>{

        popup.classList.remove('visible');
        popup.innerHTML = '';

        //refresh the page to show changes
        window.location = window.location;

      });
    }

    //if a user is not logged in
    else
    {
      //display the choosing panel
      popup.innerHTML =
      `
        <div id="popup-header">
          It seems you're not logged in
        </div>
        If you want to rate this moveset you have to be logged in. Do you want us to redirect you to the logging page?
        <div id="popup-options">
          <div class="yes">YES</div>
          <div class="no">NO</div>
        </div>
      `
      ;

      //add event listener for the 'no' option that closes the popup
      document.querySelector('#popup .no').addEventListener('click', ()=>{

        popup.classList.remove('visible');
        popup.innerHTML = '';

      });

      //add event listener for the 'yes' option that redirects to the login page
      document.querySelector('#popup .yes').addEventListener('click', ()=>{

        //save the old url to the moveset into session storage
        sessionStorage.setItem('msurl', window.location);

        window.location.replace("/account");

      });
    }

  });


};

//add event listener for the button
document.querySelector('#rate-button').addEventListener('click', rateMe);
