import Login from "@/app/components/authorization/Login";
export default function LoginPage({ params }: { params: { locale: string } }) {
  return <Login locale={params.locale} />;
}
