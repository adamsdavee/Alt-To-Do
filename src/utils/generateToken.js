const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateToken = (userData) => {
   const accessToken = jwt.sign(
      {
         userId: userData._id,
         username: userData.username,
      },
      process.env.JWT_SECRET,
      {
         expiresIn: "60m",
      },
   )

   return accessToken
}

module.exports = { generateToken }
