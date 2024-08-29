import { Button, Form } from 'antd'
import React from 'react'
import { TdDatePicker } from 'td-design'
import './index.less'
const { TdRangePicker } = TdDatePicker
const Demo = () => {
  return (
    <div className="todayDatePickers">
      <Form
        name="date"
        onFinish={values => {
          console.log(values)
        }}
        onFinishFailed={values => {
          console.log(values)
        }}
      >
        <Form.Item label="时间" name="date" rules={[{ required: true }]}>
          <TdDatePicker
            format="YYYY-MM-DD"
            onChange={date => {
              console.log(date)
            }}
          />
        </Form.Item>
        <Form.Item label="时间范围" name="rangeDate" rules={[{ required: true }]}>
          <TdRangePicker
            earliestSelectableDate="2023-10-28"
            latestSelectableDate="2024-04-28"
            onChange={(e, e1) => {
              console.log(e, e1)
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Demo
