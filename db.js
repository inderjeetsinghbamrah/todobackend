const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:dYAoCUMcrlXIqvbC@crudmongodb.xx1lyo9.mongodb.net/todos"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = { todo };
