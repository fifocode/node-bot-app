import rest from '../utils/rest.js';
import { operation } from '../config.js';
import sleep from '../utils/sleep.js';
import filelog from '../utils/filelog.js';
import { fetchGoogleIndiaNews } from '../apis/rss.js';

async function run() {
  const { wakeUpTimeMs, workTimeMs, workWaitMs } = operation;

  const restTime = rest(wakeUpTimeMs, workTimeMs);
  if (restTime > 0) {
    filelog('BOT_NEWS_SLEEP');
    await sleep(restTime);
    filelog('BOT_NEWS_AWAKE');
  }

  filelog('BOT_NEWS_RESTING');
  await sleep(workWaitMs);
  filelog('BOT_NEWS_WORKING');

  const data = await fetchGoogleIndiaNews();
  console.log(data);

  await sleep(60000); // work for 60 sec
  run();
}

filelog('BOT_NEWS_RUN');
run();
