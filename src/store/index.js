import Vue from 'vue'
import Vuex from 'vuex'
import { tasks } from './store'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isFocus: false,
    tasks,
  },
  mutations: {
    confirmTask(state){
      state.isFocus = !state.isFocus
    }
  },
})
export default store
