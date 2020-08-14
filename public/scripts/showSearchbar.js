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
document.querySelectorAll('#navbar a')[3].addEventListener('click', showSearchbar);

document.addEventListener("click", (e) => {
  const left = document.getElementById("leftWrapper");
  const button = document.querySelectorAll('#navbar a')[3];
  const li = document.querySelectorAll('#navbar li')[3];
  const input = document.querySelector('#searchinput');
  const loadMore = document.querySelector('#loadMore');
  let target = e.target; // clicked element

  if (target != left && target != button && target != loadMore && target != li && target != input && target != left.children[0] && target != left.children[1])
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
  }
};
