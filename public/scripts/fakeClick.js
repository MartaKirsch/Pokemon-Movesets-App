// this fun simulates use of an a tag while submitting the search input
function fakeClick(event) {
  let anchorObj = document.getElementById('atag');
  let searchbar = document.getElementById('searchinput');

  anchorObj.href = "/pokemon/"+searchbar.value.toLowerCase();

  if(document.createEvent) {
    if(event.target !== anchorObj) {
      let evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      let allowDefault = anchorObj.dispatchEvent(evt);
    }
  }
}

//attaching the event listener
document.getElementById('searchbar').addEventListener('search', fakeClick);
