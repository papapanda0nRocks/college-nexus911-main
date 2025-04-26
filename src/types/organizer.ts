
export interface OrganizerProfile {
  id: string;
  userId: string;
  name: string;
  organization: string;
  title: string;
  bio: string;
  contactEmail: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  profileImage?: string;
  verificationStatus: "pending" | "approved" | "rejected";
  verificationDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizerPermission {
  canCreateEvents: boolean;
  canManageRegistrations: boolean;
  canIssueCertificates: boolean;
  canAccessAnalytics: boolean;
  canManageTeam: boolean;
}

export interface OrganizerStats {
  totalEvents: number;
  totalRegistrations: number;
  totalAttendees: number;
  totalRevenue: number;
  certificatesIssued: number;
}
