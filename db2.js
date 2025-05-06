const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
});

const todoSchema = new Schema({
  description: String,
  done: Boolean,
  userId: ObjectId,
});

const UserModel = mongoose.model("users", userSchema);
const TodoModel = mongoose.model("todos", todoSchema);

module.exports = {
  UserModel,
  TodoModel,
};
