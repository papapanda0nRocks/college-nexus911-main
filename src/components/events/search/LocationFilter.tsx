
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface LocationFilterProps {
  location: string;
  maxDistance: number;
  onLocationChange: (value: string) => void;
  onDistanceChange: (value: number) => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  location,
  maxDistance,
  onLocationChange,
  onDistanceChange
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="City or campus"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="distance">Distance (km)</Label>
          <span className="text-sm">{maxDistance} km</span>
        </div>
        <Slider
          value={[maxDistance]}
          max={100}
          step={5}
          onValueChange={(values) => onDistanceChange(values[0])}
        />
      </div>
    </div>
  );
};
