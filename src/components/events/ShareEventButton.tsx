import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SocialShare } from "@/components/common/SocialShare";
import { useAuth } from "@/context/AuthContext";
import { useEvents } from "@/context/EventContext";

interface ShareEventButtonProps {
  eventId: string;
  eventTitle: string;
  isRegistered: boolean;
}

// Custom WhatsApp icon component
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
    <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
    <path d="M9 14a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z"/>
  </svg>
);

// Custom Instagram icon component
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const ShareEventButton: React.FC<ShareEventButtonProps> = ({ 
  eventId, 
  eventTitle,
  isRegistered
}) => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [showSocialOptions, setShowSocialOptions] = React.useState(false);

  // Only show if user is authenticated and registered for the event
  if (!isAuthenticated || !isRegistered) {
    return null;
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/events/${eventId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventTitle,
          url: shareUrl
        });
        toast({
          title: "Success",
          description: "Event shared successfully!"
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          toast({
            title: "Share Unavailable",
            description: "Could not share this event.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Share cancelled",
            description: "You cancelled event sharing.",
          });
        }
      }
    } else {
      setShowSocialOptions(!showSocialOptions);
    }
  };

  const handleShareOption = (platform: 'twitter' | 'instagram' | 'whatsapp' | 'copy') => {
    const shareUrl = `${window.location.origin}/events/${eventId}`;
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(eventTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
        toast({ title: "Shared on X (Twitter)", description: "Your post has been shared" });
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${eventTitle}: ${shareUrl}`)}`, '_blank', 'noopener,noreferrer');
        toast({ title: "Shared on WhatsApp", description: "Your post has been shared" });
        break;
      case 'instagram':
        navigator.clipboard.writeText(shareUrl);
        toast({ title: "Instagram Sharing", description: "Link copied to clipboard. Share it on Instagram." });
        break;
      case 'copy':
      default:
        navigator.clipboard.writeText(shareUrl);
        toast({ title: "Link Copied", description: "Link copied to clipboard" });
        break;
    }
    setShowSocialOptions(false);
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              title="Share this event"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share event</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share this event</p>
          </TooltipContent>
        </Tooltip>
        {showSocialOptions && (
          <div className="absolute top-10 right-0 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg min-w-[160px] flex flex-col space-y-1">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
              onClick={() => handleShareOption('twitter')}
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
              onClick={() => handleShareOption('whatsapp')}
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
              onClick={() => handleShareOption('instagram')}
            >
              <InstagramIcon />
              <span>Instagram (Copy Link)</span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
              onClick={() => handleShareOption('copy')}
            >
              <Share2 className="h-4 w-4" />
              <span>Copy Link</span>
            </button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

// Removed the duplicate export here
