const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use(cookieParser())


//import routes
const userRouter = require("./routes/user.routes.js")

//routes declaration
app.use("/api/v1/users", userRouter)

module.exports = app; 