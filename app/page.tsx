/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { JobProvider } from '../context/JobContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { JobListingPage } from './pages/JobListingPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { ApplyJobPage } from './pages/ApplyJobPage';
import { SavedJobsPage } from './pages/SavedJobsPage';
import { DashboardPage } from './pages/DashboardPage';
import { Toaster } from './components/ui/sonner';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'home' | 'jobs' | 'job-details' | 'apply' | 'saved' | 'dashboard';

interface NavigationState {
  page: Page;
  params?: any;
}

export default function App() {
  const [navigation, setNavigation] = useState<NavigationState>({
    page: 'home',
    params: undefined,
  });

  const handleNavigate = (page: string, params?: any) => {
    setNavigation({ page: page as Page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (navigation.page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'jobs':
        return (
          <JobListingPage
            onNavigate={handleNavigate}
            initialFilters={navigation.params}
          />
        );
      case 'job-details':
        return (
          <JobDetailsPage
            jobId={navigation.params?.jobId }
            onNavigate={handleNavigate}
          />
        );
      case 'apply':
        return (
          <ApplyJobPage
            jobId={navigation.params?.jobId}
            onNavigate={handleNavigate}
          />
        );
      case 'saved':
        return <SavedJobsPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <JobProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
        <Header currentPage={navigation.page} onNavigate={handleNavigate} />
        <AnimatePresence mode="wait">
          <motion.main
            key={navigation.page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <ScrollToTop />
        <Toaster position="top-right" />
      </div>
    </JobProvider>
  );
}


