import posts from "./newBlogPosts.json";
export const newBlogPosts = posts;
export const getNewBlogPost = slug => posts.find(p => p.slug === slug) || null;
