// import { useSession } from "next-auth/react";
import EditUser from "./EditUser";
import { getUser } from "@/services/func";
import { useQuery } from "@tanstack/react-query";

export default function MyInfoPage() {
  interface UserProps {
    name: string | null;
    image: string | null;
    email: string | null;
  }

  const { data, isLoading, error } = useQuery<UserProps>({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  if (isLoading) {
    <div>is loading</div>;
  }
  if (error) {
    <div>{error.message}</div>;
  }

  return (
    <section>
      <EditUser name={data?.name} image={data?.image} email={data?.email} />
    </section>
  );
}
