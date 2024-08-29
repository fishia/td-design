---
nav:
  title: TdCascaderModal 级联选择弹窗
  path: 2
group: 数据录入
---

# TdCascaderModal 级联选择弹窗

同道城市，职类等树结构级联选择时使用

**功能**

1、单选
2、多选，设置最大限制
3、默认选中
4、带搜索功能（仅限单选）
5、带底部已选列表(仅多选且可以自定义)
6、自定义搜索下拉列表 render
7、点击关键字触发选中
8、可以根据树结构层级遍历
9、提供 ref 进行开、关操作、返回已选结果

## 代码演示

<code src="./demos/demo1.tsx">单选，仅子节点可选中，选中及结束</code>
<code src="./demos/demo2.tsx">多选，仅子节点可选中，限制 5 个</code>
<code src="./demos/demo7.tsx">默认选中</code>
<code src="./demos/demo3.tsx">单选，带搜索，选中及结束</code>
<code src="./demos/demo4.tsx">多选，带底部已选列表</code>
<code src="./demos/demo5.tsx">单选，搜索框下拉 filter 列表自定义 render</code>
<code src="./demos/demo6.tsx">单选，点击关键字触发即刻结束</code>
<code src="./demos/demo11.tsx">多选，点击关键字触发选中，限制 5 个</code>
<code src="./demos/demo8.tsx">遍历 4 级级联</code>
<code src="./demos/demo9.tsx"> ref 控制开，关</code>
<code src="./demos/demo10.tsx"> 不保留上次选中结果</code>

## API

### TdCascaderModalProps

| 参数                | 说明                                                                              | 类型                                                                          | 默认值          | 版本 |
| ------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------- | ---- |
| treeData            | 数据源                                                                            | Array\<[TdCascaderOption](/components/td-cascader-modal#tdcascaderoption)>    | []              |      |
| value               | 选中 keys(仅多选时叶子节点 key)                                               | Array<[TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype)> | []              |      |
| onlyRecordLeafNode  | 可选，是否仅返回叶子节点                                                          | boolean                                                                       | true            |      |
| leafMaxWidth        | 可选，叶子节点最大宽度                                                            | number                                                                        | 114             |      |
| labelInValue        | 可选，是否把每个选项的 label 包装到 value 中                                      | boolean                                                               | false           |   0.1.3之后默认false   |
| multiple            | 可选，是否开启多选                                                                | boolean                                                                       | false           |      |
| keepAlive           | 可选，是否保留上次叶子选中状态                                                    | boolean                                                                       | true            |      |
| limit               | 可选，限制最大选择（开启多选后有效)                                               | number                                                                        | 5               |      |
| gap                 | 可选，设置选项之间的间隙                                                          | number                                                                        | 16              |      |
| span                | 可选，分多少联(不传会计算树的深度)                                                | number                                                                        | 3               |      |
| spanWidth           | 可选，级联宽度集合(数组长度如果大于 span,则取 span 长度，小于则后面的联宽为 auto) | number[]    
| onChange           | 可选，值变化监听事件                           | (checkedList?: [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype) \| [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype)[])=>void |        |      |
| onConfirm           | 可选，弹窗确定按钮触发事件                           | (checkedList?: [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype) \| [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype)[])=>void |        |      |                                                                  | [192, 192, 414] |      |
| showSearch          | 可选，是否开启搜索（仅单选时有效）                                                | boolean                                                                       | false           |      |
| onSearch            | 可选，自定义搜索 api （仅单选时有效）                                             | Promise<{ label, value }[]>                                                   |                 |      |
| searchInputProps    | 可选，搜索下拉 props 集合 （仅单选时有效）                                        | [SelectProps](https://4x-ant-design.antgroup.com/components/select-cn/)       |                 |      |
| closeWhenCheckedAll | 可选，是否开启当选择到配置文案时 push 有效选中节点                                | boolean                                                                       | false           |      |
| checkAllText        | 可选，配置选中所有并触发关闭的文案                                                | string                                                                        | '全部'          |      |
| TdTagButtonProps    | 可选，搜索下拉 props 集合                                                         | [TdTagButtonProps](/components/td-tag-button#tdtagbuttonprops)                |                 |      |
| footerProps         | 可选，底部多选列表 props 集合(仅多选）                                            | [footerProps](/components/td-cascader-modal#footersprops)                     |                 |      |

### TdCascaderOption

```
export interface TdCascaderOption extends Omit<TdSelectOption, 'children'> {
  children?: Array<TdCascaderOption>;
}

```

### TdCheckedValueType

```
export type TdCheckedValueType = string | number | LabeledValue;

```

### FootersProps                                            
```
export interface FootersProps extends Omit<ButtonProps, 'onChange'> {
  options: Array<TdSelectOption>;
  label?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  onChange?: (v?: TdCheckedValueType) => void;
  onOk?: React.MouseEventHandler<HTMLElement>;
  TdTagSelectProps?: Omit<TdTagSelectProps, 'options'>;
}
```
