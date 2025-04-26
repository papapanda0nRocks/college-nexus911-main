
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const SignupCtaSection = () => (
  <section className="bg-card dark:bg-gray-800 rounded-lg p-8 md:p-12 border dark:border-gray-700 shadow-sm">
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to boost your career?</h2>
      <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6">
        Join thousands of students expanding their professional network with CollegeNet.
      </p>
      <Button asChild size="lg" className="bg-collegenet-600 hover:bg-collegenet-700 text-white dark:bg-collegenet-500 dark:hover:bg-collegenet-600">
        <Link to="/login">Get Started Today</Link>
      </Button>
    </div>
  </section>
);
