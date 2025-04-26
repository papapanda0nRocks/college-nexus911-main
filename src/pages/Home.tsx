import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "@/context/EventContext";
import { useAuth } from "@/context/AuthContext";
import { EventList } from "@/components/events/EventList";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { OnboardingFlow } from "@/components/auth/OnboardingFlow";
import { EnhancedSearch } from "@/components/events/EnhancedSearch";
import { EventListSkeleton } from "@/components/events/EventSkeleton";
import { HandshakeIcon } from "@/components/icons/HandshakeIcon";
import { WhyCollegeNetSection } from "@/components/home/WhyCollegeNetSection";
import { SignupCtaSection } from "@/components/home/SignupCtaSection";

const Home = () => {
  const { events, loading, userRegistrations, savedEvents, getRecommendedEvents, getEventsByFilter } = useEvents();
  const { isAuthenticated, user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  
  const firstName = user?.name?.split(' ')[0] || '';
  
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      const onboardingCompleted = localStorage.getItem(`onboarding_${user.id}`);
      setHasCompletedOnboarding(!!onboardingCompleted);
      setShowOnboarding(isAuthenticated && !onboardingCompleted);
    }
  }, [isAuthenticated, user]);
  
  const handleOnboardingComplete = () => {
    if (user?.id) {
      localStorage.setItem(`onboarding_${user.id}`, 'true');
      setShowOnboarding(false);
      setHasCompletedOnboarding(true);
    }
  };
  
  const upcomingEvents = [...events]
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);
  
  const recommendedEvents = isAuthenticated ? getRecommendedEvents() : [];
  
  const userSavedEvents = isAuthenticated 
    ? events.filter(event => savedEvents.includes(event.id))
    : [];
  
  const handleSearch = (filters: any) => {
    const filteredEvents = getEventsByFilter(filters);
    console.log("Search filters applied:", filters);
    console.log("Filtered events:", filteredEvents);
  };
  
  if (showOnboarding) {
    return (
      <div className="py-8 max-w-xl mx-auto">
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </div>
    );
  }
  
  return (
    <div className="space-y-12">
      <section className="relative">
        <div className="bg-collegenet-600 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-collegenet-700 to-collegenet-500 opacity-90 mix-blend-multiply rounded-lg"></div>
          <div className="relative py-16 px-8 md:py-24 md:px-12 max-w-3xl">
            {isAuthenticated ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Welcome back, {firstName}!
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Discover new opportunities and connect with professionals in your field.
                </p>
                <Button asChild size="lg" className="bg-white text-collegenet-700 hover:bg-gray-100">
                  <Link to="/events">Browse Events</Link>
                </Button>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Discover and Connect at College Events
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Find networking opportunities, workshops, career fairs, and more. Build your professional network and get certified.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-collegenet-700 hover:bg-gray-100">
                    <Link to="/events">Browse Events</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      
      <section className="bg-card dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Find Events</h2>
        <EnhancedSearch onSearch={handleSearch} />
      </section>
      
      {isAuthenticated && recommendedEvents.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <HandshakeIcon className="h-5 w-5 text-collegenet-500" />
              <h2 className="text-3xl font-bold">Recommended For You</h2>
            </div>
            <Button asChild variant="ghost" className="gap-1">
              <Link to="/events">
                View All <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <EventListSkeleton />
          ) : (
            <EventList 
              events={recommendedEvents} 
              userRegistrations={userRegistrations}
              title="" 
              showFilters={false} 
            />
          )}
        </section>
      )}
      
      {isAuthenticated && userSavedEvents.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Saved Events</h2>
            <Button asChild variant="ghost" className="gap-1">
              <Link to="/events">
                View All <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <EventListSkeleton />
          ) : (
            <EventList 
              events={userSavedEvents} 
              userRegistrations={userRegistrations}
              title="" 
              showFilters={false} 
            />
          )}
        </section>
      )}
      
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/events">
              View All <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <EventListSkeleton />
        ) : (
          <EventList 
            events={upcomingEvents} 
            userRegistrations={userRegistrations}
            title="" 
            showFilters={false} 
          />
        )}
      </section>
      
      {!isAuthenticated && (
        <>
          <WhyCollegeNetSection />
          <SignupCtaSection />
        </>
      )}
    </div>
  );
};

export default Home;
