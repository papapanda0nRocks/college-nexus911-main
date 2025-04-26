
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Props {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const StepBasicInfo = ({ data, onChange }: Props) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" name="name" value={data.name} onChange={onChange} placeholder="Your full name" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="organization">Organization</Label>
      <Input id="organization" name="organization" value={data.organization} onChange={onChange} placeholder="Your organization or department" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="title">Job Title</Label>
      <Input id="title" name="title" value={data.title} onChange={onChange} placeholder="Your position or title" required />
    </div>
  </div>
);
