export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: {
    city: string;
    country: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  jobType: 'Internship' | 'Full-time';
  workType: 'Remote' | 'Onsite' | 'Hybrid';
  experienceLevel: 'Entry' | 'Junior' | 'Mid' | 'Senior';
  category: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
}

export interface JobApplication {
  jobId: string;
  status: 'Applied' | 'Interview' | 'Rejected';
  appliedDate: string;
  personalDetails: {
    name: string;
    email: string;
    phone: string;
  };
  resumeUrl?: string;
  coverLetter?: string;
}

export interface FilterOptions {
  jobType: ('Internship' | 'Full-time')[];
  workType: ('Remote' | 'Onsite' | 'Hybrid')[];
  location: {
    city: string;
    country: string;
  } | null;
  salaryRange: {
    min: number;
    max: number;
  };
  experienceLevel: ('Entry' | 'Junior' | 'Mid' | 'Senior')[];
}
