import { Yao } from '../models'

const guasWheel = ['乾', '兑', '离', '震', '坤', '艮', '坎', '巽'];
const shus = [1, 2, 3, 4, 5, 6];
const yaos: Array<Yao> = [];

let counter = 1;

for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++){
        let o = (i + j) >= guasWheel.length ? i + j - guasWheel.length : i + j;
        for(let k = 0; k < shus.length; k++) {
            yaos.push({
                index: counter,
                yao: `${guasWheel[i]}${guasWheel[o]}${shus[k]}`
            });
            counter++;
        }
    }
    for(let l = 1; l < 5; l++){
        let n = (i-l) >= 0? i-l : i-l+guasWheel.length;
        for(let m = 0; m < shus.length; m++) {
            yaos.push({
                index: counter,
                yao: `${guasWheel[i]}${guasWheel[n]}${shus[m]}`
            });
            counter++;
        }
    }    
}

for(let i = 7; i >= 4; i--) {
    for(let j = 0; j < 4; j++){
        let o = (i + j) >= guasWheel.length ? i + j - guasWheel.length : i + j;
        for(let k = 0; k < shus.length; k++) {
            yaos.push({
                index: counter,
                yao: `${guasWheel[i]}${guasWheel[o]}${shus[k]}`
            });
            counter++;
        }
    }
    for(let l = 1; l < 5; l++){
        let n = (i-l) >= 0? i-l : i-l+guasWheel.length;
        for(let m = 0; m < shus.length; m++) {
            yaos.push({
                index: counter,
                yao: `${guasWheel[i]}${guasWheel[n]}${shus[m]}`
            });
            counter++;
        }
    }    
}

console.log(yaos)
export { yaos };