import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Event, Registration } from "@/types/event";
import { useAuth } from "@/context/AuthContext";
import { useEventState } from "./useEventState";

// Mock data with updated 2025 dates
const mockEvents: Event[] = [
  {
    id: "event1",
    title: "Tech Career Fair 2023",
    description: "Connect with top tech companies and explore internship and job opportunities.",
    date: new Date(2025, 4, 15).toISOString(), // May 15, 2025
    location: "Main Campus, Hall A",
    organizerId: "org1",
    organizerName: "Career Services",
    price: 0,
    capacity: 300,
    registeredCount: 150,
    category: "Career",
    image: "https://source.unsplash.com/random/?career-fair"
  },
  {
    id: "event2",
    title: "Introduction to AI Workshop",
    description: "Learn the basics of artificial intelligence and how it's changing industries.",
    date: new Date(2025, 5, 10).toISOString(), // June 10, 2025
    location: "Engineering Building, Room 101",
    organizerId: "org2",
    organizerName: "Computer Science Department",
    price: 25,
    capacity: 50,
    registeredCount: 32,
    category: "Workshop",
    image: "https://source.unsplash.com/random/?artificial-intelligence"
  },
  {
    id: "event3",
    title: "Alumni Networking Mixer",
    description: "Expand your professional network by connecting with alumni in your field.",
    date: new Date(2025, 6, 5).toISOString(), // July 5, 2025
    location: "Student Union, Ballroom",
    organizerId: "org3",
    organizerName: "Alumni Association",
    price: 10,
    capacity: 150,
    registeredCount: 75,
    category: "Networking",
    image: "https://source.unsplash.com/random/?networking-event"
  },
  {
    id: "event4",
    title: "Leadership Summit",
    description: "Develop your leadership skills through workshops and talks by industry leaders.",
    date: new Date(2025, 7, 20).toISOString(), // August 20, 2025
    location: "Business School Auditorium",
    organizerId: "org4",
    organizerName: "Student Leadership Council",
    price: 15,
    capacity: 100,
    registeredCount: 45,
    category: "Workshop",
    image: "https://source.unsplash.com/random/?leadership"
  }
];

// Extended types for context
interface EventContextType {
  events: Event[];
  userRegistrations: Registration[];
  loading: boolean;
  error: string | null;
  savedEvents: string[];
  getEventById: (id: string) => Event | undefined;
  registerForEvent: (eventId: string) => Promise<void>;
  createEvent: (event: Omit<Event, "id" | "organizerId" | "organizerName" | "registeredCount">) => Promise<void>;
  getUserEvents: () => Event[];
  saveEvent: (eventId: string) => void;
  unsaveEvent: (eventId: string) => void;
  toggleSaveEvent: (eventId: string) => void;
  getRecommendedEvents: () => Event[];
  getEventsByFilter: (filters: any) => Event[];
}

// Create context
const EventContext = createContext<EventContextType | undefined>(undefined);

