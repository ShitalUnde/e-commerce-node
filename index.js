const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
// const cryptoKey = require('./_helper/generateKeys')
const dbConnect = require('./config/dbConnect');
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000;
const {errorHandler,notFound} = require('./middlewares/errorHandler')
const authRouter = require('./routes/authRoutes')
dbConnect();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/user', authRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`Server is running at port ${PORT}`)
})