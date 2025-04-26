
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEvents } from "@/context/EventContext";
import { QrCode, UserCheck, Printer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const AttendanceTracker: React.FC = () => {
  const { toast } = useToast();
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [scanMode, setScanMode] = useState<"qr" | "manual">("qr");
  const [manualCode, setManualCode] = useState<string>("");
  const [scanActive, setScanActive] = useState<boolean>(false);
  
  // Mock attendance data
  const attendanceData = {
    registered: 120,
    attended: 85,
    percentage: 70.8,
    recentCheckins: [
      { id: "c1", name: "John Smith", time: "11:45 AM" },
      { id: "c2", name: "Emma Wilson", time: "11:32 AM" },
      { id: "c3", name: "David Lee", time: "11:15 AM" },
    ]
  };
  
  const handleSelectEvent = (eventId: string) => {
    setSelectedEvent(eventId);
    toast({
      title: "Event Selected",
      description: "Attendance tracking is now active for this event."
    });
  };
  
  const handleStartScan = () => {
    setScanActive(true);
    toast({
      title: "QR Scanner Active",
      description: "Point your camera at the attendee's QR code."
    });
  };
  
  const handleStopScan = () => {
    setScanActive(false);
  };
  
  const handleManualCheckIn = () => {
    if (!manualCode) {
      toast({
        title: "Input Required",
        description: "Please enter a registration code.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Attendee Checked In",
      description: `Successfully checked in attendee with code: ${manualCode}`
    });
    
    setManualCode("");
  };
  
  const handlePrintReport = () => {
    toast({
      title: "Generating Report",
      description: "Attendance report is being prepared for printing."
    });
  };

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Attendance Tracker</CardTitle>
        <CardDescription>
          Check in attendees and track attendance in real-time at your events.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {!selectedEvent ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">Select an event to start tracking attendance</p>
              <Select value={selectedEvent} onValueChange={handleSelectEvent}>
                <SelectTrigger className="max-w-xs mx-auto">
                  <SelectValue placeholder="Select Event" />
                </SelectTrigger>
                <SelectContent>
                  {events.map(event => (
                    <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">Registered</p>
                      <p className="text-3xl font-bold">{attendanceData.registered}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">Attended</p>
                      <p className="text-3xl font-bold">{attendanceData.attended}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">Attendance Rate</p>
                      <p className="text-3xl font-bold">{attendanceData.percentage.toFixed(1)}%</p>
                      <Progress value={attendanceData.percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="qr" onValueChange={(value) => setScanMode(value as "qr" | "manual")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="qr">QR Code Check-in</TabsTrigger>
                  <TabsTrigger value="manual">Manual Check-in</TabsTrigger>
                </TabsList>
                
                <TabsContent value="qr">
                  <div className="py-4 text-center">
                    {scanActive ? (
                      <div className="space-y-4">
                        <div className="aspect-square max-w-xs mx-auto border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                          <QrCode className="h-24 w-24 text-muted-foreground opacity-50" />
                          <div className="absolute inset-0 bg-primary/5"></div>
                        </div>
                        <Button onClick={handleStopScan} variant="outline">Stop Scanning</Button>
                      </div>
                    ) : (
                      <Button onClick={handleStartScan} className="mx-auto">
                        <QrCode className="h-4 w-4 mr-2" />
                        Start QR Scanner
                      </Button>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="manual">
                  <div className="py-4 space-y-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                      <Label htmlFor="registration-code">Registration Code</Label>
                      <Input
                        id="registration-code"
                        type="text"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        placeholder="Enter registration code"
                      />
                    </div>
                    <div className="text-center">
                      <Button onClick={handleManualCheckIn}>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Check In Attendee
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Recent Check-ins</h3>
                {attendanceData.recentCheckins.length > 0 ? (
                  <div className="space-y-2">
                    {attendanceData.recentCheckins.map(checkin => (
                      <div key={checkin.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <div>
                          <p className="font-medium">{checkin.name}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{checkin.time}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No check-ins yet.</p>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      {selectedEvent && (
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handlePrintReport}>
            <Printer className="h-4 w-4 mr-2" />
            Print Attendance Report
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AttendanceTracker;
