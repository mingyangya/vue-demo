import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ZoomImg from '../views/zoom-img/index.vue'
import Test from '../views/Test.vue'
import Animation from '../views/vue-animation/Index.vue'
import Barrage from '../views/barrage/index.vue'
import Shape from '@/views/shape/Index.vue'
import ShapeDemo from '../components/shape/Demo.vue'
import BingDemo from '../views/BingDemo.vue'
import Notice from '../views/Notice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/zoom-img',
    name: 'ZoomImg',
    component: ZoomImg,
  },
  {
    path: '/animation',
    name: 'animation',
    component: Animation,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/back',
    name: 'Back',
    component: () => import(/* webpackChunkName: "back" */ '../views/Back.vue'),
  },
  {
    path: '/test/video',
    name: 'TestVideo',
    component: () => import(/* webpackChunkName: "testVideo" */ '../views/TestVideo.vue'),
    path: '/barrage',
    name: 'Barrage',
    component: Barrage,
  },
  {
    path: '/shape',
    name: 'Shpae',
    component: Shape,
  },
  {
    path: '/shape/demo',
    name: 'ShpaeDemo',
    component: ShapeDemo,
  },
  {
    path: '/bing',
    name: 'bingDemo',
    component: BingDemo,
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
