import { Watch } from './objects/watch';
import './index.css';
import timezones from "./data/timezones";

new Watch('watch1','GMT+0200');
new Watch('watch2','GMT+0400');
new Watch('watch2','GMT-1200');


const watchButton= document.getElementById('newWatchBtn')
const dropdown = document.getElementById('GMTform');
const validateBtn = document.getElementById('validateBtn');

watchButton.addEventListener('click', () => {
  showGMT()
})

function showGMT(){
  dropdown.style.display = 'block';
  watchButton.style.display='none';
}

const GMT=document.getElementById('GMT')
Object.keys(timezones).forEach(key => {
  var opt = document.createElement('option');
  opt.value = key
  opt.innerHTML=timezones[key].Name+' ('+key+')';
  GMT.appendChild(opt);
});

validateBtn.addEventListener('click', () => {
    newWatch()
  })

function newWatch(){
    const offset = (<HTMLInputElement | null>document.getElementById("GMT"))?.value;
    let watchesContainer=document.getElementById('watches')
    let lastWatchIndex=parseInt(watchesContainer.lastElementChild.id.slice(-1))
    let watchIndex=lastWatchIndex+1
    new Watch('watch'+watchIndex,offset)
    dropdown.style.display = 'none';
    watchButton.style.display='block';
}








  
