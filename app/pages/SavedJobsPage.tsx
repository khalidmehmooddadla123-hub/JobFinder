/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../../context/JobContext';
import { JobCard } from '../components/JobCard';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Bookmark } from 'lucide-react';

interface SavedJobsPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const SavedJobsPage: React.FC<SavedJobsPageProps> = ({ onNavigate }) => {
  const { jobs, savedJobs } = useJobs();

  const savedJobsList = jobs.filter(job => savedJobs.includes(job.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
            <p className="text-muted-foreground">
              {savedJobsList.length} {savedJobsList.length === 1 ? 'job' : 'jobs'} saved
            </p>
          </div>

          {savedJobsList.length === 0 ? (
            <Card className="p-12 text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="max-w-md mx-auto"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-6">
                  <Bookmark className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No Saved Jobs Yet</h2>
                <p className="text-muted-foreground mb-8">
                  Start saving jobs you&apos;re interested in to easily find them later. 
                  Click the bookmark icon on any job listing to save it here.
                </p>
                <Button onClick={() => onNavigate('jobs')} size="lg">
                  Browse Jobs
                </Button>
              </motion.div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobsList.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={() => onNavigate('job-details', { jobId: job.id })}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
