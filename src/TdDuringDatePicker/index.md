---
nav:
  title: TdDuringDatePicker 时间范围选择器
  path: 2
group: 数据录入
---

# TdDuringDatePicker 时间范围选择器

输入或选择日期，时间的控件。

**变更点**

- `value` 日期类型同时支持 和 `string`
- `onChange` 返回 `string[]`
- 支持显示"至今"
- 严格限制前后时间范围大小
- 限制未满 18 岁
- 限制选择未来时间

## 代码演示

<code src="./demos/demo1.tsx">默认用法</code>
<code src="./demos/demo2.tsx">限制未成年</code>
<code src="./demos/demo3.tsx">可选择未来时间</code>
<code src="./demos/demo4.tsx">form 示例</code>

<!-- <code src="./demo/demo2.tsx"> -->

## API

更多 API 参考[DatePicker](https://4x-ant-design.antgroup.com/components/date-picker-cn/#API) ，以下为差异点

### TdDatePicker

| 参数                              | 说明                             | 类型                                                                                                                       | 默认值                  | 版本 |
| --------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---- |
| value                             | 可选，值                         | (string \| undefined)[]                                                                                                    | []                      |      |
| defaultValue                      | 可选，默认值                     | (string \| undefined)[]                                                                                                    | []                      |      |
| placeholders                      | 可选，提示词                     | string[]                                                                                                                   | ['开始时间','结束时间'] |      |
| width                             | 可选，时间选择器宽度             | number                                                                                                                     | 230                     |      |
| format                            | 可选，设置日期格式               | [DatePickerProps](https://4x-ant-design.antgroup.com/components/date-picker-cn/#%E5%85%B1%E5%90%8C%E7%9A%84-API)['format'] | 'YYYY-MM'               |      |
| picker                            | 可选，设置选择器类型             | [DatePickerProps](https://4x-ant-design.antgroup.com/components/date-picker-cn/#%E5%85%B1%E5%90%8C%E7%9A%84-API)['picker'] | 'month'                 |      |
| showHitherto                      | 可选，是否开启至今文本渲染       | boolean                                                                                                                    | false                   |      |
| hitherto                          | 可选，是否直接显示"至今"         | boolean                                                                                                                    | false                   |      |
| todayText                         | 可选，开启至今文本渲染后文案设置 | string                                                                                                                     | '至今'                  |      |
| noMinors                          | 可选，是否禁止未成年             | boolean                                                                                                                    | false                   |      |
| canChooseFuture                   | 可选，是否可选择未来的时间       | boolean                                                                                                                    | false                   |      |
| startDatePickerProps              | 可选，开始时间选择器属性集合     | [DatePickerProps](https://4x-ant-design.antgroup.com/components/date-picker-cn/#API)                                       |                         |      |
| canChoosendDatePickerPropseFuture | 可选，结束时间选择器属性集合     | [DatePickerProps](https://4x-ant-design.antgroup.com/components/date-picker-cn/#API)                                       |                         |      |
