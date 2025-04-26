
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const RememberMeCheckbox: React.FC<RememberMeProps> = ({ checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="remember-me" 
        checked={checked} 
        onCheckedChange={onChange} 
      />
      <Label 
        htmlFor="remember-me" 
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Remember me
      </Label>
    </div>
  );
};
