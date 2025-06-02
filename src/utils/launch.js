import { isMainThread, Worker } from 'node:worker_threads';
import filelog from './filelog.js';

export default function launch(botname) {
  if (!isMainThread) throw new Error('only main thread can start a bot');

  const bot = new Worker(`./src/bots/${botname}`, {});
  bot.on('error', (error) => filelog(botname, 'error', error) && console.error(error));
}
