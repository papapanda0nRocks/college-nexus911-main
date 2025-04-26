
import React, { useState } from "react";
import { useEvents } from "@/context/EventContext";
import { EventList } from "@/components/events/EventList";
import { EnhancedSearch } from "@/components/events/EnhancedSearch";
import { EventListSkeleton } from "@/components/events/EventSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandshakeIcon } from "@/components/icons/HandshakeIcon";

const Events = () => {
  const { events, loading, userRegistrations, savedEvents, getEventsByFilter } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [activeTab, setActiveTab] = useState("all");
  
  // Handle search and filtering
  const handleSearch = (filters: any) => {
    const results = getEventsByFilter(filters);
    setFilteredEvents(results);
  };

  // Get upcoming events
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  
  // Get past events
  const pastEvents = events.filter(event => new Date(event.date) <= new Date());
  
  // Get saved events
  const userSavedEvents = events.filter(event => savedEvents.includes(event.id));
  
  // Display the appropriate event list based on active tab
  const getEventsToDisplay = () => {
    switch (activeTab) {
      case "upcoming":
        return upcomingEvents;
      case "past":
        return pastEvents;
      case "saved":
        return userSavedEvents;
      default:
        return filteredEvents.length > 0 ? filteredEvents : events;
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HandshakeIcon className="h-6 w-6 text-collegenet-500" />
          <h1 className="text-3xl font-bold">Events</h1>
        </div>
      </div>
      
      <EnhancedSearch onSearch={handleSearch} />
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {loading ? (
            <EventListSkeleton />
          ) : getEventsToDisplay().length > 0 ? (
            <EventList 
              events={getEventsToDisplay()} 
              userRegistrations={userRegistrations} 
              title=""
              showFilters={false}
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No events match your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6">
          {loading ? (
            <EventListSkeleton />
          ) : upcomingEvents.length > 0 ? (
            <EventList 
              events={upcomingEvents} 
              userRegistrations={userRegistrations} 
              title=""
              showFilters={false}
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No upcoming events found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          {loading ? (
            <EventListSkeleton />
          ) : pastEvents.length > 0 ? (
            <EventList 
              events={pastEvents} 
              userRegistrations={userRegistrations} 
              title=""
              showFilters={false}
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No past events found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="mt-6">
          {loading ? (
            <EventListSkeleton />
          ) : userSavedEvents.length > 0 ? (
            <EventList 
              events={userSavedEvents} 
              userRegistrations={userRegistrations} 
              title=""
              showFilters={false}
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No saved events yet. Save events by clicking the bookmark icon.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
