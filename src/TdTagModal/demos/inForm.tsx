import { Button, Form, message } from 'antd';
import React from 'react';
import { TdTagModal } from 'td-design';

const options = [
  {
    name: '福利亮点',
    options: [
      { id: 12, name: '交通补贴' },
      { id: 13, name: '住房补贴' },
    ],
  },
  {
    name: '福利亮点2',
    options: [
      { id: 2, name: '交通补贴2' },
      { id: 3, name: '住房补贴2' },
    ],
  },
];

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('Success');
  };

  return (
    <Form labelCol={{ span: 2 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
      <Form.Item
        label="select"
        name="select"
        rules={[{ required: true, message: '请选择' }]}
      >
        <TdTagModal title="Tag" options={options} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
