export interface Qian {
  indexText: string;
  index: number;
  qian: string;
  explanation: string;
}

export const qianDefault: Qian = {
  indexText: '',
  index: 0,
  qian: '',
  explanation: ''
}

export interface Yao {
  index: number;
  yao: string;
}

export const yaoDefault: Yao = {
  index: 0,
  yao: ''
}