import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BLOG_SECTIONS, sectionById, postsInSection, unassignedPosts } from "../data/blogSections.js";
const seo = JSON.parse(readFileSync(new URL("../data/seoOldQuarterPosts.json", import.meta.url), "utf8"));
const neo = JSON.parse(readFileSync(new URL("../data/newBlogPosts.json", import.meta.url), "utf8"));
const { articles } = await import("../data/articles.js");
const { oldQuarterBlogs } = await import("../data/oldQuarterBlogs.js");
const all = [...articles, ...neo, ...oldQuarterBlogs, ...seo];

test("5 mục blog, id duy nhất, mọi slug trong mục đều tồn tại", () => {
  assert.equal(BLOG_SECTIONS.length, 5);
  assert.equal(new Set(BLOG_SECTIONS.map((s) => s.id)).size, 5);
  const slugs = new Set(all.map((p) => p.slug));
  for (const s of BLOG_SECTIONS) for (const slug of s.slugs) assert.ok(slugs.has(slug), `${s.id}: ${slug}`);
});
test("mỗi bài thuộc ít nhất một mục và mỗi mục có bài", () => {
  assert.equal(unassignedPosts(all).length, 0);
  for (const s of BLOG_SECTIONS) assert.ok(postsInSection(s.id, all).length >= 3, s.id);
  assert.equal(sectionById("khong-co"), null);
});
test("menu Blog trỏ tới từng mục", () => {
  const header = readFileSync(new URL("../components/Header.jsx", import.meta.url), "utf8");
  for (const s of BLOG_SECTIONS) assert.ok(header.includes(`/articles?muc=${s.id}`), s.id);
});
