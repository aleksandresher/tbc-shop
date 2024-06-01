"use client";
import { SessionProvider } from "next-auth/react";

interface MainProviderProps {
  session?: {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
  } | null;
  children: React.ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default MainProvider;
