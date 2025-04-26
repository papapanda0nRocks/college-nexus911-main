
export type UserRole = "student" | "organizer" | "admin";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  linkedinId?: string;
  profilePicture?: string;
  role: UserRole;
  bio?: string;
  isPublic?: boolean;
  organization?: string;
  organizationType?: "university" | "company" | "non-profit" | "other";
  website?: string;
  verificationStatus?: VerificationStatus;
  verificationDocuments?: {
    governmentId?: string;
    collegeId?: string;
    uploadDate?: string;
  };
  createdAt?: string;
  lastVerificationPrompt?: string;
  notificationSettings?: {
    email: boolean;
    inApp: boolean;
    marketing: boolean;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  loginWithLinkedIn: () => Promise<void>;
  loginWithPhone: (phone: string, code: string) => Promise<void>;
  sendPhoneCode: (phone: string) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  uploadVerificationDocument: (type: "governmentId" | "collegeId", file: File) => Promise<void>;
  checkVerificationStatus: () => Promise<VerificationStatus>;
}
