require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("./utils/logger")
const errorHandler = require("./middlewares/error.middleware")
const authRouter = require("./routes/auth.route")
const todoRouter = require("./routes/todo.route")
const connectToMongoDb = require("./db/connectMongoDb")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

// const cwd = path.resolve()
// const dir = path.join(cwd, "src", "public")

connectToMongoDb()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/api/auth", authRouter)
app.use("/api/todos", todoRouter)

app.get("/", (req, res) => {
   res.render("login")
})
app.get("/register", (req, res) => {
   res.render("register")
})

app.use(errorHandler)

app.listen(PORT, () => {
   logger.info(`To-Do list running on port ${PORT}`)
})

module.exports = app
