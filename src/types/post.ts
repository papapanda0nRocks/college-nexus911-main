
export interface Post {
  id: string;
  title: string;
  content: string;
  organizerId: string;
  organizerName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: "draft" | "published" | "archived";
  visibility: "all" | "verified" | "specific";
  targetGroups?: string[];
  attachments?: {
    url: string;
    type: "image" | "document" | "link";
    name: string;
  }[];
  tags: string[];
  metrics?: {
    views: number;
    likes: number;
    comments: number;
  };
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PostFilters {
  search?: string;
  tags?: string[];
  organizerId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  status?: "draft" | "published" | "archived";
}
