---
nav:
  title: TdTagSelect 标签选择器
  path: 2
group:
  title: 数据录入
  order: 3
---

# TdTagSelect 标签选择器

同道搜索人才集成式筛选面板、选择弹窗使用
**功能**

1、单选
2、多选，设置最大限制
3、提供 Flex 所有布局
4、选中结果提供 labelInValue 配置
5、选择连续模式/非连续模式
6、主标题，说明，副标题
7、开启关闭 Icon 时，点击按钮反选失效

## 代码演示

<code src="./demos/demo1.tsx">基本用法(单选）</code>
<code src="./demos/demo2.tsx">基本用法(多选）</code>
<code src="./demos/demo3.tsx">带标题描述，限制选项个数</code>
<code src="./demos/demo4.tsx">横纵布局</code>
<code src="./demos/demo5.tsx">连续选择</code>
<code src="./demos/demo6.tsx">labelInValue 返回对象</code>
<code src="./demos/demo7.tsx">开启关闭 Icon 时，点击按钮反选失效</code>
<code src="./demos/demo8.tsx">form示例</code>

## API

### TdTagSelectProps

| 参数             | 说明                                                                                                                             | 类型                                                                                                                                                          | 默认值       | 版本 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---- |
| options          | 数据源                                                                                                                           | Array\<Omit\<[TdTagButtonProps](/components/td-tag-button#tdtagbuttonprops), 'value'\>&[LabeledValue](/components/td-tag-select#labeledvalue)>                | []           |      |
| value            | 可选，值                                                                                                                     | string \| string[]\| number \| number[] \| [LabeledValue](/components/td-tag-select#labeledvalue) \| [LabeledValue](/components/td-tag-select#labeledvalue)[] |              |      |
| defaultValue            | 可选，默认值                                                                                                                     | string \| string[]\| number \| number[] \| [LabeledValue](/components/td-tag-select#labeledvalue) \| [LabeledValue](/components/td-tag-select#labeledvalue)[] |              |      |
| direction        | 可选，排版布局                                                                                                                   | 'row' \| 'row-reverse' \| 'column' \| 'column-reverse'                                                                                                        | 'row'        |      |
| justify          | 可选，设置元素在主轴方向上的对齐方式                                                                                             | FlexProps['justify']                                                                                                                                          | 'flex-start' |      |
| align            | 可选，设置元素在交叉轴方向上的对齐方式                                                                                           | FlexProps['align']                                                                                                                                            | '            |      |
| labelInValue     | 可选，是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 { value: string, label: ReactNode } 的格式 | boolean                                                                                                                                                       | false        |      |
| continuous       | 可选，是否开启连续选择                                                                                                           | boolean                                                                                                                                                       | false        |      |
| multiple         | 可选，是否开启多选                                                                                                               | boolean                                                                                                                                                       | false        |      |
| limit            | 可选，限制最大选择（开启多选后有效)                                                                                              | number                                                                                                                                                        |              |      |
| gap              | 可选，设置选项之间的间隙                                                                                                         | number                                                                                                                                                        | 16           |      |
| title            | 可选，标题                                                                                                                       | string \| React.ReactNode                                                                                                                                     |              |      |
| desc             | 可选，标题描述                                                                                                                   | string \| React.ReactNode                                                                                                                                     |              |      |
| TdTagButtonProps | 可选，可全局实现 TdTagButton 属性，优先级小于 options                                                                            | Omit<[TdTagButtonProps](/components/td-tag-button#tdtagbuttonprops),'checked'>                                                                                |              |

### LabeledValue

| 参数       | 说明                    | 类型                         | 默认值 | 版本 |
| ---------- | ----------------------- | ---------------------------- | ------ | ---- |
| value      | 值                      | string \| number             |        |      |
| label      | 可选，显示文案          | string                       |        |      |
| orderIndex | 可选， 索引排序         | number                       |        |      |
| isLeaf     | 可选， 是否叶子节点     | boolean                      |        |      |
| disabled   | 可选， 是否禁用         | boolean                      | false  |      |
| loading    | 可选， 是否开启 loading | boolean \| { delay: number } | false  |      |
