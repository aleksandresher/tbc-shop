"use client";
import { useSession } from "next-auth/react";
import ProfileButton from "../profile/ProfileButton";
import SignIn from "./SignIn";

export default function AuthorizationWrapper({ locale }: { locale: string }) {
  const { data, status } = useSession();

  if (status === "loading") {
    // Render a loading state while the session is being determined
    return <div className="w-[32px] h-[32px]"></div>;
  }

  if (data?.user) {
    return <ProfileButton locale={locale} />;
  } else {
    return <SignIn locale={locale} />;
  }
}
