
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { HandshakeIcon } from "@/components/icons/HandshakeIcon";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  major: string;
  graduationYear: string;
  interests: string[];
}

interface OnboardingFlowProps {
  onComplete: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const GRADUATION_YEARS = Array.from({ length: 7 }, (_, i) => CURRENT_YEAR + i);

const INTEREST_CATEGORIES = [
  "Technology", "Business", "Arts", "Science", "Engineering", 
  "Healthcare", "Education", "Entertainment", "Sports", "Networking",
  "Career Development", "Leadership", "Entrepreneurship"
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<OnboardingData>({
    major: "",
    graduationYear: CURRENT_YEAR.toString(),
    interests: []
  });
  const { updateUser } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    if (data.interests.includes(interest)) {
      setData({
        ...data,
        interests: data.interests.filter(i => i !== interest)
      });
    } else {
      setData({
        ...data,
        interests: [...data.interests, interest]
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // In a real implementation, you would update the user profile with this data
      await updateUser({ 
        // Store this data in user metadata or other profile fields
      });
      
      toast({
        title: "Profile Updated",
        description: "Your onboarding information has been saved."
      });
      
      onComplete();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error saving your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-collegenet-100 dark:bg-collegenet-900/50 rounded-full flex items-center justify-center text-collegenet-600 dark:text-collegenet-400">
            <HandshakeIcon size={28} />
          </div>
        </div>
        <CardTitle className="text-center">Welcome to CollegeNet!</CardTitle>
        <CardDescription className="text-center">
          Let's personalize your experience. {step}/3
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="major">What's your major?</Label>
              <Input 
                id="major" 
                placeholder="Computer Science, Business, etc." 
                value={data.major}
                onChange={(e) => setData({...data, major: e.target.value})}
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Expected graduation year</Label>
              <Select 
                value={data.graduationYear} 
                onValueChange={(value) => setData({...data, graduationYear: value})}
              >
                <SelectTrigger id="graduationYear">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {GRADUATION_YEARS.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="block mb-2">What are your interests?</Label>
              <div className="grid grid-cols-2 gap-2">
                {INTEREST_CATEGORIES.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`interest-${interest}`} 
                      checked={data.interests.includes(interest)}
                      onCheckedChange={() => toggleInterest(interest)}
                    />
                    <Label 
                      htmlFor={`interest-${interest}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < 3 ? (
          <Button onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Complete"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
