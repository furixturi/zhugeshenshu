"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const bookData_1 = require("./bookData");
const sequence_1 = require("./sequence");
const getMoreInfo_1 = require("./getMoreInfo");
function refreshDataSet() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('> Start refreshing dataset');
        const startTime = new Date().getTime();
        try {
            const qianMap = parseStaticData();
            const moreInfoArr = yield getMoreInfo_1.getMoreInfo();
            for (let yao in qianMap) {
                const qian = qianMap[yao];
                qianMap[yao] = Object.assign({}, qian, { moreInfo: moreInfoArr[qian.index - 1] });
            }
            fs.writeFileSync(__dirname + '/../../src/data/data.ts', `import { Qian, QianMap } from '../../models';
    \nconst qianMap: QianMap = ${JSON.stringify(qianMap, null, 2)};
    \nexport { qianMap };`);
            const endTime = new Date().getTime();
            console.log(`> Dataset successfully refreshed after ${endTime -
                startTime}ms`);
        }
        catch (err) {
            console.log('> !!! Refreshing dataset failed!\n', err);
        }
    });
}
function parseStaticData() {
    const bookData = bookData_1.parseBookData();
    const sequence = sequence_1.buildSequenceArray();
    let qianRaw;
    let sequenceItem;
    const qianMap = {};
    for (let i = 0; i < bookData.length; i++) {
        qianRaw = bookData[i];
        sequenceItem = sequence[i];
        const { index: sequenceItemIndex, yao } = sequenceItem;
        const { index: qianRawIndex, indexText, qian = '', explanation = '' } = qianRaw;
        if (qianRawIndex !== sequenceItemIndex) {
            throw new Error(`qianRaw index does not equal sequenceItem index!\n qianRaw: "${qianRawIndex}: ${qianRaw.indexText} ${qianRaw.qian}";\n sequenceItem: "${sequenceItemIndex}: ${sequenceItem.yao}`);
        }
        const newQian = {
            explanation,
            index: qianRawIndex,
            indexText,
            qian,
            yao
        };
        qianMap[yao] = newQian;
    }
    return qianMap;
}
refreshDataSet();
//# sourceMappingURL=index.js.map