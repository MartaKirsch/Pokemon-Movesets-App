const select = document.querySelector('.row select');


let generateEV = ()=>{
  let string = "";

  for(let i=0;i<select.value;i++)
  {
    string+=`
    <li>
      <div>
        <select class="" name="">
          <option value="HP">HP</option>
          <option value="Atk">Atk</option>
          <option value="Def">Def</option>
          <option value="SAtk">SAtk</option>
          <option value="SDef">SDef</option>
          <option value="Spd">Spd</option>
        </select>
      </div>
      <div>
        <input type="text" name="" value="" placeholder="Num">
      </div>
      <div style="clear:both"></div>
    </li>
    `;
  }

  document.querySelector('#EVul').innerHTML = string;
};

select.addEventListener('click', generateEV);
