"use strict";
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
const bookData = bookData_1.parseBookData();
const sequence = sequence_1.buildSequenceArray();
let qianRaw;
let sequenceItem;
const qians = [];
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
    qians.push(newQian);
    qianMap[yao] = newQian;
}
fs.writeFileSync(__dirname + '/../../src/data/data.ts', `import { Qian, QianMap } from '../../models';
  \nconst qians: Array<Qian> = ${JSON.stringify(qians, null, 2)};
  \nconst qianMap: QianMap = ${JSON.stringify(qianMap, null, 2)};
  \nexport { qians, qianMap };`);
//# sourceMappingURL=index.js.map