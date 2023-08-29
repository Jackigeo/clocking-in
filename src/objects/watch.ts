// watch.ts
import { WatchController } from '../controllers/watch.controller';

export class Watch{
    constructor(name: string, timezone:string) {
        new WatchController(name, timezone);
      } 
}