
import React from "react";

interface EventDescriptionProps {
  description: string;
}

export const EventDescription: React.FC<EventDescriptionProps> = ({ description }) => {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <h2 className="text-xl font-semibold mb-2">About This Event</h2>
      <p className="mb-4">{description}</p>
      <p>
        Join us for this exciting event where you'll have the opportunity to expand 
        your knowledge and network with professionals in your field. Don't miss out on 
        this chance to enhance your skills and make valuable connections.
      </p>
    </div>
  );
};
