
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const TermsOfUse = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <Link to="/" className="flex items-center text-sm hover:underline mb-2">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Home
      </Link>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <span className="text-2xl mr-2">📄</span> Terms of Use
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">Welcome to CollegeNet!</p>
            <p>By using our platform, you agree to the following:</p>
            
            <h3>1. Purpose of the Platform</h3>
            <p>This app is designed to help students, colleges, and event organizers manage, share, and participate in events, competitions, and certifications in an easy and secure way.</p>
            
            <h3>2. User Accounts</h3>
            <ul>
              <li>You must use a valid LinkedIn profile or phone number to register.</li>
              <li>Keep your login credentials secure. You're responsible for all activity under your account.</li>
            </ul>
            
            <h3>3. Content Responsibility</h3>
            <ul>
              <li>You may post event details, projects, and shared certificates.</li>
              <li>You agree not to upload harmful, offensive, or plagiarized content.</li>
              <li>We reserve the right to remove any content that violates these terms.</li>
            </ul>
            
            <h3>4. Event Participation & Certificates</h3>
            <ul>
              <li>Organizers are responsible for accurate event information.</li>
              <li>Certificates issued on this platform are managed and displayed digitally and can be shared to LinkedIn.</li>
            </ul>
            
            <h3>5. Changes to the App</h3>
            <ul>
              <li>We may update features or policies to improve your experience.</li>
              <li>Continued use of the app means you accept those updates.</li>
            </ul>
            
            <h3>6. Termination</h3>
            <ul>
              <li>We reserve the right to suspend or terminate accounts that violate our rules or misuse the platform.</li>
            </ul>
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" asChild>
              <Link to="/privacy">View Privacy Policy</Link>
            </Button>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfUse;
