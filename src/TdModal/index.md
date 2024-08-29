---
title: TdModal 基础弹窗
order: 1
nav:
  title: Base
  order: 1
group:
  title: 数据展示
  order: 2
---

<code src="./demos/index.tsx" >基础用法</code>

<code src="./demos/no-close-btn.tsx" >弹窗无背景、无阴影</code>

### API

继承 antd [modal 全量属性](https://ant.design/components/modal-cn#api), 并新增属性如下：

| 属性        | 说明             | 类型    | 默认值          |
| ----------- | ---------------- | ------- | --------------- |
| className   | 自定义弹窗样式   | string  | -               |
| noBoxShadow | 是否显示弹窗阴影 | boolean | false(默认显示) |
| noContentBg | 是否显示背景颜色 | boolean | false(默认显示) |

### Events

继承 antd modal 全量事件

### 组件维护记录

维护人：lena
| 迭代日期 | 迭代内容 | 备注 |
| -------------- | ---------------------- | -------------------------------|
| 2023 年 10 月 24 日 | 创建 TdModal.showModal()方法 | - |
