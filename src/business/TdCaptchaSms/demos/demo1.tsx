import { Form, Input } from 'antd'
import React from 'react'
import { TdGetCaptchaSms, useSmsContent } from 'td-design'

const Demo2 = () => {
  const { getCaptchaSms } = useSmsContent() || {}
  const [form] = Form.useForm()

  const onGetSms = () => {
    form.validateFields(['phone']).then(val => {
      return getCaptchaSms?.(val.phone)
    })
  }

  return (
    <div>
      <Form form={form}>
        <Form.Item
          name="phone"
          validateFirst={true}
          rules={[
            { type: 'string', required: true, message: '手机号未填写' },
            {
              type: 'string',
              pattern: /^[1][3-9]\d{9}$/,
              len: 11,
              message: '请输入正确的手机号',
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
      </Form>
      <div onClick={onGetSms}>发送验证码</div>
    </div>
  )
}

function APP() {
  const sendSmsByCodeApi = async (captchaVerifyParam: any, phone: string) => {
    // 后端请求业务代码
    // const result = await fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify({ captchaVerifyParam, phone }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => {
    //     return res.json()
    //   })
    //   .catch(err => {})
    console.log(captchaVerifyParam, phone)

    return {
      captchaResult: true, // 验证码验证是否通过，boolean类型，必选
      bizResult: true, // 业务验证是否通过，boolean类型，可选；若为无业务验证结果的场景，bizResult可以为空
    }
  }

  // 项目入口主文件，一个项目仅仅需要引入一次
  return (
    <TdGetCaptchaSms sendSmsByCodeApi={sendSmsByCodeApi}>
      <Demo2 />
    </TdGetCaptchaSms>
  )
}

export default APP
