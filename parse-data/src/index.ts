import * as cheerio from 'cheerio';
import * as fs from 'fs';

interface Qian {
  indexText: string;
  index: number;
  qian?: string;
  explanation?: string;
}

const html:string = fs.readFileSync(__dirname + 
  '/../data.html', 'utf8');

const $: CheerioStatic = cheerio.load(html);

let started = false;
let counter = 0;
let qian: Qian;
const qians: Array<Qian> = [];

$('.al_txt p').each((i, elm) => {
  const text = $(elm).text();

  if(text === '秘本诸葛神数384签签文') {
    started = true;
    return true;
  }

  if(started) {
    if(text.indexOf('第') === 0) {
      counter++;
      qian = {
        indexText: text,
        index: counter
      };
      qians.push(qian);
    } else if(text.indexOf('签诗') === 0) {
      qian.qian = text;
    } else if(text.indexOf('解签') === 0) {
      qian.explanation = text;
    } else {
      qian.explanation += text;
    }
  }
  
});
fs.writeFileSync('./data.js', 'const qians = ' + 
  JSON.stringify(qians, null, 2) + ';');