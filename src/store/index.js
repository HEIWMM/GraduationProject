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
  getUserData,
  delTaskData,
  delSubTaskData,
} from '../data/opretions.js'
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
      console.log('初始化', data)
      for (let key in state) {
        console.log('key--', key)
        state[key] = data[key]
      }
      console.log('初始化后的', state)
    },
    addSubTask(state, subtask) {
      // console.log(state, subtask)
      state.subTasks.push(subtask)
      addSubTaskData(subtask)
    },
    addTask(state, task) {
      state.tasks.push(task)
      addTaskData(task)
    },
    delTask(state, { index, type, id }) {
      if (type === 'task') {
        console.log('deng', state.tasks)
        console.log('deng', id)
        state.tasks = state.tasks.filter((item) => {
          return item._id !== id
        })
      } else {
        state.subTasks.splice(Math.abs(state.subTasks.length-1-index), 1)
      }
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
    changeTaskVal(state, { id, task }) {
      console.log(state.tasks, id, task)
      state.tasks = state.tasks.map((item) => {
        if (item._id === id) {
          console.log('item--', item, task)
          for (let key in task) {
            if(key === 'index' || key === '_id') {
              console.log('key--', key)
              continue
            }
            item[key] = task[key]
          }
        }
        return item
      })
      let obj = {
        id,
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
      return new Promise((resolve, reject) => {
        userLogin({ name, password })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      }).then((res) => {
        console.log('登录返回数据', res)
        if (res.data !== '') {
          context.commit('initSys', res.data)
        }
        return res
      })
    },
    getDataSys(context, { name }) {
      return new Promise((resolve, reject) => {
        getUserData({ name })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      }).then((res) => {
        console.log('初始化返回数据', res)
        if (res.data !== '') {
          context.commit('initSys', res.data)
        }
        return res
      })
    },
    addTaskSys(context, task) {
      return new Promise((resolve, reject) => {
        addTaskData(task)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      }).then((res) => {
        console.log('添加后返回数据', res)
        // if (res.data !== '') {
        //   context.commit('initSys', res.data)
        // }
        return res
      })
    },
    delDataSys(context, { index, type = 'task', id }) {
      if (type === 'task') {
        return new Promise((resolve, reject) => {
          delTaskData({ id })
            .then((res) => {
              resolve(res)
            })
            .catch((err) => reject(err))
        })
      } else {
        return new Promise((resolve, reject) => {
          delSubTaskData({ index })
            .then((res) => {
              resolve(res)
            })
            .catch((err) => reject(err))
        })
      }
    },
  },
})
export default store
