import { Button, Form } from 'antd';
import React from 'react';
import { TdCascaderModalSelect } from 'td-design';
import { TdCascaderOption } from 'td-design/TdCascaderModal';
import './index.less';

const Demo = () => {
  const options: TdCascaderOption[] = [
    {
      value: 'zhejiang',
      label: '医疗器械研发',
      children: [
        {
          value: 'hangzhou',
          label: '器械设备研发',
          children: [
            {
              value: 'xihu',
              label: '医疗器械硬件研发',
            },
            {
              value: 'yuhang',
              label: '嵌入式软件研发',
            },
            {
              value: 'xiaoshan',
              label: '医疗器械结构研发',
              disabled: true,
            },
            {
              value: 'tonglu',
              label: 'Linux软件开发',
            },
          ],
        },
        {
          value: 'IVD',
          label: 'IVD研发',
          children: [
            {
              value: 'shiji',
              label: '诊断试剂研发',
            },
            {
              value: 'yiqi',
              label: '诊断仪器研发',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '医药研发',
      children: [
        {
          value: 'nanjing',
          label: '医药辅料研发',
          children: [
            {
              value: 'zhonghuamen',
              label: '医药辅料研发',
            },
            {
              value: 'kuangwuzhi',
              label: '矿物质原材料研发',
            },
          ],
        },
        {
          value: 'huaxue',
          label: '化学药研发',
          children: [
            {
              value: 'wuzhongqu',
              label: '药物合成/有机合成研究',
            },
            {
              value: 'shengwuyanjiu',
              label: '生物研究/体内/体外',
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="todayDatePickers">
      <Form
        name="cascader"
        initialValues={{
          city: 'xihu',
          functionType: ['zhonghuamen'],
        }}
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
          <TdCascaderModalSelect treeData={options} />
        </Form.Item>
        <Form.Item
          label="职位类别"
          name="functionType"
          required
          rules={[{ required: true }]}
        >
          <TdCascaderModalSelect treeData={options} multiple />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Demo;
