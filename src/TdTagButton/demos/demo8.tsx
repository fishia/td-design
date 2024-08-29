import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { TdTagButton } from 'td-design';
import './index.less';

export default () => {
  const [options, setOptions] = useState([
    {
      value: 'Han1gZhou',
      label: '临床医学类',
    },
    {
      value: '2',
      label: '基础医学类',
    },
    {
      value: '3',
      label: '药学类',
    },
  ]);
  return (
    <>
      <div className="buttonList">
        <Form
          name="cascader"
          onFinish={(values) => {
            console.log(values);
          }}
          onFinishFailed={(values) => {
            console.log(values);
          }}
        >
          <Form.Item
            label="是否隐藏"
            name="city"
            valuePropName="checked"
          >
            <TdTagButton type="primary" ghost>
              隐藏
            </TdTagButton>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
