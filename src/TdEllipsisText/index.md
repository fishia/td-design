---
title: TdEllipsisText 文本溢出
order: 1
nav:
  title: Base
  order: 4
group: 数据展示
---

### 功能介绍

1、超出 n 行省略
2、设置行宽
3、设置指定字符长度
4、设置可展开/收起
5、展开/收起自定义
6、设置仅可展开 1 次
7、自定义 tooltips
8、触发展开、收起回调

### 使用方式

# 基础用法

<code src="./demos/rowEllips.tsx" >n 行溢出省略</code>

<code src="./demos/spanEllips.tsx" >超出指定字符长度</code>

<code src="./demos/toggle.tsx" >展开收起</code>

<code src="./demos/tooltip.tsx" >自定义 tooltip</code>

### API

属性说明如下：

| 属性        | 说明               | 类型                     | 是否必传参数 | 默认值 |
| ----------- | ------------------ | ------------------------ | ------------ | ------ |
| text        | 文本内容           | string                   | 是           |
| maxLength   | 最多显示的字符长度 | number                   | 否           |
| maxRows     | 最多显示的行数     | number                   | 否           |
| rowWidth    | 自定义行宽         | string 如'200px'或'100%' | '100%'       |
| expandable  | 是否可展开或收起   | boolean                  | 否           |
| expandText  | 自定义展开描述文案 | ReactNode 或 string      | 否           |
| foldText    | 自定义收起描述文案 | ReactNode 或 string      | 否           |
| expandOnce  | 仅展开一次         | boolean                  | 否           |
| tooltipProp | 省略时展示提示信息 | TooltipProps             | 否           |

### Events

事件说明如下：

| 事件       | 说明         | 类型       | 默认值 |
| ---------- | ------------ | ---------- | ------ |
| onExpand   | 展开时的回调 | () => void | -      |
| onEllipsis | 收起时的回调 | () => void | -      |
