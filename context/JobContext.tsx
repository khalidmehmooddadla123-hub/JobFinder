/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Job, JobApplication } from '../types/job';
import { mockJobs } from '../data/mockJobs';

interface JobContextType {
  jobs: Job[];
  savedJobs: string[];
  appliedJobs: JobApplication[];
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  applyToJob: (jobId: string, application: Omit<JobApplication, 'jobId' | 'appliedDate'>) => void;
  isJobApplied: (jobId: string) => boolean;
  getJobById: (jobId: string) => Job | undefined;
  getSimilarJobs: (jobId: string, limit?: number) => Job[];
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs] = useState<Job[]>(mockJobs);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    const applied = localStorage.getItem('appliedJobs');
    if (saved) setSavedJobs(JSON.parse(saved));
    if (applied) setAppliedJobs(JSON.parse(applied));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.includes(jobId);
  };

  const applyToJob = (jobId: string, application: Omit<JobApplication, 'jobId' | 'appliedDate'>) => {
    const newApplication: JobApplication = {
      ...application,
      jobId,
      appliedDate: new Date().toISOString(),
    };
    setAppliedJobs(prev => [...prev, newApplication]);
  };

  const isJobApplied = (jobId: string) => {
    return appliedJobs.some(app => app.jobId === jobId);
  };

  const getJobById = (jobId: string) => {
    return jobs.find(job => job.id === jobId);
  };

  const getSimilarJobs = (jobId: string, limit = 3) => {
    const currentJob = getJobById(jobId);
    if (!currentJob) return [];

    return jobs
      .filter(job => 
        job.id !== jobId && 
        (job.category === currentJob.category || 
         job.jobType === currentJob.jobType)
      )
      .slice(0, limit);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobs,
        appliedJobs,
        toggleSaveJob,
        isJobSaved,
        applyToJob,
        isJobApplied,
        getJobById,
        getSimilarJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
