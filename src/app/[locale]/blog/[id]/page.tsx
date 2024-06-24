import SingleBlogCard from "@/app/components/blogs/SingleBlogCard";
import { loadSingleBlog } from "@/services/func";
import { ResolvingMetadata, Metadata } from "next";
import { getAllBlog } from "@/services/func";
const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface Props {
  params: { id: string; locale: string };
}

export async function generateStaticParams() {
  try {
    const response = await getAllBlog();
    console.log(JSON.stringify(response));
    if (!Array.isArray(response)) {
      throw new Error("Invalid response format: expected array of blogs");
    }

    const params = response.flatMap((blog: any) => [
      { id: blog.id.toString(), locale: "en" },
      { id: blog.id.toString(), locale: "ka" },
    ]);

    return params;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  try {
    const blog = await loadSingleBlog({ id });

    if (!blog || !blog[0]) {
      throw new Error(`Blog with id ${id} not found`);
    }

    return {
      title: blog[0]?.title,
    };
  } catch (error) {
    console.error("Error loading single blog:", error);
    return {
      title: "Blog not found",
    };
  }
}

export default function SingleBlogPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const { id, locale } = params;
  return (
    <section>
      <SingleBlogCard id={id} locale={locale} />
    </section>
  );
}
