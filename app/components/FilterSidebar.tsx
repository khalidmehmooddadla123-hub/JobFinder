/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FilterOptions } from '../../types/job';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cities } from '../../data/mockJobs';
import { Separator } from './ui/separator';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const handleJobTypeChange = (type: 'Internship' | 'Full-time', checked: boolean) => {
    const newJobTypes = checked
      ? [...filters.jobType, type]
      : filters.jobType.filter(t => t !== type);
    onFilterChange({ ...filters, jobType: newJobTypes });
  };

  const handleWorkTypeChange = (type: 'Remote' | 'Onsite' | 'Hybrid', checked: boolean) => {
    const newWorkTypes = checked
      ? [...filters.workType, type]
      : filters.workType.filter(t => t !== type);
    onFilterChange({ ...filters, workType: newWorkTypes });
  };

  const handleExperienceChange = (level: 'Entry' | 'Junior' | 'Mid' | 'Senior', checked: boolean) => {
    const newLevels = checked
      ? [...filters.experienceLevel, level]
      : filters.experienceLevel.filter(l => l !== level);
    onFilterChange({ ...filters, experienceLevel: newLevels });
  };

  const handleLocationChange = (value: string) => {
    if (value === 'all') {
      onFilterChange({ ...filters, location: null });
    } else {
      const location = cities.find((c, i) => i.toString() === value);
      if (location) {
        onFilterChange({ ...filters, location });
      }
    }
  };

  const handleSalaryChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      salaryRange: { min: value[0], max: value[1] },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">Job Type</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="internship"
              checked={filters.jobType.includes('Internship')}
              onCheckedChange={(checked: boolean ) => handleJobTypeChange('Internship', checked as boolean)}
            />
            <label
              htmlFor="internship"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Internship
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fulltime"
              checked={filters.jobType.includes('Full-time')}
              onCheckedChange={(checked: boolean) => handleJobTypeChange('Full-time', checked as boolean)}
            />
            <label
              htmlFor="fulltime"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Full-time
            </label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">Work Type</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={filters.workType.includes('Remote')}
              onCheckedChange={(checked: boolean) => handleWorkTypeChange('Remote', checked as boolean)}
            />
            <label
              htmlFor="remote"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Remote
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="onsite"
              checked={filters.workType.includes('Onsite')}
              onCheckedChange={(checked: boolean) => handleWorkTypeChange('Onsite', checked as boolean)}
            />
            <label
              htmlFor="onsite"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Onsite
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hybrid"
              checked={filters.workType.includes('Hybrid')}
              onCheckedChange={(checked: boolean) => handleWorkTypeChange('Hybrid', checked as boolean)}
            />
            <label
              htmlFor="hybrid"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Hybrid
            </label>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label htmlFor="location" className="text-base">
          Location
        </Label>
        <Select
          value={
            filters.location
              ? cities.findIndex(
                  c => c.city === filters.location?.city && c.country === filters.location?.country
                ).toString()
              : 'all'
          }
          onValueChange={handleLocationChange}
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {cities.map((location, index) => (
              <SelectItem key={index} value={index.toString()}>
                {location.city}, {location.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">Experience Level</Label>
        <div className="space-y-2">
          {['Entry', 'Junior', 'Mid', 'Senior'].map(level => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={level.toLowerCase()}
                checked={filters.experienceLevel.includes(level as any)}
                onCheckedChange={(checked: boolean) =>
                  handleExperienceChange(level as any, checked as boolean)
                }
              />
              <label
                htmlFor={level.toLowerCase()}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Salary Range */}
      <div className="space-y-3">
        <Label className="text-base">
          Salary Range (per year)
        </Label>
        <div className="pt-2">
          <Slider
            min={0}
            max={200000}
            step={5000}
            value={[filters.salaryRange.min, filters.salaryRange.max]}
            onValueChange={handleSalaryChange}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>${filters.salaryRange.min.toLocaleString()}</span>
            <span>${filters.salaryRange.max.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};



