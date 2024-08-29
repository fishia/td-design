/**
 * desc: 支持自定义特殊字符过滤
 */
import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { TdInput } from 'td-design';

function Demo() {
  const [form] = useForm();

  return (
    <Form
      form={form}
      onFinish={() => {
        console.log(form.getFieldsValue());
      }}>
      <Form.Item label="验证码" name="custom">
        <TdInput
          countDown
          placeholder="请输入验证码"
          style={{ width: 300 }}
        />
      </Form.Item>
      <Button htmlType="submit">提交</Button>
    </Form>
  );
}

export default Demo;
