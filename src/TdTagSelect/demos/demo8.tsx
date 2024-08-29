import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { TdTagSelect } from 'td-design';
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
            label="城市"
            name="city"
            required
            rules={[{ required: true }]}
          >
            <TdTagSelect
              options={options}
              multiple
              labelInValue
              limit={2}
              onChange={(v) => {
                console.log(`你选择了${v}`);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
