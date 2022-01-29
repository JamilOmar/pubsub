import {createClient} from 'redis';
import EventEmitter = require('events');
import {injectable} from 'inversify';
import {IPublishMessage} from '../../interfaces';
const CHANNEL = 'pub-sub-demo';
@injectable()
export class BusService extends EventEmitter {
  publisher: any;
  consumer: any;
  constructor(private opt = {url: ''}) {
    super();
  }

  async bootstrap() {
    this.publisher = createClient(this.opt);
    this.consumer = this.publisher.duplicate();
    this.publisher.on('error', err => console.log('Redis Publisher Client Error', err));
    this.consumer.on('error', err => console.log('Redis Consumer Client Error', err));
    await this.publisher.connect();
    await this.consumer.connect();
    await this.consumer.subscribe(CHANNEL, message => {
      this.emit('onMessage', JSON.parse(message));
    });
  }
  async publish(message: IPublishMessage) {
    await this.publisher.publish(CHANNEL, JSON.stringify(message));
  }
}
