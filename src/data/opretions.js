import axios from 'axios'
export const addData = (data) => {
  axios.post('/save', data).them((res) => {
    console.log('请求成功', res)
  })
}
export const updateDate = () => {
  axios.post('/')
}
export const delData = () => {
  axios.post('/')
}
export const findData = () => {
  axios.get('/')
}
