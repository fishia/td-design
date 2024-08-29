---
title: TdSearchSelect 范围多选选择器
nav:
  title: Base
  order: 2
group: 数据录入
---

### 基础用法

范围选择多选，默认展示选择器 label，选择`不限`等特有选项后，清空其余所有选项并展示 label

<code src="./demos/index.tsx" >基础用法</code>

### 限制显示宽度，默认会省略且显示`...`

<code src="./demos/limitWidth.tsx">限制显示宽度</code>

### 可以更换选择器的标题

<code src="./demos/changeTitle.tsx">更换标题</code>

### 可以更换选择器的默认全选 label 和选中的默认值

<code src="./demos/defaultOptionsLabel.tsx">更换全选 label</code>

### API

属性说明如下：

| 属性                | 说明                                                       | 类型                                                | 默认值 |
| ------------------- | ---------------------------------------------------------- | --------------------------------------------------- | ------ |
| value               | 组件的值                                                   | `(number`, `string)` []                             | []     |
| options             | 选择项                                                     | { label: `string`, value: `(number`, `string)` } [] | []     |
| insetLabel          | 选择器的标题                                               | string                                              | -      |
| defaultVal          | 组件的默认选项值(`同道系列`一般为`[0]`,如有特殊需单独设置) | `(number`, `string)` []                             | [0]    |
| defaultOptionsLabel | 组件的全选值的 label(如有特殊需单独设置)                   | string                                              | 不限   |
| className           | 类名                                                       | string                                              | -      |

### Events

事件说明如下：

| 事件     | 说明           | 类型                                       | 默认值 |
| -------- | -------------- | ------------------------------------------ | ------ |
| onChange | 返回修改后的值 | ( event: `(number`, `string)` [] ) => void | -      |
