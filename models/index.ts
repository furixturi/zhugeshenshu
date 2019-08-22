export interface SequenceItem {
  index: number;
  yao: string;
}

export interface MoreInfo {
  index: number;
  indexText: string;
  qian: string;
  shortInfo: string;
  longInfo: Array<string>;
}

export interface Qian {
  explanation: string; // 吉祥，对儿女婚嫁、男女友谊、家室人丁等，更为称庆。
  index: number; // 250
  indexText: string; // 第二五○签
  qian: string; // 女儿大，喜临门，嫁良人，添子孙，同拜受，感皇恩。
  yao: string; // 坎巽4
  moreInfo?: MoreInfo;
}

export interface QianRaw {
  indexText: string; // 第二五○签
  index: number; // 250
  qian?: string;
  explanation?: string;
}

export interface QianMap {
  [x: string]: Qian
}