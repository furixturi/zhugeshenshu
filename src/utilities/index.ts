import { qianMap } from '../data/data';
import { Qian } from '../../models';

const pullGua = (): string => {
  const guas = [
    '乾',
    '兑',
    '离',
    '震',
    '巽',
    '坎',
    '艮',
    '坤'
  ];
  return guas[Math.floor(Math.random() * guas.length)];
};

const pullShu = (): string => {
  return (Math.floor(Math.random() * 6) + 1).toString();
};

const getResult = (yao: string): Qian => {
  const qian: Qian = qianMap[yao];
  if (typeof qian === 'undefined') {
    throw new Error(
      `getResult > No Qian found for Yao: ${yao}`
    );
  }
  return qian;
};

const getGua1 = (yao: string): string => yao[0];
const getGua2 = (yao: string): string => yao[1];
const getShu = (yao: string): string => yao[2];

export { pullGua, pullShu, getResult, getGua1, getGua2, getShu };
