/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { Code, Database, Palette, TrendingUp, Zap, Users, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { jobCategories, trustedCompanies } from '../../data/mockJobs';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleSearch = (keyword: string, location: string, jobType: string) => {
    onNavigate('jobs', { keyword, location, jobType });
  };

  const categoryIcons = {
    Code,
    Database,
    Palette,
    TrendingUp,
  };

  const features = [
    {
      icon: Zap,
      title: 'Fast & Easy',
      description: 'Find and apply to jobs in minutes with our streamlined application process.',
    },
    {
      icon: Users,
      title: 'Trusted Companies',
      description: 'Access opportunities from top companies and startups worldwide.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with industry-leading security measures.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Dream Job or{' '}
            <span className="text-primary">Internship</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Connect with thousands of opportunities from top companies. 
            Start your career journey with the perfect match for your skills and ambitions.
          </p>

          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <p className="text-sm text-muted-foreground">
            Popular: Frontend Developer, UI/UX Designer, Product Manager, Data Analyst
          </p>
        </motion.div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Explore opportunities in your field of interest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => {
              const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => onNavigate('jobs', { category: category.name })}
                  >
                    <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.count} open positions
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Explore <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
              Trusted by leading companies
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {trustedCompanies.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-xl font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose JobFinder?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make job hunting simple, efficient, and effective for students and professionals alike
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-lg transition-all duration-200">
                    <div className="bg-primary/10 text-primary p-4 rounded-full w-fit mx-auto mb-6">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary text-primary-foreground rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of students and professionals who found their dream jobs through JobFinder
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('jobs')}
              className="text-lg px-8"
            >
              Browse All Jobs
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
