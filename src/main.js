import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import isElectron from 'is-electron';
import router from './route'
import VueElectron from './vueElectron'

import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
console.log(VueElectron,isElectron())
console.log(isElectron())
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueElectron)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app')
