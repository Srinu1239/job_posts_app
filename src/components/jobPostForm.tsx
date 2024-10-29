import React, { useEffect, useState } from 'react';
import { addJob, updateJob } from '../services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import './jobPostForm.css'
import Logout from './logout';

/**
 * JobForm Component:
 * 
 * This component allows users to create and post new job listings. It uses
 * React's useState hook to manage form data and useNavigate from 
 * react-router-dom to redirect users to the Job List page upon successful submission.
 * The addJob function, imported from authService, handles posting job details 
 * to the backend. Form inputs include title, description, requirements, salary, 
 * and location, each updating the state dynamically with the handleChange function.
 * A Logout component is also rendered within this component.
 */

const JobForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const jobToEdit = location.state?.job;

  const goToJobList = () => {
    navigate('/JobList');
  }

  useEffect(() => {
    // If there's a job to edit, pre-fill the form data
    if (jobToEdit) {
      setFormData({
        title: jobToEdit.title,
        description: jobToEdit.description,
        requirements: jobToEdit.requirements,
        salary: jobToEdit.salary,
        location: jobToEdit.location,
      });
    }
  }, [jobToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jobToEdit) {
      
      setFormData(formData);
      updateJob(formData, jobToEdit._id);
    } else {
      setFormData(formData);
      addJob(formData); 
    }
    goToJobList();
  };

  return (
    <div>
      <h2>{jobToEdit ? 'EDIT JOB' : 'ADD NEW JOBS'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">{jobToEdit ? 'Update Job' : 'Post Job'}</button>
      </form>
      <Logout />
    </div>
  );
};

export default JobForm;
