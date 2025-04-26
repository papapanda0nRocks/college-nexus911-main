
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizerProfile from "@/components/organizer/OrganizerProfile";

const OrganizerSettings = () => {
  const { isAuthenticated, user } = useAuth();
  
  // Check if user is authenticated and is an organizer
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== "organizer") {
    return <Navigate to="/events" replace />;
  }
  
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Organizer Settings</h1>
        <Button asChild variant="outline">
          <a href="/organizer/dashboard">Back to Dashboard</a>
        </Button>
      </div>
      
      <OrganizerProfile />
    </div>
  );
};

export default OrganizerSettings;
