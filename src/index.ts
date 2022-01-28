import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './common/constants/types';
import { DBClient } from './services/db';
import { UserStrategy } from './services/transformer/strategies';
import { ITransformerStrategy } from './interfaces';
import { TransformerService } from './services/transformer';
import { IWritterStrategy } from './interfaces/writter.interface';
import { ConsoleStrategy } from './services/writter/strategies/console.strategy';
import { WritterService } from './services/writter/writter.service';

const main = async ()=>{
    let container = new Container();
    container.bind<DBClient>(TYPES.DBClient).to(DBClient);
    container.bind<IWritterStrategy>(TYPES.WritterStrategy).to(ConsoleStrategy);
    container.bind<WritterService>(TYPES.WritterService).to(WritterService);
  
    container.bind<ITransformerStrategy>(TYPES.TransformerStrategy).to(UserStrategy);
    container.bind<TransformerService>(TYPES.TransformerService).to(TransformerService);
    //container.bind<UserService>(TYPES.UserService).to(UserService);
    
    
    const app = container.get<TransformerService>(TYPES.TransformerService);

   const json = require(`/Users/jamilfalconi/Documents/Development/interviews/pub-sub/input/logs/logs_0.json`);
   console.log(await app.fromSource(json))


}

main().then(()=>console.log('service started'),err=> console.error(err) )