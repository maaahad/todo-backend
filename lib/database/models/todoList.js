const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({
  title: String,
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

// ToDoList model
const TodoList = mongoose.model("TodoList", todoListSchema);

module.exports = TodoList;
