import { parse } from 'node-html-parser';
import * as fs from 'fs';

console.log('=== Parse html ===');

const html = fs.readFileSync(__dirname + '/../data.htm', 'utf8');
console.log(html)