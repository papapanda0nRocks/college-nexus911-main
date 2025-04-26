import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ShareIcon, DownloadIcon, LinkedinIcon } from "lucide-react";

const Certificates = () => {
  const { isAuthenticated, user } = useAuth();
  const { events, userRegistrations } = useEvents();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const attendedEvents = events.filter(event => 
    userRegistrations.some(reg => 
      reg.eventId === event.id && 
      (reg.status === "attended" || reg.status === "completed")
    )
  );
  
  const mockCertificates = [
    {
      id: "cert1",
      eventId: attendedEvents[0]?.id || "event1",
      eventName: attendedEvents[0]?.title || "Tech Career Fair 2023",
      issuedDate: new Date().toISOString(),
      url: "#"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <p className="text-muted-foreground">
          View and share certificates for events you've attended.
        </p>
        
        {mockCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCertificates.map((certificate) => {
              const event = events.find(e => e.id === certificate.eventId);
              
              return (
                <Card key={certificate.id} className="overflow-hidden">
                  <div className="h-8 bg-gradient-to-r from-collegenet-400 to-collegenet-600"></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{certificate.eventName}</CardTitle>
                      <Badge variant="outline">Certificate</Badge>
                    </div>
                    <CardDescription>
                      Issued on {format(new Date(certificate.issuedDate), "MMMM d, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="aspect-[1.4/1] border rounded-md flex items-center justify-center bg-white">
                      <div className="text-center p-8 border-4 border-double border-gray-200 m-4 w-full h-full flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-500 mb-2">CollegeNet</div>
                        <h3 className="text-xl font-serif mb-2">Certificate of Completion</h3>
                        <p className="text-sm mb-1">This certifies that</p>
                        <p className="text-lg font-semibold mb-1">{user?.name || "User"}</p>
                        <p className="text-sm mb-1">has successfully completed</p>
                        <p className="text-md font-medium mb-3">{certificate.eventName}</p>
                        <div className="text-xs text-gray-500 mt-2">
                          {format(new Date(certificate.issuedDate), "MMMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ShareIcon className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button className="bg-[#0077b5] hover:bg-[#006097]" size="sm">
                        <LinkedinIcon className="h-4 w-4 mr-2" />
                        Add to LinkedIn
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Certificates Yet</CardTitle>
              <CardDescription>
                You haven't received any certificates yet. Attend events to earn certificates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Certificates are awarded after you've attended an event. Browse upcoming events to find opportunities to earn certificates.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href="/events">Browse Events</a>
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <h2 className="text-2xl font-semibold mt-8">Eligible Events</h2>
        <p className="text-muted-foreground">
          Events you've registered for that are eligible for certificates.
        </p>
        
        {attendedEvents.length > 0 ? (
          <div className="space-y-4">
            {attendedEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge>Attended</Badge>
                  </div>
                  <CardDescription>
                    {format(new Date(event.date), "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {userRegistrations.find(reg => reg.eventId === event.id)?.hasCertificate 
                      ? "Certificate has been issued for this event."
                      : "Certificate will be available soon for this event."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" disabled={!userRegistrations.find(reg => reg.eventId === event.id)?.hasCertificate}>
                    View Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Eligible Events</CardTitle>
              <CardDescription>
                You haven't attended any events that are eligible for certificates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Register for events and attend them to become eligible for certificates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Certificates;
