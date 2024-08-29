import { getNodeLabelByValue } from '@/util/tools'
import { Select, SelectProps } from 'antd'
import cls from 'classnames'
import { isEmpty, omit, T } from 'ramda'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import TdCascaderModal, {
  TdCascaderModalProps,
  TdCascaderModalRef,
} from '../TdCascaderModal'
import { TdCheckedValueType } from '../TdTagSelect'

interface TdCascaderModalSelectProps
  extends Omit<TdCascaderModalProps, 'value' | 'onChange'> {
  value?: TdCheckedValueType
  defaultValue?: TdCheckedValueType
  selectWrapperClass?: string
  placeholder?: string
  selectProps?: SelectProps
  onChange?: (checkedList?: TdCheckedValueType) => void
}

const TdCascaderModalSelect = (props: TdCascaderModalSelectProps) => {
  const {
    multiple,
    treeData,
    placeholder = '请选择',
    defaultValue,
    value,
    selectProps,
    selectWrapperClass,
    labelInValue = true,
    onChange = T,
  } = props
  const ref = useRef<TdCascaderModalRef>(null)
  const [selectOptions, setSelectOptions] = useState<TdCheckedValueType[]>()

  // 数据转换成下拉框所需要的数据
  function transformData(options: TdCheckedValueType[] | TdCheckedValueType) {
    let opts = Array.isArray(options) ? options : [options]
    return opts.map((item: any) => ({
      value: item?.value || item,
      label: item?.label || getNodeLabelByValue(treeData, item?.value || item).label as string,
    }))
  }

  // 初始化值
  useEffect(() => {
    if (defaultValue) setSelectOptions(transformData(defaultValue))
  }, [])

  useEffect(() => {
    if (value) setSelectOptions(transformData(value))
    else setSelectOptions([])
  }, [value])

  const handleChange = (v: any) => {
    setSelectOptions(transformData(v))
    if (isEmpty(v)) {
      onChange(multiple ? [] : undefined)
    } else {
      let latestValue = multiple ? v : v[0]
      if (labelInValue) onChange(latestValue)
      else
        onChange(
          Array.isArray(latestValue)
            ? latestValue.map((item: any) => item.value)
            : latestValue.value,
        )
    }
  }

  const mergedValue = useMemo(() => {
    if (value) {
      return Array.isArray(value) ? value : [value]
    } else {
      return []
    }
  }, [value])

  const classNames = cls('td-cascaderModalSelect', selectWrapperClass)
  return (
    <div className={classNames}>
      <div className="td-cascaderModalSelect__input">
        <Select
          mode={multiple ? 'multiple' : undefined}
          value={selectOptions ? selectOptions : undefined}
          placeholder={placeholder}
          open={false}
          onClear={() => {
            setSelectOptions([])
          }}
          onClick={() => ref?.current?.show()}
          onChange={v => {
            let value = selectOptions?.filter(
              (item: any) => v && v.includes(item.value),
            )
            handleChange(value as TdCheckedValueType[])
          }}
          maxTagTextLength={5}
          showArrow
          allowClear
          options={selectOptions as any}
          {...selectProps}
        />
      </div>
      <TdCascaderModal
        ref={ref}
        {...omit(['selectProps', 'selectWrapperClass'], props)}
        value={mergedValue}
        TdTagButtonProps={{
          type: 'link',
        }}
        onChange={handleChange}
      />
    </div>
  )
}

export default TdCascaderModalSelect
