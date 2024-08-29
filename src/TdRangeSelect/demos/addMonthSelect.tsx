import React, { useState } from 'react';
import { TdRangeSelect } from 'td-design';

const fromOption = Array.from(Array(101), (v, k) => k);
const toOption = fromOption;
const monthOption = Array.from(Array(31), (v, k) => k).slice(12);

type selectValueType = number | undefined;

export default () => {
  const [value, setValue] = useState<selectValueType[]>([]);

  const onChange = (e: selectValueType[]) => {
    console.log(e);
    setValue(e);
  };

  return (
    <div style={{ width: 760 }}>
      <TdRangeSelect
        value={value}
        selectWidth={230}
        fromOption={fromOption}
        toOption={toOption}
        isMonthSelect
        monthOption={monthOption}
        onChange={onChange}
      />
    </div>
  );
};
