
import React from "react";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, DollarSignIcon, UsersIcon, ClockIcon } from "lucide-react";
import { Event } from "@/types/event";

interface EventMetaProps {
  event: Event;
}

export const EventMeta: React.FC<EventMetaProps> = ({ event }) => {
  const eventDate = new Date(event.date);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center">
        <CalendarIcon className="mr-3 h-5 w-5 text-collegenet-500" />
        <span>{format(eventDate, "EEEE, MMMM d, yyyy")}</span>
      </div>
      <div className="flex items-center">
        <ClockIcon className="mr-3 h-5 w-5 text-collegenet-500" />
        <span>{format(eventDate, "h:mm a")}</span>
      </div>
      <div className="flex items-center">
        <MapPinIcon className="mr-3 h-5 w-5 text-collegenet-500" />
        <span>{event.location}</span>
      </div>
      <div className="flex items-center">
        <UsersIcon className="mr-3 h-5 w-5 text-collegenet-500" />
        <span>
          {event.registeredCount} / {event.capacity} registered
        </span>
      </div>
      <div className="flex items-center">
        <DollarSignIcon className="mr-3 h-5 w-5 text-collegenet-500" />
        <span>
          {event.price > 0 ? `₹${event.price.toFixed(2)}` : "Free"}
        </span>
      </div>
    </div>
  );
};
