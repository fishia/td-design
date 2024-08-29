import React from 'react';
import { TdTagSelect } from 'td-design';
import './index.less';

export default () => (
  <>
    <div className="buttonList">
      <TdTagSelect
        options={[
          {
            value: '1',
            label: '1-3k',
          },
          {
            value: '2',
            label: '4-7k',
          },
          {
            value: '3',
            label: '8-12k',
          },
          {
            value: '4',
            label: '13k-18k',
          },
          {
            value: '5',
            label: '18k-30k',
          },
          {
            value: '6',
            label: '30k-50k',
          },
        ]}
        value={{
          value: '1',
          label: '4-7k',
        }}
        continuous
        labelInValue
        title="薪资"
        desc="连续模式"
        onChange={(v) => {
          console.log(`你选择了${JSON.stringify(v)}`);
        }}
      />
    </div>
  </>
);
