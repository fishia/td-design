import { Button, Checkbox, Divider, Popover } from 'antd'
import React, { useEffect } from 'react'
import { useSet } from 'td-design/hooks'

interface ColumnSettingProps {
  prefixCls?: string
  checkedColumnKeys?: string[]
  columnSettingOptions: ColumnSettingOption[]
  disabledColumnKeys?: string[]
  children?: React.ReactNode
  onChange?: (keys: string[]) => void
  onReset?: () => void
  onColumnsSave?: (key?: string[]) => void
}

interface ColumnSettingOption {
  key: string
  title: string
  disabled?: boolean
}
export default function ColumnSetting(props: ColumnSettingProps) {
  const [state, setState] = useSet({
    indeterminate: false,
    checkAll: false,
  })
  const {
    prefixCls,
    checkedColumnKeys = [],
    columnSettingOptions,
    onChange,
    onReset,
    disabledColumnKeys = [],
    onColumnsSave,
  } = props

  useEffect(() => {
    const chkLen = checkedColumnKeys?.length
    const optionLen = columnSettingOptions?.length
    setState({
      checkAll: chkLen == optionLen,
      indeterminate: chkLen && chkLen < optionLen,
    })
  }, [checkedColumnKeys])

  const { indeterminate, checkAll } = state

  // 单选
  const onCheckChange = (e:any, key:string) => {
    if (onChange) {
      const newCheckedColumnKeys = e.target.checked
        ? [...checkedColumnKeys, key]
        : checkedColumnKeys?.filter(item => item != key)
      onChange(newCheckedColumnKeys)
    }
  }

  // 全选
  const onCheckAllChange = (e: any) => {
    if (onChange) {
      const newCheckedColumnKeys = e.target.checked
        ? columnSettingOptions?.map(item => item.key)
        : []
      onChange(newCheckedColumnKeys)
    }
  }
  // 保存按钮
  const onSaveChange = () => {
    if (onChange && onColumnsSave) {
      onColumnsSave(checkedColumnKeys)
    }
  }
  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      arrowPointAtCenter
      title={
        <div className={`${prefixCls}-column-setting-title`} slot="title">
          <Checkbox
            className={`${prefixCls}-column-setting-checkbox-wrapper`}
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={onCheckAllChange}
          >
            列展示
          </Checkbox>
          <a onClick={onReset}>重置</a>
        </div>
      }
      content={
        <div className={`${prefixCls}-column-setting-list`}>
          {columnSettingOptions?.map((opt:any) => {
            const key = opt.key || opt.dataIndex
            return (
              <div key={key}>
                <Checkbox
                  checked={checkedColumnKeys?.includes(key)}
                  onChange={e => onCheckChange(e, key)}
                  disabled={disabledColumnKeys.includes(key)}
                >
                  {opt.title}
                </Checkbox>
              </div>
            )
          })}
          {typeof onColumnsSave === 'function' ? (
            <>
              <Divider style={{ margin: '5px 0 10px 0' }} />
              <Button block={true} onClick={() => onSaveChange()}>
                保存
              </Button>
            </>
          ) : null}
        </div>
      }
    >
      {props.children}
    </Popover>
  )
}
