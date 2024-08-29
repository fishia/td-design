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
  {
    name: '福利亮点2',
    options: [
      { id: 2, name: '交通补贴' },
      { id: 3, name: '住房补贴2' },
      { id: 4, name: '住房补贴3' },
      { id: 5, name: '住房补贴4' },
      { id: 6, name: '住房补贴5' },
      { id: 7, name: '住房补贴6' },
      { id: 8, name: '住房补贴7' },
      { id: 9, name: '住房补贴8' },
      { id: 13, name: '住房补贴9' },
      { id: 14, name: '住房补贴12' },
      { id: 15, name: '住房补贴13' },
      { id: 16, name: '住房补贴14' },
      { id: 17, name: '住房补贴15' },
      { id: 18, name: '住房补贴16' },
      { id: 19, name: '住房补贴17' },
      { id: 20, name: '住房补贴18' },
      { id: 21, name: '住房补贴19' },
      { id: 22, name: '住房补贴20' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState<ValueType[]>();

  const onChange = (e: ValueType[]) => {
    setValue(e);
  };

  return (
    <TdTagModal
      title="Tag"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
