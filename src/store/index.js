import Vue from 'vue'
import Vuex from 'vuex'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import { tasks, subTasks } from './store'
import {
  addSubTaskData,
  addTaskData,
  updateSubTaskData,
  updateTaskData,
  userRegister,
} from '../data/opretions.js'
//import { addSubTaskData,addTaskData,updateSubTaskData } from '../data/opretions.js'
Vue.use(Vuex)
Vue.use(mavonEditor)
const store = new Vuex.Store({
  state: {
    isFocus: false,
    name: '',
    tasks,
    subTasks,
  },
  mutations: {
    addSubTask(state, subtask) {
      // console.log(state, subtask)
      state.subTasks.splice(0, 0, subtask)
      addSubTaskData(subtask)
    },
    addTask(state, task) {
      state.tasks.push(task)
      addTaskData(task)
    },
    changeSubTaskVal(state, { index, keyArr }) {
      keyArr.map((item) => {
        state.subTasks[index][item.keyVal] = item.Val
      })
      let obj = {
        index,
        keyArr,
      }
      updateSubTaskData(obj)
    },
    changeTaskVal(state, { index, task }) {
      console.log(state.tasks, index, task)
      for (let key in state.tasks[index]) {
        state.tasks[index][key] = task[key]
      }
      let obj = {
        index,
        task,
      }
      updateTaskData(obj)
    },
    registerSys(state, {name,password}) {
      userRegister({name,password}).then(res=>{
        console.log('注册成功',res)
      })
    }
  },
})
export default store
