import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import Clipboard from 'v-clipboard'
import 'element-ui/lib/theme-chalk/index.css'
import { VueJsonp } from 'vue-jsonp'
import * as Cesium from 'cesium'
import { Button } from 'vant';
window.Cesium = Cesium
Vue.config.productionTip = false

Vue.use(VueJsonp)
Vue.use(Clipboard)
Vue.use(ElementUI)
app.use(Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
