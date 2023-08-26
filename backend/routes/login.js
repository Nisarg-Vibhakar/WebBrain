const express = require('express')
const employeeLogin = require('../controller/employeeLogin')
const router = express.Router()

router.post('/login', employeeLogin)

module.exports = router