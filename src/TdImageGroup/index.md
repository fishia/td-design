---
nav:
  title: TdImageGroup 图片组
  path: 2
group: 数据展示
---

# TdImageGroup 图片组

**何时使用**

- 需要展示图片时使用。
- 加载大图时显示 loading 或加载失败时容错处理。
- 图片需要做轮播并预览时

## 代码演示

<code src="./demos/demo1.tsx">默认图片可预览</code>
<code src="./demos/demo2.tsx">容错处理</code>
<code src="./demos/demo3.tsx">相册模式</code>
<code src="./demos/demo4.tsx">多图可受控轮播（hover 停止)</code>
<code src="./demos/demo5.tsx">支持缩略图预览</code>

### TdImageGroupProps

| 参数          | 说明                                                                                                                                                         | 类型              | 默认值       | 版本 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- | ------------ | ---- |
| urls          | 必填， 数组长度为 1 时，参考 antd [Image](https://4x-ant-design.antgroup.com/components/Image-cn/#header)单张图片用法，长度大于 1 时为图片组，可开启相册模式 | ThumbImageProps[] | []           |      |
| errorImage    | 可选，图片加载出错占位图                                                                                                                                     | string            | 不传有默认图 |      |
| current       | 可选，设置图片预览开始位置                                                                                                                                   | number            | 0            |      |
| autoplay      | 可选，开启图片轮播                                                                                                                                           | boolean           | false        |      |
| duration      | 可选，轮播持续时间(s)                                                                                                                                        | number            | 30000        |      |
| pauseOnHover  | 可选，开启轮播后，设置 hover 可暂停                                                                                                                          | boolean           | false        |      |
| width         | 可选，统一设置所有图片宽度                                                                                                                                   | string \| number  | 200          |      |
| height        | 可选，统一设置所有图片高度                                                                                                                                   | string \| number  | 200          |      |
| onImageClick  | 可选，图片组监听点击                                                                                                                                         |                   | false        |      |
| rootClassName | 可选，轮播父元素类                                                                                                                                           | string            |              |      |

### ThumbImageProps

更多 API 参考[Image](https://4x-ant-design.antgroup.com/components/Image-cn/#header)，以下为差异点

| 参数  | 说明       | 类型   | 默认值 | 版本 |
| ----- | ---------- | ------ | ------ | ---- |
| thumb | 缩略图地址 | string |        |      |
