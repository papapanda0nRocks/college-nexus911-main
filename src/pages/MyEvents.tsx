
import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UsersIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MyEvents = () => {
  const { events, userRegistrations } = useEvents();
  const { user, isAuthenticated } = useAuth();
  const [visibleUsers, setVisibleUsers] = useState<Record<string, number>>({});

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Get events the user has registered for
  const registeredEvents = events.filter(event => 
    userRegistrations.some(reg => reg.eventId === event.id)
  );

  const handleShowMore = (eventId: string) => {
    setVisibleUsers(prev => ({
      ...prev,
      [eventId]: (prev[eventId] || 5) + 5
    }));
  };

  // Display message if no registered events
  if (registeredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Card className="w-full max-w-md p-6 text-center">
          <CardHeader>
            <CardTitle>You haven't registered for any events yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Browse and register for events to see other attendees and connect with them.
            </p>
            <Link to="/events">
              <Button>Browse Events</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Events</h1>
        <div className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {registeredEvents.length} Events
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {registeredEvents.map(event => {
          const usersToShow = visibleUsers[event.id] || 5;
          
          return (
            <Card key={event.id} className="overflow-hidden transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {new Date(event.date).toLocaleDateString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Location: {event.location}</span>
                    <span>{event.registeredCount} registered</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {Array.from({ length: Math.min(event.registeredCount, usersToShow) }).map((_, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link to={`/user/${index + 1}`} className="flex items-center gap-2 rounded-lg border p-2 cursor-pointer hover:bg-accent">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://avatar.vercel.sh/user${index}`} />
                                <AvatarFallback>U{index}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">User {index + 1}</p>
                                <p className="text-xs text-muted-foreground">Registered</p>
                              </div>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View User {index + 1}'s profile</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  
                  {event.registeredCount > usersToShow && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleShowMore(event.id)}
                      className="mt-2 self-start"
                    >
                      Show More ({event.registeredCount - usersToShow} remaining)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyEvents;
