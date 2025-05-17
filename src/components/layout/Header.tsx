
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2, Bell } from "lucide-react";
import { siteConfig, type NavItem } from "@/config/site";
import { useAuthStore } from "@/hooks/use-auth-store";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"; // Added import

interface HeaderProps {
  sidebarNavItems?: NavItem[];
}

export function Header({ sidebarNavItems = siteConfig.sidebarNav }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast(); // Added toast

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const handleNotifications = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Notifications are not yet implemented.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The settings page is not yet implemented.",
    });
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 shadow-sm">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base text-primary"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">{siteConfig.name}</span>
          {siteConfig.name}
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-card">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold text-primary"
            >
              <Package2 className="h-6 w-6" />
              <span>{siteConfig.name}</span>
            </Link>
            {sidebarNavItems.map((item) => item.href && (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              )
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleNotifications}>
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <UserAvatar user={user} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettings}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
