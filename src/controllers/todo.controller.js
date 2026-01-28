const TodoModel = require("../models/task.model")
const User = require("../models/user.model")
const { generateToken } = require("../utils/generateToken")
const logger = require("../utils/logger")
const { validateTodo } = require("../utils/validation")

// create task

const createTask = async (req, res) => {
   try {
      if (!req.userInfo) {
         logger.error("User info token not found")
         res.send(400).json({
            success: false,
            message: "User info token not found",
         })
      }

      const { value, error } = validateTodo(req.body)
      if (error) {
         logger.warn("Invalid title")
         res.status(400).json({
            success: false,
            message: "Invalid title",
         })
      }
      const { userId } = req.userInfo
      const user = await User.findById(userId)
      if (!user) {
         logger.error("User does not exist")
         res.status(400).json({
            success: false,
            message: "User does not exist",
         })
      }

      const newTask = await TodoModel({
         title: value.title,
         user: userId,
      })

      await newTask.save()

      const accessToken = generateToken(user)

      res.status(400).json({
         success: true,
         message: "User task created successfully",
         accessToken,
      })
   } catch (error) {
      logger.error("Server error whilst creating task")
      res.status(500).json({
         success: false,
         message: "Internal server error. Try again!",
      })
   }
}

// getAllTasks

// update tasks

// delete tasks

// sort between pending and completed tasks

module.exports = { createTask }
