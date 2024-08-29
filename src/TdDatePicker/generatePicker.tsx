import { DatePickerProps } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import { T } from 'ramda'
import React from 'react'
import { TdDatePickerProps } from '.'

export interface GenerateConfigConfig {
  componentName: string
  placeholder: string
  picker?: 'date' | 'month' | 'year' | 'week' | 'quarter'
}
const generatePicker = (
  Component: React.ComponentType<DatePickerProps> | any,
  { componentName, placeholder, picker }: GenerateConfigConfig,
) => {
  return class Hoc extends React.Component<TdDatePickerProps> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: TdDatePickerProps) {
      super(props)
    }

    validiteEarliestSelectableDate = (current: dayjs.Dayjs) => {
      // eslint-disable-next-line no-invalid-this
      const { earliestSelectableDate } = this.props
      return {
        TdDatePicker:
          current <
          dayjs(earliestSelectableDate).subtract(1, 'day').endOf('day'),
        TdWeekPicker: current < dayjs(earliestSelectableDate).startOf('week'),
        TdMonthPicker: current < dayjs(earliestSelectableDate),
        TdRangePicker:
          current <
          dayjs(earliestSelectableDate).subtract(1, 'day').endOf('day'),
      }[componentName]
    }

    validiteLatestSelectableDate = (current: dayjs.Dayjs) => {
      // eslint-disable-next-line no-invalid-this
      const { latestSelectableDate } = this.props
      return {
        TdDatePicker:
          current >= dayjs(latestSelectableDate).add(1, 'day').startOf('day'),
        TdWeekPicker: current > dayjs(latestSelectableDate).endOf('week'),
        TdMonthPicker: current > dayjs(latestSelectableDate).endOf('month'),
        TdRangePicker:
          current >= dayjs(latestSelectableDate).add(1, 'day').startOf('day'),
      }[componentName]
    }

    render() {
      const {
        value,
        earliestSelectableDate,
        latestSelectableDate,
        onChange = T,
        ...rest
      } = this.props

      let disabledDate: RangePickerProps['disabledDate']
      if (earliestSelectableDate || latestSelectableDate) {
        disabledDate = (current: dayjs.Dayjs) => {
          return (
            (!!earliestSelectableDate &&
              this.validiteEarliestSelectableDate(current)) ||
            (!!latestSelectableDate &&
              this.validiteLatestSelectableDate(current)) ||
            false
          )
        }
      }
      let newValue

      if (Array.isArray(value)) {
        newValue = value.map(d => {
          return dayjs.isDayjs(d) ? d : dayjs(d)
        })
      } else {
        newValue = value ? (dayjs.isDayjs(value) ? value : dayjs(value)) : null
      }

      const componentProps: DatePickerProps = {
        placeholder,
        disabledDate,
        picker,
        ...rest,
      } as DatePickerProps

      if ('value' in this.props) {
        componentProps['value'] = newValue as any
      }
      componentProps['onChange'] = (
        date: dayjs.Dayjs,
        dateString: string | string[],
      ) => {
        onChange(dateString, date)
      }

      return <Component {...componentProps} />
    }
  }
}

export default generatePicker
