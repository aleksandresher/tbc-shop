import SingleBlogCard from "@/app/components/blogs/SingleBlogCard";
import { loadSingleBlog } from "@/services/func";
import { ResolvingMetadata, Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/blog/getall");
  const blogs = await response.json();
  console.log("blogs on page", blogs);

  return blogs?.blogs?.map((blog: any) => ({
    id: blog.id.toString(),
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const blog = await loadSingleBlog({ id });

  return {
    title: blog[0].title,
  };
}

export default function SingleBlogPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <SingleBlogCard id={id} />;
}
