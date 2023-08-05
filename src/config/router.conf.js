const viewPath = 'views/'
const routerPath = (path, root = viewPath) => `${root}${path}`

const config = [
  {
    name: 'home',
    nickname: '首页',
    isNotMenu: true,
    path: '/',
    componentPath: routerPath('Home'),
    mata: {},
  },
  {
    name: 'zoomImg',
    nickname: '查看大图',
    path: '/zoom-img',
    componentPath: routerPath('zoom-img/index'),
    mata: {},
  },
  {
    name: 'animation',
    nickname: '动画',
    path: '/animation',
    componentPath: routerPath('vue-animation/Index'),
    mata: {},
  },
  {
    name: 'test',
    path: '/test',
    nickname: '测试',
    componentPath: routerPath('Test'),
    mata: {},
  },
  {
    name: 'back',
    path: '/back',
    nickname: '返回',
    componentPath: routerPath('Back'),
    mata: {},
  },
  {
    name: 'testVideo',
    path: '/test/video',
    nickname: '测试视频',
    componentPath: routerPath('TestVideo'),
    mata: {},
  },
  {
    name: 'shape',
    path: '/shape',
    nickname: '形状',
    componentPath: routerPath('TestVideo'),
    mata: {},
  },
  // {
  //   name: 'shapeDemo',
  //   path: '/shape/demo',
  //   componentPath: 'components/shape/Demo',
  //   mata: {},
  // },
  {
    name: 'bing',
    path: '/bing',
    nickname: 'bing',
    componentPath: routerPath('BingDemo'),
    mata: {},
  },
  {
    name: 'notice',
    path: '/notice',
    nickname: 'notice',
    componentPath: routerPath('Notice'),
    mata: {},
  },
  {
    name: 'notice',
    path: '/notice',
    nickname: 'notice',
    componentPath: routerPath('Notice'),
    mata: {},
  }
]

export const routerConf = config.map(item => {
  const { name, path, componentPath, meta } = item

  return { name, path, componentPath, meta }
})

// 默认cover
const defaultCover = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

// 菜单
export const routerMenuList = config.filter(item => !item?.isNotMenu).map(item => {

  const { name, nickname, desc, cover, path } = item

  return {
    nickname,
    name,
    desc: desc || name,
    path,
    cover: cover || defaultCover
  }
})