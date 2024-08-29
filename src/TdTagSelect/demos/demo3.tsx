import React from 'react';
import { TdTagSelect } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="buttonList">
      <TdTagSelect
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
        title='专业'
        desc='多选，最多2个'
        onChange={(v) => {
          console.log(`你选择了${v}`);
        }}
      />
    </div>
  </>
);
