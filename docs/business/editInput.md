---
title: TdEditInput 可编辑输入框
toc: content

group:
  title: 业务组件
  order: 3
---

## 代码演示

<code src="../../src/business/TdEditInput/demos/demo1.tsx">基本用法</code>
<code src="../../src/business/TdEditInput/demos/demo2.tsx">隐私显示(phone,email,realName)</code>
<code src="../../src/business/TdEditInput/demos/demo3.tsx">文案自定义</code>

## API

更多 API 参考[TdInput](/components/td-input#tdinputprops)，以下为差异点

| 参数          | 说明                         | 类型                                         | 默认值   | 版本 |
| ------------- | ---------------------------- | -------------------------------------------- | -------- | ---- |
| validatedType | 可选，提供几种隐私类型可设置 | 'realName' \| 'phone' \| 'email' \|undefined | 'weChat' |      |
| confirmText   | 可选，确定按钮文案           | string \| ReactNode                          | 确定     |      |
| cancelText    | 可选，取消按钮文案           | string \| ReactNode                          | 取消     |      |
| onConfirm     | 可选，是否显示字数统计       | function(e):Promise<void>                    |          |      |
| onCancel      | 可选，最大输入长度           | function()                                   |          |      |
| onChange      | 点击确认后监控值变化事件     | (value: string) => void                      |          |      |

### TdEditInput ref

```
export interface TdEditInputRef {
  onEdit: () => void; // 打开编辑
  value?: string; // 最终确认值
}
```
