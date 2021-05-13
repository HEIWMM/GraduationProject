const { UserSchema } = require('./schema')
var _ = require('lodash');
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
function saveData(data, type, fn) {
  UserSchemaModel.findOne({ _id: '6098a15f8e005c2150a82b43' }).then((res) => {
    // console.log(typeof res)
    // console.log(res instanceof JSON)
    console.log('新增的数据展示',data)
    let obj = _.cloneDeep(res)
    if (type === 'task') {
      obj.tasks.push(data)
    } else {
      obj.subTasks.push(data)
    }

    let doc = new UserSchemaModel(obj)
    // console.log(data)
    doc.save(function(err, res) {
      if (err) {
        // console.log('添加失败')
        console.log(err)
      }
      console.log('添加成功')
      //console.log(res)
    })
    // console.log(res)
    fn.send(res)
  })
}
function updateData(data, type, fn) {
  UserSchemaModel.findOne({ _id: '6098a15f8e005c2150a82b43' }).then((res) => {
    // console.log(typeof res)
    // console.log(res instanceof JSON)

    console.log(data)
    let state = _.cloneDeep(res)
    console.log('旧的', state)
    if (type === 'task') {
      let { index, task } = data
      delete task.index
      console.log('任务 ', task)
      for (let key in task) { // 发现一个问题 就是mongoose 返回的对象不能够用来遍历
        console.log('key--',key)
        state.tasks[index][key] = task[key]
      }
    } else {
      let { index, keyArr } = data
      keyArr.map((item) => {
        state.subTasks[index][item.keyVal] = item.Val
      })
    }

    let doc = new UserSchemaModel(state)
    console.log('新的', state)
    doc.save(function(err, res) {
      if (err) {
        // console.log('添加失败')
        console.log(err)
      }
      console.log('添加成功')
      //console.log(res)
    })
    // console.log(res)
    fn.send(res)
  })
}
conn.on('open', () => {
  console.log('打开 mongodb 连接')
})
conn.on('err', (err) => {
  console.log('err:' + err)
})

module.exports = {
  UserSchemaModel,
  saveData,
  updateData,
}
