
import { RegisterForm } from "@/components/auth/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-6">
      <div className="mb-8">
        <Image 
          src="/723f014c-4be0-4dd1-bd6e-cfba876674f7.png" 
          alt="EduPair Logo" 
          width={100} 
          height={100} 
          className="rounded-full shadow-lg" 
          data-ai-hint="logo handshake book lightbulb"
          priority
        />
      </div>
      <RegisterForm />
    </div>
  );
}
