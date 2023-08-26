import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeLoginPage = () => {
  const navigate = useNavigate();
  const [loginUserId, setLoginUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/employee/login', {
        loginUserId,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        // Store the token

        // Navigate to the employee details page
        navigate(`/employee-details/${loginUserId}`);
      }
    } catch (error) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Employee Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Login ID:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={loginUserId}
              onChange={(e) => setLoginUserId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EmployeeLoginPage;
