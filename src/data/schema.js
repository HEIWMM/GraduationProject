const mongoose = require('mongoose');

// 创建schema
const UserSchema = new mongoose.Schema({
  subTasks: [{
    date: String ,
    beginTime: String ,
    endTime: String ,
    minuteCount: Number,
    focusOnMatters: String,
    processRecord: String ,
  }],
  tasks: [{
    taskName: String,
    importantDegree: String,
    emergencyDegree: String,
    taskStatus: String,
    logContents: String,
    taskTypeName: String,
    planBegin: String,
    planEnd:String,
    riskDegree: String,
    taskPeople: String,
    isTop: Boolean,
  }]
});
module.exports = {
  UserSchema
}