
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEvents } from "@/context/EventContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Search, MoreVertical, Edit, Trash2, Calendar, Users } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const EventManagementPanel: React.FC = () => {
  const { events, getUserEvents } = useEvents();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const userEvents = getUserEvents();
  
  const filteredEvents = userEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDelete = (eventId: string) => {
    // In a real app this would call an API
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted.",
    });
  };
  
  const handleEdit = (eventId: string) => {
    // In a real app this would navigate to edit form
    toast({
      title: "Edit event",
      description: "Editing functionality will be implemented soon.",
    });
  };
  
  const updateCapacity = (eventId: string, newCapacity: number) => {
    toast({
      title: "Capacity updated",
      description: `Event capacity updated to ${newCapacity}.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredEvents.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">No events found. Create your first event!</p>
            <Button asChild>
              <a href="/create-event">Create Event</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="max-w-2xl line-clamp-2">{event.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(event.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(event.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {format(new Date(event.date), "PPP")}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {event.registeredCount}/{event.capacity} registered
                  </div>
                  <Badge variant={event.price > 0 ? "default" : "secondary"}>
                    {event.price > 0 ? `$${event.price.toFixed(2)}` : "Free"}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Update Capacity</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Event Capacity</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="mb-4">Current capacity: {event.capacity}</p>
                      <p className="mb-4">Current registrations: {event.registeredCount}</p>
                      <div className="flex gap-4">
                        <Input
                          type="number"
                          placeholder="New capacity"
                          defaultValue={event.capacity}
                          min={event.registeredCount}
                        />
                        <Button onClick={() => updateCapacity(event.id, event.capacity + 10)}>Update</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button asChild>
                  <a href={`/events/${event.id}`}>View Event</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManagementPanel;
