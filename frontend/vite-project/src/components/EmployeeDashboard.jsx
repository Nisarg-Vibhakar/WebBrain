import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import EmployeeTable from './EmployeeTable';

const EmployeeDashboard = () => {
  const [departmentEmployees, setDepartmentEmployees] = useState([]);

  const fetchEmployeesByDepartment = async (department) => {
    try {
      const response = await axios.get(`/api/employees/${department}`, {
        // Add any necessary headers
      });

      if (response.status === 200) {
        setDepartmentEmployees(response.data);
      } else {
        // Handle error
        console.error('Error fetching employees');
      }
    } catch (error) {
      console.error('Fetch employees error:', error);
    }
  };

  useEffect(() => {
    // Fetch employees of the logged-in employee's department
    fetchEmployeesByDepartment('EmployeeDepartment'); // Replace with actual department
  }, []);

  return (
    <div>
      {/* Your navigation and other components */}
      <h2 className="text-2xl font-bold mb-4">Employees in Your Department</h2>
      <EmployeeTable employees={departmentEmployees} />
    </div>
  );
};

export default EmployeeDashboard;
