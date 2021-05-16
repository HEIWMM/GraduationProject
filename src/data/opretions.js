import axios from 'axios'
function _axios(url,data) {
  return axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    url: url,
    data: data,
  })
}

export const addTaskData = (data) => {
  _axios('/api/addtasks',data).then((res) => {
    console.log('请求成功', res)
  })
}

export const addSubTaskData = (data) => {
  _axios('/api/addsubtasks',data).then((res) => {
    console.log('请求成功', res)
  })
}
export const updateSubTaskData = (data) => {
  _axios('/api/updatesubtasks',data).then((res) => {
    console.log('请求成功', res)
  })
}
export const updateTaskData = (data) => {
  _axios('/api/updatetasks',data).then((res) => {
    console.log('请求成功', res)
  })
}
export const userRegister = (data) => {
  return _axios('/api/register',data)
}
export const delData = () => {
  axios.post('/')
}
export const findData = () => {
  axios.get('/')
}
