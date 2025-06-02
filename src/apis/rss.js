import { parseStringPromise } from 'xml2js';

const RSS_URL =
  'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ?hl=en-IN&gl=IN&ceid=IN:en';

export async function fetchGoogleIndiaNews() {
  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const xml = await response.text();
    const result = await parseStringPromise(xml);

    const items = result.rss.channel[0].item;
    return items.map((item) => ({
      title: item.title[0],
      link: item.link[0],
      published: item.pubDate[0],
    }));
  } catch (error) {
    console.error('Error fetching or parsing RSS feed:', error);
  }
}
