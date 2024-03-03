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
    cover: require('@/assets/img/cover/zoom-img.gif'),
    hoverCover: require('@/assets/img/cover/zoom-img.gif'),
    mata: {},
  },
  {
    name: 'testVideo',
    path: '/test/video',
    nickname: '音视频--打点功能',
    componentPath: routerPath('TestVideo'),
    mata: {},
  },
  {
    name: 'player',
    path: '/player',
    nickname: '音视频打点-player',
    cover: require('@/assets/img/cover/player-point.gif'),
    hoverCover: require('@/assets/img/cover/player-point.gif'),
    componentPath: routerPath('player/index'),
    mata: {},
  },
  {
    name: 'notice',
    path: '/notice',
    nickname: '无缝滚动效果',
    cover: require('@/assets/img/cover/notice.gif'),
    hoverCover: require('@/assets/img/cover/notice.gif'),
    componentPath: routerPath('notice/index'),
    mata: {},
  },
  {
    name: 'table',
    path: '/table',
    nickname: 'table导出excel',
    cover: require('@/assets/img/cover/notice.gif'),
    hoverCover: require('@/assets/img/cover/notice.gif'),
    componentPath: routerPath('table/index'),
    mata: {},
  },
  {
    name: 'map-3d',
    path: '/map-3d',
    nickname: '3dmap',
    // cover: require('@/assets/img/cover/notice.gif'),
    // hoverCover: require('@/assets/img/cover/notice.gif'),
    componentPath: routerPath('map-3d/index'),
    mata: {},
  },
  {
    name: 'map-3d1',
    path: '/map-3d1',
    nickname: '3dmap1',
    componentPath: routerPath('map-3d/map'),
    mata: {},
  },
  {
    name: 'test',
    path: '/test',
    nickname: 'test',
    componentPath: routerPath('test-demo/index'),
    mata: {},
  },
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