import {BusService} from './services';
export const busBootstrap = async () => {
  const bus = new BusService();
  await bus.bootstrap();
  return bus;
};
