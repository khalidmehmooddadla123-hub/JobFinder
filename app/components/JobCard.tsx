


import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Bookmark, BookmarkCheck, Briefcase, DollarSign } from 'lucide-react'
import { Job } from '../../types/job'
import { useJobs } from '../../context/JobContext'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card } from './ui/card'

interface JobCardProps {
  job: Job
  onClick: () => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const { isJobSaved, toggleSaveJob, isJobApplied } = useJobs()
  const saved = isJobSaved(job.id)
  const applied = isJobApplied(job.id)

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSaveJob(job.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 relative"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <Image
              src={job.companyLogo}
              alt={job.company}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveClick}
            className="shrink-0"
            aria-label={saved ? 'Remove from saved' : 'Save job'}
          >
            {saved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>
              {job.location.city}, {job.location.country}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>{job.workType}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">
            {job.salary.currency}{' '}
            {job.salary.min.toLocaleString()} -{' '}
            {job.salary.max.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={job.jobType === 'Internship' ? 'secondary' : 'default'}>
            {job.jobType}
          </Badge>
          <Badge variant="outline">{job.experienceLevel}</Badge>
          {applied && (
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              Applied
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
