import 'reflect-metadata';
import { Container } from 'inversify';
import { bindings } from './inversify.config';
import { BusService, TransformerService } from './services';
import TYPES from './common/constants/types';
import { WritterService } from './services/writter/writter.service';


const main = async ()=>{
    let container = new Container();
    await container.loadAsync(bindings);

    console.log(process.cwd())
   const data = require(`/Users/jamilfalconi/Documents/Development/interviews/pub-sub/input/logs/logs_0.json`);
   let service = container.get<BusService>(TYPES.BusService)
   let serviceTrans = container.get<TransformerService>(TYPES.TransformerService)
   //serviceTrans.start();
   //service.publish( {type:'logAdded' , data});

}

main().then(()=>console.log('service started'),err=> console.error(err) )