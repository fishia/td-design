import React from 'react';
import { TdTagSelect } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="buttonList">
      <TdTagSelect
        options={[
          {
            value: 'HangZhou',
            label: 'HangZhou #310000',
          },
          {
            value: 'NingBo',
            label: 'NingBo #315000',
          },
          {
            value: 'WenZhou',
            label: 'WenZhou #325000',
          },
        ]}
        multiple
        onChange={(v) => {
          console.log(`你选择了${v}`);
        }}
      />
    </div>
  </>
);
