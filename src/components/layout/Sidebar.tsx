"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig, type NavItem } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Package2 } from "lucide-react";

interface SidebarProps {
  navItems?: NavItem[];
  className?: string;
}

export function Sidebar({ navItems = siteConfig.sidebarNav, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("hidden border-r bg-card md:block", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-primary">
            <Package2 className="h-6 w-6" />
            <span>{siteConfig.name}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => item.href && (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: pathname === item.href ? "default" : "ghost" , size: "default" }),
                    "justify-start gap-2",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                  aria-disabled={item.disabled}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.title}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
