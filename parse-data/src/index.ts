import * as fs from 'fs';

import { parseBookData } from './bookData';
import { buildSequenceArray } from './sequence';
import {
  Qian,
  QianMap,
  QianRaw,
  SequenceItem
} from '../../models';

const bookData: Array<QianRaw> = parseBookData();
const sequence: Array<SequenceItem> = buildSequenceArray();

let qianRaw: QianRaw;
let sequenceItem: SequenceItem;
const qians: Array<Qian> = [];
const qianMap: QianMap = {};

for (let i = 0; i < bookData.length; i++) {
  qianRaw = bookData[i];
  sequenceItem = sequence[i];
  const { index: sequenceItemIndex, yao } = sequenceItem;
  const {
    index: qianRawIndex,
    indexText,
    qian = '',
    explanation = ''
  } = qianRaw;

  if (qianRawIndex !== sequenceItemIndex) {
    throw new Error(
      `qianRaw index does not equal sequenceItem index!\n qianRaw: "${qianRawIndex}: ${
        qianRaw.indexText
      } ${
        qianRaw.qian
      }";\n sequenceItem: "${sequenceItemIndex}: ${
        sequenceItem.yao
      }`
    );
  }

  const newQian: Qian = {
    explanation,
    index: qianRawIndex,
    indexText,
    qian,
    yao
  };

  qians.push(newQian);
  qianMap[yao] = newQian;
}

fs.writeFileSync(
  __dirname + '/../../src/data/data.ts',
  `import { Qian, QianMap } from '../../models';
  \nconst qians: Array<Qian> = ${JSON.stringify(
    qians,
    null,
    2
  )};
  \nconst qianMap: QianMap = ${JSON.stringify(
    qianMap, null, 2
  )};
  \nexport { qians, qianMap };`
);
