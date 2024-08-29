---
title: TdSkeleton 骨架屏组件
toc: content

group:
  title: 业务组件
  order: 4
---

### 功能介绍

1、骨架屏类型有： 简历详情、人才卡片列表

### 使用方式

# 基础用法

<code src="../../src/business/TdSkeleton/demos/profiledetail.tsx" >简历详情</code>
<code src="../../src/business/TdSkeleton/demos/profilelist.tsx" >简历卡片列表</code>

### API

属性说明如下：

| 属性          | 说明                                         | 类型                              | 是否必传参数 | 默认值    |
| ------------- | -------------------------------------------- | --------------------------------- | ------------ | --------- |
| tdType        | 骨架屏类型                                   | 'profile-detail' 、'profile-list' | 是           |
| active        | 是否展示动画效果                             | boolean                           | 否           |
| avatar        | 头像属性，继承 ant d SkeletonAvatarProps     | SkeletonAvatarProps               | 否           |
| loading       | 为 true 时，显示占位图。反之则直接展示子组件 | boolean                           | 是           | 默认 true |
| className     | 组件类名                                     | string                            | 否           |
| paragraphSize | paragraph 长度，                             | number                            | 否           |
