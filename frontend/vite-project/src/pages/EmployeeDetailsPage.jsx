import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetailsPage = () => {
  const { loginUserId } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({});

  useEffect(() => {
    async function fetchEmployeeDetails() {
      try {
        const response = await axios.get(`https://webbrain.onrender.com/api/oneEmployee/${loginUserId}`);
        const employee = response.data;
        setEmployeeDetails(employee);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }

    fetchEmployeeDetails();
  }, [loginUserId]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Employee Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-600">Login ID:</p>
          <p className="text-lg text-gray-800">{employeeDetails.loginUserId}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Department:</p>
          <p className="text-lg text-gray-800">{employeeDetails.department}</p>
        </div>
      </div>
      <hr className="my-4 border-t border-gray-300" />
      <div>
        <p className="text-sm font-medium text-gray-600">Full Name:</p>
        <p className="text-lg text-gray-800">
          {employeeDetails.firstName} {employeeDetails.lastName}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Phone:</p>
        <p className="text-lg text-gray-800">{employeeDetails.phone}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Email:</p>
        <p className="text-lg text-gray-800">{employeeDetails.email}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Work Hours:</p>
        <p className="text-lg text-gray-800">{employeeDetails.workHours}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Salary Type:</p>
        <p className="text-lg text-gray-800">{employeeDetails.salaryType}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">Salary:</p>
        <p className="text-lg text-gray-800">${employeeDetails.salary}</p>
      </div>
    </div>
  </div>
  );
};

export default EmployeeDetailsPage;
