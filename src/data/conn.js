
const { UserSchema } = require('./schema')
const mongoose = require('mongoose')
const conn = mongoose.createConnection(
  // 连接地址，MongoDB 的服务端口为27017
  // dbtest是我要使用的数据库名，当往其中写数据时，MongoDB 会自动创建一个名为dbtest的数据库，不用事先手动创建。
  'mongodb://dxwadmin:mongo_deng@148.70.235.23:27017/Graduaction?authSource=admin',
  // 一些兼容配置，必须加，你不写运行的时候会提示你加。
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

// 通过connection和schema创建model
let UserSchemaModel = conn.model('TaskManagement', UserSchema)

// 通过实例化model创建文档
// let UserSchemaDoc = new UserSchemaModel({
//   name: 'zhangsan',
//   age: 20,
// })
// 保存数据
function saveData(doc) {
  doc
    .save(function(err,res) {
      if (err) {
        console.log(err)
      }
      console.log(res)
    })
}
// saveData(
//   new UserSchemaModel({
//     name: 'lisi',
//     age: 25,
//   })
// )
// 操作方法
// let testData = {
//   subTasks: [
//     {
//       date: 'String',
//       beginTime: 'String',
//       endTime: 'String',
//       minuteCount: 0,
//       focusOnMatters: 'String',
//       processRecord: 'String',
//     },
//   ],
//   tasks: [
//     {
//       taskName: 'String',
//       importantDegree: 0,
//       emergencyDegree: 0,
//       taskStatus: 'String',
//       logContents: 'String',
//       taskTypeName: 'String',
//       planBegin: 'String',
//       planEnd: 'String',
//       riskDegree: 0,
//       taskPeople: 'String',
//       isTop: true,
//     },
//   ],
// }
// saveData(new UserSchemaModel(testData))

// UserSchemaModel.find({}).then((doc) => {
//   console.log(doc)
// })
// UserSchemaModel.findOneAndUpdate(
//   { _id: '60989c7d8a6db132c0a7423e' },
//   {
   
//   },
//   {
//     new: true,
//   },
//   function(err, data) {
//     console.log(err)
//     console.log(data)
//   }
// )
conn.on('open', () => {
  console.log('打开 mongodb 连接')
})
conn.on('err', (err) => {
  console.log('err:' + err)
})

module.exports = {
  UserSchemaModel,
  saveData,
}
