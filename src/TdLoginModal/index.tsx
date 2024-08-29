import { Button, Checkbox, Form, Input, InputRef, Modal, message } from 'antd'
import { Rule } from 'antd/es/form'
import { ModalProps } from 'antd/lib/modal'
import cls from 'classnames'
import { T, compose, hasPath, ifElse, pathOr } from 'ramda'
import React, { useImperativeHandle, useState } from 'react'

import TdInput, { ITdInputRef } from 'td-design/TdInput'

interface ProtocolObj {
  title: string
  linkUrl: string
}

export const getErrMsgDataMsg = ifElse(
  hasPath(['data', 'message']),
  pathOr('未知错误', ['data', 'message']),
  pathOr('未知错误', ['data', 'msg']),
)

export interface IRegisterByCode {
  phone: string
  code?: string
  password?: string
}

export interface ITdLoginModalProps extends ModalProps {
  mode?: 'code' | 'password'
  loginSuccess?: () => void
  title?: string | React.ReactElement
  subTitle?: string | React.ReactElement
  bottomText?: string | React.ReactElement
  submitText?: string
  passwordRule?: Rule[]
  protocolLinkArray?: ProtocolObj[]
  getMsgCodeFetch?: (phone: string) => Promise<any>
  loginSubmit?: (data: IRegisterByCode) => void
}

export interface TdLoginModalRef {
  open: (callback?: any) => void
  close: () => void
}

export const phoneRule: Rule[] = [
  { type: 'string', required: true, message: '手机号未填写' },
  {
    type: 'string',
    pattern: /^[1][3-9]\d{9}$/,
    len: 11,
    message: '请输入正确的手机号',
  },
]

export const smsCode: Rule[] = [
  { type: 'string', required: true, message: '短信验证码未填写' },
  {
    min: 6,
    max: 6,
    message: `请输入${6}位短信验证码`,
  },
]

let callbackFn: any = () => {}

const noop = () => {}

const TdLoginModal = (
  props: ITdLoginModalProps,
  ref: React.Ref<TdLoginModalRef>,
) => {
  const {
    loginSuccess = noop,
    mode = 'code',
    title = '登录',
    subTitle,
    submitText = '登录',
    protocolLinkArray = [
      {
        title: '用户协议',
        linkUrl: 'https://hr.yimaitongdao.com/agreement/user',
      },
      {
        title: '及',
      },
      {
        title: '隐私政策',
        linkUrl: 'https://hr.yimaitongdao.com/agreement/privacy',
      },
    ],
    bottomText = '我已阅读并同意',
    loginSubmit = T,
    getMsgCodeFetch = () => Promise.reject(),
    wrapClassName,
    passwordRule = [
      { type: 'string', required: true, message: '请输入正确的密码' },
      { min: 6, max: 16, message: '请输入密码, 6-16 位字符' },
    ],
    ...restProps
  } = props

  const phoneInput = React.useRef<InputRef>(null)
  const inputRef = React.useRef<ITdInputRef>(null)
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [enableClick, setEnableClick] = useState(true)

  const open = (callback?: any) => {
    setVisible(true)
    callbackFn = callback ? callback : () => {}
  }
  const close = (reload = false) => {
    if (reload) callbackFn()
    setVisible(false)
    form.resetFields()
  }

  const onGetMsgCodeHandler = (): void => {
    form
      .validateFields(['phone'])
      .then(val => {
        inputRef.current?.startCounting()
        return val
      })
      .then(val => getMsgCodeFetch(val.phone))
      .catch(compose(T, getErrMsgDataMsg))
  }

  const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFields([
      {
        name: 'phone',
        errors: [],
      },
    ])
    const length = e.target.value.length
    if (length === 11) {
      inputRef.current?.inputFocus()
      setEnableClick(false)
      onGetMsgCodeHandler()
    }
  }
  const error = (e: string) => {
    message.error(e)
  }

  const onFormFinish = (values: IRegisterByCode) => {
    setLoading(true)
    loginSubmit(values)
  }

  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  const classNames = cls('td-login-modal', wrapClassName)

  return (
    <Modal
      open={visible}
      onCancel={() => close()}
      footer={null}
      wrapClassName={classNames}
      maskClosable={false}
      width={442}
      {...restProps}
    >
      <div className="td-login-modal__title">{title}</div>
      {subTitle && <div className="td-login-modal__subTitle">{subTitle}</div>}
      <Form
        size={'large'}
        form={form}
        onFinish={onFormFinish}
        //initialValues={{ isChecked: true }}
      >
        <Form.Item
          name={'phone'}
          rules={phoneRule}
          style={{ marginBottom: 20 }}
          validateTrigger="onBlur"
        >
          <Input
            ref={phoneInput}
            placeholder="请输入您的手机号"
            maxLength={11}
            style={{ height: 40 }}
            onChange={e => phoneChange(e)}
          />
        </Form.Item>
        {mode === 'password' && (
          <Form.Item
            name={'password'}
            rules={passwordRule}
            style={{ marginBottom: 20 }}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入您的密码"
              maxLength={11}
              style={{ height: 40 }}
            />
          </Form.Item>
        )}
        {mode === 'code' && (
          <Form.Item name={'code'} rules={smsCode}>
            <TdInput
              countDown
              placeholder="请输入验证码"
              onGetMsgCode={onGetMsgCodeHandler}
              ref={inputRef}
              buttonProps={{
                size: 'small',
                disabled: enableClick,
              }}
            />
          </Form.Item>
        )}
        <Form.Item
          name={'isChecked'}
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('请阅读并勾选协议政策')),
            },
          ]}
          className="td-login-modal__agreementRow"
        >
          <Checkbox className="td-login-modal__checkbox">
            <span>{bottomText}</span>
            {protocolLinkArray.map(({ title, linkUrl }, index) =>
              linkUrl ? (
                <a
                  key={index}
                  href={linkUrl}
                  className="td-login-modal__protocol"
                  target="_self"
                >
                  {`《${title}》`}
                </a>
              ) : (
                <span key={index}>{title}</span>
              ),
            )}
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="td-login-modal__submitBtn"
            loading={loading}
          >
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.forwardRef<TdLoginModalRef, ITdLoginModalProps>(
  TdLoginModal,
)
