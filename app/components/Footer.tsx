
import React from 'react'
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react'
import { Separator } from './ui/separator'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Briefcase className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg">JobFinder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting talented individuals with their dream careers. Start your journey today.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground cursor-pointer">
              <li className="hover:text-primary transition-colors">About Us</li>
              <li className="hover:text-primary transition-colors">How It Works</li>
              <li className="hover:text-primary transition-colors">Pricing</li>
              <li className="hover:text-primary transition-colors">FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground cursor-pointer">
              <li className="hover:text-primary transition-colors">Post a Job</li>
              <li className="hover:text-primary transition-colors">Browse Candidates</li>
              <li className="hover:text-primary transition-colors">Employer Resources</li>
              <li className="hover:text-primary transition-colors">Contact Sales</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@jobfinder.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 JobFinder. All rights reserved.</p>
          <div className="flex gap-6 cursor-pointer">
            <span className="hover:text-primary transition-colors">Privacy Policy</span>
            <span className="hover:text-primary transition-colors">Terms of Service</span>
            <span className="hover:text-primary transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
