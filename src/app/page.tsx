
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Users, LogIn } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-8">
      <div className="text-center mb-12">
        <Image 
          src="https://placehold.co/150x150.png?text=SkillSwap" 
          alt="SkillSwap Logo" 
          width={150} 
          height={150} 
          className="rounded-full shadow-2xl mx-auto mb-6"
          data-ai-hint="abstract logo"
        />
        <h1 className="text-5xl font-bold text-primary mb-4 tracking-tight">
          Welcome to SkillSwap!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect, learn, and share your skills with a vibrant community.
          Whether you're looking to teach or eager to learn, SkillSwap is your platform for growth.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/explore" className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Explore Users
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/auth/login" className="flex items-center">
            <LogIn className="mr-2 h-5 w-5" />
            Login or Register
          </Link>
        </Button>
      </div>

      <footer className="mt-20 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} SkillSwap. Built with Next.js & Firebase Studio.</p>
      </footer>
    </div>
  );
}
