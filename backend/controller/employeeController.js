const Employee = require('../models/employee')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const postData = async(req,res)=>{
    try {
        const {
          firstName,
          lastName,
          phone,
          email,
          workHours,
          salaryType,
          salary,
          department,
          loginUserId,
          password,
          confirmPassword,
        } = req.body;
    
        if (
          !firstName ||
          !lastName ||
          !phone ||
          !email ||
          !workHours ||
          !salaryType ||
          !salary ||
          !department ||
          !loginUserId ||
          !password ||
          !confirmPassword
        ) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        if (
          typeof workHours !== 'number' ||
          typeof salaryType !== 'number' ||
          typeof salary !== 'number'
        ) {
          return res.status(400).json({ error: 'Invalid data types' });
        }
    
        if (password !== confirmPassword) {
          return res.status(400).json({ error: 'Passwords do not match' });
        }
    
        const existingEmployee = await Employee.findOne({ loginUserId });
        if (existingEmployee) {
          return res.status(400).json({ error: 'loginUserId already exists' });
        }

        const existingEmployee2 = await Employee.findOne({ email });
        if (existingEmployee2) {
          return res.status(400).json({ error: 'email already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newEmployee = new Employee({
          firstName,
          lastName,
          phone,
          email,
          workHours,
          salaryType,
          salary,
          department,
          loginUserId,
          password: hashedPassword,
        });
    
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }


}


const updateData = async(req,res)=>{
    try {
        const { loginUserId } = req.params;
        const {
          firstName,
          lastName,
          phone,
          email,
          workHours,
          salaryType,
          salary,
          department,
        } = req.body;
    
        const employee = await Employee.findOneAndUpdate(
          { loginUserId },
          {
            $set: {
              firstName,
              lastName,
              phone,
              email,
              workHours,
              salaryType,
              salary,
              department,
            },
          },
          { new: true } 
        );
    
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
    
        res.json(employee);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const deleteData = async (req,res) =>{
    try {
        const { loginUserId } = req.params;
    
        const deletedEmployee = await Employee.findOneAndDelete({ loginUserId });
    
        if (!deletedEmployee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
    
        res.json({ message: 'Employee deleted successfully' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const getData = async (req,res)=>{
    try {
      
        const employees = await Employee.find();
    
        res.json(employees);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}


const getDepEmployee = async (req,res)=>{
  try {
    const department = req.params.department;

    const employees = await Employee.find({ department });

    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
}

const getEmployeeById = async (req,res) =>{

  const loginUserId = req.params.loginUserId
  try {
    console.log(loginUserId)
    const employee = await Employee.findOne({loginUserId});
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee details' });
  }
}


module.exports = {postData, updateData, deleteData, getData, getDepEmployee, getEmployeeById}