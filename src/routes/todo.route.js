const express = require("express")
const {} = require("../controllers/todo.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

const todoRouter = express.Router()

todoRouter.get("/tasks", authMiddleware, registerUser)
todoRouter.post("/create", authMiddleware, registerUser)
todoRouter.put("/update/:id", authMiddleware, loginUser)
todoRouter.delete("/delete/:id", authMiddleware, logOut)

module.exports = todoRouter
