const express = require("express")
const {
   registerUser,
   loginUser,
   logOut,
} = require("../controllers/auth.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

const authRouter = express.Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logOut", logOut)

module.exports = authRouter
