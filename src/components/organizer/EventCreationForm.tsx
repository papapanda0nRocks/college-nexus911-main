
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EventCreationForm: React.FC = () => {
  return (
    <Card className="my-4">
      <CardContent>
        <p className="mb-2 font-medium text-lg">Create New Event (WIP)</p>
        <p className="text-muted-foreground text-sm mb-4">The event creation form will allow organizers to list new events.</p>
        <Button disabled>Create Event (Coming Soon)</Button>
      </CardContent>
    </Card>
  );
};
export default EventCreationForm;
