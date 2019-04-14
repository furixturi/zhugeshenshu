import * as fs from 'fs';

import { parseBookData } from './bookData';
import { buildSequenceArray } from './sequence';
import { getMoreInfo } from './getMoreInfo';

import {
  MoreInfo,
  Qian,
  QianMap,
  QianRaw,
  SequenceItem
} from '../../models';

async function refreshDataSet() {
  console.log('> Start refreshing dataset');
  const startTime = new Date().getTime();
  try {
    const qianMap = parseStaticData();
    const moreInfoArr: Array<
      MoreInfo
    > = await getMoreInfo();

    for (let yao in qianMap) {
      const qian: Qian = qianMap[yao];
      qianMap[yao] = {
        ...qian,
        moreInfo: moreInfoArr[qian.index - 1]
      };
    }
    fs.writeFileSync(
      __dirname + '/../../src/data/data.ts',
      `import { Qian, QianMap } from '../../models';
    \nconst qianMap: QianMap = ${JSON.stringify(
      qianMap,
      null,
      2
    )};
    \nexport { qianMap };`
    );
    const endTime = new Date().getTime();
    console.log(
      `> Dataset successfully refreshed after ${endTime -
        startTime}ms`
    );
  } catch (err) {
    console.log('> !!! Refreshing dataset failed!\n', err);
  }
}

function parseStaticData(): QianMap {
  const bookData: Array<QianRaw> = parseBookData();
  const sequence: Array<
    SequenceItem
  > = buildSequenceArray();

  let qianRaw: QianRaw;
  let sequenceItem: SequenceItem;
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

    qianMap[yao] = newQian;
  }
  return qianMap;
}

refreshDataSet();
