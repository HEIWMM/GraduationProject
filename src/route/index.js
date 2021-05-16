import VueRouter from 'vue-router'

import MainPage from '../components/MainPage.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
const routes = [
  {
    path: '/', // 主页面
    component: MainPage,
  },
  {
    path: '/login', // 登录页面
    component: Login,
  },
  {
    path: '/register', // 注册页面
    component: Register,
  }
]
const router = new VueRouter({
  routes
})

export default router