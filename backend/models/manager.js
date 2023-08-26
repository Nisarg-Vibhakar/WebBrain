const mongoose = require('mongoose')

const managerSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'manager' }, 
    department: { type: String, required: true }
})

const Manager = new mongoose.model('Manager', managerSchema)

module.exports = Manager