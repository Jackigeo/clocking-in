import { WatchController } from "../controllers/watch.controller";
import { Matrix3x3 } from '../objects/matrix3x3';
import { Vector2D } from '../objects/vector2d';

// watch.view.ts
export class WatchView {
  private displayName: string;
  private controller: WatchController;
  private scale: number;

  constructor(displayName: string, controller: WatchController) {
    this.displayName = displayName;
    this.controller=controller;
  }

  render(currentTime: Date, timezone:string): void {
    const watchesContainer = document.getElementById("watches");
    let watch= document.getElementById(this.displayName);
    let GMT=document.getElementById(this.displayName+'GMT');

    if(!watch){
      this.init()
    }

    if (watch) {
      if(watch.classList.contains('ampm')){
        watch.textContent =`${currentTime.toLocaleString().split(', ')[1]}`;
      } else { watch.textContent = `${currentTime.toTimeString().split(' ')[0]}`; }
      GMT.textContent=timezone;
    }

    this.rotateWatches()
  }

  init(){
    const watchesContainer = document.getElementById("watches");
  //Watch
    const watchContainer = document.createElement("div");
    watchContainer.id='container-'+this.displayName
    watchContainer.classList.add('frame')
    watchesContainer.appendChild(watchContainer)

    let screen=document.createElement("div");
    screen.classList.add('screen')
    watchContainer.appendChild(screen)
    //Watch screen
    let watch=document.createElement("div");
    watch.id=this.displayName
    watch.classList.add('lightOff');
    watch.classList.add('modeOff')
    watch.classList.add('ampm')
    watch.classList.add('time')
    screen.appendChild(watch)

    let GMT = document.createElement('p');
    GMT.classList.add('timezone')
    GMT.id=this.displayName+'GMT'
    screen.appendChild(GMT)
    

    //Watch buttons
    const modeButton=document.createElement("button");
    modeButton.id=this.displayName+'mode'
    modeButton.classList.add('modeBtn');
    modeButton.innerHTML='m';
    watchContainer.appendChild(modeButton)
    modeButton.addEventListener('click',() => {
      this.controller.updateMode();
    })

    const increaseButton=document.createElement("button");
    increaseButton.id=this.displayName+'increase'
    increaseButton.classList.add('increaseBtn');
    increaseButton.innerHTML='+';
    increaseButton.addEventListener('click', () => {
      this.controller.increaseTime();
    })
    watchContainer.appendChild(increaseButton)

    const lightButton=document.createElement("button");
    lightButton.id=this.displayName+'light'
    lightButton.classList.add('lightBtn');
    lightButton.addEventListener('click', () => {
      this.controller.updateLight();
    })
    watchContainer.appendChild(lightButton)

    const resetButton=document.createElement("button");
    resetButton.id=this.displayName+'reset'
    resetButton.classList.add('resetBtn');
    resetButton.innerHTML='reset';
    resetButton.addEventListener('click', () => {
      this.controller.resetTime();
    })
    watchContainer.appendChild(resetButton)

    const displayButton=document.createElement("button");
    displayButton.id=this.displayName+'display'
    displayButton.classList.add('displayBtn');
    displayButton.innerHTML='am';
    displayButton.addEventListener('click', () => {
      this.controller.updateDisplay();
    })
    watchContainer.appendChild(displayButton)
  }

  setMode(name:string){
    const watch = document.getElementById(name);
    if(watch.classList.contains('modeMinute')){
      watch.classList.remove('modeMinute')
      watch.classList.add('modeOff')
    } else if (watch.classList.contains('modeHour')){
      watch.classList.remove('modeHour')
      watch.classList.add('modeMinute')
    } else if(watch.classList.contains('modeOff')){
      watch.classList.remove('modeOff')
      watch.classList.add('modeHour')
    } 
  }

  updateDisplay(name:string){
    const watch=document.getElementById(name);
    watch.classList.toggle('ampm');
    watch.classList.toggle('military');
  }

  setLight(name:string):void{
    const watch=document.getElementById(name);
    watch.classList.toggle('lightOff');
    watch.classList.toggle('lightOn');
  }

  increaseTime(name:string){
    const watch = document.getElementById(name);
    if(watch.classList.contains('modeMinute')){
      this.controller.addMinute()
    } else if(watch.classList.contains('modeHour')){
      this.controller.addHour()
    } 
  }

  rotateWatches(){
    let currentAngle:number;
    // Get watch element
    const watches = document.querySelectorAll('.frame');
    watches.forEach(el  => {
      const watch = el as HTMLElement;

        const transform = watch.style.transform;
        const regex = /rotate\((.+)deg\)/i;
        const match = transform.match(regex);
        if (match) {
          currentAngle = parseFloat(match[1]);  
        } else {
          currentAngle = 0;
        }

      // Increment angle
      currentAngle += 0.1; 
      // Apply new transform
      watch.style.transform = `rotate(${currentAngle}deg)`;
    });
  }

  scaleUpWatches(){

    
  }
  }
