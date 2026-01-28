const express = require("express")
const { createTask } = require("../controllers/todo.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

const todoRouter = express.Router()

todoRouter.get("/tasks", authMiddleware)
todoRouter.post("/create", authMiddleware, createTask)
todoRouter.put("/update/:id", authMiddleware)
todoRouter.delete("/delete/:id", authMiddleware)

module.exports = todoRouter
