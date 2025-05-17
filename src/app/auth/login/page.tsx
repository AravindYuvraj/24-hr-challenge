import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-6">
      <div className="mb-8">
        <Image src="https://placehold.co/100x100.png?text=SkillSwap" alt="SkillSwap Logo" width={100} height={100} className="rounded-full shadow-lg" data-ai-hint="abstract logo" />
      </div>
      <LoginForm />
    </div>
  );
}
