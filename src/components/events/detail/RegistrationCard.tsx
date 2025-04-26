
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Event } from "@/types/event";
import { useAuth } from "@/context/AuthContext";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface RegistrationCardProps {
  event: Event;
  isRegistered: boolean;
  isAuthenticated: boolean;
  isUpcoming: boolean;
  isFull: boolean;
  loading: boolean;
  onRegister: () => void;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  event,
  isRegistered,
  isAuthenticated,
  isUpcoming,
  isFull,
  loading,
  onRegister
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  
  const isVerified = user?.verificationStatus === "verified";
  const requiresVerification = event.requiresVerification ?? true;
  
  const handleRegisterClick = () => {
    if (!isVerified && requiresVerification) {
      setShowVerificationDialog(true);
    } else {
      onRegister();
    }
  };
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 sticky top-24">
        <h2 className="font-semibold text-lg mb-4 dark:text-white">Registration</h2>

        {isRegistered ? (
          <>
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md text-green-800 dark:text-green-300 text-sm">
              You're registered for this event.
            </div>
            <Button variant="outline" disabled className="w-full">
              Registered
            </Button>
          </>
        ) : isAuthenticated ? (
          <>
            {isFull ? (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md text-yellow-800 dark:text-yellow-300 text-sm">
                This event has reached its capacity.
              </div>
            ) : !isUpcoming ? (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-300 text-sm">
                This event has already passed.
              </div>
            ) : requiresVerification && !isVerified ? (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-800 dark:text-yellow-300 flex-shrink-0 mt-0.5" />
                <span className="text-yellow-800 dark:text-yellow-300 text-sm">
                  This event requires identity verification.
                </span>
              </div>
            ) : null}

            <Button
              onClick={handleRegisterClick}
              disabled={loading || isFull || !isUpcoming}
              className="w-full"
            >
              {loading
                ? "Processing..."
                : isFull
                ? "Event Full"
                : !isUpcoming
                ? "Event Ended"
                : `Register ${event.price > 0 ? `- ₹${event.price.toFixed(2)}` : "Now"}`}
            </Button>
            
            {requiresVerification && !isVerified && (
              <p className="mt-2 text-xs text-center text-muted-foreground">
                <Link to="/verification-prompt" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Verify your account
                </Link> to register for this event
              </p>
            )}
          </>
        ) : (
          <>
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md text-blue-800 dark:text-blue-300 text-sm">
              Sign in to register for this event.
            </div>
            <Button asChild className="w-full">
              <Link to="/login">Sign In</Link>
            </Button>
          </>
        )}
      </div>
      
      {/* Verification Required Dialog */}
      <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Required</DialogTitle>
            <DialogDescription>
              To register for this event, you need to verify your identity first.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Verification helps ensure the safety and authenticity of our community. It only takes a few minutes to complete.
            </p>
          </div>
          <DialogFooter className="flex space-x-2 sm:justify-between">
            <Button variant="outline" onClick={() => setShowVerificationDialog(false)}>
              Later
            </Button>
            <Button onClick={() => {
              setShowVerificationDialog(false);
              navigate("/verification-prompt");
            }}>
              Verify Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
