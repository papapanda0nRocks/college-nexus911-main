
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { EventList } from "@/components/events/EventList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, CalendarIcon, Award } from "lucide-react";
import { Link } from "react-router-dom";

const MyHistory = () => {
  const { isAuthenticated, user } = useAuth();
  const { events, userRegistrations } = useEvents();
  const [activeTab, setActiveTab] = useState("registered");
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Get events the user has registered for
  const registeredEvents = events.filter(event => 
    userRegistrations.some(reg => reg.eventId === event.id)
  );
  
  // Get past events the user has attended
  const pastEvents = registeredEvents.filter(event => 
    new Date(event.date) < new Date()
  );
  
  // Get upcoming events
  const upcomingEvents = registeredEvents.filter(event => 
    new Date(event.date) >= new Date()
  );
  
  // Get organized events (if user is organizer)
  const organizedEvents = user?.role === "organizer" 
    ? events.filter(event => event.organizerId === user.id)
    : [];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">My History</h1>
        
        {user?.role === "organizer" && (
          <Button asChild>
            <Link to="/create-event">
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Event
            </Link>
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          {user?.role === "organizer" && (
            <TabsTrigger value="organized">My Organized Events</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingEvents.length > 0 ? (
            <EventList 
              events={upcomingEvents} 
              userRegistrations={userRegistrations}
              title="" 
              showFilters={false} 
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Upcoming Events</CardTitle>
                <CardDescription>
                  You haven't registered for any upcoming events yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="mt-2">
                  <Link to="/events">Browse Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastEvents.length > 0 ? (
            <div className="space-y-4">
              {pastEvents.map(event => (
                <Card key={event.id} className="overflow-hidden transition-colors hover:bg-muted/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-muted">
                        <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/events/${event.id}`}>View Details</Link>
                          </Button>
                          {userRegistrations.find(reg => reg.eventId === event.id)?.hasCertificate && (
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <Award className="h-4 w-4" />
                              View Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Past Events</CardTitle>
                <CardDescription>
                  You haven't attended any events yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="mt-2">
                  <Link to="/events">Browse Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {user?.role === "organizer" && (
          <TabsContent value="organized">
            {organizedEvents.length > 0 ? (
              <EventList 
                events={organizedEvents} 
                title="" 
                showFilters={false} 
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Organized Events</CardTitle>
                  <CardDescription>
                    You haven't created any events yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="mt-2">
                    <Link to="/create-event">Create Your First Event</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MyHistory;
