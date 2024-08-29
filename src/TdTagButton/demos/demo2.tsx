import { Radio } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react';
import { TdTagButton } from 'td-design';
import './index.less';

export default () => {
  const [size, setSize] = useState<SizeType>('middle');
  return (
    <>
      <Radio.Group
        value={size}
        onChange={(e) => setSize(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <div className="buttonList">
        <TdTagButton theme="default" ghost size={size}>
          默认default
        </TdTagButton>
        <TdTagButton theme="warm" ghost size={size}>
          温暖warm
        </TdTagButton>
        <TdTagButton theme="cold" ghost size={size}>
          冷静cold
        </TdTagButton>
        <TdTagButton theme="hope" ghost size={size}>
          希望hope
        </TdTagButton>
        <TdTagButton theme="hurry" ghost size={size}>
          紧急hurry
        </TdTagButton>
        <TdTagButton theme="official" ghost size={size}>
          正式official
        </TdTagButton>
      </div>
    </>
  );
};
