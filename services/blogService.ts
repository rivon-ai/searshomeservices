import { BlogSection, BlogPost } from "@/types/blog";

const API_BASE_URL = process.env.NEXT_PUBLIC_DATA_URL || "http://localhost:5000";

export const blogService = {
  /**
   * Fetches data for the main blog landing page.
   * Returns an array of 3 sections (Repair, Maintain, Protect).
   */
  async getHomepageData(): Promise<BlogSection[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error("Failed to fetch blog landing page data");
      const data = await response.json();
      console.log("--- BLOG HOMEPAGE API RESPONSE ---");
      console.log(JSON.stringify(data, null, 2));
      console.log("----------------------------------");
      return data;
    } catch (error) {
      console.error("Error in getHomepageData:", error);
      return [];
    }
  },

  /**
   * Fetches a paginated list of posts, optionally filtered by category or appliance.
   */
  async getPosts(params: {
    category?: string;
    appliance?: string;
    page?: number;
    limit?: number;
  }): Promise<{ articles: BlogPost[]; pagination: any }> {
    const query = new URLSearchParams();
    if (params.category) query.append("category", params.category);
    if (params.appliance) query.append("appliance", params.appliance);
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog/posts?${query.toString()}`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      console.log("--- BLOG POSTS API RESPONSE ---");
      console.log(JSON.stringify(data, null, 2).substring(0, 1000) + "...");
      console.log("-------------------------------");
      return data;
    } catch (error) {
      console.error("Error in getPosts:", error);
      return { articles: [], pagination: { total: 0, page: 1, totalPages: 0 } };
    }
  },

  /**
   * Fetches the full content of a single blog post by its slug.
   */
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/blog/posts/${slug}`, {
        cache: 'no-store',
      });
      if (!response.ok) return null;
      const data = await response.json();
      console.log("--- BLOG SINGLE POST API RESPONSE ---");
      console.log(JSON.stringify(data, null, 2));
      console.log("-------------------------------------");
      return data;
    } catch (error) {
      console.error(`Error in getPostBySlug (${slug}):`, error);
      return null;
    }
  }
};
