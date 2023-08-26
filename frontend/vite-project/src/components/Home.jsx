import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-600 min-h-screen flex justify-center items-center">
      <div className=" bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition duration-300">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Employee Management System</h2>
        <div className='flex items-center justify-center'>
        <Link
          to="/employee-login"
          className="block text-white hover:text-black transition duration-300 bg-blue-500 m-8 p-2 rounded"
        >
          Employee Login
        </Link>
        <Link
          to="/login"
          className="block text-white hover:text-black transition duration-300 bg-blue-500 m-8 p-2 rounded"
        >
          Manager Login
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
