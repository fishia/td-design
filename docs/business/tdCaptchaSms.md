---
title: TdCaptchaSms 图形验证码
toc: content

group:
  title: 业务组件
  order: 3
---

## 功能介绍

> 图形验证码使用的是 **[阿里云图形验证码](https://help.aliyun.com/zh/captcha/captcha2-0/user-guide/add-a-web-or-html5-client-to-alibaba-cloud-captcha-2?spm=a2c4g.11186623.0.0.23e466ba4Qnlnv)** 二次封装，具体 api 可详见连接

## 代码演示

<code src="../../src/business/TdCaptchaSms/demos/demo1.tsx">基本用法</code>

### 说明

1. 模板中全局引入

   ```html
   <script
     type="text/javascript"
     src="https://oss.yimaitongdao.com/script/AliyunCaptcha.js"
   ></script>
   ```

2. 应用主入口用`TdGetCaptchaSms`包裹，然后项目所有地方都可以使用调用获取图形验证码弹窗的方法
3. 在需要使用的地方使用 `useSmsContent` 中的 `getCaptchaSms` 来唤起验证码组件即可

## API

### _TdGetCaptchaSms_

| 参数             | 说明                  | 类型                                                                                                         | 默认值 |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| sendSmsByCodeApi | 发送后端验证 api 接口 | (_captchaVerifyParam_: `any`, _phone_:`string`) => Promise<{captchaResult: `boolean`, bizResult: `boolean`}> | -      |

> 其他参数参考 **[阿里云图形验证码](https://help.aliyun.com/zh/captcha/captcha2-0/user-guide/add-a-web-or-html5-client-to-alibaba-cloud-captcha-2?spm=a2c4g.11186623.0.0.23e466ba4Qnlnv)**

### useSmsContent

| 参数          | 说明             | 类型   |
| ------------- | ---------------- | ------ |
| getCaptchaSms | 调用获取图形组件 | `noop` |
