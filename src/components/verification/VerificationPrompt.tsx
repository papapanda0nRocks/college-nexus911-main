
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const VerificationPrompt: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const verificationStatus = user?.verificationStatus || "unverified";
  
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-collegenet-600" />
            <CardTitle>Identity Verification</CardTitle>
          </div>
          <CardDescription>
            Verify your identity to unlock all features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationStatus === "unverified" && (
            <>
              <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-md flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-300">
                  <p className="font-medium">Verification Required</p>
                  <p>To register for events, you need to verify your identity with government ID and college ID.</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm">Why verify your account?</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                    Register for exclusive events
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                    Get verified badge on your profile
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                    Unlock networking opportunities
                  </li>
                </ul>
              </div>
            </>
          )}

          {verificationStatus === "pending" && (
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium">Verification In Progress</p>
                <p>Your documents are being reviewed. This typically takes 1-2 business days.</p>
              </div>
            </div>
          )}

          {verificationStatus === "rejected" && (
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="text-sm text-red-800 dark:text-red-300">
                <p className="font-medium">Verification Failed</p>
                <p>Your documents couldn't be verified. Please try again with clearer images.</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/")}>
            Skip for Now
          </Button>
          {verificationStatus === "unverified" || verificationStatus === "rejected" ? (
            <Button onClick={() => navigate("/verification-upload")}>
              Verify Now
            </Button>
          ) : verificationStatus === "pending" ? (
            <Button disabled>
              Awaiting Review
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};
