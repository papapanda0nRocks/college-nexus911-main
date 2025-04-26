
import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        {children}
      </main>
      
      {/* Different footer designs based on authentication status */}
      {isAuthenticated ? (
        // Modern, streamlined footer for authenticated users
        <footer className="border-t dark:border-gray-700 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-collegenet-600 dark:text-collegenet-400 mb-3">CollegeNet</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Your hub for professional networking and career development.
                </p>
              </div>
              
              <div className="md:col-span-1">
                <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/events" className="footer-link text-sm">Events</Link></li>
                  <li><Link to="/my-events" className="footer-link text-sm">My Events</Link></li>
                  <li><Link to="/certificates" className="footer-link text-sm">Certificates</Link></li>
                </ul>
              </div>
              
              <div className="md:col-span-1">
                <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Help & Support</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="footer-link text-sm">About Us</Link></li>
                  <li><Link to="/terms" className="footer-link text-sm">Terms of Use</Link></li>
                  <li><Link to="/privacy" className="footer-link text-sm">Privacy Policy</Link></li>
                </ul>
              </div>
              
              <div className="md:col-span-1">
                <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Contact</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-2" /> support@collegenet.com
                  </li>
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="h-4 w-4 mr-2" /> +91 9876543210
                  </li>
                  <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" /> Delhi, India
                  </li>
                </ul>
                <div className="flex space-x-3 mt-4">
                  <a href="https://twitter.com/collegenet" className="text-gray-500 hover:text-collegenet-600 dark:hover:text-collegenet-400" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://instagram.com/collegenet" className="text-gray-500 hover:text-collegenet-600 dark:hover:text-collegenet-400" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                © {currentYear} CollegeNet. All rights reserved.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for Indian college students
              </p>
            </div>
          </div>
        </footer>
      ) : (
        // Feature-rich footer for non-authenticated users
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 md:py-8 border-t dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">CollegeNet</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Connecting students with professional networking opportunities, events, and certifications.
                </p>
                <div className="flex space-x-4">
                  <a href="https://twitter.com/collegenet" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://instagram.com/collegenet" target="_blank" rel="noopener noreferrer"
                     className="text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/events" className="text-sm text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                      Browse Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/certificates" className="text-sm text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                      Certificates
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Join Now</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Sign up to get personalized event recommendations and connect with other students.
                </p>
                <Button asChild className="light-mode-button">
                  <Link to="/login">Sign Up Today</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  &copy; {currentYear} CollegeNet. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                  Terms
                </Link>
                <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                  Privacy
                </Link>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-collegenet-600 dark:hover:text-collegenet-400">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
      
      <Toaster />
    </div>
  );
};
