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
         return res.send(400).json({
            success: false,
            message: "User info token not found",
         })
      }

      const { value, error } = validateTodo(req.body)
      if (error) {
         logger.warn("Invalid title")
         return res.status(400).json({
            success: false,
            message: "Invalid title",
         })
      }
      const { userId } = req.userInfo
      const user = await User.findById(userId)
      if (!user) {
         logger.error("User does not exist")
         return res.status(400).json({
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

// getAllTasks: pending & completed
const getAllTasks = async (req, res) => {
   try {
      if (!req.userInfo) {
         logger.error("User not authenticated")
         return res.status(401).json({
            success: false,
            message: "Unauthorized",
         })
      }

      const { userId } = req.userInfo
      const { status } = req.query

      const filter = {
         user: userId,
         status: { $in: ["pending", "completed"] },
      }

      if (status && ["pending", "completed"].includes(status)) {
         filter.status = status
      }

      const tasks = await TodoModel.find(filter).sort({ createdAt: -1 })

      if (!tasks) {
         logger.error("No pending or completed tasks found with User ID")
         return res.status(400).json({
            success: false,
            message: "No pending or completed tasks found with User ID",
         })
      }

      res.status(200).json({
         success: true,
         message: "All pending and completed tasks sent successfully",
         tasks,
      })
   } catch (error) {
      logger.error("Server error in getting all tasks")
      res.status(500).json({
         success: false,
         message: "Internal server error. Try again!",
      })
   }
}

// update tasks

const updateTask = async (req, res) => {
   try {
      if (!req.userInfo) {
         logger.error("User not authenticated")
         return res.status(401).json({
            success: false,
            message: "Unauthorized",
         })
      }
      const { id } = req.params
      const { userId } = req.userInfo
      const { status } = req.body

      if (!["completed", "deleted"].includes(status)) {
         logger.error("Invalid status update")
         return res.status(400).json({
            success: false,
            message: "Invalid status update",
         })
      }

      const task = await TodoModel.findOneAndUpdate(
         { _id: id, user: userId },
         { status: status },
         { new: true },
      )

      console.log(task)

      if (!task) {
         logger.error("No task found")
         return res.status(400).json({
            success: false,
            message: "No task found",
         })
      }

      res.status(200).json({
         success: true,
         message: "Task updated successfully",
         task,
      })
   } catch (error) {
      logger.error("Server error whilst updating task")
      res.status(500).json({
         success: false,
         message: "Internal server error. Try again!",
      })
   }
}

module.exports = { createTask, getAllTasks, updateTask }
