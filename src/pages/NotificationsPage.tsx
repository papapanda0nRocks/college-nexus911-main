
import React, { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { BellIcon, SearchIcon, CheckCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  
  // Filter notifications based on search query and read/unread filter
  const filteredNotifications = notifications
    .filter(notification => 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(notification => {
      if (filter === "all") return true;
      if (filter === "unread") return !notification.read;
      if (filter === "read") return notification.read;
      return true;
    });
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.some(n => !n.read) && (
          <Button 
            variant="outline" 
            onClick={() => markAllAsRead()}
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="relative max-w-sm w-full">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs value={filter} onValueChange={(value: "all" | "unread" | "read") => setFilter(value)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-16">
          <BellIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">No notifications found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term." : "You're all caught up!"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <Link
              key={notification.id}
              to={notification.link || "#"}
              className={`block p-4 rounded-lg border ${
                notification.read 
                  ? "bg-card border-border" 
                  : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              } hover:bg-accent/50 transition-colors`}
              onClick={() => !notification.read && markAsRead(notification.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-base">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </span>
                  {notification.read && (
                    <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400 mt-2" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
