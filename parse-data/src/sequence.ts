import { SequenceItem } from '../../models';

const buildSequenceArray = () : Array<SequenceItem> => {
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
  const yaos: Array<SequenceItem> = [];

  let counter = 1;

  /**
   * The wheel pair is starting at the current gua, counting forwards 4 guas,
   * then counting bakcwards 4 guas from the gua behind the current gua,
   * rotating back to go through the beginning if the counting goes
   * further than all the guas.
   * E.g.:
   * If current gua is 兑, the corresponding yao wheel will be:
   * 兑兑, 兑离, 兑震, 兑坤
   * 兑乾, 兑巽, 兑坎, 兑艮
   */
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let o =
        i + j >= guasWheel.length
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
      let o =
        i + j >= guasWheel.length
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

export { buildSequenceArray };
