/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useJobs } from '../../context/JobContext';
import { Job } from '../../types/job';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Building2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { JobCard } from '../components/JobCard';
import Image from 'next/image';

interface JobDetailsPageProps {
  jobId: string;
  onNavigate: (page: string, params?: any) => void;
}

export const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ jobId, onNavigate }) => {
  const { getJobById, getSimilarJobs, isJobSaved, toggleSaveJob, isJobApplied } = useJobs();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundJob = getJobById(jobId);
      setJob(foundJob || null);
      if (foundJob) {
        setSimilarJobs(getSimilarJobs(jobId));
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [jobId, getJobById, getSimilarJobs]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-6" />
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => onNavigate('jobs')} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The job you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button onClick={() => onNavigate('jobs')}>Browse All Jobs</Button>
          </Card>
        </div>
      </div>
    );
  }

  const saved = isJobSaved(job.id);
  const applied = isJobApplied(job.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => onNavigate('jobs')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <Image
                src={job.companyLogo}
                alt={job.company}
                height={64}
                width={64}
                className="rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-xl text-muted-foreground">{job.company}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleSaveJob(job.id)}
                    className="shrink-0"
                  >
                    {saved ? (
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>
                      {job.location.city}, {job.location.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-5 w-5" />
                    <span>{job.workType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-5 w-5" />
                    <span>
                      {job.salary.currency} {job.salary.min.toLocaleString()} -{' '}
                      {job.salary.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span>
                      Posted {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={job.jobType === 'Internship' ? 'secondary' : 'default'}>
                    {job.jobType}
                  </Badge>
                  <Badge variant="outline">{job.experienceLevel}</Badge>
                  <Badge variant="outline">{job.category}</Badge>
                  {applied && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Applied
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="lg:sticky lg:top-24">
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Application Details</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Deadline:{' '}
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Company: {job.company}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  {applied ? (
                    <Button disabled className="w-full" size="lg">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Already Applied
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => onNavigate('apply', { jobId: job.id })}
                    >
                      Apply Now
                    </Button>
                  )}
                </Card>
              </div>
            </div>
          </div>

          {similarJobs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarJobs.map((similarJob) => (
                  <JobCard
                    key={similarJob.id}
                    job={similarJob}
                    onClick={() => onNavigate('job-details', { jobId: similarJob.id })}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
