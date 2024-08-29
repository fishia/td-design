/**
 * desc: 结合 ahooks useAntdTable 使用
 */
import { useAntdTable } from 'ahooks'
import { Button, Col, Form, Input, Row, Space } from 'antd'
import React from 'react'
import { TdTable } from 'td-design'

const getTableData = (
  { current, pageSize, filters, sorter }: any,
  formData: any,
) => {
  let query = `page=${current}&size=${pageSize}`
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`
    }
  })
  if (sorter) {
    query += `&sorterFiled=${sorter.field}&sorterOrder=${sorter.order}`
  }
  if (filters) {
    query += `&gender=${filters.gender}`
  }

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then(res => res.json())
    .then(res => ({
      total: res.info.results,
      list: res.results,
    }))
}

const Demo = (props: any) => {
  const [form] = Form.useForm()
  const { tableProps, params, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 5,
    // cacheKey: 'tableProps',
  })
  const { sorter = {}, filters = {} } = params[0] || {}
  const { submit, reset } = search || {}

  const columns = [
    {
      title: 'name',
      dataIndex: ['name', 'last'],
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      sorter: true,
      sortOrder: sorter.field === 'phone' && sorter.order,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' },
      ],
      filteredValue: filters.gender,
    },
  ]

  return (
    <div style={{ position: 'relative', paddingTop: '48px' }}>
      <Form form={form} name="query-form">
        <Row>
          <Col span={6}>
            <Form.Item name="name" label="名字">
              <Input placeholder="请输入名字" style={{ width: 300 }} />
            </Form.Item>
          </Col>
          <Col offset={8}>
            <Space>
              <Button type="primary" onClick={submit}>
                查询
              </Button>
              <Button onClick={reset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <div style={{ height: '500px' }}>
        <TdTable columns={columns} rowKey="email" {...tableProps} />
      </div>
    </div>
  )
}

export default Demo
