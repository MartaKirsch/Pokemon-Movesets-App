const showSearchbar = () => {

  if(window.innerWidth < 1200)
  {
    document.querySelector('#leftWrapper').style.display = "block";
    document.querySelector('#rightWrapper').style.display = "none";
  }

};

const showMain = () => {

  if(window.innerWidth < 1200)
  {
    document.querySelector('#leftWrapper').style.display = "none";
    document.querySelector('#rightWrapper').style.display = "block";
  }
};

//add event listeners
document.querySelectorAll('#navbar a')[3].addEventListener('click', ()=>{

  if(document.querySelector('#rightWrapper').style.display == "block" || document.querySelector('#rightWrapper').style.display =="")
  {
    showSearchbar();
  }
  else
  {
    showMain();
  }
});

document.addEventListener("click", (e) => {
  //get all the elements that shouldn't trigger hiding the sidebar
  const left = document.getElementById("leftWrapper");
  const button = document.querySelectorAll('#navbar a')[3];
  const hints = document.querySelectorAll('#hints li');
  const li = document.querySelectorAll('#navbar li')[3];
  const input = document.querySelector('#searchinput');
  const loadMore = document.querySelector('#loadMore');

  let target = e.target; // clicked element

  let hintsClick = false;
  hints.forEach((li) => {
    if(target == li)
    {
      hintsClick = true;
    }
  });

  if (target != left && target != button && !hintsClick && target != loadMore && target != li && target != input && target != left.children[0] && target != left.children[1])
  {
    // This is a click outside
    showMain();
  }

});

window.onresize =  ()=>{
  if(window.innerWidth > 1200)
  {
    document.querySelector('#leftWrapper').style.display = "block";
    document.querySelector('#rightWrapper').style.display = "block";
  }
  else if(window.innerWidth < 1200)
  {
    document.querySelector('#leftWrapper').style.display = "none";
    document.querySelector('#rightWrapper').style.display = "block";
  }
};
