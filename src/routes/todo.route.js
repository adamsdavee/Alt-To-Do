const express = require("express")
const {
   createTask,
   getAllTasks,
   updateTask,
   showTodos,
} = require("../controllers/todo.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

const todoRouter = express.Router()

todoRouter.get("/tasks", authMiddleware, getAllTasks)
todoRouter.post("/create", authMiddleware, createTask)
todoRouter.post("/update/:id", authMiddleware, updateTask)

module.exports = todoRouter
