"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = __importStar(require("cheerio"));
var fs = __importStar(require("fs"));
var html = fs.readFileSync(__dirname +
    '/../data.html', 'utf8');
var $ = cheerio.load(html);
var started = false;
var counter = 0;
var qian;
var qians = [];
$('.al_txt p').each(function (i, elm) {
    var text = $(elm).text();
    if (text === '秘本诸葛神数384签签文') {
        started = true;
        return true;
    }
    if (started) {
        if (text.indexOf('第') === 0) {
            counter++;
            qian = {
                indexText: text,
                index: counter
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
fs.writeFileSync('./data.js', 'const qians = ' +
    JSON.stringify(qians, null, 2) + ';');
//# sourceMappingURL=index.js.map