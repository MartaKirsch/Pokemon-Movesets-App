let generateEV = async ()=>{
  let string = "";

  //reset the evtab
  evtab = [0];
  evflags = [{}];

  for(let i=0;i<select.value;i++)
  {
    string+=`
    <li>
      <select id="select-${i}" class="" name="stat[]">
        <option value="empty">Stat</option>
        <option value="HP">HP</option>
        <option value="Atk">Atk</option>
        <option value="Def">Def</option>
        <option value="SAtk">SAtk</option>
        <option value="SDef">SDef</option>
        <option value="Spd">Spd</option>
      </select>
      <input id="num-input-${i}" type="text" name="value[]" value="" placeholder="Num">
    </li>
    <div class="wrong-data"></div>
    `;
    //add one element to the evtab and evflags
    evtab.push(0);
    evflags.push({double:1, emptyStat: 1, emptyNum: 1, wrongNum: 1, wrongSum: 1});
  }

  //correct the array, cause there's always one element in addition from creating the variable
  evtab = evtab.slice(0, evtab.length-1);
  evflags = evflags.slice(1, evflags.length);

  //put the created lis into the ul
  document.querySelector('#EVul').innerHTML = string;

  //update all the inputs needed
  evTextInputs = document.querySelectorAll('#EVul input[type=text]');
  evSelects = document.querySelectorAll('#EVul select');
  wrongDivs = document.querySelectorAll('#EVul .wrong-data');

  //add event listeners for check-form.js to check if everything is entered correctly
  evTextInputs.forEach((input)=>{
    input.addEventListener('change', evInputValidation);
  });
  evSelects.forEach((input)=>{
    input.addEventListener('change', evInputValidation);
    // input.addEventListener('click', evInputValidation);
  });
};

select.addEventListener('click', generateEV);
