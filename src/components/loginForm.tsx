import React, { useState } from "react";
import { loginUser } from "../services/authService";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

/**
 * LoginForm Component
 * 
 * This React functional component provides a user login form with fields for
 * entering a username and password. Upon successful login, it navigates 
 * to a job listing page. If login fails, an error message is displayed.
 * 
 * The component also includes a link for user registration, navigating to
 * a registration page if clicked. It uses React Router's `useNavigate` for 
 * navigation and manages form inputs with React's `useState` hook.
 * 
 * Styling is applied from "Auth.css" for the form layout.
 */

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToJobList = () => {
    navigate('/jobList');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(username, password);
      setMessage("Login successful!");
      goToJobList();
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
  <form className="auth-form" onSubmit={(e) => { handleLogin(e) }}>
    <h2>Login</h2>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">Login</button>
    {message && <p>{message}</p>}
    <br />
    <div className="goToRegisterLink" onClick={goToRegister}>Register</div>
  </form>
</div>

  );
};

export default LoginForm;
