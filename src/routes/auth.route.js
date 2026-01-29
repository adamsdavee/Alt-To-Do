const express = require("express")
const {
   registerUser,
   loginUser,
   logOut,
} = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.post("/logout", logOut)

module.exports = authRouter
