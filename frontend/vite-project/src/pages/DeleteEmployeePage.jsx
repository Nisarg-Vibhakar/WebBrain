import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteEmployeePage = () => {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeleteEmployee = async () => {
    try {
      const response = await axios.delete(`https://webbrain.onrender.com/api/employee/delete/${id}`);
      if (response.status === 200) {
        setSuccessMessage('Employee deleted successfully');
      } else {
        setError('Error deleting employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Error deleting employee');
    }
  };

  return (
    <div className="flex justify-center items-center bg-purple-500 min-h-screen">
    <div className="p-8 border rounded-md shadow-md bg-white w-96 animate-fade-in-down">
      <h2 className="text-xl font-semibold mb-4">Delete Employee</h2>
      <p className="mb-4">Are you sure you want to delete this employee?</p>
      <button
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300"
        onClick={handleDeleteEmployee}
      >
        Delete Employee
      </button>
      <button
        className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
        onClick={() => (window.location.href = '/manager-dashboard')}
      >
        Cancel
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  </div>
  );
};

export default DeleteEmployeePage;
 