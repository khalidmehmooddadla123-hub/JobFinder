/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useJobs } from "../../context/JobContext";
import { JobCard } from "../components/JobCard";
import { Card } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Briefcase,
  Bookmark,
  User,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

interface DashboardPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { jobs, savedJobs, appliedJobs } = useJobs();
  const [activeTab, setActiveTab] = useState("applied");

  const appliedJobsList = appliedJobs
    .map((app) => ({
      ...jobs.find((job) => job.id === app.jobId)!,
      application: app,
    }))
    .filter((item) => item !== undefined);

  const savedJobsList = jobs.filter((job) => savedJobs.includes(job.id));

  const statusConfig = {
    Applied: {
      icon: Clock,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    Interview: {
      icon: TrendingUp,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    Rejected: {
      icon: XCircle,
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  };

  const stats = [
    {
      label: "Applied Jobs",
      value: appliedJobs.length,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Saved Jobs",
      value: savedJobs.length,
      icon: Bookmark,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Interviews",
      value: appliedJobs.filter((app) => app.status === "Interview").length,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your job applications and saved opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.label}
                        </p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="applied" className="mt-6">
                {appliedJobsList.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No Applications Yet
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Start applying to jobs that match your skills and
                      interests
                    </p>
                    <Button onClick={() => onNavigate("jobs")}>
                      Browse Jobs
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appliedJobsList.map((item) => {
                      const status = item.application.status;
                      const StatusIcon = statusConfig[status].icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Card
                            className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
                            onClick={() =>
                              onNavigate("job-details", { jobId: item.id })
                            }
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start gap-4 flex-1">
                               
                                <Image
                                  src={item.companyLogo}
                                  alt={item.company}
                                  width={64}
                                  height={64}
                                  className="rounded-lg object-cover"
                                  priority
                                />

                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">
                                    {item.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.company}
                                  </p>
                                </div>
                              </div>
                              <Badge
                                className={`${statusConfig[status].bgColor} ${statusConfig[status].textColor} border-0`}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>
                                Applied on{" "}
                                {new Date(
                                  item.application.appliedDate,
                                ).toLocaleDateString()}
                              </span>
                              <span>
                                {item.location.city}, {item.location.country}
                              </span>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved" className="mt-6">
                {savedJobsList.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                      <Bookmark className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      No Saved Jobs
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Save jobs you&apos;re interested in for quick access later
                    </p>
                    <Button onClick={() => onNavigate("jobs")}>
                      Browse Jobs
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedJobsList.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onClick={() =>
                          onNavigate("job-details", { jobId: job.id })
                        }
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                      <User className="h-10 w-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Your Profile</h3>
                      <p className="text-muted-foreground">
                        Manage your personal information and preferences
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Account Statistics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Total Applications
                          </span>
                          <span className="font-semibold">
                            {appliedJobs.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Saved Jobs
                          </span>
                          <span className="font-semibold">
                            {savedJobs.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Interview Invitations
                          </span>
                          <span className="font-semibold">
                            {
                              appliedJobs.filter(
                                (app) => app.status === "Interview",
                              ).length
                            }
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            Success Rate
                          </span>
                          <span className="font-semibold">
                            {appliedJobs.length > 0
                              ? Math.round(
                                  (appliedJobs.filter(
                                    (app) => app.status === "Interview",
                                  ).length /
                                    appliedJobs.length) *
                                    100,
                                )
                              : 0}
                            %
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => onNavigate("jobs")}
                        >
                          <Briefcase className="h-4 w-4 mr-2" />
                          Browse All Jobs
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => onNavigate("saved")}
                        >
                          <Bookmark className="h-4 w-4 mr-2" />
                          View Saved Jobs
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
