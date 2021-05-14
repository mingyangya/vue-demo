import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ModalPluginV2 from 'gkuiV2/modal'

// 引入全局组件
Vue.use(ModalPluginV2, {
  color: 'base',
  okBtnColor: 'dashboard-blue',
  cancelBtnColor: 'dashboard-gray-border'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
