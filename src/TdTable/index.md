---
nav:
  title: 组件
  path: /components
group:
  title: 数据显示
  path: /data-display
  order: 3
---

# TdTable 数据表格

数据表格，基于 Antd Table 二次封装

**差异点**

- 新增: 添加工具栏，支持刷新数据和列设置，默认显示
- 新增: 支持表格自适应外部容器，默认开启
- 变更: 分页显示添加了一些默认设置
- 变更: 列默认添加序号显示，可动态配置
- 变更: UI采用最新同道样式，默认去除border

## 代码演示

<code src="./demos/demo1.tsx">基本用法</code>
<code src="./demos/demo8.tsx">空值</code>
<code src="./demos/demo9.tsx">可选择</code>
<code src="./demos/demo2.tsx">列设置</code>
<code src="./demos/demo3.tsx">添加额外功能按钮</code>
<code src="./demos/demo4.tsx">自定义行内操作按钮</code>
<code src="./demos/demo5.tsx">列设置了宽度时才支持伸缩</code>
<code src="./demos/demo7.tsx">固定列</code>
<code src="./demos/demo6.tsx">使用 ahooks useAntdTable</code>

## API

更多表格 API 参考[Table](https://ant.design/components/table-cn/)，以下为差异点

| 参数                     | 说明                                                | 类型                    | 默认值   | 版本  |
| ------------------------ | --------------------------------------------------- | ----------------------- | -------- | ----- |
| toolbar                  | 是否显示工具栏                                      | boolean                 | true     |       |
| toolbarClassName         | 工具栏的类名                                        | string                  | -        |       |
| toolbarTilte             | 工具栏标题                                          | string\|React.ReactNode | 查询结果 |       |
| buttonGroup              | 按钮块渲染                                          | React.ReactNode         | -        |       |
| refreshIconVisible       | 刷新按钮图表是否可见                                | boolean                 | true     | 2.3.1 |
| hideColumnHeight         | 是否隐藏列高度设置                                  | boolean                 | false    |       |
| hideColumnSetting        | 是否隐藏列设置                                      | boolean                 | false    |       |
| defaultVisibleColumnKeys | 默认显示的列                                        | Array                   | -        |       |
| visibleColumnKeys        | 显示列                                              | Array                   | -        | 2.4.1 |
| columnResizable          | 可伸缩列                                            | boolean                 | false    |       |
| indexColumn              | 表格列中是否显示序号                                | boolean                 | true     |       |
| indexTitle               | 序号列标题                                          | string                  | 序号     |       |
| indexFixed               | 序号是否固定，可选 true(等效于 left) 'left' 'right' | boolean\|string         | false    | 2.5.0 |
| startIndex               | 序列号的初始值，后台分页加载数据时使用              | number                  | 1        |       |
| autoFit                  | 自适应于外部高度（需要外部容器设有高度）            | boolean                 | true     |       |
| headFootHeight           | 表头和表尾的高度和，与 `autoFit` 结合使用           | number                  | 115      |       |
| emptyText                | 空数据自定义显示文本                                | string\|React.ReactNode | 暂无数据 | 2.5.0 |
| onRefresh                | 点击刷新图标的回调                                  | Function                | -        |       |
| onVisibleColumnsChange   | 列设置发生变化时的回调                              | Function(keys)          | -        |       |
| onRowSelectionClear      | 列选择提示清点击清空选择的回调                      | Function()              | -        | 3.0.0 |

### columns

| 参数                    | 说明                                     | 类型                                               | 默认值 | 版本 |
| ----------------------- | ---------------------------------------- | -------------------------------------------------- | ------ | ---- |
| renderButtons           | 操作按钮的渲染函数                       | Function(text, record, index) {} => buttonConfig[] |        |      |
| renderButtonsVisibleNum | 默认显示的按钮个数，其它则放在更多中显示 | number                                             | 4      |      |

**buttonConfig**

```js
renderButtons(text, record, index) {
    return [
        {
            // 按钮名称
            name: '编辑',
            // 点击按钮触发的回调函数
            onClick() {
                console.log(text, record, index);
            },
            // 是否隐藏此按钮，权限控制时可使用此属性
            visible: true,
        },
        {
            name: '查看',
            onClick() {
                console.log(text, record, index);
            },
        },
        {
            name: '删除',
            // 开启气泡确认
            popconfirm: {
                title: '是否确认删除',
                confirm() {
                    console.log(text, record, index);
                },
            },
        },
        {
            name: '审批',
            onClick() {
                console.log(text, record, index);
            },
        },
        {
          children:<RefreshJobBtn
                  onOk={cb}
                  key={JobOperator.REFRESH}
                  jobIds={jobInfos.map(R.prop('id'))}
                  getJobInfo={() => Promise.resolve(jobInfos)}
                  buttonProps={{
                    type: 'primary',
                    children: '批量刷新',
                    disabled: !jobInfos.length,
                  }}
                  isBatch
                />
        }
    ];
},
```
