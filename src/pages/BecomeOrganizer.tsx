import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Building, Link2, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OrganizerOnboarding } from "@/components/organizer/OrganizerOnboarding";
import { Navigate } from "react-router-dom";

const BecomeOrganizer = () => {
  const { isAuthenticated, user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    organization: "",
    organizationType: "university",
    phone: "",
    website: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    localStorage.setItem("redirectAfterLogin", "/organizer/apply");
    return <Navigate to="/login" replace />;
  }
  
  // If already an organizer, redirect to dashboard
  if (user?.role === "organizer") {
    return <Navigate to="/organizer/dashboard" replace />;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, organizationType: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update user with organizer details
      await updateUser({
        role: "organizer",
        organization: formData.organization,
        organizationType: formData.organizationType as "university" | "company" | "non-profit" | "other",
        phone: formData.phone,
        website: formData.website,
        bio: formData.description,
        verificationStatus: "pending"
      });
      
      toast({
        title: "Application submitted!",
        description: "Your organizer application is under review. We'll notify you once it's approved.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Failed to submit organizer application:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Become an Organizer</h1>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="organization">Organization Name *</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="organization"
                name="organization"
                className="pl-10"
                placeholder="Enter your organization name"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organizationType">Organization Type *</Label>
            <Select 
              value={formData.organizationType} 
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="university">Educational Institution</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="non-profit">Non-Profit Organization</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                className="pl-10"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                name="website"
                className="pl-10"
                placeholder="https://yourorganization.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description of Planned Events *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the types of events you plan to organize..."
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-300">
              <p className="font-medium">Verification Required</p>
              <p>Your application will be reviewed by our team. You'll receive a notification once approved.</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BecomeOrganizer;
