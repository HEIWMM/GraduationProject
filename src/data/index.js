// connection.js file
const express = require('express')
const { UserSchemaModel, saveData } = require('./conn')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.post('/', (req, res) => {
  console.log('query',req.query)
  console.log('body',req.body)
  res.send(req.body)
})
app.post('/save', (req, res) => {
  saveData({},res)
  // res.send(req.body)
})
app.post('/update', (req, res) => {
  saveData(req.body)
  res.send(req.body)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
