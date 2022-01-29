import {WatcherService} from './services/watcher';
export const watcherBootstrap = async watcherConfig => {
  const watcher = new WatcherService(watcherConfig);
  await watcher.bootstrap();
  return watcher;
};
