
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface Props {
  data: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
export const StepDetails = ({ data, onChange }: Props) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="bio">Professional Bio</Label>
      <Textarea
        id="bio"
        name="bio"
        value={data.bio}
        onChange={onChange}
        placeholder="Tell us about yourself and your event organization experience"
        rows={4}
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="contactEmail">Contact Email</Label>
      <Input
        id="contactEmail"
        name="contactEmail"
        type="email"
        value={data.contactEmail}
        onChange={onChange}
        placeholder="Email for event inquiries"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="website">Website (Optional)</Label>
      <Input id="website" name="website" type="url" value={data.website} onChange={onChange} placeholder="https://your-organization.com" />
    </div>
  </div>
);
