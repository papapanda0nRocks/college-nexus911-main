
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { EventProvider } from "@/context/EventContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { Layout } from "@/components/layout/Layout";
import { VerificationBanner } from "@/components/notification/VerificationBanner";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import Certificates from "./pages/Certificates";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MyHistory from "./pages/MyHistory";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserProfile from "./pages/UserProfile";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizerSettings from "./pages/OrganizerSettings";
import OrganizerPosts from "./pages/OrganizerPosts";
import BecomeOrganizer from "./pages/BecomeOrganizer";
import NotificationsPage from "./pages/NotificationsPage";
import VerificationPrompt from "./pages/VerificationPrompt";
import VerificationUpload from "./pages/VerificationUpload";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replacing cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <NotificationProvider>
              <EventProvider>
                <Layout>
                  <VerificationBanner />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/my-events" element={<MyEvents />} />
                    <Route path="/my-history" element={<MyHistory />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user/:id" element={<UserProfile />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/verification-prompt" element={<VerificationPrompt />} />
                    <Route path="/verification-upload" element={<VerificationUpload />} />
                    
                    {/* Organizer routes */}
                    <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
                    <Route path="/organizer/settings" element={<OrganizerSettings />} />
                    <Route path="/organizer/posts" element={<OrganizerPosts />} />
                    <Route path="/organizer/apply" element={<BecomeOrganizer />} />
                    
                    {/* Admin routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </EventProvider>
            </NotificationProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
