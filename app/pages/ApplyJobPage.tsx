/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useJobs } from "../../context/JobContext";
import { Job } from "../../types/job";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Progress } from "../components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ApplyJobPageProps {
  jobId: string;
  onNavigate: (page: string, params?: any) => void;
}

export const ApplyJobPage: React.FC<ApplyJobPageProps> = ({
  jobId,
  onNavigate,
}) => {
  const { getJobById, applyToJob, isJobApplied } = useJobs();
  const [job, setJob] = useState<Job | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeFile: null as File | null,
    coverLetter: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    resumeFile: "",
    coverLetter: "",
  });

  useEffect(() => {
    const foundJob = getJobById(jobId);
    setJob(foundJob || null);

    if (foundJob && isJobApplied(jobId)) {
      onNavigate("job-details", { jobId });
      toast.info("You have already applied to this job");
    }
  }, [jobId, getJobById, isJobApplied, onNavigate]);

  const validateStep = (step: number): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
        isValid = false;
      } else {
        newErrors.name = "";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
        isValid = false;
      } else {
        newErrors.email = "";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
        isValid = false;
      } else {
        newErrors.phone = "";
      }
    }

    if (step === 2) {
      if (!formData.resumeFile) {
        newErrors.resumeFile = "Resume is required";
        isValid = false;
      } else {
        newErrors.resumeFile = "";
      }
    }

    if (step === 3) {
      if (!formData.coverLetter.trim()) {
        newErrors.coverLetter = "Cover letter is required";
        isValid = false;
      } else if (formData.coverLetter.trim().length < 100) {
        newErrors.coverLetter = "Cover letter must be at least 100 characters";
        isValid = false;
      } else {
        newErrors.coverLetter = "";
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError(false);

    setTimeout(() => {
      try {
        if (Math.random() < 0.1) {
          throw new Error("Submission failed");
        }

        applyToJob(jobId, {
          status: "Applied",
          personalDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          resumeUrl: formData.resumeFile
            ? URL.createObjectURL(formData.resumeFile)
            : undefined,
          coverLetter: formData.coverLetter,
        });

        setIsSuccess(true);
        toast.success("Application submitted successfully!");
      } catch (error) {
        setSubmitError(true);
        toast.error("Failed to submit application. Please try again.");
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resumeFile: "File size must be less than 5MB" });
        return;
      }
      setFormData({ ...formData, resumeFile: file });
      setErrors({ ...errors, resumeFile: "" });
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The job you&apos;re trying to apply for doesn&apos;t exist.
            </p>
            <Button onClick={() => onNavigate("jobs")}>Browse All Jobs</Button>
          </Card>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full mb-6"
              >
                <CheckCircle2 className="h-12 w-12" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">
                Application Submitted!
              </h2>
              <p className="text-muted-foreground mb-8">
                Your application for <strong>{job.title}</strong> at{" "}
                <strong>{job.company}</strong> has been successfully submitted.
                The company will review your application and contact you soon.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => onNavigate("dashboard")}>
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={() => onNavigate("jobs")}>
                  Browse More Jobs
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => onNavigate("job-details", { jobId })}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Details
        </Button>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-8 pb-6 border-b">
                <Image
                  src={job.companyLogo}
                  alt={job.company}
                  width={64}
                  height={64}
                  className="rounded-lg object-cover"
                  priority
                />

                <div>
                  <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    Step {currentStep} of 3
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-4">
                  <span
                    className={`text-xs ${
                      currentStep >= 1
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    Personal Details
                  </span>
                  <span
                    className={`text-xs ${
                      currentStep >= 2
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    Resume
                  </span>
                  <span
                    className={`text-xs ${
                      currentStep >= 3
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    Cover Letter
                  </span>
                </div>
              </div>

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Personal Details
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Please provide your contact information
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Upload Resume
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Upload your latest resume (PDF, DOC, or DOCX, max 5MB)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="resume">Resume *</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="resume"
                          className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            errors.resumeFile
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                              {formData.resumeFile
                                ? formData.resumeFile.name
                                : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              PDF, DOC, or DOCX (max 5MB)
                            </p>
                          </div>
                          <input
                            id="resume"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      {errors.resumeFile && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.resumeFile}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-xl font-semibold mb-4">
                        Cover Letter
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Tell us why you&apos;re a great fit for this position
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="coverLetter">Cover Letter *</Label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Write your cover letter here..."
                        rows={12}
                        value={formData.coverLetter}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coverLetter: e.target.value,
                          })
                        }
                        className={errors.coverLetter ? "border-red-500" : ""}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.coverLetter ? (
                          <p className="text-sm text-red-500">
                            {errors.coverLetter}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Minimum 100 characters
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {formData.coverLetter.length} characters
                        </p>
                      </div>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Failed to submit application. Please try again.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1 || isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                {currentStep < 3 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <CheckCircle2 className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
