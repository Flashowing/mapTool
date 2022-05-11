import Vue from 'vue'
import VueRouter from 'vue-router'
import CesiumContainer from '@/views/transform/CesiumContainer.vue'
import Home from '@/views/main/Home.vue'
import CountScore from '@/views/countScore/countScore'

console.log(CesiumContainer)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/countScore',
    name: 'countScore',
    component: CountScore
  },
  {
    path: '/coordTrans',
    name: 'cesiumContainer',
    component: CesiumContainer
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
