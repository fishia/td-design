import { Radio } from 'antd';
import React, { useState } from 'react';
import { TdTagSelect } from 'td-design';
import './index.less';

export default () => {
  const [justify, setJustify] = useState('flex-start');
  return (
    <>
      <Radio.Group
        value={justify}
        onChange={(e) => setJustify(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <Radio.Button value="flex-start">flex-start</Radio.Button>
        <Radio.Button value="center">center</Radio.Button>
        <Radio.Button value="flex-end">flex-end</Radio.Button>
        <Radio.Button value="space-between">space-between</Radio.Button>
        <Radio.Button value="space-around">space-around</Radio.Button>
        <Radio.Button value="space-evenly">space-evenly</Radio.Button>
      </Radio.Group>
      <div className="selectsList">
        <TdTagSelect
          justify={justify}
          options={[
            {
              value: 'Han1gZhou',
              label: '临床医学类',
            },
            {
              value: '2',
              label: '基础医学类',
            },
            {
              value: '3',
              label: '药学类',
            },
            {
              value: '4',
              label: '中药学类',
            },
            {
              value: '5',
              label: '护理类',
            },
            {
              value: '6',
              label: '药品制造类',
            },
          ]}
          multiple
          limit={2}
          title="专业"
          desc="横向布局"
          onChange={(v) => {
            console.log(`你选择了${v}`);
          }}
        />
      </div>
      <div className="buttonList">
        <TdTagSelect
          direction="column"
          options={[
            {
              value: 'Han1gZhou',
              label: '临床医学类',
            },
            {
              value: '2',
              label: '基础医学类',
            },
            {
              value: '3',
              label: '药学类',
            },
          ]}
          multiple
          limit={2}
          title="专业"
          desc="纵向布局"
          onChange={(v) => {
            console.log(`你选择了${v}`);
          }}
        />
      </div>
    </>
  );
};
