import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProfile } from "@/types";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: Pick<UserProfile, 'name' | 'profilePictureUrl'> & { dataAiHint?: string };
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={user.profilePictureUrl} alt={user.name} data-ai-hint={user.dataAiHint || "person"} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
