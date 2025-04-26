
import React, { createContext, useState, useEffect, useContext } from "react";
import { Notification, NotificationType } from "@/types/notification";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  sendNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => Promise<void>;
  clearNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    if (user?.id) {
      // Fetch notifications for the current user
      // For now, we'll just mock some notifications
      const mockNotifications: Notification[] = [
        {
          id: "1",
          userId: user.id,
          type: "verification_reminder",
          title: "Verify your account",
          message: "Complete your account verification to access all features",
          read: false,
          createdAt: new Date().toISOString(),
          link: "/verification-prompt"
        }
      ];
      
      setNotifications(mockNotifications);
    } else {
      setNotifications([]);
    }
  }, [user?.id]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = async (notificationId: string): Promise<void> => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    );
    
    // In a real app, we'd send an API request here
  };
  
  const markAllAsRead = async (): Promise<void> => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    // In a real app, we'd send an API request here
  };
  
  const sendNotification = async (
    notification: Omit<Notification, "id" | "createdAt" | "read">
  ): Promise<void> => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show a toast for the new notification
    toast({
      title: newNotification.title,
      description: newNotification.message,
    });
    
    // In a real app, we'd send an API request here
  };
  
  const clearNotifications = async (): Promise<void> => {
    setNotifications([]);
    
    // In a real app, we'd send an API request here
  };
  
  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        unreadCount, 
        markAsRead, 
        markAllAsRead, 
        sendNotification, 
        clearNotifications 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
