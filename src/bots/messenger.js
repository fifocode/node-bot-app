import rest from './utils/rest.js';
import { operation } from './config.js';
import sleep from './utils/sleep.js';
import filelog from './utils/filelog.js';

async function run() {
  const { wakeUpTimeMs, workTimeMs, workWaitMs } = operation;

  const restTime = rest(wakeUpTimeMs, workTimeMs);
  if (restTime > 0) {
    filelog('BOT_MESSENGER_SLEEP');
    await sleep(restTime);
    filelog('BOT_MESSENGER_AWAKE');
  }

  filelog('BOT_MESSENGER_RESTING');
  await sleep(workWaitMs);
  filelog('BOT_MESSENGER_WORKING');
  await sleep(5000); // work for 5 sec

  run();
}

filelog('BOT_MESSENGER_RUN');
run();
