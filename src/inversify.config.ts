import {AsyncContainerModule} from 'inversify';
import {Repository} from 'typeorm';
import {User} from './models';
import {getRepository} from './repositories/user.repository';
import {getDbConnection} from './db';
import {busBootstrap} from './bus';
import TYPES from './common/constants/types';
import {BusService, ConsoleStrategy, TransformerService} from './services';
import {ITransformerStrategy, IWritterStrategy} from './interfaces';
import {WritterService} from './services/writter/writter.service';
import {UserStrategy} from './services/transformer/strategies';
import {WatcherService} from './services/watcher';
import {watcherBootstrap} from './file';

export const bindings = new AsyncContainerModule(async bind => {
  await getDbConnection();
  bind<Repository<User>>(TYPES.UserRepository)
    .toDynamicValue(() => {
      return getRepository();
    })
    .inRequestScope();
  bind<BusService>(TYPES.BusService).toConstantValue(await busBootstrap());
  bind<WatcherService>(TYPES.WatcherService).toConstantValue(await watcherBootstrap());
  bind<IWritterStrategy>(TYPES.WritterStrategy)
    .to(ConsoleStrategy)
    .inSingletonScope();
  bind<WritterService>(TYPES.WritterService)
    .to(WritterService)
    .inSingletonScope();
  bind<ITransformerStrategy>(TYPES.TransformerStrategy)
    .to(UserStrategy)
    .inSingletonScope();
  bind<TransformerService>(TYPES.TransformerService)
    .to(TransformerService)
    .inSingletonScope();
});
