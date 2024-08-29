/**
 * desc: 多行文本
 */
import { Form } from 'antd'
import React from 'react'
import { TdInput } from 'td-design'

function Demo() {
  return (
    <Form>
      <Form.Item name="memo">
        <TdInput.TextArea rows={5} placeholder="请输入" />
      </Form.Item>
    </Form>
  )
}

export default Demo
