import SignUp from "@/app/components/authorization/SignUp";

export default function RegisterPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <section>
      <SignUp locale={params.locale} />
    </section>
  );
}
