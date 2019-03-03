"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildSequenceArray = () => {
    const guasWheel = [
        '乾',
        '兑',
        '离',
        '震',
        '坤',
        '艮',
        '坎',
        '巽'
    ];
    const shus = [1, 2, 3, 4, 5, 6];
    const yaos = [];
    let counter = 1;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let o = i + j >= guasWheel.length
                ? i + j - guasWheel.length
                : i + j;
            for (let k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: `${guasWheel[i]}${guasWheel[o]}${shus[k]}`
                });
                counter++;
            }
        }
        for (let j = -1; j >= -4; j--) {
            let o = i + j >= 0 ? i + j : i + j + guasWheel.length;
            for (let k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: `${guasWheel[i]}${guasWheel[o]}${shus[k]}`
                });
                counter++;
            }
        }
    }
    for (let i = 7; i >= 4; i--) {
        for (let j = 0; j < 4; j++) {
            let o = i + j >= guasWheel.length
                ? i + j - guasWheel.length
                : i + j;
            for (let k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: `${guasWheel[i]}${guasWheel[o]}${shus[k]}`
                });
                counter++;
            }
        }
        for (let j = 1; j < 5; j++) {
            let o = i - j >= 0 ? i - j : i - j + guasWheel.length;
            for (let k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: `${guasWheel[i]}${guasWheel[o]}${shus[k]}`
                });
                counter++;
            }
        }
    }
    return yaos;
};
exports.buildSequenceArray = buildSequenceArray;
//# sourceMappingURL=sequence.js.map