import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LinkedinIcon, UserIcon, BadgeCheck, Award, CalendarIcon, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bio: user?.bio || "Professional with expertise in technology and innovation. LinkedIn integration showcases my professional journey and achievements.",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const handleSaveProfile = async () => {
    try {
      await updateUser({
        ...profileData,
        isPublic: isProfilePublic,
      });
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Mock achievements data
  const achievements = [
    {
      id: "cert1",
      title: "Web Development Fundamentals",
      issuer: "Tech Academy",
      date: "March 2025",
      icon: <BadgeCheck className="h-8 w-8 text-green-500" />,
    },
    {
      id: "cert2",
      title: "Leadership Excellence",
      issuer: "Professional Growth Institute",
      date: "January 2025",
      icon: <Award className="h-8 w-8 text-yellow-500" />,
    },
  ];

  // If not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please log in to view your profile.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{user.role}</p>
              
              <div className="flex items-center mt-4">
                <LinkedinIcon className="h-5 w-5 text-[#0077b5] mr-2" />
                <span className="text-sm">LinkedIn Connected</span>
              </div>
              
              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <Label htmlFor="public-profile">Public Profile</Label>
                  </div>
                  <Switch
                    id="public-profile"
                    checked={isProfilePublic}
                    onCheckedChange={setIsProfilePublic}
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {isProfilePublic
                    ? "Your profile is visible to everyone"
                    : "Your profile is private"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={isEditing ? "outline" : "default"} 
                className="w-full"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    {isEditing
                      ? "Edit your personal details below"
                      : "Your personal information and bio"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    // Edit mode
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          rows={5}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // View mode
                    <>
                      <div className="prose dark:prose-invert max-w-none">
                        <h3 className="font-medium">About Me</h3>
                        <p>{profileData.bio}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{profileData.email || user.email || "Not provided"}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{profileData.phone || user.phone || "Not provided"}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button onClick={handleSaveProfile} className="w-full">
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Certificates</CardTitle>
                  <CardDescription>
                    Your earned certificates and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {achievements.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You haven't earned any certificates or achievements yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-start p-4 border rounded-lg bg-muted/30"
                        >
                          <div className="mr-4 mt-1">{achievement.icon}</div>
                          <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {achievement.issuer}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {achievement.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/certificates">View All Certificates</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
