"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const urlBase = 'https://zhuge.911cha.com/';
const promises = [];
for (let i = 0; i < 384; i++) {
    const url = urlBase + (i + 1) + '.html';
    promises.push(axios_1.default.get(url));
}
const getMoreInfo = () => __awaiter(this, void 0, void 0, function* () {
    const startTime = new Date().getTime();
    try {
        const moreInfoArr = [];
        const responses = yield Promise.all(promises);
        responses.map((response, idx) => {
            const { status, data } = response;
            if (status === 200) {
                const $ = cheerio.load(data, {
                    normalizeWhitespace: true
                });
                const sanitized = [];
                $('div.mcon.f14.l200 p').each((i, el) => {
                    const text = $(el)
                        .text()
                        .replace(/(https:\/\/)?(zhuge|www)\.911cha\.com(\/)?|解签：/g, '')
                        .trim();
                    sanitized.push(text);
                });
                const index = idx + 1;
                const indexText = $($('.mcon.f14.l200 > h2')[0]).text();
                const qian = sanitized[1];
                const shortInfo = sanitized[0];
                const longInfo = sanitized.slice(2);
                const moreInfo = {
                    index,
                    indexText,
                    qian,
                    shortInfo,
                    longInfo
                };
                moreInfoArr.push(moreInfo);
            }
            else {
                console.log("=== something's funny", status);
                throw new Error('response not as expected\n' +
                    JSON.stringify(response, undefined, 2));
            }
        });
        const endTime = new Date().getTime();
        console.log(`====== getMoreInfo SUCCEEDED after ${endTime -
            startTime}ms ======`);
        return moreInfoArr;
    }
    catch (err) {
        const endTime = new Date().getTime();
        console.log(`====== getMoreInfo FAILED after ${endTime -
            startTime}ms ======\n`, err);
        return [];
    }
});
exports.getMoreInfo = getMoreInfo;
//# sourceMappingURL=getMoreInfo.js.map