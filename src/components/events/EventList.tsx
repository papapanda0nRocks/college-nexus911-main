
import React, { useState } from "react";
import { Event } from "@/types/event";
import { EventCard } from "./EventCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Registration } from "@/types/event";

interface EventListProps {
  events: Event[];
  userRegistrations?: Registration[];
  title?: string;
  showFilters?: boolean;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  userRegistrations = [],
  title = "Events",
  showFilters = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Extract unique categories from events
  const categories = [...new Set(events.map((event) => event.category))];
  
  // Filter events based on search term and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" ? true : event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Check if user is registered for an event
  const isRegistered = (eventId: string) => {
    return userRegistrations.some((reg) => reg.eventId === eventId);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">{title}</h2>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {filteredEvents.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isRegistered={isRegistered(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
