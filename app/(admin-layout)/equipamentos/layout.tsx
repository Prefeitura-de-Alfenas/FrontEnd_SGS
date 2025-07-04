import { ReactNode } from "react";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import Header from "@/components/header/Header";
import { authOptions } from "@/utils/authOptions";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";
import { Admin } from "@/utils/dataRole";
interface PrivaceLayoutProps {
  children: ReactNode;
}

export default async function PrivacyLayout({ children }: PrivaceLayoutProps) {
  const session = await getServerSession(authOptions);
 
 
  if(!session) {
    redirect('/')
  }
  const userWithRole = session.user as { role?: string[]; name?: string | null; email?: string | null; image?: string | null };
 
  if (!userWithRole.role || !userWithRole.role.includes(Admin)) {
    redirect("/pessoas");
  }

 
  return (
    <>
      
      {children}
    </>
  );
}
