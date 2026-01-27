export interface Blog {
  id: string;
  title: string;
  description: string;
  published: boolean;
  category?: string;
  author?: string;
  bannerImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export type CreateBlogInput = Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBlogInput = Partial<CreateBlogInput> & { id: string };
export type CreateCommentInput = Omit<Comment, 'id' | 'createdAt'>;

interface ExploreItem {
  id: string;
  category: string;
  date: string;
  title: string;
  image: string;
}
export type { ExploreItem };
