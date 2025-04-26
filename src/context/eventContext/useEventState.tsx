
import { useState } from "react";
import { Event, Registration } from "@/types/event";

export function useEventState() {
  const [events, setEvents] = useState<Event[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<Registration[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return {
    events, setEvents,
    userRegistrations, setUserRegistrations,
    savedEvents, setSavedEvents,
    loading, setLoading,
    error, setError,
  };
}
