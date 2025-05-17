
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Users, LogIn, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-8">
      <div className="text-center mb-12">
        <Image
          src="/723f014c-4be0-4dd1-bd6e-cfba876674f7.png"
          alt="EduPair Logo"
          width={150}
          height={150}
          className="rounded-full shadow-2xl mx-auto mb-6"
          data-ai-hint="logo handshake book lightbulb"
          priority
        />
        <h1 className="text-5xl font-bold text-primary mb-4 tracking-tight flex items-center justify-center">
          <Sparkles className="mr-3 h-10 w-10 text-primary/80" />
          Welcome to EduPair!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join our friendly community to share your knowledge and learn new skills together.
          It's all about growing and connecting!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/explore" className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Explore Our Community
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/auth/login" className="flex items-center">
            <LogIn className="mr-2 h-5 w-5" />
            Join or Sign In
          </Link>
        </Button>
      </div>

      <footer className="mt-20 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} EduPair. Happy learning!</p>
      </footer>
    </div>
  );
}
