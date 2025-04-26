import React from "react";
import { Badge } from "@/components/ui/badge";
import { SocialShare } from "@/components/common/SocialShare";
import { Event } from "@/types/event";

interface EventHeaderProps {
  event: Event;
  isUpcoming: boolean;
  isAuthenticated: boolean;
  isRegistered: boolean;
}

export const EventHeader: React.FC<EventHeaderProps> = ({ 
  event, 
  isUpcoming, 
  isAuthenticated,
  isRegistered
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <Badge variant={isUpcoming ? "default" : "outline"} className="text-sm">
          {isUpcoming ? "Upcoming" : "Past"}
        </Badge>
        {isAuthenticated && (
          <SocialShare
            title={`Check out this event: ${event.title}`}
            url={window.location.href}
            isRegistered={isRegistered}
          />
        )}
      </div>
      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <div className="mt-2">
        <span className="text-sm text-muted-foreground">
          Organized by {event.organizerName}
        </span>
      </div>
    </div>
  );
};
