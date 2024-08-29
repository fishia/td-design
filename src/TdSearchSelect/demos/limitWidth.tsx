import React, { useState } from 'react';
import { TdSearchSelect } from 'td-design';

const list = [
  {
    value: 0,
    label: '不限',
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
  {
    value: 4,
    label: '3-5年',
  },
  {
    value: 5,
    label: '5-10年',
  },
  {
    value: 6,
    label: '10年以上',
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
      style={{ maxWidth: 180, minWidth: 95 }}
      options={list}
      insetLabel="学历要求"
    />
  );
};
