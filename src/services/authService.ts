/**
 * This module provides API utility functions for managing user authentication 
 * and job postings in a web application. The `registerUser` and `loginUser` 
 * functions allow for user registration and login, storing the authentication 
 * token in localStorage for session management. The `addJob` function creates 
 * a new job listing by sending job details to the backend API, while `getJobs` 
 * retrieves a list of jobs from the server. Token retrieval and logout 
 * functionalities are also included, making this component a central utility 
 * for user and job management operations.
 */

import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with your backend API URL

export interface Job {
  _id: string;
  title: string;
  requirements: string;
  location: string;
  description: string;
  salary: string;
}

export interface createJob {
  title: string;
  requirements: string;
  location: string;
  description: string;
  salary: string;
}



export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
      throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });
    // Assuming the backend returns a token
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
      throw error;
  }
};

export const addJob = async (job: createJob) => {
  console.log("new job", job)

  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/api/jobs`, job, {
      headers: {
        Authorization: `Bearer ${token}`
      }});
    return response.data;
    } catch (error) {
      throw error;
      }

}

export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/jobs`);
    return response.data;
} catch (error) {
  throw error;
  }
}

export const updateJob = async (job: createJob, jobId: string) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/api/jobs/${jobId}`, job, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteJob = async (jobId: string) => {
  try {
    const token = getToken();
    console.log("jobId in delete method", jobId);
    const response = await axios.delete(`${API_URL}/api/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("response in delete method", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getToken = () => {
  return localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
