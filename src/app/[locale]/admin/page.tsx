import BlogCreator from "@/app/components/admin/BlogCreator";
import BlogList from "@/app/components/admin/BlogList";
import EditBlog from "@/app/components/admin/EditBlog";
export default function AdminPage() {
  return (
    <div>
      <BlogCreator />
      <BlogList />
    </div>
  );
}
