
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: number[];
  onChange: (values: number[]) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRange,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Price Range</Label>
      <div className="flex justify-between text-xs text-muted-foreground mb-2">
        <span>₹{priceRange[0]}</span>
        <span>₹{priceRange[1]}</span>
      </div>
      <Slider
        value={priceRange}
        min={0}
        max={1000}
        step={50}
        onValueChange={onChange}
      />
    </div>
  );
};
