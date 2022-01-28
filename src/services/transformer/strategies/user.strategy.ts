import { injectable } from "inversify";
import { ITransformerStrategy } from "../../../interfaces";

@injectable()
export class UserStrategy implements ITransformerStrategy{
    private getId(json:any){
        return json?.id;
    }
    public getData(json){

        let tally = [];
        const emailsMetadata = this.getMetadata(json);
        for(let email in emailsMetadata){
            const total = emailsMetadata[email];
            tally.push({total ,email })

        }

        return { id: this.getId(json),
        tally}

    }

    private getMetadata(json){
        
        const emails = {};
        const fields = json?.logs;

        if(!fields){
            return emails;
        }
        for(let i = 0 ; i< fields.length ; i++){
            const current = fields[i];
            const email = current?.email;
            if(!(email in emails)){
                emails[email] = 0;
            }
            emails[email] +=1;
        }

        return emails;


    }


}