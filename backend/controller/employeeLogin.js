
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

const employeeLogin= async (req, res) => {
  const { loginUserId, password } = req.body;

  try {
    const employee = await Employee.findOne({ loginUserId });

    if (!employee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: employee._id, loginUserId: employee.loginUserId }, 'webbrain', {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
};

module.exports = employeeLogin


