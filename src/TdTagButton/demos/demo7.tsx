import { Radio } from 'antd';
import React, { useState } from 'react';
import { TdTagButton } from 'td-design';
import { AlignType } from '..';
import './index.less';

export default () => {
  const [align, setAlign] = useState<AlignType>('left');
  return (
    <>
      <Radio.Group
        value={align}
        onChange={(e) => setAlign(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <Radio.Button value="left">left</Radio.Button>
        <Radio.Button value="center">center</Radio.Button>
        <Radio.Button value="right">right</Radio.Button>
      </Radio.Group>
      <br />
      <div className="buttonList">
        <TdTagButton theme="default" ghost width={180} align={align}>
          默认default
        </TdTagButton>
        <TdTagButton theme="warm" ghost width={180} align={align}>
          温暖warm
        </TdTagButton>
        <TdTagButton theme="cold" ghost width={180} align={align}>
          冷静cold
        </TdTagButton>
        <TdTagButton theme="hope" ghost width={180} align={align}>
          希望hope
        </TdTagButton>
        <TdTagButton theme="hurry" ghost width={180} align={align}>
          紧急hurry
        </TdTagButton>
        <TdTagButton theme="official" ghost width={180} align={align}>
          正式official
        </TdTagButton>
      </div>
    </>
  );
};
