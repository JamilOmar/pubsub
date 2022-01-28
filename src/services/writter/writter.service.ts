import { inject, injectable } from "inversify";
import TYPES from "../../common/constants/types";
import { IWritterStrategy } from "../../interfaces/writter.interface";

@injectable()
export class WritterService{

    constructor(@inject(TYPES.WritterStrategy) private strategy: IWritterStrategy){

    }

    write(data):void{
        this.strategy.write(data);
    }
}