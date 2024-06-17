import BlogListMain from "@/app/components/blogs/BlogListMain";

export default async function BlogPage() {
  const response = await fetch("http://localhost:3000/api/blog/getall");
  const blogs = await response.json();
  console.log("blogs on page", blogs);
  return <BlogListMain data={blogs.blogs} />;
}
