---
nav:
  title: TdDatePicker 日期选择框
  path: 2
group: 数据录入
---

# TdDatePicker 日期选择框

输入或选择日期，时间的控件。

**变更点**

- `value` 日期类型同时支持 和 `string`
- 支持默认返回字符串
- 支持最早、最晚可选择时间范围

## 代码演示

<code src="./demos/demo1.tsx">初始日期可默认传字符串</code>
<code src="./demos/demo2.tsx">直接传不可选择日期范围</code>
<code src="./demos/demo3.tsx">Form 表单用法</code>

## API

更多 API 参考[DatePicker](https://4x-ant-design.antgroup.com/components/date-picker-cn/) ，以下为差异点

### TdDatePicker

| 参数                   | 说明           | 类型                                    | 默认值 | 版本 |
| ---------------------- | -------------- | --------------------------------------- | ------ | ---- |
| value                  | 日期           | [moment](https://momentjs.com/)\|string | 无     |      |
| earliestSelectableDate | 最早可选择时间 | string                                  | 无     |      |
| latestSelectableDate   | 最晚可选择时间 | string                                  | 无     |      |

### TdWeekPicker

| 参数                   | 说明           | 类型                                    | 默认值 | 版本 |
| ---------------------- | -------------- | --------------------------------------- | ------ | ---- |
| value                  | 日期           | [moment](https://momentjs.com/)\|string | 无     |      |
| earliestSelectableDate | 最早可选择时间 | string                                  | 无     |      |
| latestSelectableDate   | 最晚可选择时间 | string                                  | 无     |      |

### TdMonthPicker

| 参数                   | 说明           | 类型                                    | 默认值 | 版本 |
| ---------------------- | -------------- | --------------------------------------- | ------ | ---- |
| value                  | 日期           | [moment](https://momentjs.com/)\|string | 无     |      |
| earliestSelectableDate | 最早可选择时间 | string                                  | 无     |      |
| latestSelectableDate   | 最晚可选择时间 | string                                  | 无     |      |

### TdYearPicker

| 参数     | 说明                                     | 类型                                       | 默认值 | 版本 |
| -------- | ---------------------------------------- | ------------------------------------------ | ------ | ---- |
| format   | 展示的日期格式                           | string                                     | "YYYY" |      |
| value    | 日期                                     | [moment](https://momentjs.com/)\|string    | 无     |      |
| onChange | 时间发生变化的回调，发生在用户选择时间时 | function(date: moment, dateString: string) | -      |      |

### TdRangePicker

| 参数                   | 说明           | 类型                                    | 默认值 | 版本 |
| ---------------------- | -------------- | --------------------------------------- | ------ | ---- |
| value                  | 日期           | [moment](https://momentjs.com/)\|string | 无     |      |
| earliestSelectableDate | 最早可选择时间 | string                                  | 无     |      |
| latestSelectableDate   | 最晚可选择时间 | string                                  | 无     |      |
