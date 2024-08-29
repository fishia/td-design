import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import generatePicker from './generatePicker';

const { RangePicker } = DatePicker;
export type TdDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: string | string[];
  onChange?: (
    dateString: string | string[],
    date: dayjs.Dayjs | [dayjs.Dayjs, dayjs.Dayjs],
  ) => void;
  earliestSelectableDate?: string;
  latestSelectableDate?: string;
  hitherto?: boolean;
  showHitherto?:boolean;
  todayText?: string;
  canChooseFuture?: boolean // 是否可以选择未来时间
};

// const BaseDatePicker = (props?: TdDatePickerProps) => {
//   const DayjsDatePicker = antdGeneratePicker<Dayjs>(dayjsGenerateConfig);

//   return props?.dayjs ? DayjsDatePicker : DatePicker;
// };

const TdWeekPicker = generatePicker(DatePicker, {
  placeholder: '请选择周',
  componentName: 'TdWeekPicker',
  picker: 'week',
});
const TdMonthPicker = generatePicker(DatePicker, {
  placeholder: '请选择月份',
  componentName: 'TdMonthPicker',
  picker: 'month',
});
const TdQuarterPicker = generatePicker(DatePicker, {
  placeholder: '请选择季度',
  componentName: 'TdQuarterPicker',
  picker: 'quarter',
});
const TdYearPicker = generatePicker(DatePicker, {
  placeholder: '请选择年份',
  componentName: 'TdYearPicker',
  picker: 'year',
});
const TdRangePicker = generatePicker(RangePicker, {
  placeholder: '请选择日期范围',
  componentName: 'TdRangePicker',
});

const TdDatePicker = Object.assign(
  generatePicker(DatePicker, {
    placeholder: '请选择日期',
    componentName: 'TdDatePicker',
  }),
  {
    TdWeekPicker,
    TdMonthPicker,
    TdQuarterPicker,
    TdYearPicker,
    TdRangePicker
  },
);
export default TdDatePicker;
