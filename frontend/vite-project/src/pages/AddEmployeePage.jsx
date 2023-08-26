import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEmployeePage = () => {

  const params = useParams()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [workHours, setWorkHours] = useState(0);
  const [salaryType, setSalaryType] = useState(1);
  const [salary, setSalary] = useState(0);
  const [department, setDepartment] = useState(params.department);
  const [loginUserId, setLoginUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



  const calculateSalary = (type, hours) => {
    if (type === 1) {
      return hours * 1000;
    } else if (type === 2) {
      return 50000;
    } else if (type === 3) {
      return hours > 100 ? hours * 1000 : hours * 750;
    }
    return 0;
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log('workHours:', workHours, typeof workHours);

  
  
      console.log('workHours:', workHours, typeof workHours);

    try {
      const calculatedSalary = calculateSalary(salaryType, workHours);

     
      const response = await axios.post('http://localhost:5000/api/employee', {
        firstName,
        lastName,
        phone,
        email,
        workHours: Number(workHours),
        salaryType,
        salary: calculatedSalary,
        department,
        loginUserId,
        password,
        confirmPassword
      });

      if (response.status === 201) {
        setSuccessMessage('Employee added successfully');
        // Reset form fields
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmail('');
        setWorkHours(0);
        setSalaryType(1);
        setSalary(calculatedSalary);
        setPassword('');
        setConfirmPassword('');
      } else {
        setError('Error adding employee');
      }
    } catch (error) {
      console.error('Add employee error:', error);
      setError('Error adding employee');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <form className="p-8 border rounded-md shadow-md bg-white w-96 animate-fade-in-down" onSubmit={handleAddEmployee}>
      <h2 className="text-2xl font-semibold  text-center pb-4 mb-4">Add Employee</h2>
      <div className="mb-4">
        <label htmlFor="firstName" className="block mb-1">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="w-full p-2 border rounded-md"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block mb-1">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="w-full p-2 border rounded-md"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block mb-1">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          className="w-full p-2 border rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="workHours" className="block mb-1">
          Work Hours
        </label>
        <input
          type="number"
          id="workHours"
          className="w-full p-2 border rounded-md"
          value={workHours}
          onChange={(e) => {
            setWorkHours(e.target.value);
            setSalary(calculateSalary(salaryType, e.target.value));
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="salaryType" className="block mb-1">
          Salary Type
        </label>
        <select
          id="salaryType"
          className="w-full p-2 border rounded-md"
          value={salaryType}
          onChange={(e) => {
            const selectedValue = parseInt(e.target.value);
            setSalaryType(selectedValue);
            setSalary(calculateSalary(selectedValue, workHours));
          }}
          required
        >
          <option value={1}>Type 1</option>
          <option value={2}>Type 2</option>
          <option value={3}>Type 3</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="salary" className="block mb-1">
          Salary
        </label>
        <input
          type="number"
          id="salary"
          className="w-full p-2 border rounded-md"
          value={salary}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label htmlFor="department" className="block mb-1">
          Department
        </label>
        <input
          type="text"
          id="department"
          className="w-full p-2 border rounded-md"
          value={department}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label htmlFor="loginUserId" className="block mb-1">
          Login User ID
        </label>
        <input
          type="text"
          id="loginUserId"
          className="w-full p-2 border rounded-md"
          value={loginUserId}
          onChange={(e) => setLoginUserId(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full p-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full p-2 border rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="text-red-500 mb-2">{error}</div>
      <div className="text-green-500 mb-2">{successMessage}</div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Employee
      </button>
      <Link
        to="/manager-dashboard"
        className="block mt-4 text-blue-500 hover:underline focus:outline-none focus:text-blue-600"
      >
        Back to Manager Dashboard
      </Link>
    </form>
  </div>
  );
};

export default AddEmployeePage;
