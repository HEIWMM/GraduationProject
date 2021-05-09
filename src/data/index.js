// connection.js file
const {UserSchema}  = require('./schema')
const mongoose = require('mongoose');
const conn = mongoose.createConnection(

  // 连接地址，MongoDB 的服务端口为27017
  // dbtest是我要使用的数据库名，当往其中写数据时，MongoDB 会自动创建一个名为dbtest的数据库，不用事先手动创建。
  'mongodb://dxwadmin:mongo_deng@148.70.235.23:27017/Graduaction?authSource=admin', 

  // 一些兼容配置，必须加，你不写运行的时候会提示你加。
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
)

// 通过connection和schema创建model
let UserSchemaModel = conn.model('TaskManagement', UserSchema);


// 通过实例化model创建文档
let UserSchemaDoc = new UserSchemaModel({
   name: 'zhangsan',
   age: 20
})

// 将文档插入到数据库，save方法返回一个Promise对象。
UserSchemaModel.find({}).then(doc => {
  console.log(doc);
})
conn.on('open', () => {
	console.log('打开 mongodb 连接');
})
conn.on('err', (err) => {
	console.log('err:' + err);
})

module.exports = conn;