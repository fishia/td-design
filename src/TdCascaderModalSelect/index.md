---
nav:
  title: TdCascaderModalSelect 级联选择器
  path: 2
group: 数据录入
---

# TdCascaderModalSelect 级联选择器

## 代码演示

<code src="./demos/demo1.tsx">基本用法</code>
<code src="./demos/demo2.tsx">多选</code>
<code src="./demos/demo3.tsx">form</code>
<code src="./demos/demo4.tsx">form labelInValue</code>

### TdCascaderModalSelectProps
更多 API 参考[Modal](https://4x-ant-design.antgroup.com/components/modal-cn/#API)，以下为差异点

| 参数               | 说明                                       | 类型                                                                                                                                                                     | 默认值 | 版本 |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---- |
| value              | 可选，选中 keys(仅多选时叶子节点 key)      | [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype)                                                                                                   |        |      |
| defaultValue       | 可选， 默认选中 keys(仅多选时叶子节点 key) | [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype)                                                                                                   |        |      |
| selectWrapperClass | 可选，选择框外层容器的类名                 | string                                                                                                                                                                   |        |      |
| placeholder        | 可选， 选择框默认文本                      | string                                                                                                                                                                   |        |      |
| selectProps        | 可选， 下拉框属性集合                      | [selectProps](https://4x.ant.design/components/select-cn/#Select-props)                                                                                                  |        |      |
| onChange           | 可选，值变化监听事件                       | (checkedList?: [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype) \| [TdCheckedValueType](/components/td-cascader-modal#tdcheckedvaluetype)[])=>void |        |      |
