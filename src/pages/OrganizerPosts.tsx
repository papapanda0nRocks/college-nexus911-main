
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PostCreator } from "@/components/organizer/PostCreator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

const OrganizerPosts = () => {
  const { isAuthenticated, user } = useAuth();
  
  // Check if user is authenticated and is an organizer
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== "organizer") {
    return <Navigate to="/events" replace />;
  }
  
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts Management</h1>
        <Button asChild variant="outline">
          <a href="/organizer/dashboard">Back to Dashboard</a>
        </Button>
      </div>
      
      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Post
          </TabsTrigger>
          <TabsTrigger value="manage">Manage Posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="pt-4">
          <PostCreator />
        </TabsContent>
        
        <TabsContent value="manage" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Published
              </Button>
              <Button variant="ghost" size="sm">
                Drafts
              </Button>
              <Button variant="ghost" size="sm">
                Archived
              </Button>
            </div>
          </div>
          
          <Card className="p-8 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <p>You haven't created any posts yet.</p>
            <Button variant="default" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Create Your First Post
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizerPosts;
