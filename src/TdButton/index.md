---
title: TdButton 按钮
group:
  title: 通用
  order: 0
nav:
  title: Base
  order: 1
---

### 变更点

- 增加了 onClick 的 loading 控制方便做自身做了节流控件
- disabled 情况下可点击提示
- 增加倒计时模式
- 提供 ref 控制倒计时

## 代码演示

<code src="./demos/type.tsx" >基础用法</code>
<code src="./demos/onClick.tsx" >自带节流</code>
<code src="./demos/diabledClick.tsx" >置灰可点击</code>
<code src="./demos/demo.tsx">倒计时</code>
<code src="./demos/demo1.tsx" >ref 控制倒计时开始</code>

## API

更多 API 参考[Button](https://4x-ant-design.antgroup.com/components/button-cn/)，以下为差异点

| 参数            | 说明                           | 类型            | 默认值       | 版本 |
| --------------- | ------------------------------ | --------------- | ------------ | ---- |
| onDisabledClick | 可选，点击确认后监控值变化事件 | (event) => void |              |      |
| countDown       | 可选，是否开启倒计时           | boolean         | false        |      |
| seconds         | 可选，倒计时长                 | number          | 60           |      |
| countDownText   | 可选，倒计时开始后文案         | string          | '后重新获取' |      |

### TdButton ref

```
export interface TdButtonRef {
  startCounting(): void;   // 手动开启计时
  counting?: boolean;
}

```
