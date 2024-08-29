---
title: TdRangeSelect 范围选择器
nav:
  title: Base
  order: 2
group: 数据录入
---

### 基础用法

范围选择，可选择最低、最高的值

<code src="./demos/index.tsx" >基础用法</code>

### 自定义选择框默认文字 

可以改变选择框的默认文字 

<code src="./demos/changeSelectPlaceholder.tsx" >改变选择框默认文字</code>

### 自定义宽度

可以改变选择器的宽度

<code src="./demos/changeSelectWidth.tsx">改变宽度</code>

### 选择器之间连接符

可以选择是否需要连接符

<code src="./demos/isShowJointMark.tsx">改变宽度</code>

### 自定义单位

可以改变选择器的单位

<code src="./demos/unitSelect.tsx">改变单位</code>

### 限制上下限

当上限小于下限或者下限大于上限时 根据梯度 调整选择的值

<code src="./demos/isLimitBoundRangeSelect.tsx">限制选择的值</code>

### 限制梯度

限制上下限的前提下调整增加减少的梯度

<code src="./demos/gradsSelect.tsx">改变梯度</code>

### 添加选择项

追加月份选择器

<code src="./demos/addMonthSelect.tsx">月份选择器</code>

### API

属性说明如下：

| 属性                | 说明                                                       | 类型                                                | 默认值 |
| ------------------- | ---------------------------------------------------------- | --------------------------------------------------- | ------ |
| value               | 组件的值                                                    | (number \| undefined)[]                             | []     |
| placeholderArr      | 选择框默认文字                                               | string[]                                            | ["最低", "最高", "薪资月份"]     |
| className           | 类名                                                        | string                                              | -      |
| suffixStr           | 单位                                                        | string                                               | 'k'      |
| selectWidth         | 改变选择器的宽度                                             | number                                               | 150      |
| selectStyle         | 改变选择器的样式                                             | CSSProperties                                        | {}      |
| isShowSelectJointMark  | 选择器之间是否展示连接符                                   | boolean                                              | false      |
| selectJointMarkStyle   | 改变连接符的样式                                           | CSSProperties                                        | {}      |
| fromOption          | 最低的  选择项                                               | number[]                                               | []      |
| toOption            | 最高的  选择项                                               | number[]                                               | []      |
| isLimitBound        | 限制选择时上限不可小于下限 下限不可大于上限                     | boolean                                               | false      |
| grads               | isLimitBound为true时 增加减少的梯度                           | number                                                | 2      |
| isMonthSelect       | 追加月份选择器                                                | boolean                                               | false      |
| monthSelectSuffixStr  | 月份选择器的单位                                            | string                                                | '薪'      |
| monthOption         | 追加月份选择器后的选择项                                       | number[]                                               | []      |

### Events

事件说明如下：

| 事件     | 说明           | 类型                                       | 默认值 |
| -------- | -------------- | ------------------------------------------ | ------ |
| onChange | 返回修改后的值 | ( event: (number \| undefined)[] ) => void | -      |
