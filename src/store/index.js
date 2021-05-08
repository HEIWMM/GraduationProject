import Vue from 'vue'
import Vuex from 'vuex'
import { tasks, subTasks } from './store'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isFocus: false,
    tasks,
    subTasks,
  },
  mutations: {
    addSubTask(state, subtask) {
      // console.log(state, subtask)
      state.subTasks.splice(0,0,subtask)
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    changeSubTaskVal(state, { index, keyArr }) {
      keyArr.map((item) => {
        state.subTasks[index][item.keyVal] = item.Val
      })
    },
    changeTaskVal(state, {index, task}) {
      console.log(state.tasks, index, task)
      for(let key in state.tasks[index]) {
        state.tasks[index][key] = task[key]
      }
      
    },
  },
})
export default store
