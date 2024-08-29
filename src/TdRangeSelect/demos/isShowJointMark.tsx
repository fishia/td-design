import React, { useState } from 'react';
import { TdRangeSelect } from 'td-design';

const fromOption = Array.from(Array(101), (v, k) => k);
const toOption = fromOption;

type selectValueType = number | undefined;

export default () => {
  const [value, setValue] = useState<selectValueType[]>();

  const onChange = (e: selectValueType[]) => {
    console.log(e);
    setValue(e);
  };

  return (
    <div style={{width: 496}}>
      <TdRangeSelect
        value={value}
        isShowSelectJointMark
        fromOption={fromOption}
        toOption={toOption}
        onChange={onChange}
        selectWidth={230}
      />
    </div>
  );
};
