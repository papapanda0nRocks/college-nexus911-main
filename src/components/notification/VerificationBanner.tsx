
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, XIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const VerificationBanner: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Only show banner for unverified users
    if (user && user.verificationStatus === "unverified") {
      // Get session count from localStorage
      const sessionCount = parseInt(localStorage.getItem("sessionCount") || "0");
      
      // Show banner every 2-3 app sessions
      if (sessionCount % 2 === 0) {
        setShowBanner(true);
      }
      
      // Increment session count
      localStorage.setItem("sessionCount", (sessionCount + 1).toString());
    }
  }, [user]);
  
  if (!showBanner || dismissed || !user || user.verificationStatus !== "unverified") {
    return null;
  }
  
  return (
    <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangleIcon className="h-5 w-5 text-amber-600 dark:text-amber-500" />
          <span className="text-sm text-amber-800 dark:text-amber-200">
            Your account is not verified. Verify your identity to unlock all features.
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-900"
            onClick={() => navigate("/verification-prompt")}
          >
            Verify Now
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900"
            onClick={() => setDismissed(true)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
