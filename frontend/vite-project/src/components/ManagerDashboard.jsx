
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ManagerDashboard = () => {
  const { department } = useParams();
  const [departmentEmployees, setDepartmentEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axios.get(`https://webbrain.onrender.com/api/employee/${department}`, {
        });

        if (response.status === 200) {
          setDepartmentEmployees(response.data);
        } else {
        }
      } catch (error) {
        console.error('Fetch employees error:', error);
      }
    }

    fetchEmployees();
  }, [department]);

  

  return (
    <div className="bg-gray-100 min-h-screen">
    <nav className="bg-gray-200 p-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Manager Dashboard</h2>
      <Link to={`/add-employee/${department}`} className="px-2 mr-14 py-1 bg-blue-500 text-white rounded-md ml-2">
        Add Employee
      </Link>
    </nav>
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Employees in Department: {department}</h2>
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Work Hours</th>
            <th className="p-2 border">Salary Type</th>
            <th className="p-2 border">Salary</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departmentEmployees.map((employee) => (
            <tr key={employee._id} className="hover:bg-gray-100">
              <td className="p-2 border">{employee.firstName}</td>
              <td className="p-2 border">{employee.lastName}</td>
              <td className="p-2 border">{employee.phone}</td>
              <td className="p-2 border">{employee.email}</td>
              <td className="p-2 border">{employee.workHours}</td>
              <td className="p-2 border">{employee.salaryType}</td>
              <td className="p-2 border">{employee.salary}</td>
              <td className="p-2 border">
                <Link className="px-2 py-1 bg-red-500 text-white rounded-md" to={`/delete-employee/${employee.loginUserId}`}>
                  Delete
                </Link>
                <Link className="px-2 py-1 bg-blue-500 text-white rounded-md ml-2" to={`/update-employee/${employee.loginUserId}`}>
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ManagerDashboard;