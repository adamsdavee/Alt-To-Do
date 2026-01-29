const express = require("express")
const {
   createTask,
   getAllTasks,
   updateTask,
} = require("../controllers/todo.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

const todoRouter = express.Router()

todoRouter.get("/tasks", authMiddleware, getAllTasks)
todoRouter.post("/create", authMiddleware, createTask)
todoRouter.put("/update/:id", authMiddleware, updateTask)

module.exports = todoRouter
