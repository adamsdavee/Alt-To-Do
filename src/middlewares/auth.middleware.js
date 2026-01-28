const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")
require("dotenv").config()

const authMiddleware = async (req, res, next) => {
   let token = req.headers.authorization
   if (!token) {
      logger.error("No token for authentication found")
      res.status(400).json({
         success: false,
         message: "No token for authentication found",
      })
   }
   token = token.split(" ")[1]
   try {
      const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decodedTokenInfo)
      req.userInfo = decodedTokenInfo

      next()
   } catch (error) {
      logger.error("Auth service error")
      res.status(400).json({
         success: false,
         message: "Auth service error",
      })
   }
}

module.exports = { authMiddleware }
