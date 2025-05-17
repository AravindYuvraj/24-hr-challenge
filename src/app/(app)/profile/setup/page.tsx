
"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { useAuthStore } from "@/hooks/use-auth-store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Sparkles } from "lucide-react"; // Added Sparkles

export default function ProfileSetupPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div className="flex items-center justify-center h-full"><p>Loading...</p></div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Alert className="mb-8 border-primary/50 text-primary bg-primary/10">
        <Sparkles className="h-5 w-5 !text-primary" /> {/* Changed Icon */}
        <AlertTitle className="font-semibold">Welcome to SkillSwap, {user.name}!</AlertTitle>
        <AlertDescription>
          Let's get your profile ready! Please share skills you can teach and skills you're excited to learn.
          This helps us connect you with amazing people in our community.
        </AlertDescription>
      </Alert>
      <ProfileForm />
    </div>
  );
}
