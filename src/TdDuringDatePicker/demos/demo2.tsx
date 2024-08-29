import React, { useState } from 'react';
import { TdDuringDatePicker } from 'td-design';
import './index.less';

const Demo = () => {
  const [duringDate, setDuringDate] = useState(['2023-10-30', '2023-11-07']);
  return (
    <div className="todayDatePickers">
      <TdDuringDatePicker
        showHitherto
        noMinors
        defaultValue={duringDate}
        picker='date'
        format = 'YYYY-MM-DD'
        onChange={(dates) => {
          console.log('2')
          console.log(dates);
        }}
      />
    </div>
  );
};

export default Demo;
