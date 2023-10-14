// const { PuppeteerConfig } = require("../puppetter/puppetter");
import type { QueuedChannel } from '../firebase/firebase.types';
import { PuppeteerConfig } from '../puppetterService/puppetterService';

export class Bot {
  puppeter: any;

  async init() {
    this.puppeter = new PuppeteerConfig();

    await this.puppeter.init();
  }

  sendMessage(channelName: string, message: string) {
    return this.puppeter.sendMessage(channelName, message);
  }

  createChannel(channelDetails: QueuedChannel) {
    return this.puppeter.createChannel(channelDetails);
  }
}
