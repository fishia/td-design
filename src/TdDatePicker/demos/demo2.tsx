import React from 'react';
import { TdDatePicker } from 'td-design';
import './index.less'

const { TdMonthPicker,TdRangePicker } = TdDatePicker;

const Demo = () => {
  return (
    <div className='datePickers'>
      <TdDatePicker
        earliestSelectableDate="2024-02-28"
        latestSelectableDate="2024-04-28"
        onChange={(e, e1) => {
          console.log(e, e1);
        }}
      />
      <TdDatePicker
        earliestSelectableDate="2024-02-28"
        onChange={(e, e1) => {
          console.log(e, e1);
        }}
      />
      <TdMonthPicker
        earliestSelectableDate="2024-02"
        latestSelectableDate="2024-04"
        onChange={(e, e1) => {
          console.log(e, e1);
        }}
      />
      <TdRangePicker
        earliestSelectableDate="2023-10-28"
        latestSelectableDate="2024-04-28"
        onChange={(e, e1) => {
          console.log(e, e1);
        }}
      />
    </div>
  );
};

export default Demo;
