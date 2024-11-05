
require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const connectionMySql = require('./models/mysql/connectMysql')
const connectionMongoDB = require('./models/mongoDB/connectMongoDB')
const configCors = require('./config/cors')
const testRouter = require('./routers/testRouter')
const authRouter = require('./routers/authRouter')
const commentRouter = require("./routers/commentRouter")
const ratingRouter = require("./routers/ratingRouter")
const searchHisoryRouter = require('./routers/searchHistoryRouter')
const activityRouter = require("./routers/activityLogRouter")
const { configPassport } = require('./controller/passportController')
const configLoginWithGoogle = require('./controller/googleController')
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

app.use('/auth', authRouter)
app.use('/comment', commentRouter)
app.use('/rating', ratingRouter)
app.use('/search-history', searchHisoryRouter)
app.use('/activity-log', activityRouter)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
