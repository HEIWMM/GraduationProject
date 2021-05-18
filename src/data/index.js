// connection.js file
const express = require('express')
const { saveData, updateData, userRegister, userLogin } = require('./conn')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
function parseReq(data) {
  // 解析 req.body的参数
  return JSON.parse(Object.keys(data)[0])
}
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
app.post('/update', (req, res) => {
  saveData(req.body)
  res.send(req.body)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
