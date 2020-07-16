// this fun simulates use of an a tag while submitting the search input
function fakeClick(event) {
  let anchorObj = document.getElementById('atag');
  let searchbar = document.getElementById('searchinput');
  alert(searchbar.value);
  anchorObj.href = searchbar.value;

  // if(document.createEvent) {
  //   if(event.target !== anchorObj) {
  //     var evt = document.createEvent("MouseEvents");
  //     evt.initMouseEvent("click", true, true, window,
  //         0, 0, 0, 0, 0, false, false, false, false, 0, null);
  //     var allowDefault = anchorObj.dispatchEvent(evt);
  //     // you can check allowDefault for false to see if
  //     // any handler called evt.preventDefault().
  //     // Firefox will *not* redirect to anchorObj.href
  //     // for you. However every other browser will.
  //   }
  // }
}

//attaching the event listener
document.getElementById('searchbar').addEventListener('search', fakeClick);
