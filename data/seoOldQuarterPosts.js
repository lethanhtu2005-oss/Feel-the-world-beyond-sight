import posts from "./seoOldQuarterPosts.json";
export const seoOldQuarterPosts = posts;
export function getSeoOldQuarterPost(slug){return posts.find(p=>p.slug===slug)||null;}
