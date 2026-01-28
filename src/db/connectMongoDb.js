const mongoose = require("mongoose")
const logger = require("../utils/logger")
require("dotenv").config()

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL

const connectToMongoDB = () => {
   mongoose.connect(MONGO_DB_CONNECTION_URL)

   mongoose.connection.on("connected", () => {
      logger.info("MongoDB connected successfully")
   })

   mongoose.connection.on("err", () => {
      logger.error("MongoDB connection error")
   })
}

module.exports = connectToMongoDB
