import * as cheerio from 'cheerio';
import * as fs from 'fs';

import { QianRaw } from '../../models';

const parseBookData = () : Array<QianRaw> => {
  const html: string = fs.readFileSync(
    __dirname + '/../data.html',
    'utf8'
  );

  const $: CheerioStatic = cheerio.load(html);

  let started = false;
  let counter = 0;
  let qian: QianRaw;
  const qians: Array<QianRaw> = [];

  $('.al_txt p').each((i, elm) => {
    const text = $(elm).text().trim().replace(/\s\s+/g, ' ');

    if (text === '秘本诸葛神数384签签文') {
      started = true;
      return true;
    }

    if (started) {
      if (text.indexOf('第') === 0) {
        counter++;
        qian = {
          index: counter,
          indexText: text
        };
        qians.push(qian);
      } else if (text.indexOf('签诗') === 0) {
        qian.qian = text.slice(3);
      } else if (text.indexOf('解签') === 0) {
        qian.explanation = text.slice(3);
      } else {
        let prev = $(elm).prev();
        if(prev.text().indexOf('签诗') === 0) {
          qian.qian += text;
        }
        if(prev.text().indexOf('解签') === 0) {
          qian.explanation += text;
        }
      }
    }
  });

  return qians;
};

export { parseBookData };
