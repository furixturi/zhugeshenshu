export interface SequenceItem {
  index: number;
  yao: string;
}

export interface Qian {
  explanation: string;
  index: number;
  indexText: string;
  qian: string;
  yao: string;
}

export interface QianRaw {
  indexText: string;
  index: number;
  qian?: string;
  explanation?: string;
}

export interface QianMap {
  [x: string]: Qian
}