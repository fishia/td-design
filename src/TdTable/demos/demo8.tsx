/**
 * desc: 空数据时，默认显示暂无数据，支持自定义文本
 */
import React from 'react'
import { TdTable } from 'td-design'

export default function Demo() {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  return (
    <div style={{ height: '400px' }}>
      <TdTable
        columns={columns}
        emptyText={
          <>
            <span>暂无数据，</span>
            <a>去新增</a>
          </>
        }
      />
    </div>
  )
}
