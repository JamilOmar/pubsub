import 'reflect-metadata';
import { Container } from 'inversify';
import { bindings } from './inversify.config';
import { TransformerService } from './services';
import TYPES from './common/constants/types';
const main = async ()=>{
    let container = new Container();
    await container.loadAsync(bindings);
   let service = container.get<TransformerService>(TYPES.TransformerService)
   service.start();
}

main().then(()=>console.log('service started'),err=> console.error(err) )