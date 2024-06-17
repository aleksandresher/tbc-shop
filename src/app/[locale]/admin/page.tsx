import BlogCreator from "@/app/components/admin/BlogCreator";
import BlogList from "@/app/components/admin/BlogList";
export default function AdminPage() {
  return (
    <div>
      Admin Page
      <BlogCreator />
      <BlogList />
    </div>
  );
}
