import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployeePage = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    workHours: 0,
    salaryType: 1,
    department: 'HR',
    loginUserId: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const response = await axios.get(`http://localhost:5000/api/oneEmployee/${id}`);
        const employee = response.data;
        setEmployeeData(employee);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    }

    fetchEmployeeData();
  }, [id]);

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

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

  

    if (employeeData.password !== employeeData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const updatedEmployee = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        phone: employeeData.phone,
        email: employeeData.email,
        workHours: Number(employeeData.workHours),
        salaryType: employeeData.salaryType,
        salary: calculateSalary(employeeData.salaryType, employeeData.workHours),
        department: employeeData.department,
        loginUserId: employeeData.loginUserId,
        password: employeeData.password,
      };
      const loginUserId = employeeData.loginUserId
      const response = await axios.put(`http://localhost:5000/api/employee/${loginUserId}`, updatedEmployee);

      if (response.status === 200) {
        setSuccessMessage('Employee updated successfully');
      } else {
        setError('Error updating employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Error updating employee');
    }
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <form className="p-8 border rounded-md shadow-md bg-white w-96 animate-fade-in-down" onSubmit={handleUpdateEmployee}>
    <h2 className="text-2xl text-center pb-4 font-semibold mb-4">Update Employee</h2>
      <div className="mb-4">
        <label htmlFor="firstName" className="block mb-1">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.firstName}
          onChange={(e) => setEmployeeData({ ...employeeData, firstName: e.target.value })}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.lastName}
          onChange={(e) => setEmployeeData({ ...employeeData, lastName: e.target.value })}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.phone}
          onChange={(e) => setEmployeeData({ ...employeeData, phone: e.target.value })}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.email}
          onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.workHours}
          onChange={(e) => {
            setEmployeeData({
              ...employeeData,
              workHours: e.target.value,
              salary: calculateSalary(employeeData.salaryType, e.target.value),
            });
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.salaryType}
          onChange={(e) => {
            const selectedValue = parseInt(e.target.value);
            setEmployeeData({
              ...employeeData,
              salaryType: selectedValue,
              salary: calculateSalary(selectedValue, employeeData.workHours),
            });
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.salary}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.department}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.loginUserId}
          onChange={(e) => setEmployeeData({ ...employeeData, loginUserId: e.target.value })}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.password}
          onChange={(e) => setEmployeeData({ ...employeeData, password: e.target.value })}
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
          className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
          value={employeeData.confirmPassword}
          onChange={(e) => setEmployeeData({ ...employeeData, confirmPassword: e.target.value })}
          required
        />
      </div>
      {/* ... Repeat for other input fields */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
      >
        Update Employee
      </button>
      <button
        type="button"
        className="w-full bg-red-500 text-white py-2 mt-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        onClick={() => (window.location.href = '/manager-dashboard')}
      >
        Cancel
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </form>
  </div>
  );
};

export default UpdateEmployeePage;
