import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/reset.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import VueIconfont from 'vue-iconfont'
Vue.use(VueIconfont)

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import APIPlugin from '@/plugins/APIPlugin'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(APIPlugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
