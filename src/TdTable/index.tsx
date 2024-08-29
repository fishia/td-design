import {
  ColumnHeightOutlined,
  RedoOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Dropdown, Empty, Menu, Table, TableProps, Tooltip } from 'antd'
import classnames from 'classnames'
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useSet } from 'td-design/hooks'
import { isFunction } from 'td-design/util/tools'
import Alert from './Alert'
import ColumnSetting from './ColumnSetting'
import ResizeableTitle from './ResizeableTitle'
import renderColumnButtons from './renderColumnButtons'

const isMac = navigator.userAgent.indexOf('Mac OS') !== -1

export interface TdTableProps<T> extends TableProps<T> {
  prefixCls?: string
  refreshIconVisible?: boolean
  hideColumnSetting?: boolean
  hideColumnHeight?: boolean
  bordered?: boolean
  visibleColumnKeys?: Array<string>
  defaultVisibleColumnKeys?: Array<string>
  onVisibleColumnsChange?: (keys?: Array<string>) => void
  toolbarClassName?: string
  toolbar?: boolean
  toolbarTitle?: string | React.ReactNode
  onRefresh?: () => void
  indexColumn?: boolean
  indexFixed?: string | boolean
  indexTitle?: string
  startIndex?: number
  buttonGroup?: React.ReactNode
  autoFit?: boolean
  headFootHeight?: number
  columnResizable?: boolean
  emptyText?: string | React.ReactNode
  onRowSelectionClear?: () => void
  searchCollapseEvent$?: object
  className?: string
  style?: object
  disabledColumnKeys?: Array<string>
  onColumnsSave?: () => void
}

