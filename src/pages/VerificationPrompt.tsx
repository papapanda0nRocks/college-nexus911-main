
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { VerificationPrompt } from "@/components/verification/VerificationPrompt";

const VerificationPromptPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <VerificationPrompt />
    </div>
  );
};

export default VerificationPromptPage;
