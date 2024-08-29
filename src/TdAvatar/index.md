---
nav:
  title: TdAvatar 头像
  path: 2
group: 数据展示
---

# TdAvatar 头像

同道简历、hr、公司卡片可使用

**变更点**

- 默认图自动填充
- 带头像框
- 默认性别角标
- 马赛克
- 查看大图

## 代码演示

<code src="./demos/demo1.tsx">默认头像填充</code>
<code src="./demos/demo2.tsx">带性别角标</code>
<code src="./demos/demo3.tsx">头像放大</code>
<code src="./demos/demo4.tsx">头像马赛克</code>
<code src="./demos/demo5.tsx">头像框</code>

## API

更多 API 参考[Avatar](https://4x-ant-design.antgroup.com/components/avatar-cn/#header)，以下为差异点

### TdAvatarProps

| 参数             | 说明                                              | 类型    | 默认值   | 版本 |
| ---------------- | ------------------------------------------------- | ------- | -------- | ---- |
| gender           | 可选，性别(1 为男性，0 为女性)                    | number  | 1 （男） |      |
| showGender       | 可选，是否展示性别角标                            | boolean | false    |      |
| deafultAvatarUrl | 可选，如果不传 icon 和 src 属性，自动填充默认头像 | string  |          |      |
| pendantUrl       | 可选，头像框                                      | string  |          |      |
| manUrl           | 可选，男性图标                                    | string  |          |      |
| woManUrl         | 可选，女性图标                                    | string  |          |      |
| pixelated        | 可选，是否开启马赛克，默认不开启                  | bool    | false    |      |
| showGender       | 可选，是否展示性别角标，默认不开启                | bool    | false    |      |
| showBigAvatar    | 可选，是否开启预览大图，默认不开启                | bool    | false    |      |
