
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type EventType = "all" | "inPerson" | "virtual";

interface EventTypeFilterProps {
  value: EventType;
  onChange: (value: EventType) => void;
}

export const EventTypeFilter: React.FC<EventTypeFilterProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Event Type</Label>
      <div className="flex flex-col space-y-2 mt-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="event-all"
            checked={value === "all"}
            onCheckedChange={() => onChange("all")}
          />
          <Label htmlFor="event-all">All Events</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="event-inperson"
            checked={value === "inPerson"}
            onCheckedChange={() => onChange("inPerson")}
          />
          <Label htmlFor="event-inperson">In-Person Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="event-virtual"
            checked={value === "virtual"}
            onCheckedChange={() => onChange("virtual")}
          />
          <Label htmlFor="event-virtual">Virtual Only</Label>
        </div>
      </div>
    </div>
  );
};
