---
title: TdTimeline 时间轴
order: 1
nav:
  title: Base
  order: 4
---

**功能**
1、可配置字段隐藏占位
2、时间节点图标可配置

### 使用方式

人才卡片使用

# 基础用法

<code src="./demos/demo1.tsx">配置字段隐藏占位</code>

### API

| 属性       | 说明                                                          | 类型                         | 是否必填参数 | 默认值 |
| ---------- | ------------------------------------------------------------- | ---------------------------- | ------------ | ------ |
| className  | 自定义样式                                                    | string                       | 否           | -      |
| list       | 时间轴列表                                                    | IFieldNamesProps[]或者 any[] | 是           | []     |
| fieldNames | 自定义节点 iconUrl、start_time、end_time、text1、text2 的字段 | IFieldNamesProps             | 否           | -      |
| hiddenKey  | 密文显示的字段                                                | ['text1','text2']            | 否           | -      |
