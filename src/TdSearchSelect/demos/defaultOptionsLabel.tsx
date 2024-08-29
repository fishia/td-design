import React, { useState } from 'react';
import { TdSearchSelect } from 'td-design';

const list = [
  {
    value: -1,
    label: '全部学历',
  },
  {
    value: 1,
    label: '应届生',
  },
  {
    value: 2,
    label: '1年以内',
  },
  {
    value: 3,
    label: '1-3年',
  },
];

export default () => {
  const [value, setValue] = useState<(string | number)[]>();

  const onChange = (e: (string | number)[]) => {
    setValue(e);
  };

  return (
    <TdSearchSelect
      value={value}
      onChange={onChange}
      options={list}
      insetLabel="学历要求"
      defaultOptionsLabel="全部学历"
      defaultVal={[-1]}
    />
  );
};
