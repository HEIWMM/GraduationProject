import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import router from './route'

import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app')
