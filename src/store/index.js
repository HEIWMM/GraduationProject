import Vue from 'vue'
import Vuex from 'vuex'
import { tasks,subTasks } from './store'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isFocus: false,
    tasks,
    subTasks,
  },
  mutations: {
    addSubTask(state,subtask){
      console.log(state,subtask)
      state.subTasks.push(subtask)
    },
    addTask(state,task){
      state.tasks.push(task)
    }
  },
})
export default store
