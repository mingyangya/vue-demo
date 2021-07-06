import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ZoomImg from '../views/zoom-img/index.vue'
import Timeline from '../views/timeline/Index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/zoom-img',
    name: 'zoomImg',
    component: ZoomImg,
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: Timeline,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
