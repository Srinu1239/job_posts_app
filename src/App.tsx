import React from 'react';
import './App.css';
import LoginForm from './components/loginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/registerForm';
import JobForm from './components/jobPostForm';
import JobList from './components/jobList';

/**
 * App component is the main entry point of the application.
 * 
 * It sets up a Router to handle different URL paths,
 * each rendering a specific component:
 * 
 * - "/" and "/login" render the LoginForm component.
 * - "/register" renders the RegisterForm component.
 * - "/jobForm" renders the JobForm component.
 * - "/jobList" renders the JobList component.
 * 
 * This setup uses React Router's Routes and Route components
 * to map each path to a respective form or list page.
 */


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/jobForm' element={<JobForm />} />
        <Route path='/jobList' element={<JobList />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
