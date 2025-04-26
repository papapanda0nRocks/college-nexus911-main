
import React from "react";
import { HandshakeIcon } from "@/components/icons/HandshakeIcon";

export const WhyCollegeNetSection = () => (
  <section className="py-8">
    <h2 className="text-3xl font-bold mb-10 text-center">Why Use CollegeNet?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700 text-center">
        <div className="w-16 h-16 bg-collegenet-100 dark:bg-collegenet-900/50 rounded-full flex items-center justify-center text-collegenet-600 dark:text-collegenet-400 mx-auto mb-4">
          <HandshakeIcon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">Networking</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Connect with peers, alumni, and professionals from your industry to expand your network.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700 text-center">
        <div className="w-16 h-16 bg-collegenet-100 dark:bg-collegenet-900/50 rounded-full flex items-center justify-center text-collegenet-600 dark:text-collegenet-400 mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">Skill Development</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Attend workshops and courses to learn new skills and enhance your resume.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border dark:border-gray-700 text-center">
        <div className="w-16 h-16 bg-collegenet-100 dark:bg-collegenet-900/50 rounded-full flex items-center justify-center text-collegenet-600 dark:text-collegenet-400 mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="11" y2="17" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">Certifications</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Receive official certificates for events you attend to showcase on your LinkedIn profile.
        </p>
      </div>
    </div>
  </section>
);
