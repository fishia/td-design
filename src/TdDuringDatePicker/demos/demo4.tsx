import { Button, Form } from 'antd';
import React from 'react';
import { TdDuringDatePicker } from 'td-design';
import './index.less';

const Demo = () => {
  return (
    <div className="todayDatePickers">
      <Form
        name="date"
        onFinish={(values) => {
          console.log(values);
        }}
        onFinishFailed={(values) => {
          console.log(values);
        }}
      >
        <Form.Item
          label="时间"
          name="dates"
          required
          rules={[{ required: true }]}
        >
          <TdDuringDatePicker
            showHitherto
            canChooseFuture
            picker="date"
            format="YYYY-MM-DD"
            onChange={(dates) => {
              console.log('20');
              console.log(dates);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Demo;
