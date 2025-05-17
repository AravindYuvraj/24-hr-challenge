"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { UserSkill } from "@/types";

interface SkillTagProps {
  skill: UserSkill;
  onRemove?: (skillId: string) => void;
  variant?: "default" | "secondary" | "destructive" | "outline" | "learn" | "teach";
  className?: string;
}

export function SkillTag({ skill, onRemove, variant = "default", className }: SkillTagProps) {
  const badgeVariant = variant === "learn" ? "secondary" : variant === "teach" ? "default" : variant;
  
  return (
    <Badge variant={badgeVariant} className={`flex items-center gap-1 text-sm py-1 px-3 shadow-sm ${className}`}>
      <span>{skill.name} <span className="text-xs opacity-75">({skill.level})</span></span>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 ml-1 -mr-1"
          onClick={() => onRemove(skill.id)}
          aria-label={`Remove skill ${skill.name}`}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </Badge>
  );
}
