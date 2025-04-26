
import React from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaveEventButtonProps {
  eventId: string;
  isSaved: boolean;
  onToggleSave: (eventId: string) => void;
  className?: string;
}

export const SaveEventButton: React.FC<SaveEventButtonProps> = ({
  eventId,
  isSaved,
  onToggleSave,
  className = ""
}) => {
  const { toast } = useToast();

  const handleToggleSave = () => {
    onToggleSave(eventId);
    
    toast({
      title: isSaved ? "Event Removed" : "Event Saved",
      description: isSaved ? "Event removed from your saved list" : "Event saved for later",
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 rounded-full ${className}`}
      onClick={handleToggleSave}
      title={isSaved ? "Remove from saved" : "Save for later"}
    >
      {isSaved ? (
        <BookmarkCheck className="h-4 w-4 text-collegenet-500" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
};
