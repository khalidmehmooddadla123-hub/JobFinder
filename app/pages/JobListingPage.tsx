/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterSidebar } from '../components/FilterSidebar';
import { JobCard } from '../components/JobCard';
import { useJobs } from '../../context/JobContext';
import { FilterOptions, Job } from '../../types/job';
import { Button } from '../components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import { Card } from '../components/ui/card';

interface JobListingPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialFilters?: any;
}

export const JobListingPage: React.FC<JobListingPageProps> = ({ onNavigate, initialFilters }) => {
  const { jobs } = useJobs();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const [filters, setFilters] = useState<FilterOptions>({
    jobType: [],
    workType: [],
    location: null,
    salaryRange: { min: 0, max: 200000 },
    experienceLevel: [],
  });

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...jobs];

      if (filters.jobType.length > 0) {
        filtered = filtered.filter(job => filters.jobType.includes(job.jobType));
      }

      if (filters.workType.length > 0) {
        filtered = filtered.filter(job => filters.workType.includes(job.workType));
      }

      if (filters.location) {
        filtered = filtered.filter(
          job =>
            job.location.city === filters.location?.city &&
            job.location.country === filters.location?.country
        );
      }

      if (filters.experienceLevel.length > 0) {
        filtered = filtered.filter(job => filters.experienceLevel.includes(job.experienceLevel));
      }

      filtered = filtered.filter(
        job =>
          job.salary.min >= filters.salaryRange.min &&
          job.salary.max <= filters.salaryRange.max
      );

      if (initialFilters?.keyword) {
        filtered = filtered.filter(
          job =>
            job.title.toLowerCase().includes(initialFilters.keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(initialFilters.keyword.toLowerCase())
        );
      }

      if (initialFilters?.location && initialFilters.location !== 'all') {
        filtered = filtered.filter(
          job => `${job.location.city}, ${job.location.country}` === initialFilters.location
        );
      }

      if (initialFilters?.jobType && initialFilters.jobType !== 'all') {
        filtered = filtered.filter(job => job.jobType === initialFilters.jobType);
      }

      if (initialFilters?.category) {
        filtered = filtered.filter(job => job.category === initialFilters.category);
      }

      setFilteredJobs(filtered);
      setIsLoading(false);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [jobs, filters, initialFilters]);

  const handleReset = () => {
    setFilters({
      jobType: [],
      workType: [],
      location: null,
      salaryRange: { min: 0, max: 200000 },
      experienceLevel: [],
    });
  };

  const handleJobClick = (jobId: string) => {
    onNavigate('job-details', { jobId });
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Job</h1>
            <p className="text-muted-foreground">
              {isLoading ? 'Loading jobs...' : `${filteredJobs.length} jobs found`}
            </p>
          </div>

          <div className="lg:hidden">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <div className="mt-6">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    onReset={handleReset}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  onReset={handleReset}
                />
              </Card>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Skeleton className="w-12 h-12 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldnot find any jobs matching your criteria. Try adjusting your filters.
                  </p>
                  <Button onClick={handleReset}>Reset Filters</Button>
                </div>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {currentJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onClick={() => handleJobClick(job.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center gap-2 mt-8"
                  >
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, index) => (
                      <Button
                        key={index}
                        variant={currentPage === index + 1 ? 'default' : 'outline'}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
