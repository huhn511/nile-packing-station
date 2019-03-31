import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import moment from 'moment'

import App from './App.vue'
import Home from '@/components/Home'
import Reader from '@/components/Reader'
import Writer from '@/components/Writer'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter)
Vue.use(Element)

Vue.config.productionTip = false

import L from 'leaflet';

import 'leaflet.icon.glyph';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

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


Vue.filter('formatTimestampToDate', function (timestamp) {
  if (timestamp) {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
  }
})

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
