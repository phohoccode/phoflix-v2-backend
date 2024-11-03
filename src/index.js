
require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const connectionMySql = require('./models/mysql/connectMysql')
const connectionMongoDB = require('./models/mongoDB/connectMongoDB')
const configCors = require('./config/cors')
const testRouter = require('./routers/testRouter')
const authRouter = require('./routers/authRouter')
const { configPassport } = require('./controller/passportController')
const configLoginWithGoogle = require('./controller/googleController')
// const configLoginWithFacebook = require('./controller/facebookController')
const configSession = require('./config/session')

const app = express()
const PORT = process.env.PORT || 8080

connectionMySql()
connectionMongoDB()

configCors(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
configSession(app)
configPassport()
configLoginWithGoogle()

// init routes
// app.use('/', testRouter)
app.use('/auth', authRouter)

// configLoginWithFacebook()


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
