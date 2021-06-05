// connection.js file
const express = require('express')
const { saveData, updateData, userRegister, userLogin, getUserData, deleteData } = require('./conn')
const app = express()
const port = 3005
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
function parseReq(data) {
  // 解析 req.body的参数
  return JSON.parse(Object.keys(data)[0])
  // return data
}
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/x-www-form-urlencoded');
  next();
});
app.post('/', (req, res) => {
  console.log('query', req.query)
  console.log('body', req.body)
  res.send(req.body)
})
app.post('/addtasks', (req, res) => {
  let obj = parseReq(req.body)
  console.log(obj)
  saveData(obj, 'task', res)
})
app.post('/addsubtasks', (req, res) => {
  let obj = parseReq(req.body)
  console.log(obj)
  saveData(obj, 'subtask', res)
  // res.send(req.body)
})
app.post('/updatetasks', (req, res) => {
  let obj = parseReq(req.body)
  console.log(obj)   
  updateData(obj, 'task', res)
  // res.send(req.body)
})
app.post('/updatesubtasks', (req, res) => {
  let obj = parseReq(req.body)
  console.log(obj)
  updateData(obj, 'subtask', res)
  // res.send(req.body)
})
app.post('/register', (req, res) => {
  let obj = parseReq(req.body)
  userRegister(obj.name, obj.password, res)
})
app.post('/login', (req, res) => {
  let obj = parseReq(req.body)
  userLogin(obj.name, obj.password, res)
})
app.post('/getData', (req, res) => {
  let obj = parseReq(req.body)
  getUserData(obj.name, res)
})
app.post('/delTask', (req, res) => {
  let obj = parseReq(req.body)
  deleteData(obj, 'task', res)
})
app.post('/delSubTesk', (req, res) => {
  let obj = parseReq(req.body)
  deleteData(obj, 'subtask', res)
})
app.post('/update', (req, res) => {
  saveData(req.body)
  res.send(req.body)
})
app.post('/test', (req, res) => {
  let obj = parseReq(req.body)
  console.log('请求接口', obj)
  res.send(obj)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
