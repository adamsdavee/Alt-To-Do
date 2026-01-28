require("dotenv").config()
const express = require("express")
const logger = require("./utils/logger")
const errorHandler = require("./middlewares/error.middleware")
const authRouter = require("./routes/auth.route")
const connectToMongoDb = require("./db/connectMongoDb")

const app = express()
const PORT = process.env.PORT || 3000

connectToMongoDb()

// middlewares
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/todo", authRouter)

app.get("/", async (req, res) => {
   res.send("It is working!")
})

app.use(errorHandler)

app.listen(PORT, () => {
   logger.info(`To-Do list is running on port: ${PORT}`)
})
