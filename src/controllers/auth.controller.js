const logger = require("../utils/logger")
const { validateCredentials } = require("../utils/validation")
const UserModel = require("../models/user.model")
const { generateToken } = require("../utils/generateToken")

// register user

const registerUser = async (req, res) => {
   try {
      const { value, error } = validateCredentials(req.body)
      console.log(value.username)
      if (error) {
         logger.warn("Invalid credentials")
         res.status(400).json({
            success: false,
            message: "Invalid credentials",
         })
      }

      let user = await UserModel.findOne({ username: value.username })
      if (user) {
         res.status(400).json({
            success: false,
            message: "User name already exists",
         })
      }

      user = await UserModel({
         username: value.username,
         password: value.password,
      })

      await user.save()

      res.status(201).json({
         success: true,
         message: "User successfully registerd",
      })
   } catch (err) {
      logger.error("Unable to register user")
      res.status(500).json({
         success: false,
         message: "Internal server error occurred",
      })
   }
}

// login user

const loginUser = async (req, res) => {
   try {
      const { value, error } = validateCredentials(req.body)
      if (error) {
         logger.error("Incorrect data format")
         res.status(400).json({
            success: false,
            message: "Invalid data format",
         })
      }

      const validUser = await UserModel.findOne({ username: value.username })
      if (!validUser) {
         logger.warn("User does not exist")
         res.status(400).json({
            success: false,
            message: "User does not exist",
         })
      }

      const isValidPassword = await validUser.comparePassword(value.password)
      if (!isValidPassword) {
         logger.warn("invalid credentials")
         res.status(400).json({
            success: false,
            message: "invalid credentials",
         })
      }

      const accessToken = generateToken(validUser)

      res.status(200).json({
         success: true,
         message: "Logged in successfully",
         accessToken,
      })
   } catch (error) {
      logger.error("Server error whilst user is logging in")
      res.status(500).json({
         success: false,
         message: "Internal server error. Try again!",
      })
   }
}

// logout user

const logOut = (req, res) => {
   try {
      // Render or send him back to the log in page
   } catch (error) {
      logger.error("Server error whilst user is logging out")
      res.status(500).json({
         success: false,
         message: "Internal server error. Try again!",
      })
   }
}

module.exports = { registerUser, loginUser, logOut }
