import { inject, injectable } from "inversify";
import TYPES from "../../common/constants/types";
import { ITransformerStrategy } from "../../interfaces";
import { WritterService } from "../writter/writter.service";


@injectable()
export class TransformerService{


    constructor(
        
        @inject(TYPES.TransformerStrategy) private transformStrategy: ITransformerStrategy,
        @inject(TYPES.WritterService) private writterService: WritterService){

    }


    public async fromSource(json:any):Promise<void>{
        let data =  this.transformStrategy.getData(json);
        this.writterService.write(data);
    }
   


}