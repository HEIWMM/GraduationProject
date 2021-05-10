// connection.js file
const express = require('express')
const { UserSchemaModel, saveData } = require('./conn')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/mon', (req, res) => {
  let testData = {
    subTasks: [
      {
        date: 'String',
        beginTime: 'String',
        endTime: 'String',
        minuteCount: 0,
        focusOnMatters: 'String',
        processRecord: 'String',
      },
    ],
    tasks: [
      {
        taskName: 'String',
        importantDegree: 0,
        emergencyDegree: 0,
        taskStatus: 'String',
        logContents: 'String',
        taskTypeName: 'String',
        planBegin: 'String',
        planEnd: 'String',
        riskDegree: 0,
        taskPeople: 'String',
        isTop: true,
      },
    ],
  }
  saveData(new UserSchemaModel(testData))
  res.send('conn')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
