"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <p>Loading dashboard...</p>
      </div>
    ); 
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-6">
      <main className="container mx-auto flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <Image src="https://placehold.co/150x150.png?text=SkillSwap" alt="SkillSwap Logo" width={150} height={150} className="rounded-full shadow-lg" data-ai-hint="abstract logo" />
        </div>
        <h1 className="mb-6 text-5xl font-bold text-primary sm:text-6xl md:text-7xl">
          Welcome to SkillSwap
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-foreground/80 sm:text-xl">
          Teach what you know, learn what you don't. Connect with peers, exchange skills, and grow together on SkillSwap.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button asChild size="lg" className="shadow-md transition-transform hover:scale-105">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-md transition-transform hover:scale-105">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Explore a new way of learning.
        </p>
      </main>
    </div>
  );
}
