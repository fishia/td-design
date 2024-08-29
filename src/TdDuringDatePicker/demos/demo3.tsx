import React, { useState } from 'react';
import { TdDuringDatePicker } from 'td-design';
import './index.less';

const Demo = () => {
  return (
    <div className="todayDatePickers">
      <TdDuringDatePicker
        showHitherto
        canChooseFuture
        picker='date'
        format = 'YYYY-MM-DD'
        onChange={(dates) => {
          console.log('20')
          console.log(dates);
        }}
      />
    </div>
  );
};

export default Demo;
