---
nav:
  title: TdShareModal 级联选择弹窗
  path: 2
group: 数据展示
---

# TdShareModal 分享弹窗

同道职位分享，周报，月报等分享时使用

**功能**
1、分享复制图片
2、提供默认时间，logo 头标
3、支持自定义分享文案水印
4、支持切换分享背景

## 代码演示

<code src="./demos/demo1.tsx">基础用法</code>
<code src="./demos/demo2.tsx">带日期、logo 头标</code>
<code src="./demos/demo3.tsx">背景替换</code>
<code src="./demos/demo4.tsx">添加分享文案水印</code>

### API
更多 API 参考[Modal](https://4x-ant-design.antgroup.com/components/modal-cn/#API)，以下为差异点

| 属性          | 说明                       | 类型                       | 默认值     |
| ------------- | -------------------------- | -------------------------- | ---------- |
| bgUrlList     | 可选， 背景图列表          | string[]                   | []         |
| bgUrl         | 可选，当前默认背景         | string                     | '有默认图' |
| mouseTipsText | 可选，右侧鼠标复制文案提示 | string\/React.ReactElement |            |
| showHeadLabel | 可选，知否显示时间和 logo  | boolean                    | false      |
| logo          | 可选，分享 logo            | string                     |            |
| year          | 可选，日期-年              | string                     |            |
| month         | 可选，日期-月              | string                     | 默认当月   |
| day           | 可选，日期-日              | string                     | 默认当天   |
| watermarkWord           | 可选，水印文案              | string                     |  |

### 导出ref

```
export interface TdShareModalRef {
  show: () => void
  close: () => void
  toCanvas: () => void
}
```
