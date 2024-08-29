---
category: Components
group: 数据展示
title: TdAutoScroller 自动滚动列表
---

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用无限的、连续滚动的形式进行展现。
- 常用于一组图片或卡片滚动。
- 连播请参考 antd [carousel](https://4x.ant.design/components/carousel-cn/)。

## 代码演示

<code src="./demo/basic.tsx">基本</code>
<code src="./demo/direction.tsx">改变滚动方向和坐标轴方向</code>

## API

| 参数         | 说明                                  | 类型                | 默认值   | 版本 |
| ------------ | ------------------------------------- | ------------------- | -------- | ---- |
| duration     | 动画滚动时间                          | number              | 20       |      |
| direction    | 动画滚动方向，可选 `normal` `reverse` | string              | `normal` |      |
| axis         | 动画滚动坐标轴， 可选 `X` `Y`         | string              | `X`      |      |
| customStyle  | 包裹容器自定义样式                    | React.CSSProperties | {}       |      |
| defaultState | 滚动的初始状态                        | boolean             | true     |

## 方法

| 名称                     | 描述             |
| ------------------------ | ---------------- |
| toggleAnimationPlayState | 手动切换滚动状态 |
