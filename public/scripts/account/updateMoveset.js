const stats = JSON.parse(document.querySelector('#ifStats').innerHTML);


const triggerEvs = ()=>{

  tab = [1,1,1,1,1,1,1,1,1,1];

  inputValidation(document.querySelector('#main-text-0'));
  inputValidation(document.querySelector('#main-text-2'));
  inputValidation(document.querySelector('#main-text-5'));
  inputValidation(document.querySelector('#main-text-6'));
  inputValidation(document.querySelector('#main-text-7'));
  inputValidation(document.querySelector('#main-text-8'));

  //change the ev select value
  select.value = stats.length;

  //generate ev rows, then put the old data in
  generateEV().then(()=>{
    const names = document.querySelectorAll('#EVul select');
    const values = document.querySelectorAll('#EVul input[type=text]');

    for(let i=0;i<stats.length;i++)
    {
      names[i].value = stats[i].stat;
      values[i].value = stats[i].value;
    }
  });
};


if(stats!="")
{
  triggerEvs();
}
