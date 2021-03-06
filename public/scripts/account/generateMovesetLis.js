const generateLis = async (movesets, type)=> {
  let newContent = "";
  let oldContent = sidebar.innerHTML;

  if(type==0 && search.dataset.id == 0)
  {
    oldContent = "";
  }

  if(movesets.length==0 && oldContent != "")
  {
    newContent += `<a href="">
      <img src="" alt="">
      <div class="sidebarContent">
        <div class="sidebarName">No Movesets Yet!</div>
        <div class="types">
          <div class="type"></div>
          <div style="clear:both"></div>
        </div>
        <div style="clear:both"></div>
      </div>
    </a>`;
  }
  else
  {
    let sidebarLength = sidebar.childElementCount;

    for(let i=0;i<movesets.length;i++)
    {
      let name = "";
      //change the entered name to the api standards
      for(let j=0; j<movesets[i].name.length;j++)
      {
        if(movesets[i].name.charAt(j)==' ')
        {
          name+= '-';
        }
        else
        {
          name+=movesets[i].name.charAt(j).toLowerCase();
        }
      }


      //get the pokemon info for img
      let pokeinfo = await
      fetch(`/pokemon/check`, {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:`http://pokeapi.co/api/v2/pokemon/${name}/`})
       })
      .then(data=>data.json()).then(res=>{
        if(!res.ok){
          throw Error('could not fetch data');
        }
        return(res.data);
      }).catch(err=>console.log(err.message));

      let imgurl = '';

      //check if retrieved data has img url - if it's some weird pokemon form
      if(pokeinfo.sprites.front_default)
      {
        imgurl = pokeinfo.sprites.front_default;
      }
      else
      {
        let pokeForm = await
        fetch(`/pokemon/check`, {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({url:`${pokeinfo.forms[0].url}`})
         })
        .then(data=>data.json()).then(res=>{
          if(!res.ok){
            throw Error('could not fetch data');
          }
          return(res.data);
        }).catch(err=>console.log(err.message));
        imgurl = pokeForm.sprites.front_default;
      }

      //create a li element for a single moveset
      if(pokeinfo.types.length==1)
      {
        newContent += `<a href="/movesets/${movesets[i].name}/${movesets[i]._id}">
          <img src="${imgurl}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${movesets[i].movesetName}</div>
            <div class="types">
              <div class="type ${pokeinfo.types[0].type.name}">${pokeinfo.types[0].type.name}</div>
              <div style="clear:both"></div>
            </div>
          </div>
          `;

          if(movesets[i].rates.average >= 4)
          {
            newContent +=
            `
            <img class ="sidebarStar" src="/public/img/star.png" alt="" />
          </a>`;
          }
          else
          {
            newContent +=
            `
          </a>`;
          }
          newContent+=`
        <div class="liBottomDiv">
          <a class="liBottomLeft" href="/account/update/${movesets[i]._id}">Update</a>
          <div class="liBottomRight" data-id="${movesets[i]._id}" data-name="${movesets[i].name}">Delete</div>
        </div>`;
      }
      else
      {
        newContent += `<a href="/movesets/${movesets[i].name}/${movesets[i]._id}">
          <img src="${imgurl}" alt="">
          <div class="sidebarContent">
            <div class="sidebarName">${movesets[i].movesetName}</div>
            <div class="types">
              <div class="type ${pokeinfo.types[0].type.name}">${pokeinfo.types[0].type.name}</div>
              <div class="type ${pokeinfo.types[1].type.name}">${pokeinfo.types[1].type.name}</div>
              <div style="clear:both"></div>
            </div>
          </div>
          `;

          if(movesets[i].rates.average >= 4)
          {
            newContent +=
            `
            <img class ="sidebarStar" src="/public/img/star.png" alt="" />
          </a>`;
          }
          else
          {
            newContent +=
            `
          </a>`;
          }
          newContent+=`
        <div class="liBottomDiv">
          <a class="liBottomLeft" href="/account/update/${movesets[i]._id}">Update</a>
          <div class="liBottomRight" data-id="${movesets[i]._id}" data-name="${movesets[i].name}">Delete</div>
        </div>`;
      }


    }
  }

  //put the new sidebar content on the page
  sidebar.innerHTML = oldContent + newContent;
  addDeleteEventListeners();
};
