import 'reflect-metadata';
import {Container} from 'inversify';
import {bindings} from './inversify.config';
import {TransformerService} from './services';
import TYPES from './common/constants/types';
const main = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  const service = container.get<TransformerService>(TYPES.TransformerService);
  service.start();
};

main().then(
  () => console.log('service started'),
  err => console.error(err)
);
