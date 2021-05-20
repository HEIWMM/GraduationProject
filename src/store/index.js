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
  userLogin,
} from '../data/opretions.js'
// import { setItem } from '../utils/storageTools'
Vue.use(Vuex)
Vue.use(mavonEditor)
const store = new Vuex.Store({
  state: {
    name: '',
    tasks,
    subTasks,
  },
  mutations: {
    initSys(state, data) {
      console.log('初始化',data)
      for (let key in state) {
        console.log('key--', key)
        state[key] = data[key]
      }
      console.log('初始化后的', state)
    },
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
    registerSys(state, { name, password }) {
      userRegister({ name, password }).then((res) => {
        console.log('注册成功', res)
      })
    },
    loginSys(state, { name, password }) {
      state.name = name
      this.commit('initSys')
      return userLogin({ name, password })
    },
  },
  actions: {
    loginSys(context, { name, password }) {
      return new Promise((resolve, reject)=>{
        userLogin({ name, password }).then(res=>{
          resolve(res)
        }).catch(err=>reject(err))
      }).then(res=>{
        console.log('登录返回数据', res)
        if (res.data !== '') {
          context.commit('initSys', res.data)
        }
        return res
      })
    },
  }
})
export default store
