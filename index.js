const express = require("express");

const cors = require("cors");

const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.post("/todo", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  const checkNewTodo = createTodo.safeParse({
    title,
    description,
  });

  if (!checkNewTodo.success)
    return res.status(411).json({ msg: "You sent wrong input" });
  else {
    await todo.create({ title, description, completed: false });
    res.json({ msg: "Todo created" });
  }
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});

  res.json({ todos });
});

app.put("/completed", async (req, res) => {
  const todoId = req.body.id;

  const checkUpdateTodoId = updateTodo.safeParse(todoId);

  if (checkUpdateTodoId.success)
    return res.status(411).json({ msg: "Wrong Id format" });
  else {
    await todo.updateOne({ _id: todoId }, { completed: true });
    res.json({ msg: "data updated" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
