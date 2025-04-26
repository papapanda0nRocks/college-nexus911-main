
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CalendarCheck, 
  Users, 
  BarChart, 
  Award, 
  Plus,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import EventCreationForm from "@/components/organizer/EventCreationForm";
import EventManagementPanel from "@/components/organizer/EventManagementPanel";
import RegistrationTable from "@/components/organizer/RegistrationTable";
import AttendanceTracker from "@/components/organizer/AttendanceTracker";
import CertificateGenerator from "@/components/organizer/CertificateGenerator";
import AnalyticsDashboard from "@/components/organizer/AnalyticsDashboard";

// This is a placeholder until we implement real organizer data
const mockOrganizerStats = {
  totalEvents: 12,
  totalRegistrations: 248,
  totalAttendees: 198,
  totalRevenue: 4500,
  certificatesIssued: 175
};

const OrganizerDashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { events, getUserEvents } = useEvents();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check if user is authenticated and is an organizer
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // For now we'll just check if role is organizer, in a real implementation
  // we would check against the database
  if (user?.role !== "organizer") {
    return <Navigate to="/events" replace />;
  }
  
  // Get events created by the current user
  const userEvents = getUserEvents();
  
  // Stats for dashboard
  const stats = mockOrganizerStats;
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/create-event">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link to="/organizer/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Events</CardDescription>
            <CardTitle className="text-3xl">{stats.totalEvents}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <CalendarCheck className="h-4 w-4 mr-1" />
              <span className="text-sm">Events created</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Registrations</CardDescription>
            <CardTitle className="text-3xl">{stats.totalRegistrations}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">Total sign-ups</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Attendance</CardDescription>
            <CardTitle className="text-3xl">{stats.totalAttendees}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <BarChart className="h-4 w-4 mr-1" />
              <span className="text-sm">{Math.round((stats.totalAttendees / stats.totalRegistrations) * 100)}% attendance rate</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Certificates</CardDescription>
            <CardTitle className="text-3xl">{stats.certificatesIssued}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground flex items-center">
              <Award className="h-4 w-4 mr-1" />
              <span className="text-sm">Certificates issued</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Your most recently created events</CardDescription>
              </CardHeader>
              <CardContent>
                {userEvents.length > 0 ? (
                  <div className="space-y-4">
                    {userEvents.slice(0, 5).map(event => (
                      <div key={event.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{event.registeredCount}/{event.capacity}</p>
                          <p className="text-sm text-muted-foreground">Registered</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't created any events yet.</p>
                    <Button asChild>
                      <Link to="/create-event">Create Your First Event</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <EventManagementPanel />
        </TabsContent>
        
        <TabsContent value="attendees" className="mt-6">
          <div className="space-y-8">
            <RegistrationTable />
            <AttendanceTracker />
          </div>
        </TabsContent>
        
        <TabsContent value="certificates" className="mt-6">
          <CertificateGenerator />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizerDashboard;
