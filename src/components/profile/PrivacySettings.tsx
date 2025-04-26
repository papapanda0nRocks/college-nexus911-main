
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { HandshakeIcon } from "@/components/icons/HandshakeIcon";
import { Separator } from "@/components/ui/separator";

interface PrivacySettings {
  isPublic: boolean;
  showAchievements: boolean;
  showAttendedEvents: boolean;
  showUpcomingEvents: boolean;
  showCertificates: boolean;
  hiddenCertificates: string[];
}

export const PrivacySettings: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize with default settings or user's saved settings
  const [settings, setSettings] = useState<PrivacySettings>({
    isPublic: user?.isPublic ?? true,
    showAchievements: true,
    showAttendedEvents: true,
    showUpcomingEvents: true,
    showCertificates: true,
    hiddenCertificates: []
  });
  
  const handleSaveSettings = async () => {
    if (!user) return;
    
    try {
      setIsSubmitting(true);
      
      // Update user information with privacy settings
      await updateUser({
        isPublic: settings.isPublic,
        // In a real app, you would save other privacy settings here as well
      });
      
      // Store other privacy settings in localStorage for this demo
      localStorage.setItem(`privacy_${user.id}`, JSON.stringify(settings));
      
      toast({
        title: "Privacy Settings Updated",
        description: "Your privacy preferences have been saved."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update privacy settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <HandshakeIcon className="h-5 w-5 text-collegenet-500" />
          <CardTitle>Privacy Settings</CardTitle>
        </div>
        <CardDescription>
          Control what information is visible to other users on your profile.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <Label htmlFor="profile-visibility" className="text-base font-medium">
              Profile Visibility
            </Label>
            <p className="text-sm text-muted-foreground mt-0.5">
              Make your profile visible to other users
            </p>
          </div>
          <Switch 
            id="profile-visibility" 
            checked={settings.isPublic}
            onCheckedChange={(checked) => setSettings({...settings, isPublic: checked})}
          />
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Profile Section Visibility</h3>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="show-achievements" className="text-sm">
              Achievements
            </Label>
            <Switch 
              id="show-achievements"
              checked={settings.showAchievements}
              onCheckedChange={(checked) => setSettings({...settings, showAchievements: checked})}
              disabled={!settings.isPublic}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="show-attended-events" className="text-sm">
              Past Events
            </Label>
            <Switch 
              id="show-attended-events"
              checked={settings.showAttendedEvents}
              onCheckedChange={(checked) => setSettings({...settings, showAttendedEvents: checked})}
              disabled={!settings.isPublic}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="show-upcoming-events" className="text-sm">
              Upcoming Events
            </Label>
            <Switch 
              id="show-upcoming-events"
              checked={settings.showUpcomingEvents}
              onCheckedChange={(checked) => setSettings({...settings, showUpcomingEvents: checked})}
              disabled={!settings.isPublic}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <Label htmlFor="show-certificates" className="text-sm">
              Certificates
            </Label>
            <Switch 
              id="show-certificates"
              checked={settings.showCertificates}
              onCheckedChange={(checked) => setSettings({...settings, showCertificates: checked})}
              disabled={!settings.isPublic}
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Certificate Privacy</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You can hide specific certificates from your public profile.
            Visit the Certificates page to manage visibility for individual certificates.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <a href="/certificates">Manage Certificate Visibility</a>
          </Button>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSaveSettings}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Privacy Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
};
