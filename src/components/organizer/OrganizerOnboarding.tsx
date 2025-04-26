import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepDetails } from "./steps/StepDetails";
import { StepPreview } from "./steps/StepPreview";
import { StepSuccess } from "./steps/StepSuccess";

interface OrganizerFormData {
  name: string;
  organization: string;
  title: string;
  bio: string;
  contactEmail: string;
  website: string;
}

export const OrganizerOnboarding: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<OrganizerFormData>({
    name: user?.name || "",
    organization: "",
    title: "",
    bio: "",
    contactEmail: user?.email || "",
    website: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application Submitted",
        description: "Your organizer application has been received. We'll review it shortly.",
      });
      
      // Move to final step
      setCurrentStep(4);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Become an Event Organizer</CardTitle>
        <CardDescription>
          Complete this form to apply for organizer privileges.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`
                  relative flex items-center justify-center w-8 h-8 rounded-full
                  ${
                    step < currentStep 
                      ? "bg-collegenet-600 text-white" 
                      : step === currentStep 
                        ? "bg-collegenet-100 border-2 border-collegenet-600 text-collegenet-600" 
                        : "bg-gray-100 text-gray-400 dark:bg-gray-700"
                  }
                `}
              >
                {step}
                {step < 4 && (
                  <div className={`absolute top-4 w-full h-0.5 -right-full ${step < currentStep ? "bg-collegenet-600" : "bg-gray-200 dark:bg-gray-600"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2 text-xs text-muted-foreground">
            <span>Basic Info</span>
            <span>Details</span>
            <span>Preview</span>
            <span>Submit</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <StepBasicInfo data={formData} onChange={handleChange} />
          )}
          
          {currentStep === 2 && (
            <StepDetails data={formData} onChange={handleChange} />
          )}
          
          {currentStep === 3 && (
            <StepPreview data={formData} />
          )}
          
          {currentStep === 4 && <StepSuccess />}
        </form>
      </CardContent>
      
      {currentStep < 4 && (
        <CardFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              Previous
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 3 ? (
            <Button type="button" onClick={goToNextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
