
"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Added usePathname
import { useAuthStore } from "@/hooks/use-auth-store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated, user } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }));
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else if (user && !user.profileSetupComplete && pathname !== '/profile/setup') {
      // If authenticated, user exists, setup is not complete, and not already on setup page
      router.push('/profile/setup');
    }
  }, [isAuthenticated, user, router, pathname]);

  // If redirecting or initial load before user state is confirmed
  if (!isAuthenticated || (user && !user.profileSetupComplete && pathname !== '/profile/setup')) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If on setup page, potentially show a more focused layout in future. For now, uses full layout.
  // const isSetupPage = pathname === '/profile/setup';

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navItems={siteConfig.sidebarNav} />
      <div className="flex flex-col">
        <Header sidebarNavItems={siteConfig.sidebarNav} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
