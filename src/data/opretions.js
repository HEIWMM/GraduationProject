import axios from 'axios'
import { getItem } from '../utils/storageTools'
function _axios(url, data) {
  return axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    // url: url,
    url: url.replace('/api', 'http://148.70.235.23:3005'), // 打包需要的路径
    data: data,
  })
}

export const addTaskData = (data) => {
  return _axios('/api/addtasks', Object.assign(data, { name: getItem('name') }))
}

export const addSubTaskData = (data) => {
  _axios('/api/addsubtasks', Object.assign(data, { name: getItem('name') })).then((res) => {
    console.log('请求成功', res)
  })
}
export const updateSubTaskData = (data) => {
  _axios('/api/updatesubtasks', Object.assign(data, { name: getItem('name') })).then((res) => {
    console.log('请求成功', res)
  })
}
export const updateTaskData = (data) => {
  _axios('/api/updatetasks', Object.assign(data, { name: getItem('name') })).then((res) => {
    console.log('请求成功', res)
  })
}
export const delTaskData = (data) => {
  return _axios('/api/delTask', Object.assign(data, { name: getItem('name') }))
}
export const delSubTaskData = (data) => {
  return _axios('/api/delSubTesk', Object.assign(data, { name: getItem('name') }))
}
export const userRegister = (data) => {
  return _axios('/api/register', data)
}
export const userLogin = (data) => {
  return _axios('/api/login', data)
}
export const getUserData = (data) => {
  return _axios('/api/getData', data)
}
export const testData = (data) => {
  _axios('/api/test', data).then((res) => {
    console.log('请求成功', res)
  })
}
export const delData = () => {
  axios.post('/')
}
export const findData = () => {
  axios.get('/')
}
