import { defineConfig } from 'dumi'

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '同道-前端工程站',
    'primary-color': '#1DA57A',
    hero: {
      title: '同道-前端工程站',
      description:
        '同道前端工程站点，集所有同道系列复用的基础组件，业务组件，css片段，js-sdk，的统一维护站点',
      actions: [
        {
          text: '开始使用',
          link: '/components',
        },
      ],
      features: [
        {
          title: '基础组件',
          description:
            '同道风格的基础组件，基于antd组件二次开发，是同道组件库中的原子组件',
        },
        {
          title: '业务组件',
          description:
            '基于基础组件，封装出的同道业务组件，开箱即用，提供给各个同道业务线使用',
        },
        {
          title: '工具类',
          description:
            '各类同道js工具类，方便开发者使用，统一封装各类通用工具函数',
        },
        {
          title: '统一的css样式包',
          description: '同道统一css样式包，原子css样式，默认原生样式覆盖',
        },
      ],
    },
    footer: false,
    socialLinks: {
      github:
        'https://devcloud.huaweicloud.com/codehub/project/78c51a1192114c6aab8c975e2d864a3a/codehub/1363228/home?ref=master',
    },
    demo: {
      lazyLoading: false,
    },
    nav: {
      mode: 'override',
      value: [
        { title: '基础组件', link: '/components' },
        { title: '业务组件', link: '/business' },
        { title: '工具类', link: '/utils' },
        { title: 'css样式包', link: '/cssstyle' },
      ],
    },
  },
  targets: {
    ie: 11,
  },
})
