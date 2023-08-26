import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import ManagerDashboard from './components/ManagerDashboard';
import LoginPage from './components/LoginPage';
import AddEmployeePage from './pages/AddEmployeePage';
import UpdateEmployeePage from './pages/UpdateEmployeePage';
import DeleteEmployeePage from './pages/DeleteEmployeePage';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
const App = () => {


  return (
      <Router> 
        <Routes>
        <Route path="/" exact Component={ Home } />
        <Route path="/employee/:department" Component={ ManagerDashboard} />
        <Route path="/add-employee/:department" Component={AddEmployeePage } />
        <Route path="/update-employee/:id" Component={UpdateEmployeePage } />
        <Route path="/delete-employee/:id" Component={DeleteEmployeePage } />
        <Route path="/employee-details/:loginUserId" Component={EmployeeDetailsPage} />


        <Route path="/login" Component={LoginPage} />
        <Route path="/employee-login" Component={EmployeeLogin} />

        </Routes>
        </Router>   
  );
};

export default App;
