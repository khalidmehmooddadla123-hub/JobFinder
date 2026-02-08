"use client";

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cities } from '../../data/mockJobs';

interface SearchBarProps {
  onSearch: (keyword: string, location: string, jobType: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('all');
  const [jobType, setJobType] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location, jobType);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-stretch md:items-center bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg">
        <div className="flex items-center flex-1 gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Job title or keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="flex items-center flex-1 gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-md">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="border-0 bg-transparent p-0 focus:ring-0 focus:ring-offset-0 h-auto">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {cities.map((loc, index) => (
                <SelectItem key={index} value={`${loc.city}, ${loc.country}`}>
                  {loc.city}, {loc.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 md:flex-initial md:min-w-40">
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger className="bg-gray-50 dark:bg-gray-800">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" size="lg" className="md:px-8">
          Find Jobs
        </Button>
      </div>
    </form>
  );
};
