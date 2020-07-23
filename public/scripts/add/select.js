let generateEV = ()=>{
  let string = "";

  //reset the evtab
  evtab = [0];

  for(let i=0;i<select.value;i++)
  {
    string+=`
    <li>
      <div>
        <select id="select-${i}" class="" name="stat-${i}">
          <option value="HP">HP</option>
          <option value="Atk">Atk</option>
          <option value="Def">Def</option>
          <option value="SAtk">SAtk</option>
          <option value="SDef">SDef</option>
          <option value="Spd">Spd</option>
        </select>
      </div>
      <div>
        <input id="num-input-${i}" type="text" name="value-${i}" value="" placeholder="Num">
      </div>
      <div style="clear:both"></div>
      <div class="wrong-data"></div>
    </li>
    `;

    //add one element to the evtab
    evtab.push(0);
  }
  //correct the array, cause there's always one element in addition from creating the variable
  evtab = evtab.slice(0, evtab.length-1);

  //put the created lis into the ul
  document.querySelector('#EVul').innerHTML = string;

  //update all the inputs needed
  evTextInputs = document.querySelectorAll('#EVul input[type=text]');
  evSelects = document.querySelectorAll('#EVul select');

  //add event listeners for check-form.js to check if everything is entered correctly
  evTextInputs.forEach((input)=>{
    input.addEventListener('change', evInputValidation);
  });
};

select.addEventListener('click', generateEV);