// Provider component
export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const {
    events, setEvents,
    userRegistrations, setUserRegistrations,
    savedEvents, setSavedEvents,
    loading, setLoading,
    error, setError,
  } = useEventState();

  // Load events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // This would be an API call in a real app
        setEvents(mockEvents);
        setLoading(false);
      } catch (error) {
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [setEvents]);

  // Load user registrations when user changes
  useEffect(() => {
    const fetchUserRegistrations = async () => {
      if (!user) {
        setUserRegistrations([]);
        return;
      }

      try {
        // This would be an API call in a real app
        // Mock some registrations for the current user
        const mockRegistrations: Registration[] = [
          {
            id: "reg1",
            userId: user.id!,
            eventId: "event1",
            status: "registered",
            registeredAt: new Date().toISOString(),
            hasCertificate: false
          }
        ];
        
        setUserRegistrations(mockRegistrations);
      } catch (error) {
        setError("Failed to load your registrations");
      }
    };

    fetchUserRegistrations();
  }, [user, setUserRegistrations]);

  // Load saved events when user changes
  useEffect(() => {
    const fetchSavedEvents = async () => {
      if (!user) {
        setSavedEvents([]);
        return;
      }

      try {
        // This would be an API call in a real app
        // Mock saved events for the current user
        const savedEventIds = localStorage.getItem(`savedEvents_${user.id}`)
          ? JSON.parse(localStorage.getItem(`savedEvents_${user.id}`) || '[]')
          : ['event2']; // Default saved event for demo
        
        setSavedEvents(savedEventIds);
      } catch (error) {
        setError("Failed to load your saved events");
      }
    };

    fetchSavedEvents();
  }, [user, setSavedEvents]);

  // Get an event by ID
  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  // Register for an event
  const registerForEvent = async (eventId: string) => {
    if (!user) {
      throw new Error("You must be logged in to register for events");
    }

    try {
      setLoading(true);
      
      // This would be an API call in a real app
      // Mock registration
      const newRegistration: Registration = {
        id: `reg-${Date.now()}`,
        userId: user.id!,
        eventId,
        status: "registered",
        registeredAt: new Date().toISOString(),
        hasCertificate: false
      };
      
      // Update local state
      setUserRegistrations([...userRegistrations, newRegistration]);
      
      // Update event registration count
      setEvents(events.map(event => 
        event.id === eventId 
          ? { ...event, registeredCount: event.registeredCount + 1 } 
          : event
      ));
      
      setLoading(false);
    } catch (error) {
      setError("Failed to register for event");
      setLoading(false);
      throw error;
    }
  };

  // Create a new event (for organizers)
  const createEvent = async (eventData: Omit<Event, "id" | "organizerId" | "organizerName" | "registeredCount">) => {
    if (!user) {
      throw new Error("You must be logged in to create events");
    }

    if (user.role !== "organizer") {
      throw new Error("Only organizers can create events");
    }

    try {
      setLoading(true);
      
      // This would be an API call in a real app
      // Mock event creation
      const newEvent: Event = {
        ...eventData,
        id: `event-${Date.now()}`,
        organizerId: user.id!,
        organizerName: user.name || "Unknown Organizer",
        registeredCount: 0
      };
      
      // Update local state
      setEvents([...events, newEvent]);
      
      setLoading(false);
    } catch (error) {
      setError("Failed to create event");
      setLoading(false);
      throw error;
    }
  };

  // Get events created by the current user (if organizer)
  const getUserEvents = () => {
    if (!user) return [];
    
    return events.filter(event => event.organizerId === user.id);
  };

  // Save an event for later
  const saveEvent = (eventId: string) => {
    if (!user) return;
    
    const updatedSavedEvents = [...savedEvents, eventId];
    setSavedEvents(updatedSavedEvents);
    
    // Store in localStorage for persistence
    localStorage.setItem(`savedEvents_${user.id}`, JSON.stringify(updatedSavedEvents));
  };

  // Unsave an event
  const unsaveEvent = (eventId: string) => {
    if (!user) return;
    
    const updatedSavedEvents = savedEvents.filter(id => id !== eventId);
    setSavedEvents(updatedSavedEvents);
    
    // Update localStorage
    localStorage.setItem(`savedEvents_${user.id}`, JSON.stringify(updatedSavedEvents));
  };

  // Toggle saved status
  const toggleSaveEvent = (eventId: string) => {
    if (savedEvents.includes(eventId)) {
      unsaveEvent(eventId);
    } else {
      saveEvent(eventId);
    }
  };

  // Get recommended events based on user interests and past attendance
  const getRecommendedEvents = () => {
    // In a real app, this would use an algorithm based on user interests, past attendance, etc.
    // For now, just return some events that are not in the user's saved or registered lists
    
    if (!user) return [];
    
    const registeredEventIds = userRegistrations.map(reg => reg.eventId);
    const excludedEventIds = [...savedEvents, ...registeredEventIds];
    
    return events
      .filter(event => !excludedEventIds.includes(event.id))
      .slice(0, 3); // Return top 3 recommended events
  };

  // Filter events based on search criteria
  const getEventsByFilter = (filters: any) => {
    if (!filters) return events;
    
    let filteredEvents = [...events];
    
    // Apply text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (filters.category && filters.category !== "All Categories") {
      filteredEvents = filteredEvents.filter(event => 
        event.category === filters.category
      );
    }
    
    // Apply date range filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filteredEvents = filteredEvents.filter(event => 
        new Date(event.date) >= startDate
      );
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      filteredEvents = filteredEvents.filter(event => 
        new Date(event.date) <= endDate
      );
    }
    
    // Apply price filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [minPrice, maxPrice] = filters.priceRange;
      filteredEvents = filteredEvents.filter(event => 
        event.price >= minPrice && event.price <= maxPrice
      );
    }
    
    // Apply location filter (exact match for now, would use proximity in real app)
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.location.toLowerCase().includes(location)
      );
    }
    
    return filteredEvents;
  };

  const contextValue: EventContextType = {
    events,
    userRegistrations,
    loading,
    error,
    savedEvents,
    getEventById,
    registerForEvent,
    createEvent,
    getUserEvents,
    saveEvent,
    unsaveEvent,
    toggleSaveEvent,
    getRecommendedEvents,
    getEventsByFilter
  };

  return <EventContext.Provider value={contextValue}>{children}</EventContext.Provider>;
};

// Custom hook to use the event context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
