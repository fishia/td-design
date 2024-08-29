import { DatePicker, DatePickerProps } from 'antd';
import cls from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { T } from 'ramda';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

interface DuringDatePickerProps extends IBasicProps {
  value?: (string | undefined)[];
  defaultValue?: (string | undefined)[];
  placeholders?: string[];
  onChange?: (dateString?: string[], dates?: dayjs.Dayjs[]) => void;
  width?: number;
  format?: DatePickerProps['format'];
  picker?: DatePickerProps['picker'];
  hitherto?: boolean;
  showHitherto?: boolean;
  todayText?: string;
  noMinors?: boolean; //禁止未成年
  canChooseFuture?: boolean; // 是否可以选择未来时间
  startDatePickerProps?: DatePickerProps;
  endDatePickerProps?: DatePickerProps;
}

const DuringDatePicker: FC<DuringDatePickerProps> = (props) => {
  const {
    placeholders = ['开始时间', '结束时间'],
    width = 230,
    picker = 'month',
    format = 'YYYY-MM',
    value = [],
    defaultValue = [],
    todayText = '至今',
    onChange = T,
    hitherto = false,
    showHitherto = false,
    canChooseFuture = false,
    noMinors = false,
    className,
    startDatePickerProps,
    endDatePickerProps,
  } = props;

  const [curFormat, setCurFormat] = useState<any>(format);
  const [curHitherto, setCurHitherto] = useState<any>(false);
  const [startTime, setStartTime] = useState<Dayjs>();
  const [endTime, setEndTime] = useState<Dayjs>();
  const ref = useRef<any>(null);

  const disabledDate = (current: Dayjs) => {
    if (!current) {
      return false;
    }
    const minTime = noMinors ? dayjs().subtract(18, 'year').valueOf() : 0;
    const maxTime = endTime
      ? endTime.valueOf()
      : canChooseFuture
      ? 0
      : dayjs().valueOf();

    return current.valueOf() < minTime || maxTime
      ? current.valueOf() > maxTime
      : false;
  };

  useEffect(() => {
    setCurHitherto(hitherto);
  }, [hitherto]);

  // 初始至今
  useEffect(() => {
    setCurFormat(curHitherto ? todayText : format);
  }, [curHitherto, format]);

  // 初始值
  useEffect(() => {
    if (defaultValue[0]) setStartTime(dayjs(defaultValue[0]));
    if (defaultValue[1]) setEndTime(dayjs(defaultValue[1]));
  }, []);

  useEffect(() => {
    if (value[0]) setStartTime(dayjs(value[0]));
    if (value[1]) setEndTime(dayjs(value[1]));
  }, [value]);

  const handleChange = useCallback(
    (startTime?: dayjs.Dayjs, endTime?: dayjs.Dayjs) => {
      if (startTime && endTime) {
        onChange(
          [
            dayjs(startTime).format(format as string) as any,
            dayjs(endTime).format(format as string) as any,
          ],
          [startTime as any, endTime as any],
        );
      } else {
        onChange(undefined, undefined);
      }
    },
    [],
  );

  const classNames = cls('td-duringDatePicker', className);

  return (
    <div className={classNames}>
      <DatePicker
        value={startTime}
        placeholder={placeholders[0]}
        style={{ width }}
        disabledDate={disabledDate}
        picker={picker}
        format={format}
        onChange={(v: Dayjs) => {
          setStartTime(v);
          handleChange(v, endTime);
        }}
        getPopupContainer={(triggerNode: any) => triggerNode}
        {...startDatePickerProps}
      />
      <div className="split">—</div>
      <DatePicker
        ref={ref}
        showToday={false}
        value={endTime}
        placeholder={placeholders[1]}
        style={{ width }}
        disabledDate={(current: Dayjs) => {
          if (!current) {
            return false;
          }
          if (!startTime) {
            if (!canChooseFuture)
              // 如果没有选开始时间, 则可选时间不能大于当前时间
              return current.valueOf() > dayjs().valueOf();
            else return false;
          } else {
            // 如果有开始时间，则不能小于开始时间且大于当前时间
            if (canChooseFuture) return current.valueOf() < startTime.valueOf();
            else
              return (
                current.valueOf() < startTime.valueOf() ||
                current.valueOf() > dayjs().valueOf()
              );
          }
        }}
        picker={picker}
        format={curFormat}
        onChange={(v:Dayjs) => {
          setEndTime(v as any);
          handleChange(startTime, v as any);
          setCurHitherto(false);
        }}
        getPopupContainer={(triggerNode: any) => triggerNode}
        renderExtraFooter={
          showHitherto
            ? () => (
                <div
                  className="ant-picker-today-btn"
                  onClick={(e) => {
                    setCurHitherto(true);
                    setEndTime(dayjs());
                    handleChange(startTime, dayjs());
                    ref?.current?.blur();
                  }}
                >
                  {todayText}
                </div>
              )
            : undefined
        }
        {...endDatePickerProps}
      />
    </div>
  );
};

export default DuringDatePicker;
