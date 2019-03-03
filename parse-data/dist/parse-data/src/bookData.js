"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const fs = __importStar(require("fs"));
const parseBookData = () => {
    const html = fs.readFileSync(__dirname + '/../data.html', 'utf8');
    const $ = cheerio.load(html);
    let started = false;
    let counter = 0;
    let qian;
    const qians = [];
    $('.al_txt p').each((i, elm) => {
        const text = $(elm).text();
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
            }
            else if (text.indexOf('签诗') === 0) {
                qian.qian = text;
            }
            else if (text.indexOf('解签') === 0) {
                qian.explanation = text;
            }
            else {
                qian.explanation += text;
            }
        }
    });
    return qians;
};
exports.parseBookData = parseBookData;
//# sourceMappingURL=bookData.js.map