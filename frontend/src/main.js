import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'

import App from './App.vue'
import Home from '@/components/Home'
import Reader from '@/components/Reader'
import Writer from '@/components/Writer'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter)
Vue.use(Element)

Vue.config.productionTip = false

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: {
      name: 'Home'
    }, 
  },
  { 
    path: '/reader', 
    component: Reader,
    meta: {
      name: 'Reader'
    }, 
  },
  { 
    path: '/writer',
    component: Writer,
    meta: {
      name: 'Writer'
    },
  }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
