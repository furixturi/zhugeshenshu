import { qians } from '../data/book';
import { yaos } from '../data/yaos';
import {
  Qian,
  qianDefault,
  Yao,
  yaoDefault
} from '../models';

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

const getQianIndex = (gua: string): number => {
  const yao = yaos.find(yao => yao.yao === gua);
  if(typeof yao === 'undefined') {
    throw new Error(`getQianIndex > yao for gua: ${gua} is not found`);
  }
  return yao.index;
};

const getResult = (gua: string): Qian => {
  const qianIndex = getQianIndex(gua);
  const qian = qians.find(
    qian => qian.index === qianIndex
  );
  if(typeof qian === 'undefined') {
    throw new Error(`getResult > qian not found for gua: ${gua}`)
  }
  return qian;
};

export { pullGua, getResult };
