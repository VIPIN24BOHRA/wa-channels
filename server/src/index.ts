import * as dotenv from 'dotenv';

import { createChannelCron } from './modules/service/channelCron';
import { Bot } from './modules/whatsapp/bot';
import { delay } from './utils/helper';

dotenv.config({ path: '.env.local' });

const main = async () => {
  const bot = new Bot();
  console.log('initializing bot');
  await bot.init();
  console.log('bot up and running');
  await delay(5000);

  createChannelCron(bot);
};

(async () => {
  await main();
})();
