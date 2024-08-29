import React, { useState } from 'react';
import { TdDuringDatePicker } from 'td-design';
import './index.less';

const Demo = () => {
  const [duringDate, setDuringDate] = useState(['2023-10-30', '2023-12-22']);
  return (
    <div className="todayDatePickers">
      <TdDuringDatePicker
        defaultValue={duringDate}
        hitherto
        showHitherto
        onChange={(dates) => {
          console.log('2');
          console.log(dates);
        }}
      />
    </div>
  );
};

export default Demo;
