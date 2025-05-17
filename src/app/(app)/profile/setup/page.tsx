
"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { useAuthStore } from "@/hooks/use-auth-store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function ProfileSetupPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div className="flex items-center justify-center h-full"><p>Loading...</p></div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Alert className="mb-8 border-primary/50 text-primary bg-primary/10">
        <Info className="h-5 w-5 !text-primary" />
        <AlertTitle className="font-semibold">Welcome to SkillSwap, {user.name}!</AlertTitle>
        <AlertDescription>
          Please set up your profile by selecting skills you can teach and skills you want to learn.
          This will help us find the best matches for you.
        </AlertDescription>
      </Alert>
      <ProfileForm />
    </div>
  );
}
