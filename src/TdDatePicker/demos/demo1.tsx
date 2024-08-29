import React, { useState } from 'react'
import { TdDatePicker } from 'td-design'
import './index.less'

const {
  TdWeekPicker,
  TdMonthPicker,
  TdQuarterPicker,
  TdYearPicker,
  TdRangePicker,
} = TdDatePicker

const Demo = () => {
  const [date, setDate] = useState('2023-11-15')
  const [duringDate, setDuringDate] = useState(['2023-10-30', '2023-11-07'])
  return (
    <div className="datePickers">
      <TdDatePicker
        value={date}
        onChange={(e, e1) => {
          setDate(e)
        }}
      />
      <TdYearPicker />
      <TdWeekPicker />
      <TdMonthPicker />
      <TdQuarterPicker />
      <TdRangePicker
        value={duringDate}
        earliestSelectableDate="2023-10-28"
        latestSelectableDate="2024-04-28"
        onChange={(e, e1) => {
          setDuringDate(e)
        }}
      />
    </div>
  )
}

export default Demo
