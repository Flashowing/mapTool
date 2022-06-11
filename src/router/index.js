import Vue from 'vue'
import VueRouter from 'vue-router'
import TransformMain from '@/views/transform/Main.vue'
import Home from '@/views/main/Home.vue'
import CountScore from '@/views/countScore/countScore'
import Calculator from '@/views/countScore/CalculatorContent'
import CoordinatePickUp from '@/views/coordinatePickUp/coordinatePickUp'
import coordLocation from '@/views/coordLocation/coordLocation'

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
    component: TransformMain
  },
  {
    path: '/coordLocation',
    name: 'coordLocation',
    component: coordLocation
  },
  {
    path: '/coordinatePickUp',
    name: 'coordinatePickUp',
    component: CoordinatePickUp
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: Calculator
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
