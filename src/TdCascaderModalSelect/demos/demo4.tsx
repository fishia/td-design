import { Button, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { TdCascaderModalSelect } from 'td-design'
import { TdCascaderOption } from 'td-design/TdCascaderModal'
import data from './data'
import './index.less'

const Demo = () => {
  const [form] = Form.useForm()
  const [treeData, setTreeData] = useState<any>([])
  const options: TdCascaderOption[] = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'zhejiang',
          label: '全部',
        },
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            {
              value: 'hangzhou',
              label: '全部',
            },
            {
              value: 'xihu',
              label: '西湖',
            },
            {
              value: 'yuhang',
              label: '余杭',
            },
            {
              value: 'xiaoshan',
              label: '萧山',
            },
            {
              value: 'tonglu',
              label: '桐庐',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'jiangsu',
          label: '全部',
        },
        {
          value: 'nanjing',
          label: '南京',
          children: [
            {
              value: 'nanjing',
              label: '全部',
            },
            {
              value: 'zhonghuamen',
              label: '中华门',
            },
          ],
        },
        {
          value: 'suzhou',
          label: '苏州',
          children: [
            {
              value: 'suzhou',
              label: '全部',
            },
            {
              value: 'wuzhongqu',
              label: '吴中区',
            },
            {
              value: 'dongfangzhimen',
              label: '东方之门',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu1',
      label: '江苏1',
      children: [
        {
          value: 'jiangsu1',
          label: '全部',
        },
        {
          value: 'nanjing1',
          label: '南京1',
          children: [
            {
              value: 'nanjing1',
              label: '全部',
            },
            {
              value: 'zhonghuamen1',
              label: '中华门1',
            },
          ],
        },
        {
          value: 'suzhou1',
          label: '苏州1',
          children: [
            {
              value: 'suzhou1',
              label: '全部',
            },
            {
              value: 'wuzhongqu1',
              label: '吴中区1',
            },
            {
              value: 'dongfangzhimen1',
              label: '东方之门1',
            },
          ],
        },
      ],
    },
  ]

  useEffect(() => {
    // 获取职位类别
    let renderItem = (values: any[]): any[] => {
      return values.map((item: any) => ({
        value: item.value,
        label: item.label,
        children:
          Array.isArray(item.options) && item.options.length
            ? renderItem(item.options)
            : undefined,
      }))
    }
    setTreeData(renderItem(data))
  }, [data])

  return (
    <div className="todayDatePickers">
      <Form
        form={form}
        onFinish={values => {
          console.log(values)
        }}
        onFinishFailed={values => {
          console.log(values)
        }}
      >
        <Form.Item
          label="城市"
          name="city"
          required
          rules={[{ required: true }]}
        >
          <TdCascaderModalSelect
            treeData={options}
            labelInValue
            multiple
            selectedWhenCheckedAll
            footer
          />
        </Form.Item>
        <Form.Item
          label="职位类别"
          name="functionType"
          required
          rules={[{ required: true }]}
        >
          <TdCascaderModalSelect
            title="请选择职位类别"
            treeData={treeData}
            labelInValue
            multiple
            selectedWhenCheckedAll
            footer
            limit={3}
            selectProps={{
              maxTagCount: 'responsive',
            }}
            // onChange={(v:any) => {
            //   form.setFieldsValue({
            //     functionType: v.map((i: any) => i.value),
            //   })
            // }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
      <Button
        onClick={() => {
          form.resetFields()
        }}
      >
        清空数据
      </Button>
    </div>
  )
}

export default Demo
