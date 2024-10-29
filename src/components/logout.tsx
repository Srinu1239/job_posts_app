import React from 'react'
import { logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Logout() {

  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate('/');
  }
  return (
    <div className='logout' onClick={handleLogout}>Logout</div>
  )
}

export default Logout