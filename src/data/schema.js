const mongoose = require('mongoose');

// 创建schema
const UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});
module.exports = {
  UserSchema
}