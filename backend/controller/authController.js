const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Manager = require('../models/manager');

const signUp = async(req,res)=>{
    const { email, password, department } = req.body;

    try {
      const existingUser = await Manager.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const manager = new Manager({ email, password: hashedPassword, department });
      await manager.save();
  
      res.json({ message: 'Manager registered successfully' });
    } catch (error) {
        console.error(error); 

      res.status(500).json({ error: 'Error during registration' });
    }
  };
  

  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const manager = await Manager.findOne({ email });
      if (!manager) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, manager.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: manager._id, email: manager.email }, 'webbrain', {
        expiresIn: '1h', // Token expires in 1 hour
      });
      console.log('adas')
      console.log(token)
      const managerDepartment = manager.department;
      
      res.json({ token, managerDepartment });
    } catch (error) {
      res.status(500).json({ error: 'Error during login' });
    }
  };
  

module.exports = {signUp, login}