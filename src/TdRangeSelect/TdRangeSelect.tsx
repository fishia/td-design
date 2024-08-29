import React, { useEffect, useState, CSSProperties } from 'react';
import * as R from 'ramda'
import { Select } from 'antd'

import c from 'classnames';

type selectValueType = (number | undefined)

interface ITdRangeSelectProps {
  className?: string
  suffixStr?: string
  value?: selectValueType[] | any
  placeholderArr?: string[]
  fromOption?: number[]
  toOption?: number[]
  monthOption?: number[]
  isMonthSelect?: boolean
  monthSelectSuffixStr?: string
  grads?: number
  selectWidth?: number
  selectStyle?: CSSProperties
  isShowSelectJointMark?: boolean
  selectJointMarkStyle?: CSSProperties
  isLimitBound?: boolean
  onChange?(x: selectValueType[]): void
}

const TdRangeSelect: React.FC<ITdRangeSelectProps> = (props) => {
  const { Option } = Select

  const {
    className, // 类名
    suffixStr = 'k', // 单位
    value = [], // 组件值
    placeholderArr = ["最低", "最高", "薪资月份"], // 选择框默认文字
    fromOption = [], // 最低选择项
    toOption = [], // 最高选择项
    selectWidth = 150, // 选择器组件的宽度设置
    selectStyle = {}, // 选择器组件的样式设置
    isShowSelectJointMark = false, // 选择器之间是否展示连接符
    selectJointMarkStyle = {}, // 选择器之间连接符的样式设置
    isLimitBound = false, // 是否需要限制上下限
    grads = 2, // 限制了上下限后 增加减少的 梯度值
    isMonthSelect = false, // 是否需要追加月份选项
    monthSelectSuffixStr = "薪", // 月份选择器的单位
    monthOption = [], // 月份选择项
    onChange = R.T, // 选择后触发的事件 返回选择的值
  } = props;
  const [lowPlaceholder, highPlaceholder, monthPlaceholder] = placeholderArr
  const cleanProps = R.omit(['suffixStr', 'value', 'onChange'], props);

  const selectPropsStyle = {
    ...selectStyle,
    width: selectWidth + "px"
  }
  const selectProps = {
    allowClear: true,
    virtual: false,
    style: selectPropsStyle
  }

  const [low, setLow] = useState<selectValueType>()
  const [high, setHigh] = useState<selectValueType>()
  const [count, setCount] = useState<selectValueType>()

  const onChangeHandler = (type = 'low', val: number) => {
    if (type === 'low') {
      setLow(val);
      const hignVal = ((!high || (high && val > high)) && val && isLimitBound) ? (val + grads) : high;
      setHigh(hignVal);

      const changeVal = isMonthSelect ? [val, hignVal, count] : [val, hignVal];
      onChange(changeVal);
    } else if (type === 'high') {
      const lowVal = (low && val < low && isLimitBound) ? ((val - grads) < 1 ? 1 : (val - grads)) : low;
      setLow(lowVal);
      setHigh(val);

      const highChangeVal = isMonthSelect ? [lowVal, val, count] : [lowVal, val];
      onChange(highChangeVal);
    } else if (type === 'xin') {
      setCount(val)
      onChange([low, high, val]);
    }
  };

  useEffect(() => {
    const [valLow, ValHigh, valCount] = value || [undefined, undefined, undefined]
    setLow(valLow)
    setHigh(ValHigh)
    setCount(valCount || undefined)
  }, [value[0], value[1], value[2]])

  return (
    <div className={c("td-range-select__wrap", className)}>
      <Select
        {...cleanProps}
        {...selectProps}
        value={low}
        onChange={val => onChangeHandler('low', val)}
        suffixIcon={<span className='rightWord'>{suffixStr}</span>}
        placeholder={lowPlaceholder}
      >
        {fromOption?.map(item => {
          return <Option value={item}>{item}</Option>
        })}
      </Select>
      {isShowSelectJointMark
        && <div className="td-range-select__jointMark" style={selectJointMarkStyle}>—</div>
      }
      <Select
        {...cleanProps}
        {...selectProps}
        value={high}
        placeholder={highPlaceholder}
        onChange={val => onChangeHandler('high', val)}
        suffixIcon={<span className='td-range-select__rightWord'>{suffixStr}</span>}
      >
        {toOption?.map(item => {
          return <Option value={item}>{item}</Option>
        })}
      </Select>
      {isMonthSelect &&
        <Select
          {...cleanProps}
          {...selectProps}
          value={count}
          onChange={val => onChangeHandler('xin', val)}
          suffixIcon={<span className='rightWord'>{monthSelectSuffixStr}</span>}
          placeholder={monthPlaceholder}
        >
          {monthOption?.map(item => {
            return <Option value={item}>{item}</Option>
          })}
        </Select>
      }
    </div>
  );
};

export default TdRangeSelect;
