interface SequenceItem {
  index: number;
  yao: string;
}

interface Qian {
  explanation: string;
  index: number;
  indexText: string;
  qian: string;
  yao: string;
}

interface QianRaw {
  indexText: string;
  index: number;
  qian?: string;
  explanation?: string;
}

export { SequenceItem , Qian, QianRaw }