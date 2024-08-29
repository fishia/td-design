/**
 * desc: 列设置了宽度时才支持伸缩
 */
import React from 'react'
import { TdTable } from 'td-design'

export default function Demo() {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 200,
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
  const data = []
  for (let i = 0; i < 4; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    })
  }
  return (
    <TdTable
      columns={columns}
      dataSource={data}
      defaultVisibleColumnKeys={['name', 'age']}
      onVisibleColumnsChange={keys => {
        console.log(keys)
      }}
      autoFit={false}
      bordered
      columnResizable
    />
  )
}
