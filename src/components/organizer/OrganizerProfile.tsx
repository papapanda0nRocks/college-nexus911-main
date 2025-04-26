
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { OrganizerProfile as OrganizerProfileType } from "@/types/organizer";

const OrganizerProfile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock profile data
  const [profile, setProfile] = useState<OrganizerProfileType>({
    id: "org1",
    userId: user?.id || "user1",
    name: user?.name || "John Smith",
    organization: "Tech Events Inc.",
    title: "Event Coordinator",
    bio: "Professional event organizer with 5+ years of experience in tech industry events.",
    contactEmail: user?.email || "john@example.com",
    website: "https://techeventsinc.com",
    socialLinks: {
      linkedin: "https://linkedin.com/in/johnsmith",
      twitter: "https://twitter.com/johnsmith"
    },
    verificationStatus: "approved",
    verificationDate: new Date(2025, 1, 15).toISOString(),
    createdAt: new Date(2024, 10, 5).toISOString(),
    updatedAt: new Date(2025, 1, 20).toISOString()
  });
  
  // Email notification preferences
  const [emailNotifications, setEmailNotifications] = useState({
    newRegistrations: true,
    reminderEmails: true,
    marketingEmails: false,
    attendanceReports: true
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your organizer profile has been updated successfully."
    });
  };
  
  const handleNotificationUpdate = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your email notification preferences have been updated."
    });
  };
  
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="organization">Organization</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Organizer Profile</CardTitle>
            <CardDescription>
              Update your personal information and public profile.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleProfileUpdate}>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profilePicture} alt={profile.name} />
                  <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.title} at {profile.organization}</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      value={profile.title} 
                      onChange={(e) => setProfile({...profile, title: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.contactEmail} 
                      onChange={(e) => setProfile({...profile, contactEmail: e.target.value})} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      value={profile.website || ''} 
                      onChange={(e) => setProfile({...profile, website: e.target.value})} 
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profile.bio} 
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4} 
                  />
                  <p className="text-xs text-muted-foreground">
                    This bio will be displayed on your public organizer profile.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Social Links</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input 
                        id="linkedin" 
                        value={profile.socialLinks?.linkedin || ''} 
                        onChange={(e) => setProfile({
                          ...profile, 
                          socialLinks: {...profile.socialLinks, linkedin: e.target.value}
                        })} 
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input 
                        id="twitter" 
                        value={profile.socialLinks?.twitter || ''} 
                        onChange={(e) => setProfile({
                          ...profile, 
                          socialLinks: {...profile.socialLinks, twitter: e.target.value}
                        })} 
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      
      <TabsContent value="organization" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
            <CardDescription>
              Details about your organization that will be visible to event attendees.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input 
                id="org-name" 
                value={profile.organization} 
                onChange={(e) => setProfile({...profile, organization: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="org-description">Organization Description</Label>
              <Textarea 
                id="org-description" 
                placeholder="Describe your organization..." 
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="org-logo">Organization Logo</Label>
              <div className="mt-1 flex items-center">
                <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Logo</p>
                </div>
                <Button variant="outline" size="sm" className="ml-4">
                  Upload Logo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended size: 300x300 pixels. Maximum file size: 2MB.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button onClick={handleProfileUpdate}>Save Organization Info</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage your email notification preferences.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-registrations">New Registration Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when someone registers for your event.
                  </p>
                </div>
                <Switch 
                  id="new-registrations" 
                  checked={emailNotifications.newRegistrations}
                  onCheckedChange={(checked) => setEmailNotifications({
                    ...emailNotifications,
                    newRegistrations: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reminder-emails">Event Reminder Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automatic reminder emails to attendees before events.
                  </p>
                </div>
                <Switch 
                  id="reminder-emails" 
                  checked={emailNotifications.reminderEmails}
                  onCheckedChange={(checked) => setEmailNotifications({
                    ...emailNotifications,
                    reminderEmails: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Send promotional emails about upcoming events to past attendees.
                  </p>
                </div>
                <Switch 
                  id="marketing-emails" 
                  checked={emailNotifications.marketingEmails}
                  onCheckedChange={(checked) => setEmailNotifications({
                    ...emailNotifications,
                    marketingEmails: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="attendance-reports">Attendance Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive attendance reports after each event.
                  </p>
                </div>
                <Switch 
                  id="attendance-reports" 
                  checked={emailNotifications.attendanceReports}
                  onCheckedChange={(checked) => setEmailNotifications({
                    ...emailNotifications,
                    attendanceReports: checked
                  })}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button onClick={handleNotificationUpdate}>Save Notification Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default OrganizerProfile;
