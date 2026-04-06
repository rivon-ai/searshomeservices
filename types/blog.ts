/**
 * Basic tag information for a blog post.
 */
export interface BlogTag {
  label: string;
  url: string;
}

/**
 * A content section within a blog post (Article Detail).
 */
export interface BlogPostSection {
  id: string;
  title: string;
  content: string; // HTML string from backend
}

/**
 * The unified Article Preview object used for lists and grids.
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  category: string; // e.g., "Refrigerator"
  parentCategory: string; // e.g., "repair"
  date: string;
  readTime: string;
  excerpt: string;
  isFeatured: boolean;
  tags: BlogTag[];
  contentSections?: BlogPostSection[]; // Only present in detail view
}

/**
 * A blog section object grouping posts by category (for home page).
 */
export interface BlogSection {
  title: string;
  link: string;
  posts: BlogPost[];
}

/**
 * Pagination structure returned by the API.
 */
export interface PaginationData {
  total: number;
  page: number;
  totalPages: number;
}
