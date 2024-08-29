---
nav:
  title: TdTagButton 标签按钮
  path: 2
group: 通用
---

# TdTagButton 标签按钮

同道人才标签，吸引力标签，hr 标签，在线状态，职类选择等
**功能**

1、提供多个默认主题（仅作展示)
2、设置不同尺寸
3、选中可关闭
4、内容溢出省略模式或换行模式
5、checkBox 模式
6、disabled 状态提供点击事件

## 代码演示

<code src="./demos/demo1.tsx">按钮主题（仅作展示，关闭 hover)</code>
<code src="./demos/demo2.tsx">不同尺寸</code>
<code src="./demos/demo7.tsx">文案位置</code>
<code src="./demos/demo3.tsx">选中可关闭</code>
<code src="./demos/demo4.tsx">内容溢出省略模式或换行模式</code>
<code src="./demos/demo5.tsx">checkBox 模式,icon 设为 null 可以默认为 primary 按钮的 ghost 模式</code>
<code src="./demos/demo6.tsx">disabled 状态可点击</code>
<code src="./demos/demo8.tsx">form 表单</code>

## API

更多 API 参考[Button](https://4x-ant-design.antgroup.com/components/button-cn/#API)，以下为差异点

### TdTagButtonProps

| 参数            | 说明                                             | 类型                                                             | 默认值    | 版本 |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------- | --------- | ---- |
| closable        | 可选，是否显示关闭按钮                           | boolean                                                          | false     |      |
| closeIcon       | 可选，关闭 icon                                  | React.ReactNode                                                  |           |      |
| noHover         | 可选，是否去除 hover 样式,仅做展示               | boolean                                                          | false     |      |
| checked         | 可选，选中状态                                   | boolean                                                          |
| defaultChecked  | 可选，初始是否选中                               | boolean                                                          | false     |      |
| icon            | 可选，选中 icon，开启 checkbox 模式生效          | React.ReactNode                                                  |           |      |
| width           | 可选，标签宽度                                   | number                                                           |           |      |
| ellipsis        | 可选，是否开启内容溢出省略（配合 width 属性使用) | boolean                                                          | false     |      |
| bordered        | 可选，是否有边框                                 | boolean                                                          | false     |      |
| inverseSelectionMode        | 可选，是否禁止checkBox模式                                 | boolean                                                          | false     |      |
| theme           | 可选，主题模式（优先级大于 ButtonType)           | 'default' \| 'warm' \| 'cold' \| 'hope' \| 'hurry' \| 'official' | 'default' |      |
| align           | 可选，文案位置                                   | 'left' \| 'center' \| 'right'                                    | 'left'    |
| onClick         | 可选，标签点击                                   | (e,checked)=>void                                                |
| onChange        | 可选，监听值变化                                 | (checked)=>void                                                  |           |      |
| onClose         | 可选，标签移除关闭                               | function                                                         |           |      |
| onDisabledClick | 可选，disabled 为 true 时可记录点击              | function                                                         |           |      |
