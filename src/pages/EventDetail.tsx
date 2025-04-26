
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { EventMeta } from "@/components/events/detail/EventMeta";
import { EventHeader } from "@/components/events/detail/EventHeader";
import { EventDescription } from "@/components/events/detail/EventDescription";
import { RegistrationCard } from "@/components/events/detail/RegistrationCard";
import { EventDetailSkeleton } from "@/components/events/EventSkeleton";
import { ShareEventButton } from "@/components/events/ShareEventButton";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, registerForEvent, userRegistrations, loading } = useEvents();
  const { isAuthenticated } = useAuth();
  
  const event = getEventById(id || "");

  if (loading) {
    return <EventDetailSkeleton />;
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/events")}>Back to Events</Button>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const isRegistered = userRegistrations.some((reg) => reg.eventId === event.id);
  const isFull = event.registeredCount >= event.capacity;

  const handleRegister = async () => {
    try {
      await registerForEvent(event.id);
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          {/* Show Share button only if user is logged in and registered */}
          {isAuthenticated && (
            <ShareEventButton 
              eventId={event.id} 
              eventTitle={event.title} 
              isRegistered={isRegistered}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <EventHeader 
              event={event} 
              isUpcoming={isUpcoming} 
              isAuthenticated={isAuthenticated}
              isRegistered={isRegistered}
            />
            <EventMeta event={event} />
            <EventDescription description={event.description} />
          </div>
          <div className="md:w-1/3">
            <RegistrationCard
              event={event}
              isRegistered={isRegistered}
              isAuthenticated={isAuthenticated}
              isUpcoming={isUpcoming}
              isFull={isFull}
              loading={loading}
              onRegister={handleRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
