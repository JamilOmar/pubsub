import { inject, injectable } from "inversify";
import { BusService } from "..";
import TYPES from "../../common/constants/types";
import { ITransformerStrategy } from "../../interfaces";
import { WritterService } from "../writter/writter.service";


@injectable()
export class TransformerService{


    constructor(
        
        @inject(TYPES.TransformerStrategy) private transformStrategy: ITransformerStrategy,
        @inject(TYPES.BusService) private busService: BusService,
        @inject(TYPES.WritterService) private writterService: WritterService){
        this.busService.on('onMessage', (message)=>{
            switch(message.type){
                case 'logAdded':
                    this.fromSource(message.data);
                    break;
                case 'tallyCreated':
                    this.updateTally(message.data);
                    break;
            }

        })

    }


    public async fromSource(json:any):Promise<void>{
        this.writterService.write({kind:'log read',...json});
        let data =  this.transformStrategy.getData(json);
        this.writterService.write({kind:'log transformed to tally',...data});
        this.busService.publish({type:'tallyCreated' , data})
    }

    public async updateTally(json:any):Promise<void>{
        this.writterService.write({kind:'global tally',...json});
    }
   


}