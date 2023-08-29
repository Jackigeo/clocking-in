// watch.controller.ts
import { WatchModel } from '../models/watch.model';
import { WatchView } from '../views/watch.view';

export class WatchController {
  private model: WatchModel;
  private view: WatchView;
  private name: string;

  constructor(name:string,timezone:string) {
    this.name = name;
    this.view = new WatchView(this.name, this);
    this.model = new WatchModel(timezone);
    this.model.getInitialTime();

    // Update time every second
    setInterval(() => {
      this.updateTime();
      this.view.animate()
  }, 1000);
  }

  getTime(): Date {
    return this.model.getTime();
  }

  getResetTime(): Date {
    return this.model.getResetTime();
  }

  setTime(newTime: Date): void {
    this.model.setTime(newTime);
    this.updateView();
  }

  updateView(): void {
    const currentTime = this.model.getTime();
    const timezone = this.model.getTimezone();
    this.view.render(currentTime, timezone);
  }

  updateTime():void {
    const time = this.getTime();
    const resetTime = this.getResetTime()
    time.setSeconds(this.getTime().getSeconds()+1)
    resetTime.setSeconds(this.getTime().getSeconds()+1)
    this.model.setTime(time);
    this.updateView();
  }

  updateMode():void{
    this.view.setMode(this.name)
  }

  updateLight():void{
    this.view.setLight(this.name)
  }

  increaseTime():void{
    this.view.increaseTime(this.name)
  }

  resetTime():void{
    this.model.reset()
  }

  updateDisplay(){
    this.view.updateDisplay(this.name)
  }

  addHour(){
    this.model.addHour()
  }

  addMinute(){
    this.model.addMinute()
  }
}
