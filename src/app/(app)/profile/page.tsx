"use client";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { useAuthStore } from "@/hooks/use-auth-store";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div className="flex items-center justify-center h-full"><p>Loading profile...</p></div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ProfileForm />
    </div>
  );
}
