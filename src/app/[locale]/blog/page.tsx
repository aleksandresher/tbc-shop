import BlogListMain from "@/app/components/blogs/BlogListMain";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function BlogPage() {
  const response = await fetch(`${URL}/api/blog/getall`);
  const blogs = await response.json();

  return <BlogListMain data={blogs.blogs} />;
}