const TdTable = React.forwardRef(<T extends {}>(props: TdTableProps<T>) => {
  const {
    prefixCls = 'td-table',
    toolbar = true,
    toolbarClassName,
    toolbarTitle = '查询结果',
    buttonGroup,
    refreshIconVisible = true,
    hideColumnSetting,
    hideColumnHeight,
    visibleColumnKeys,
    defaultVisibleColumnKeys,
    onVisibleColumnsChange,
    onRefresh,
    indexColumn = true,
    indexFixed = false,
    bordered = false,
    indexTitle = '序号',
    startIndex = 1,
    autoFit = true,
    headFootHeight = 115,
    columnResizable,
    className,
    style,
    emptyText = '暂无数据',
    onRowSelectionClear,
    searchCollapseEvent$,
    disabledColumnKeys,
    onColumnsSave,
    ...rest
  } = props

  const [state, setState] = useSet({
    // 显示列
    visibleColumns: [],
    // 列设置选中的列
    checkedColumnKeys: [],
    // 列设置选项
    columnSettingOptions: [],
    tableId: `td-table-${new Date().getTime()}`,
    scrollY: null,
    size: 'default',
  })
  const {
    visibleColumns,
    checkedColumnKeys,
    columnSettingOptions,
    tableId,
    scrollY,
    size,
  } = state
  // 列设置提示高度
  const alertHeight = useRef(0)
  // 工具栏高度
  const toolbarHeight = useRef(0)

  const hasAlert = (rest.rowSelection?.selectedRowKeys || []).length > 0
  alertHeight.current = hasAlert ? 49 : 0
  toolbarHeight.current = toolbar ? 56 : 0

  // 高度计算
  const calculateHeight = useCallback(() => {
    const container = document.getElementById(tableId)
    if (container) {
      const bodyHeight =
        container.clientHeight -
        headFootHeight -
        toolbarHeight.current -
        alertHeight.current
      const divs = container.getElementsByTagName('div')
      const bodyDiv = Array.prototype.filter.call(
        divs,
        dom =>
          dom.className.includes('ant-table-body') ||
          dom.className.includes('ant-table-content'),
      )[0]
      bodyDiv.style.minHeight = `${bodyHeight}px`
      setState({
        scrollY: bodyHeight,
      })
    }
  }, [tableId,document.getElementById(tableId)?.clientHeight])

  useEffect(() => {
    // componentDidMount
    if (autoFit) {
      window.addEventListener('resize', calculateHeight, false)
    }
    return () => {
      // componentWillUnmount
      if (autoFit) {
        window.removeEventListener('resize', calculateHeight, false)
      }
    }
  }, [])

  useLayoutEffect(() => {
    if (autoFit) {
      calculateHeight()
    }
  }, [calculateHeight,(rest.rowSelection?.selectedRowKeys || []).join(',')])

  useEffect(() => {
    parseColumns()
    setState({
      columnSettingOptions: rest.columns?.map((col: any) => ({
        ...col,
        key: col.dataIndex || col.key,
      })),
    })
  }, [rest.columns])

  const parseColumns = (type?: string) => {
    // 显示工具栏的同时并显示列设置
    if (toolbar && !hideColumnSetting) {
      if (defaultVisibleColumnKeys || visibleColumnKeys) {
        const columnKeys =
          (type === 'reset'
            ? defaultVisibleColumnKeys
            : visibleColumnKeys || defaultVisibleColumnKeys) || []
        setState({
          checkedColumnKeys: columnKeys,
          visibleColumns: rest.columns?.filter((item: any) =>
            columnKeys.includes(item.dataIndex || item.key),
          ),
        })
      } else {
        setState({
          checkedColumnKeys: rest.columns?.map(
            (item: any) => item.dataIndex || item.key,
          ),
          visibleColumns: rest.columns,
        })
      }
    } else {
      setState({
        visibleColumns: rest.columns,
      })
    }
  }

  // 列设置回调
  const handleChangeColumns = (keys: string[]) => {
    setState({
      checkedColumnKeys: keys,
      visibleColumns: columnSettingOptions?.filter((item: any) =>
        keys.includes(item.key),
      ),
    })
    onVisibleColumnsChange && onVisibleColumnsChange(keys)
  }

  // 工具栏
  let toolbarRender
  if (toolbar) {
    toolbarRender = (
      <div className={classnames(`${prefixCls}-toolbar`, toolbarClassName)}>
        <div className={`${prefixCls}-toolbar-left`}>{toolbarTitle}</div>
        <div className={`${prefixCls}-toolbar-right`}>
          <div
            className={classnames(
              `${prefixCls}-space-item`,
              `${prefixCls}-toolbar-actions`,
            )}
          >
            {buttonGroup}
          </div>
          <div
            className={classnames(
              `${prefixCls}-space-item`,
              `${prefixCls}-toolbar-setting`,
            )}
          >
            {refreshIconVisible && (
              <div
                className={`${prefixCls}-toolbar-setting-item`}
                onClick={() => {
                  onRefresh && onRefresh()
                }}
              >
                <Tooltip title="刷新">
                  <RedoOutlined />
                </Tooltip>
              </div>
            )}
            {!hideColumnHeight && (
              <div className={`${prefixCls}-toolbar-setting-item`}>
                <Dropdown
                  overlay={
                    <Menu
                      onClick={({ key }) => setState({ size: key })}
                      selectedKeys={[size]}
                    >
                      <Menu.Item key="default">默认</Menu.Item>
                      <Menu.Item key="middle">中等</Menu.Item>
                      <Menu.Item key="small">紧凑</Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <Tooltip title="列密度">
                    <ColumnHeightOutlined />
                  </Tooltip>
                </Dropdown>
              </div>
            )}
            {!hideColumnSetting && (
              <div className={`${prefixCls}-toolbar-setting-item`}>
                <ColumnSetting
                  prefixCls={prefixCls}
                  checkedColumnKeys={checkedColumnKeys}
                  columnSettingOptions={columnSettingOptions}
                  onChange={handleChangeColumns}
                  onReset={() => parseColumns('reset')}
                  disabledColumnKeys={disabledColumnKeys}
                  onColumnsSave={onColumnsSave}
                >
                  <Tooltip title="列设置">
                    <SettingOutlined />
                  </Tooltip>
                </ColumnSetting>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 分页
  const getPagination = (pagination: any) => {
    if (typeof pagination === 'boolean' && !pagination) {
      return pagination
    }
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal(total = 0) {
        return `共 ${total} 条`
      },
      ...pagination,
    }
  }

  // 处理操作按钮
  let columns = (visibleColumns || []).map((column: any) => {
    const newColumn = { ...column }
    if (newColumn.renderButtons) {
      delete newColumn.renderButtons
    }
    if (newColumn.renderButtonsVisibleNum) {
      delete newColumn.renderButtonsVisibleNum
    }
    return {
      ...newColumn,
      render: isFunction(column.renderButtons)
        ? function (text: string, record: any, index: number) {
            return renderColumnButtons(
              column.renderButtons,
              column.renderButtonsVisibleNum,
              text,
              record,
              index,
            )
          }
        : 'render' in column
        ? column.render
        : function (text: string) {
            return ['', null, undefined].includes(text) ? '-' : text
          },
    }
  })
  // 配置了列可伸缩
  if (columnResizable) {
    columns = columns.map((col: any, index: number) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }))
    const handleResize =
      (index: number) =>
      (e: any, { size }: any) => {
        setState(({ visibleColumns }: any) => {
          const nextColumns = [...visibleColumns]
          nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
          }
          return { visibleColumns: nextColumns }
        })
      }
  }

  // 序号添加
  let dataSource = rest.dataSource
  if (indexColumn) {
    columns = [
      {
        title: indexTitle,
        dataIndex: '_serialNum',
        key: '_serialNum',
        width: 70,
        fixed: indexFixed,
      },
      ...columns,
    ]
    dataSource = dataSource?.map((item, i) => {
      return {
        ...item,
        _serialNum: i + startIndex,
      }
    })
  }

  let scroll
  if (autoFit) {
    scroll = {
      ...(rest.scroll || {}),
      y: scrollY,
    }
  }

  return (
    <div
      id={tableId}
      className={classnames(prefixCls, className, {
        [`${prefixCls}-fit`]: autoFit,
        [`${prefixCls}-noFit`]: !autoFit,
        [`${prefixCls}-nodata`]: !dataSource?.length,
        [`${prefixCls}-userAgent-mac`]: isMac,
      })}
      style={style}
    >
      {toolbarRender}
      {hasAlert && (
        <div className={`${prefixCls}-alert`}>
          <Alert
            prefixCls={prefixCls}
            selectedRowKeys={rest.rowSelection?.selectedRowKeys}
            onRowSelectionClear={onRowSelectionClear}
          />
        </div>
      )}
      <Table
        size={size}
        bordered={bordered}
        {...rest}
        columns={columns}
        dataSource={dataSource}
        scroll={scroll}
        pagination={getPagination(rest.pagination)}
        style={{
          height: `calc(100% - ${
            toolbarHeight.current + alertHeight.current
          }px)`,
        }}
        locale={{
          emptyText: <Empty description={emptyText} />,
          ...rest.locale,
        }}
        components={
          columnResizable
            ? {
                header: {
                  cell: ResizeableTitle,
                },
              }
            : undefined
        }
      />
    </div>
  )
})

export default TdTable
