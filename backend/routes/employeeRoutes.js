const express = require('express')
const employeeRouter = express.Router()
const {postData, updateData, deleteData, getData, getDepEmployee, getEmployeeById} = require('../controller/employeeController')
const { requireAuth } = require('../midlleware/auth')
const { requireAdmin } = require('../midlleware/admin')

employeeRouter.get('/employee',getData)

employeeRouter.get('/employee/:department',getDepEmployee)

employeeRouter.get('/oneEmployee/:loginUserId',getEmployeeById)

employeeRouter.post('/employee',postData)

employeeRouter.put('/employee/:loginUserId',updateData)

employeeRouter.delete('/employee/delete/:loginUserId', deleteData)

module.exports = employeeRouter