export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  organizerId: string;
  organizerName: string;
  price: number;
  image?: string;
  capacity: number;
  registeredCount: number;
  category: string;
  requiresVerification?: boolean;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  status: "registered" | "attended" | "completed";
  registeredAt: string; // ISO date string
  hasCertificate: boolean;
  certificateUrl?: string;
  paymentId?: string;
}
