import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './common/constants/types';
import { DBClient } from './services/db';

const main = async ()=>{
    let container = new Container();
    container.bind<DBClient>(TYPES.DBClient).to(DBClient);
    //container.bind<UserService>(TYPES.UserService).to(UserService);
    
    

}

main().then(()=>console.log('service started'),err=> console.error(err) )