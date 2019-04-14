export interface SequenceItem {
  index: number;
  yao: string;
}

export interface MoreInfo {
  shortInfo: string;
  longInfo: Array<string>;
}

export interface Qian {
  explanation: string;
  index: number;
  indexText: string;
  qian: string;
  yao: string;
  moreInfo: MoreInfo;
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