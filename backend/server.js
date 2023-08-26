const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const connectDB = require('./database/db')
const employeeRouter = require('./routes/employeeRoutes')
const authRouter = require('./routes/authRoutes')
const router = require('./routes/login')

const app = express()
app.use(express.json())
app.use(cors())


connectDB()

app.use('/api', employeeRouter)
app.use('/auth',authRouter)
app.use('/employee', router)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})