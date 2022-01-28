import { injectable } from "inversify";
import { IWritterStrategy } from "../../../interfaces/writter.interface";
@injectable()
export class ConsoleStrategy implements IWritterStrategy{

    write(data){
        console.log(JSON.stringify(data))
    }
}