import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from '@/components/Home'
import Reader from '@/components/Reader'
import Writer from '@/components/Writer'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/reader', component: Reader },
  { path: '/writer', component: Writer }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
