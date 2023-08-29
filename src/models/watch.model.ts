import timezones from "../data/timezones";

// watch.model.ts
export class WatchModel {
    private currentTime: Date =new Date();
    private resetTime:Date=new Date();
    private timezone:string;

    constructor(timezone:string) {
      this.timezone=timezone;
      this.setInitialTime()
    }

    setInitialTime(){
      const offset = timezones[this.timezone].offset;

      if(this.timezone=="GMT+0530"||this.timezone=="GMT+1030"){
        this.currentTime.setUTCMinutes(this.currentTime.getUTCMinutes()+30)
        this.resetTime.setUTCMinutes(this.currentTime.getUTCMinutes()+30)
      }

      //-2 due to our localTimeZone GMT+0200
      this.currentTime.setUTCHours(this.currentTime.getUTCHours()+offset-2)
      this.resetTime.setUTCHours(this.currentTime.getUTCHours())
    }

    getInitialTime(){
      this.resetTime.setHours(this.currentTime.getHours());
      this.resetTime.setMinutes(this.currentTime.getMinutes());
    }
  
    getTime(): Date {
        return this.currentTime;
    }
  
    setTime(newTime: Date): void {
      this.currentTime = newTime;
    }

    getTimezone(): string {
      return this.timezone;
    }

    addHour():void{
      this.currentTime.setHours(this.currentTime.getHours()+1)
    }

    addMinute():void{
      this.currentTime.setMinutes(this.currentTime.getMinutes()+1)
    }

    reset():void{
      this.currentTime.setHours(this.resetTime.getHours());
      this.currentTime.setMinutes(this.resetTime.getMinutes());
      this.resetTime.setHours(this.currentTime.getHours())
      this.resetTime.setMinutes(this.currentTime.getMinutes())
    }

    getResetTime():Date{
      return this.resetTime
    }
  }
  