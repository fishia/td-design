---
title: TdTagModal 标签弹窗选择器
nav:
  title: Base
  order: 2
group: 数据录入
---

### 基础用法

选择项超过 3 行，会展示`更多`按钮，其余隐藏

<code src="./demos/index.tsx" >基础用法</code>

### 在 Form 表单里用法

<code src="./demos/inForm.tsx">表单里用法</code>

### 添加描述

<code src="./demos/desTag.tsx">添加描述</code>

### 自定义添加标签

使用自定义标签，必须添加`addKeyWord`接口请求才能实时添加标签

<code src="./demos/addTag.tsx">自定义添加标签</code>

### API

属性说明如下：

| 属性        | 说明                                               | 类型                                                                | 默认值   |
| ----------- | -------------------------------------------------- | ------------------------------------------------------------------- | -------- |
| value       | 组件的值                                           | { name: `string`, id: `number` } []                                 | []       |
| options     | 选择项                                             | { name: `string`, options: { name: `string`, id: `number` } [] } [] | []       |
| title       | 弹窗的标题                                         | string                                                              | -        |
| describtion | 弹窗里的描述                                       | string                                                              | -        |
| placeHolder | 选择框占位文本                                     | string                                                              | `请选择` |
| maxLength   | 选择最大限制                                       | number                                                              | `8`      |
| isAdd       | 是否展示自定义添加，此处启用一定要添加`addKeyWord` | boolean                                                             | `false`  |
| className   | 类名                                               | string                                                              | -        |

### Events

事件说明如下：

| 事件         | 说明                   | 类型                                                             | 默认值 |
| ------------ | ---------------------- | ---------------------------------------------------------------- | ------ |
| onChange     | 返回修改后的值         | ( event: { name: `string`, id: `number` } [] ) => void           | -      |
| addKeyWord   | 自定义添加关键词的接口 | ( name: string ) => Promise<{ name: `string`, id: `number` } []> | -      |
| beforeChoose | 弹窗打开前进行的事件   | () => void                                                       | -      |
