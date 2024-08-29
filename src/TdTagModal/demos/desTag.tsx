import React, { useState } from 'react';
import { TdTagModal } from 'td-design';

interface ValueType {
  name: string;
  id: number;
}

const options = [
  {
    name: '福利亮点',
    options: [
      { id: 12, name: '交通补贴' },
      { id: 13, name: '住房补贴' },
    ],
  },
];

const describtion = '这是一段描述';

export default () => {
  const [value, setValue] = useState<ValueType[]>();

  const onChange = (e: ValueType[]) => {
    setValue(e);
  };

  return (
    <TdTagModal
      title="Tag"
      describtion={describtion}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
