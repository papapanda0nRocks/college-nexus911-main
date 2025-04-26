
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useEvents } from "@/context/EventContext";
import { Search, CheckCircle, XCircle, ChevronDown, Clock, Mail, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Attendee {
  id: string;
  name: string;
  email: string;
  eventId: string;
  eventTitle: string;
  registeredAt: string;
  status: "registered" | "attended" | "no-show";
  checkinTime?: string;
}

const mockAttendees: Attendee[] = [
  {
    id: "att1",
    name: "John Smith",
    email: "john@example.com",
    eventId: "event1",
    eventTitle: "Tech Career Fair 2023",
    registeredAt: new Date(2025, 3, 10).toISOString(),
    status: "attended",
    checkinTime: new Date(2025, 4, 15, 9, 30).toISOString()
  },
  {
    id: "att2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    eventId: "event1",
    eventTitle: "Tech Career Fair 2023",
    registeredAt: new Date(2025, 3, 12).toISOString(),
    status: "registered"
  },
  {
    id: "att3",
    name: "Michael Brown",
    email: "michael@example.com",
    eventId: "event2",
    eventTitle: "Introduction to AI Workshop",
    registeredAt: new Date(2025, 4, 20).toISOString(),
    status: "no-show"
  },
  {
    id: "att4",
    name: "Emma Wilson",
    email: "emma@example.com",
    eventId: "event2",
    eventTitle: "Introduction to AI Workshop",
    registeredAt: new Date(2025, 4, 22).toISOString(),
    status: "attended",
    checkinTime: new Date(2025, 5, 10, 10, 15).toISOString()
  },
  {
    id: "att5",
    name: "David Lee",
    email: "david@example.com",
    eventId: "event3",
    eventTitle: "Alumni Networking Mixer",
    registeredAt: new Date(2025, 5, 1).toISOString(),
    status: "registered"
  }
];

const RegistrationTable: React.FC = () => {
  const { events } = useEvents();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [attendees, setAttendees] = useState<Attendee[]>(mockAttendees);
  
  const filteredAttendees = attendees.filter(attendee => {
    const matchesSearch = 
      attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesEvent = selectedEvent === "all" || attendee.eventId === selectedEvent;
    const matchesStatus = selectedStatus === "all" || attendee.status === selectedStatus;
    
    return matchesSearch && matchesEvent && matchesStatus;
  });
  
  const handleCheckIn = (id: string) => {
    setAttendees(attendees.map(attendee => 
      attendee.id === id 
        ? { ...attendee, status: "attended", checkinTime: new Date().toISOString() } 
        : attendee
    ));
    
    toast({
      title: "Attendee checked in",
      description: "The attendee has been marked as attended."
    });
  };
  
  const handleMarkAsNoShow = (id: string) => {
    setAttendees(attendees.map(attendee => 
      attendee.id === id 
        ? { ...attendee, status: "no-show" } 
        : attendee
    ));
    
    toast({
      title: "Marked as no-show",
      description: "The attendee has been marked as no-show."
    });
  };
  
  const handleSendReminder = (email: string) => {
    toast({
      title: "Reminder sent",
      description: `A reminder email has been sent to ${email}.`
    });
  };
  
  const exportAttendees = () => {
    toast({
      title: "Export started",
      description: "The attendee list is being exported to CSV."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Registrations</h2>
        <Button onClick={exportAttendees} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export to CSV
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendee Management</CardTitle>
          <CardDescription>
            View and manage your event registrations and attendance.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map(event => (
                  <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="attended">Attended</SelectItem>
                <SelectItem value="no-show">No-Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No attendees found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell>{attendee.email}</TableCell>
                      <TableCell>{attendee.eventTitle}</TableCell>
                      <TableCell>{format(new Date(attendee.registeredAt), "PPP")}</TableCell>
                      <TableCell>
                        {attendee.status === "attended" ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" /> 
                            <span>Attended</span>
                          </div>
                        ) : attendee.status === "no-show" ? (
                          <div className="flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" /> 
                            <span>No-Show</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-yellow-600">
                            <Clock className="h-4 w-4 mr-1" /> 
                            <span>Registered</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {attendee.status === "registered" && (
                              <>
                                <DropdownMenuItem onClick={() => handleCheckIn(attendee.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Check In
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleMarkAsNoShow(attendee.id)}>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Mark No-Show
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem onClick={() => handleSendReminder(attendee.email)}>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationTable;
