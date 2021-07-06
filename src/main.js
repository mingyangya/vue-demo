import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// const VConsole = require('vconsole')
// const vConsole = new VConsole()

import TimeLine from 'vue-time-line-npm'

Vue.use(TimeLine, /* { default options with global component } */)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
