import SingleBlogCard from "@/app/components/blogs/SingleBlogCard";

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/blog/getall");
  const blogs = await response.json();
  console.log("blogs on page", blogs);

  return blogs?.blogs?.map((blog: any) => ({
    id: blog.id.toString(),
  }));
}

export default function SingleBlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <SingleBlogCard id={id} />;
}
