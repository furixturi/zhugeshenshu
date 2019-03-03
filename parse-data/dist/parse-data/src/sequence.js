"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildSequenceArray = function () {
    var guasWheel = [
        '乾',
        '兑',
        '离',
        '震',
        '坤',
        '艮',
        '坎',
        '巽'
    ];
    var shus = [1, 2, 3, 4, 5, 6];
    var yaos = [];
    var counter = 1;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var o = i + j >= guasWheel.length
                ? i + j - guasWheel.length
                : i + j;
            for (var k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: "" + guasWheel[i] + guasWheel[o] + shus[k]
                });
                counter++;
            }
        }
        for (var j = -1; j >= -4; j--) {
            var o = i + j >= 0 ? i + j : i + j + guasWheel.length;
            for (var k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: "" + guasWheel[i] + guasWheel[o] + shus[k]
                });
                counter++;
            }
        }
    }
    for (var i = 7; i >= 4; i--) {
        for (var j = 0; j < 4; j++) {
            var o = i + j >= guasWheel.length
                ? i + j - guasWheel.length
                : i + j;
            for (var k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: "" + guasWheel[i] + guasWheel[o] + shus[k]
                });
                counter++;
            }
        }
        for (var j = 1; j < 5; j++) {
            var o = i - j >= 0 ? i - j : i - j + guasWheel.length;
            for (var k = 0; k < shus.length; k++) {
                yaos.push({
                    index: counter,
                    yao: "" + guasWheel[i] + guasWheel[o] + shus[k]
                });
                counter++;
            }
        }
    }
    return yaos;
};
exports.buildSequenceArray = buildSequenceArray;
//# sourceMappingURL=sequence.js.map