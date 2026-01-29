const logger = require("../utils/logger")
const { validateCredentials } = require("../utils/validation")
const UserModel = require("../models/user.model")
const { generateToken } = require("../utils/generateToken")

// register user

// const registerUser = async (req, res) => {
//    try {
//       const { value, error } = validateCredentials(req.body)
//       console.log(value.username)
//       if (error) {
//          logger.warn("Invalid credentials")
//          res.status(400).json({
//             success: false,
//             message: "Invalid credentials",
//          })
//       }

//       let user = await UserModel.findOne({ username: value.username })
//       if (user) {
//          res.status(400).json({
//             success: false,
//             message: "User name already exists",
//          })
//       }

//       user = await UserModel({
//          username: value.username,
//          password: value.password,
//       })

//       await user.save()

//       res.status(201).json({
//          success: true,
//          message: "User successfully registerd",
//       })
//    } catch (err) {
//       logger.error("Unable to register user")
//       res.status(500).json({
//          success: false,
//          message: "Internal server error occurred",
//       })
//    }
// }

// // login user

// const loginUser = async (req, res) => {
//    try {
//       const { value, error } = validateCredentials(req.body)
//       if (error) {
//          logger.error("Incorrect data format")
//          res.status(400).json({
//             success: false,
//             message: "Invalid data format",
//          })
//       }

//       const validUser = await UserModel.findOne({ username: value.username })
//       if (!validUser) {
//          logger.warn("User does not exist")
//          res.status(400).json({
//             success: false,
//             message: "User does not exist",
//          })
//       }

//       const isValidPassword = await validUser.comparePassword(value.password)
//       if (!isValidPassword) {
//          logger.warn("invalid credentials")
//          res.status(400).json({
//             success: false,
//             message: "invalid credentials",
//          })
//       }

//       const accessToken = generateToken(validUser)

//       res.status(200).json({
//          success: true,
//          message: "Logged in successfully",
//          accessToken,
//       })
//    } catch (error) {
//       logger.error("Server error whilst user is logging in")
//       res.status(500).json({
//          success: false,
//          message: "Internal server error. Try again!",
//       })
//    }
// }

// // logout user

// const logOut = (req, res) => {
//    try {
//       // Render or send him back to the log in page
//    } catch (error) {
//       logger.error("Server error whilst user is logging out")
//       res.status(500).json({
//          success: false,
//          message: "Internal server error. Try again!",
//       })
//    }
// }

const loginUser = async (req, res) => {
   try {
      const { value, error } = validateCredentials(req.body)
      if (error) {
         return res.render("login", { error: "Invalid credentials" })
      }

      const user = await UserModel.findOne({ username: value.username })
      if (!user) {
         return res.render("login", { error: "User does not exist" })
      }

      const isValidPassword = await user.comparePassword(value.password)
      if (!isValidPassword) {
         return res.render("login", { error: "Incorrect password" })
      }

      const token = generateToken(user)

      res.cookie("token", token, {
         httpOnly: true,
      })

      res.redirect("/api/todos/tasks")
   } catch (error) {
      logger.error("Login failed")
      res.status(500).render("login", {
         error: "Something went wrong",
      })
   }
}

const registerUser = async (req, res) => {
   try {
      console.log(req.body)
      const { value, error } = validateCredentials(req.body)
      console.log(value)
      console.log(error)

      if (error) {
         return res.render("register", { error: "Invalid input" })
      }

      const exists = await UserModel.findOne({ username: value.username })
      if (exists) {
         return res.render("register", { error: "Username already exists" })
      }

      const user = new UserModel(value)
      await user.save()

      res.redirect("/")
   } catch (error) {
      logger.error("Registration failed")
      res.status(500).render("register", {
         error: "Internal server error",
      })
   }
}

const logOut = (req, res) => {
   res.clearCookie("token")
   res.redirect("/")
}

module.exports = {
   registerUser,
   loginUser,
   logOut,
}
