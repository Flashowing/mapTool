import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import Clipboard from 'v-clipboard'
import 'element-ui/lib/theme-chalk/index.css'

import * as Cesium from 'cesium'
window.Cesium = Cesium
Vue.config.productionTip = false

Vue.use(Clipboard)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
