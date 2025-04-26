
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <Link to="/" className="flex items-center text-sm hover:underline mb-2">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Home
      </Link>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <span className="text-2xl mr-2">🔒</span> Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">We respect your privacy and are committed to protecting your data.</p>
            
            <h3>1. Information We Collect</h3>
            <ul>
              <li>Name, email, LinkedIn profile info (basic public info).</li>
              <li>Phone number for OTP-based login.</li>
              <li>Events you interact with or create.</li>
              <li>Certificates issued or received.</li>
            </ul>
            
            <h3>2. How We Use Your Data</h3>
            <ul>
              <li>To let you login securely.</li>
              <li>To personalize your event recommendations.</li>
              <li>To help you store and share certificates on platforms like LinkedIn.</li>
              <li>To keep the platform safe and secure.</li>
            </ul>
            
            <h3>3. Data Sharing</h3>
            <ul>
              <li>We do not sell your personal data.</li>
              <li>Your profile and event activity may be visible to other users within the app (like LinkedIn).</li>
              <li>Certificates may be shared publicly only if you choose to share them.</li>
            </ul>
            
            <h3>4. Security</h3>
            <ul>
              <li>We use secure methods (like JWT tokens, HTTPS, and encrypted storage) to protect your data.</li>
              <li>Your phone numbers are not visible to other users.</li>
            </ul>
            
            <h3>5. Third-Party Services</h3>
            <ul>
              <li>We use trusted services like LinkedIn and Twilio to help with authentication and messaging.</li>
              <li>Their privacy policies may also apply during use.</li>
            </ul>
            
            <h3>6. Your Rights</h3>
            <ul>
              <li>You can request to view, update, or delete your data at any time by contacting us at support@collegenet.com.</li>
            </ul>
            
            <h3>7. Policy Updates</h3>
            <ul>
              <li>We may update this policy occasionally. We'll notify you of major changes.</li>
            </ul>
            
            <h3>📬 Contact</h3>
            <p>Questions about these terms or privacy? Reach out to us at: <a href="mailto:support@collegenet.com">support@collegenet.com</a></p>
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" asChild>
              <Link to="/terms">View Terms of Use</Link>
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

export default PrivacyPolicy;
