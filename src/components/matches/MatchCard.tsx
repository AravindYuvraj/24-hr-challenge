
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { Match, Skill } from "@/types";
import { SkillTag } from "@/components/profile/SkillTag";
import { PairRequestModal } from "./PairRequestModal";
import { Zap, BookOpen, Handshake } from "lucide-react"; // Added Handshake

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const { user, matchingTeachSkills, matchingLearnSkills } = match;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <UserAvatar user={{...user, dataAiHint: user.dataAiHint || 'person portrait'}} className="h-16 w-16" />
        <div className="flex-grow">
          <CardTitle className="text-2xl text-primary">{user.name}</CardTitle>
          {user.bio && <CardDescription className="mt-1 text-sm line-clamp-2">{user.bio}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {matchingTeachSkills.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold mb-1 text-foreground/80 flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-accent" /> They can share:
            </h4>
            <div className="flex flex-wrap gap-2">
              {matchingTeachSkills.map((skill) => (
                <SkillTag key={`teach-${skill.id}`} skill={{...skill, level: 'Teach' as any}} variant="teach" />
              ))}
            </div>
          </div>
        )}
        {matchingLearnSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-1 text-foreground/80 flex items-center">
              <Zap className="h-4 w-4 mr-2 text-accent" /> You can share:
            </h4>
            <div className="flex flex-wrap gap-2">
              {matchingLearnSkills.map((skill) => (
                <SkillTag key={`learn-${skill.id}`} skill={{...skill, level: 'Learn' as any}} variant="learn" />
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <PairRequestModal match={match}>
          <Button className="w-full" variant="default">
            <Handshake className="mr-2 h-4 w-4" />
            Connect & Learn Together
          </Button>
        </PairRequestModal>
      </CardFooter>
    </Card>
  );
}
