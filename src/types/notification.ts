
export type NotificationType = 
  | "verification_reminder"
  | "verification_approved"
  | "verification_rejected"
  | "new_post"
  | "event_reminder"
  | "organizer_approved"
  | "organizer_rejected";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  data?: Record<string, any>;
}
