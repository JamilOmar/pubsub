import {inject, injectable} from 'inversify';
import {FileUtils} from '../../common';
import {Repository} from 'typeorm';
import {BusService} from '..';
import TYPES from '../../common/constants/types';
import {ITransformerStrategy} from '../../interfaces';
import {User} from '../../models';
import {WritterService} from '../writter/writter.service';
import {WatcherService} from '../watcher';

@injectable()
export class TransformerService {
  constructor(
    @inject(TYPES.Config) private readonly config: any,
    @inject(TYPES.UserRepository) private readonly userRepository: Repository<User>,
    @inject(TYPES.TransformerStrategy) private transformStrategy: ITransformerStrategy,
    @inject(TYPES.BusService) private busService: BusService,
    @inject(TYPES.WatcherService) private watcherService: WatcherService,
    @inject(TYPES.WritterService) private writterService: WritterService
  ) {}

  public async start(): Promise<void> {
    this.busService.on('onMessage', message => {
      switch (message.type) {
        case 'logAdded':
          this.load(message);
          break;
        case 'tallyCreated':
          this.save(message);
          break;
      }
    });

    this.watcherService.on('onAdded', async data => {
      const source = data.source;
      const path = data.path;
      const destination = this.config.listener.destination;
      const cwd = this.config.listener.cwd;
      const finalSourcePath = FileUtils.mergePath(cwd, source, FileUtils.getBaseName(path));
      const finalDestinationPath = FileUtils.mergePath(cwd, destination, FileUtils.getBaseName(path));
      const json = require(finalSourcePath);
      await this.busService.publish({type: 'logAdded', data: json, source: finalSourcePath, destination: finalDestinationPath});
    });
  }

  public async load(message: {data: any; source: string; destination: string}): Promise<void> {
    this.writterService.write({kind: 'log read', ...message?.data});
    const data = this.transformStrategy.getData(message?.data);
    this.writterService.write({kind: 'log transformed to tally', ...data});
    await FileUtils.moveFile(message.source, message.destination);
    this.busService.publish({type: 'tallyCreated', data});
  }

  public async save(message: {data: any}): Promise<void> {
    const tallyEmails = message?.data?.tally || [];
    for (let i = 0; i < tallyEmails.length; i++) {
      const current = tallyEmails[i];
      let user = await this.userRepository.findOne({
        where: {
          email: {$eq: current.email}
        }
      });
      if (user) {
        user.total += current.total;
      } else {
        user = new User();
        user.email = current.email;
        user.total = current.total;
      }
      await this.userRepository.save(user);
    }
    const globalTally = await this.userRepository.find();
    this.writterService.write({kind: 'global tally', globalTally});
  }
}
