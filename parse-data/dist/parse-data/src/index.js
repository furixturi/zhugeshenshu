"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var bookData_1 = require("./bookData");
var sequence_1 = require("./sequence");
var bookData = bookData_1.parseBookData();
var sequence = sequence_1.buildSequenceArray();
var qianRaw;
var sequenceItem;
var qian;
var qians = [];
for (var i = 0; i < bookData.length; i++) {
    qianRaw = bookData[i];
    sequenceItem = sequence[i];
    var sequenceItemIndex = sequenceItem.index, yao = sequenceItem.yao;
    var qianRawIndex = qianRaw.index, indexText = qianRaw.indexText, _a = qianRaw.qian, qian_1 = _a === void 0 ? '' : _a, _b = qianRaw.explanation, explanation = _b === void 0 ? '' : _b;
    if (qianRawIndex !== sequenceItemIndex) {
        throw new Error("qianRaw index does not equal sequenceItem index!\n qianRaw: \"" + qianRawIndex + ": " + qianRaw.indexText + " " + qianRaw.qian + "\";\n sequenceItem: \"" + sequenceItemIndex + ": " + sequenceItem.yao);
    }
    var newQian = {
        explanation: explanation,
        index: qianRawIndex,
        indexText: indexText,
        qian: qian_1,
        yao: yao
    };
    qians.push(newQian);
}
fs.writeFileSync(__dirname + '/../../../src/data/data.ts', 'const qians = ' + JSON.stringify(qians, null, 2) + ';');
//# sourceMappingURL=index.js.map