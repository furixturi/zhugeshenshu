import axios from 'axios';
import * as cheerio from 'cheerio';

import { MoreInfo } from '../../models';

const urlBase = 'https://zhuge.911cha.com/';
const promises: Array<Promise<any>> = [];
for (let i = 0; i < 384; i++) {
  const url = urlBase + (i + 1) + '.html';
  promises.push(axios.get(url));
}

const getMoreInfo = async (): Promise<Array<MoreInfo>> => {
  const startTime = new Date().getTime();
  console.log('>> Start getMoreInfo asynchronously');
  try {
    const moreInfoArr: Array<MoreInfo> = [];
    const responses = await Promise.all(promises);
    responses.map((response, idx) => {
      const { status, data } = response;
      if (status === 200) {
        const $: CheerioStatic = cheerio.load(data, {
          normalizeWhitespace: true
        });

        const sanitized: Array<string> = [];
        $('div.mcon.f14.l200 p').each((i, el) => {
          const text = $(el)
            .text()
            .replace(
              /(https:\/\/)?(zhuge|www)\.911cha\.com(\/)?|解签：/g,
              ''
            )
            .trim();
          sanitized.push(text);
        });

        const index = idx + 1;
        const indexText = $(
          $('.mcon.f14.l200 > h2')[0]
        ).text();
        const qian = sanitized[1];
        const shortInfo = sanitized[0];
        const longInfo: Array<string> = sanitized.slice(2);
        const moreInfo: MoreInfo = {
          index,
          indexText,
          qian,
          shortInfo,
          longInfo
        };
        moreInfoArr.push(moreInfo);
      } else {
        throw new Error(
          'response not as expected\n' +
            JSON.stringify(response, undefined, 2)
        );
      }
    });
    const endTime = new Date().getTime();
    console.log(
      `>> Finished getMoreInfo successfully after ${endTime -
        startTime}ms`
    );
    return moreInfoArr;
  } catch (err) {
    const endTime = new Date().getTime();
    console.log(
      `>> Failed getMoreInfo after ${endTime -
        startTime}ms\n`,
      err
    );
    return [];
  }
};

export { getMoreInfo };
