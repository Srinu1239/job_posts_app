import React, { useState } from "react";
import { registerUser } from "../services/authService";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

/*
This `RegisterForm` component allows users to create an account through a registration form.
- It uses `useState` hooks to manage the `username`, `password`, and `message` state.
- The `handleRegister` function calls the `registerUser` service to attempt registration and displays a message based on success or failure.
- The `goToLogin` function redirects users to the login page after registration.
- The form includes two inputs for username and password and a button to submit the form.
- It also displays a conditional message to guide users on their next steps.
*/
const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, password);
      setMessage("Registration successful! You can now log in.");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
        <div className="goToRegisterLink" onClick={goToLogin }> Login </div>
      </form>
    </div>
  );
};

export default RegisterForm;
