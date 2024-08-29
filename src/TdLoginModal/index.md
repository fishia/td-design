---
nav:
  title: TdLoginModal 登录弹框
  path: 1
group:
  title: 数据展示
  order: 2
---

**功能点**

- 支持密码，验证码模式。
- 支持配置标题，副标题，按钮文案，协议等字段。
- 支持配置密码规则

# TdLoginModal 登录弹框

<code src="./demos/demo1.tsx" >基础用法</code>
<code src="./demos/demo2.tsx" >密码模式</code>

### API

继承 antd [modal 全量属性](https://ant.design/components/modal-cn#api), 并新增属性如下：

| 属性              | 说明                   | 类型                                                                       | 默认值                         |
| ----------------- | ---------------------- | -------------------------------------------------------------------------- | ------------------------------ |
| mode              | 可选，弹窗模式         | 'code'\|'password'                                                         | 'code' 验证码                  |
| subTitle          | 可选，弹窗副标题       | string\| React.ReactElement                                                | -                              |
| bottomText        | 可选， 协议描述        | string\| React.ReactElement                                                | 我已同意与阅读                 |
| submitText        | 可选，底部按钮提交文案 | string                                                                     | 登录                           |
| passwordRule      | 可选， 密码规则        | { min: 6, max: 16, message: '请输入密码, 6-16 位字符' }                    | 登录                           |
| protocolLinkArray | 可选，协议组           | ProtocolObj(/components/td-login-modal#ProtocolObj)[]                      |    默认取医脉的用户协议和隐私协议                            |
| getMsgCodeFetch   | 必传，获取验证码方法   | (phone: string) => Promise<any>                                            |                                |
| loginSubmit       | 必传，确认登录回调     | (data: IRegisterByCode(/components/td-login-modal#IRegisterByCode)) =>void |  |

### TdLoginModal ref

```
export interface TdLoginModalRef {
  open: (callback?: Function) => void
  close: () => void
}
```

### IRegisterByCode

```
export interface IRegisterByCode {
  phone: string
  code?: string
  password?: string
}
```

### ProtocolObj

| 参数    | 说明              | 类型   | 默认值 | 版本 |
| ------- | ----------------- | ------ | ------ | ---- |
| title   | 协议名称          | string |        |      |
| linkUrl | 协议跳转链接（h5) | string |        |      |
