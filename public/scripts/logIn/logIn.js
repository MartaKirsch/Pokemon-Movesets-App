const button = document.querySelector('#logIn');
const register = document.querySelector('#register');

const changeToRegister = (e) =>{

  register.style.display = 'none';
  button.value = "Register";

  document.querySelector('.column form').action = '/account/register';
};

const buttonAction = async (e)=>{

  //if it's log in than check the account password and nickname with db
  if(e.target.value=="Log In")
  {
    const nickname = document.querySelector('#nickname');
    const password = document.querySelector('#password');

    //check data with db
    let data = await fetch(`/account/checkData/${nickname.value}/${password.value}`, {method: 'GET'}).then(res=>res.json());

    //if it's ok, then redirect to /account
    if(data.status == "OK")
    {
      let anchorObj = document.getElementById('atag');

      if(document.createEvent) {
        if(e.target !== anchorObj) {
          let evt = document.createEvent("MouseEvents");
          evt.initMouseEvent("click", true, true, window,
              0, 0, 0, 0, 0, false, false, false, false, 0, null);
          let allowDefault = anchorObj.dispatchEvent(evt);
        }
      }
    }

    else
    {
      alert('Incorrect login data!');
    }
  }

  //else - it's an attempt to register an account. check all the input data
  else
  {
    const nickname = document.querySelector('#nickname');
    const password = document.querySelector('#password');

    //check the nickname length
    if(nickname.value.length < 13)
    {
      //check if the password's not empty
      if(password.value =="")
      {
        alert('You need to enter a password!');
      }
      else
      {
        let data = await fetch(`/account/check-if-exists/${nickname.value}`, {method: 'GET'}).then(res=>res.json());

        if(data.status == 'OK')
        {
          button.type = 'submit';
          document.querySelector('.column form').submit();
        }

        else
        {
          alert('An account with this nickname already exists!');
        }
      }
    }

    else
    {
      alert('Your nickname is too long! It needs to be less than 13 characters!');
    }
  }


};

//add event listeners

button.addEventListener('click', buttonAction);
register.addEventListener('click', changeToRegister);
