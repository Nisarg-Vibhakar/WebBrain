const mongoose = require('mongoose')

const employSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    phone: String,
    email: { type: String, unique: true }, 
    workHours: Number,
    salaryType: Number,
    salary: Number,
    department: String,
    loginUserId: { type: String, unique: true }, 
    password: String,
})

const Employee = new mongoose.model('Employee',employSchema)

module.exports = Employee