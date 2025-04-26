
import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, CalendarIcon, ArrowLeft } from "lucide-react";
import { SocialShare } from "@/components/common/SocialShare";

const UserProfile = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  
  const [userData, setUserData] = useState({
    id: id,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1234567890",
    profilePicture: "",
    bio: "Student at Stanford University majoring in Computer Science. Passionate about AI and machine learning.",
    role: "student",
    isPublic: true,
    events: [
      { 
        id: "event1", 
        title: "Tech Career Fair 2025", 
        date: "2025-06-15"
      },
      { 
        id: "event2", 
        title: "AI Workshop Series", 
        date: "2025-05-20"
      }
    ],
    achievements: [
      {
        id: "cert1",
        title: "Machine Learning Fundamentals",
        issuer: "Tech Academy",
        date: "April 2025",
      },
      {
        id: "cert2",
        title: "Web Development Bootcamp",
        issuer: "Code Institute",
        date: "February 2025",
      }
    ]
  });
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/my-events">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Events
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Profile</CardTitle>
              <CardDescription>View user information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userData.profilePicture} alt={userData.name} />
                <AvatarFallback className="text-lg">{getInitials(userData.name)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{userData.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{userData.role}</p>
              
              <div className="w-full mt-6 space-y-2">
                <div className="flex justify-center space-x-2">
                  <SocialShare 
                    title={`Check out ${userData.name}'s profile`} 
                    url={window.location.href} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">About</TabsTrigger>
              <TabsTrigger value="events">Events & Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About {userData.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{userData.bio}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Events & Achievements</CardTitle>
                  <CardDescription>
                    Events and achievements for {userData.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Events</h3>
                      {userData.events.length === 0 ? (
                        <p className="text-muted-foreground">No events to display</p>
                      ) : (
                        <div className="space-y-3">
                          {userData.events.map((event) => (
                            <div key={event.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  <CalendarIcon className="inline h-3 w-3 mr-1" />
                                  {new Date(event.date).toLocaleDateString()}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/events/${event.id}`}>View</Link>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Achievements</h3>
                      {userData.achievements.length === 0 ? (
                        <p className="text-muted-foreground">No achievements to display</p>
                      ) : (
                        <div className="space-y-3">
                          {userData.achievements.map((achievement) => (
                            <div key={achievement.id} className="flex items-start p-3 border rounded-md">
                              <div>
                                <p className="font-medium">{achievement.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.issuer} • {achievement.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
