import { Button, ButtonProps } from 'antd'
import c from 'classnames'
import { T } from 'ramda'
import React from 'react'
import TdTagSelect, {
  TdCheckedValueType,
  TdSelectOption,
  TdTagSelectProps,
} from '../TdTagSelect'

export interface FootersProps extends Omit<ButtonProps, 'onChange'> {
  options: Array<TdSelectOption>
  label?: string | React.ReactNode
  okText?: string | React.ReactNode
  onChange?: (v?: TdCheckedValueType) => void
  onOk?: React.MouseEventHandler<HTMLElement>
  TdTagSelectProps?: Omit<TdTagSelectProps, 'options'>
}

const prefixCls = 'td-cascaderModal-footer'
const Footers = (props: FootersProps) => {
  const {
    label = '已选',
    okText = '确定',
    options = [],
    TdTagSelectProps,
    onChange = T,
    onOk = T,
    className,
    style,
    ...rest
  } = props

  return (
    <div className={c(prefixCls, className)} style={style}>
      <div className={`${prefixCls}__label`}>{label}</div>
      <div className={`${prefixCls}__tags`}>
        <TdTagSelect
          options={options}
          value={options}
          onChange={onChange}
          multiple
          {...TdTagSelectProps}
        />
      </div>
      <Button
        size="large"
        type="primary"
        className="submit"
        onClick={onOk}
        disabled={options.length === 0 ? true : false}
        {...rest}
      >
        {okText}
      </Button>
    </div>
  )
}

export default Footers
