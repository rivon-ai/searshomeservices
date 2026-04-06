/**
 * Generates the correct URL for a blog category/appliance resource page.
 * Format: /blog/[parentCategory]/[applianceSlug]-resources
 */
export function getCategoryUrl(parentCategory: string, category: string): string {
  if (!parentCategory || !category) return "/blog";
  
  const parent = parentCategory.toLowerCase();
  const appliance = category.toLowerCase().replace(/\s+/g, '-');
  
  return `/blog/${parent}/${appliance}-resources`;
}

/**
 * Generates a URL for a specific page in a blog category.
 */
export function getPageUrl(baseUrl: string, page: number): string {
  if (page <= 1) return baseUrl;
  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}page=${page}`;
}
