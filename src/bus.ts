import {BusService} from './services';
export const busBootstrap = async busConfig => {
  const bus = new BusService(busConfig);
  await bus.bootstrap();
  return bus;
};
