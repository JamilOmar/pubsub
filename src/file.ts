import { WatcherService } from './services/watcher';
export const watcherBootstrap = async ()=>{
    const watcher = new WatcherService();
    await watcher.bootstrap();
    return watcher;
}
