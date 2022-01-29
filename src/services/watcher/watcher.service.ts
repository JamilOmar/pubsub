
import chokidar = require('chokidar');
import EventEmitter = require('events');
import { injectable } from 'inversify';
@injectable()
export class WatcherService extends EventEmitter{
    
    private watcher:any;
    constructor(private opt={source:'./input/logs' ,watcher:{ persistent: true}}){
        super();
    }

    public bootstrap(){
       this.watcher = chokidar.watch(
        this.opt.source,
        this.opt.watcher);   
       this.watcher
       .on('add', (path: string, stats: string) => { 
        this.emit('onAdded' ,{path , source:this.opt.source})
    }
}