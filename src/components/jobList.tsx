import React, { useState, useEffect } from 'react';
import SearchBar from './searchBar';
import { useNavigate } from 'react-router-dom';
import Logout from './logout';
import { getJobs, Job, deleteJob } from '../services/authService';
import './jobList.css';

/**
 * JobList Component:
 * 
 * This component displays a list of job listings fetched from the backend.
 * It includes a search bar for filtering jobs by title or requirements 
 * and a link to navigate to the job creation form.
 * 
 * useEffect is used to fetch the jobs data on component mount, 
 * and useState manages the job list and search query states. 
 * The component also includes a logout button for user authentication management.
 */

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchJobs = async () => {
      const response = await getJobs();
      setJobs(response);
    };

    fetchJobs();
  }, []);


  const filteredJobs = jobs.filter((job : Job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.requirements.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const goToJobForm = () => {
    navigate('/jobForm');
  }



  const handleEdit = (job: Job) => {
    // Navigate to job form and pass job data as state
    navigate('/jobForm', {state: { job }});
  };

  const handleDelete = async (jobId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (confirmed) {
      await deleteJob(jobId); // Call deleteJob function to delete the job
      setJobs((Jobs) => Jobs.filter((job: Job) => job._id !== jobId)); // Update the job list after deletion
    }
  };

  

  return (
    <div>
      <h1>Job Listings</h1>
      <div className='goToRegisterLink' onClick={goToJobForm}>Add new job</div>
      
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredJobs.map((job: Job) => (
          <li key={job._id}>
            <h2>{job.title}</h2>
            <p>{job.requirements} - {job.location}</p>
            <p>{job.description}</p>

            <button className='edit' onClick={() => handleEdit(job)}>Edit</button>
            <button className='delete' onClick={() => handleDelete(job._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Logout />
    </div>
  );
};

export default JobList;


