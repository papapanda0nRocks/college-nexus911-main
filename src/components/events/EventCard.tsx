import React from "react";
import { Link } from "react-router-dom";
import { Event } from "@/types/event";
import { formatDistanceToNow, format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";
import { CalendarIcon, MapPinIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { SocialShare } from "@/components/common/SocialShare";

interface EventCardProps {
  event: Event;
  isRegistered?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isRegistered = false }) => {
  const { isAuthenticated } = useAuth();
  const { registerForEvent, loading } = useEvents();
  
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  
  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await registerForEvent(event.id);
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on share buttons
    if ((e.target as HTMLElement).closest('.share-buttons')) {
      e.preventDefault();
    }
  };

  const isFull = event.registeredCount >= event.capacity;
  
  return (
    <Link to={`/events/${event.id}`} onClick={handleCardClick}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md relative">
        <div
          className="h-48 w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${event.image || "https://source.unsplash.com/random/?college,event"})`,
          }}
        />
        <div className="absolute top-2 right-2 share-buttons z-10" onClick={(e) => e.stopPropagation()}>
          <SocialShare 
            title={`Check out this event: ${event.title}`} 
            url={`${window.location.origin}/events/${event.id}`}
            className="bg-white/80 dark:bg-gray-800/80 p-1 rounded-full"
            isRegistered={isRegistered}
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <Badge variant={isUpcoming ? "default" : "outline"}>
              {isUpcoming ? "Upcoming" : "Past"}
            </Badge>
          </div>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <CalendarIcon className="mr-2 h-4 w-4 text-collegenet-500" />
              <span>
                {format(eventDate, "PPP")} at {format(eventDate, "p")}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <MapPinIcon className="mr-2 h-4 w-4 text-collegenet-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <UsersIcon className="mr-2 h-4 w-4 text-collegenet-500" />
              <span>
                {event.registeredCount} / {event.capacity} registered
              </span>
            </div>
            <div className="flex items-center text-sm">
              <DollarSignIcon className="mr-2 h-4 w-4 text-collegenet-500" />
              <span>{event.price > 0 ? `₹${event.price.toFixed(2)}` : "Free"}</span>
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-muted-foreground">
              Organized by {event.organizerName}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          {isRegistered ? (
            <Button variant="outline" disabled className="w-full">
              Registered
            </Button>
          ) : isAuthenticated ? (
            <Button
              onClick={handleRegister}
              disabled={loading || isFull}
              className="w-full"
            >
              {isFull
                ? "Event Full"
                : loading
                ? "Processing..."
                : `Register ${event.price > 0 ? `- ₹${event.price.toFixed(2)}` : "Now"}`}
            </Button>
          ) : (
            <Button asChild className="w-full">
              <Link to="/login">Sign In to Register</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
