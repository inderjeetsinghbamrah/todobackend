const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = { todo };
