import React, { useState } from 'react';
import { TdTagSelect } from 'td-design';
import './index.less';

export default () => {
  const [options, setOptions] = useState([
    {
      value: 'Han1gZhou',
      label: '临床医学类',
      checked: true,
    },
    {
      value: '2',
      label: '基础医学类',
      checked: true,
    },
    {
      value: '3',
      label: '药学类',
      checked: true,
    },
  ]);
  return (
    <>
      <div className="buttonList">
        <div style={{ fontSize: 16 }}>已选({options.length})：</div>
        <TdTagSelect
          options={options}
          multiple
          labelInValue
          limit={2}
          onChange={(v) => {
            console.log(`你选择了${v}`);
            setOptions(v);
          }}
          TdTagButtonProps={{
            closable: true,
            width:140
          }}
        />
      </div>
    </>
  );
};
