import axios from 'axios';
import * as cheerio from 'cheerio';

import { MoreInfo } from '../../models'

const urlBase = 'https://zhuge.911cha.com/';
const promises: Array<Promise<any>> = [];
for(let i = 0; i < 3; i++) {
  const url = urlBase + (i+1) + '.html';
  promises.push(axios.get(url));
}

const moreInfo: Array<MoreInfo> = [];

const getMoreInfo = async (moreInfoArr: Array<MoreInfo>) => {
  try {
    const responses = await Promise.all(promises);
    responses.map(response => {
      const { status, data } = response;
      if(status === 200) {
        const $: CheerioStatic = cheerio.load(data, {
          normalizeWhitespace: true
        });

        const sanitized:Array<string> = [];
        $('div.mcon.f14.l200 p').each((i, el) => {
          const text = $(el).text().replace(/(https:\/\/)?(zhuge|www)\.911cha\.com(\/)?|解签：/g, '').trim();
          sanitized.push(text);
        });

        const shortInfo = sanitized[0];
        const longInfo: Array<string> = sanitized.slice(2);
        const moreInfo: MoreInfo = { shortInfo, longInfo };
        moreInfoArr.push(moreInfo);

        console.log(moreInfoArr)
      } else {
        console.log('=== something\'s funny', status)
      }
    })
  } catch (err) {
    console.log('ERROR!', err)
  }
}

getMoreInfo(moreInfo);