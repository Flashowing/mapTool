import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import Clipboard from 'v-clipboard'
import 'element-ui/lib/theme-chalk/index.css'
import { VueJsonp } from 'vue-jsonp'
import { Popup } from 'vant'
import { Icon } from 'vant'
import { ActionSheet } from 'vant'
import * as Cesium from 'cesium'

window.Cesium = Cesium
Vue.config.productionTip = false

Vue.use(Popup)
Vue.use(Icon)
Vue.use(ActionSheet)

Vue.use(VueJsonp)
Vue.use(Clipboard)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
