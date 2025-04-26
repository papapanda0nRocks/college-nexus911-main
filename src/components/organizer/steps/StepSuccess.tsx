
import React from "react";
import { Button } from "@/components/ui/button";
export const StepSuccess = () => (
  <div className="text-center py-6">
    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600 dark:text-green-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
    <p className="text-muted-foreground mb-6">
      Thank you for applying to become an event organizer. We'll review your application and get back to you soon.
    </p>
    <Button asChild>
      <a href="/">Return to Home</a>
    </Button>
  </div>
);
