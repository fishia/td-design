//plugins/plugin01.ts
import { IApi } from 'umi'
// 插件模块默认接收一个参数api 里面有各种hook可供调用
export default function (api: IApi) {
  // 使用api.addHTMLHeadScripts方法,打包时给html文件的head中添加一个script标签和内容
  api.addHTMLHeadScripts(() => ({
    src: 'https://oss.yimaitongdao.com/script/AliyunCaptcha.js',
  }))
}
