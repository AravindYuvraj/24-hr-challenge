
import { LayoutDashboard, UserCircle, Mail, CalendarDays, Search, Users, Settings, LucideIcon, BarChartBig } from 'lucide-react'; // Added Users and BarChartBig

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
};

export const siteConfig = {
  name: "SkillSwap",
  description: "Peer-to-peer skill exchange platform.",
  url: "https://skillswap.example.com", // Replace with your actual URL
  ogImage: "https://skillswap.example.com/og.jpg", // Replace with your actual OG image URL
  mainNav: [
    // For logged out users or general site nav if any
    { title: "Explore Users", href: "/explore", icon: Users },
  ] satisfies NavItem[],
  sidebarNav: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Profile", href: "/profile", icon: UserCircle },
    { title: "Pairing Requests", href: "/requests", icon: Mail },
    { title: "Calendar", href: "/calendar", icon: CalendarDays, disabled: false },
    { title: "Analytics", href: "/analytics", icon: BarChartBig, disabled: false },
  ] satisfies NavItem[],
  settingsNav: [
    // { title: "Account", href: "/settings/account", icon: Settings },
    // { title: "Notifications", href: "/settings/notifications", icon: BellIcon },
  ] satisfies NavItem[],
};
