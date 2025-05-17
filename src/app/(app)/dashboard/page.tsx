
"use client";

import { MatchCard } from "@/components/matches/MatchCard";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // Removed
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Removed
// import { Filter, Search } from "lucide-react"; // Removed
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/use-auth-store";
import { mockUserProfiles } from "@/lib/mockData";
import type { UserProfile, Match, Skill as AppSkill } from "@/types";
import React, { useEffect, useState } from "react";

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const potentialMatchProfiles = mockUserProfiles.filter(
      (profile) => profile.id !== currentUser.id
    );

    const generatedMatches: Match[] = [];

    potentialMatchProfiles.forEach((potentialProfile) => {
      const matchingTeachSkills: AppSkill[] = [];
      potentialProfile.teachSkills.forEach((teachSkill) => {
        if (
          currentUser.learnSkills.some(
            (learnSkill) => learnSkill.name.toLowerCase() === teachSkill.name.toLowerCase()
          )
        ) {
          matchingTeachSkills.push({ id: teachSkill.id, name: teachSkill.name });
        }
      });

      const matchingLearnSkills: AppSkill[] = [];
      currentUser.teachSkills.forEach((teachSkill) => {
        if (
          potentialProfile.learnSkills.some(
            (learnSkill) => learnSkill.name.toLowerCase() === teachSkill.name.toLowerCase()
          )
        ) {
          matchingLearnSkills.push({ id: teachSkill.id, name: teachSkill.name });
        }
      });

      if (matchingTeachSkills.length > 0 || matchingLearnSkills.length > 0) {
        generatedMatches.push({
          id: `match-${currentUser.id}-${potentialProfile.id}`,
          user: {
            id: potentialProfile.id,
            name: potentialProfile.name,
            profilePictureUrl: potentialProfile.profilePictureUrl,
            bio: potentialProfile.bio,
            dataAiHint: potentialProfile.dataAiHint,
          },
          matchingTeachSkills,
          matchingLearnSkills,
        });
      }
    });

    setMatches(generatedMatches);
    setIsLoading(false);
  }, [currentUser]);

  // const handleApplyFilters = () => { // Removed
  //   toast({
  //     title: "Feature Coming Soon",
  //     description: "Filter functionality is not yet implemented.",
  //   });
  // };

  if (isLoading) {
    return <div className="container mx-auto py-8 text-center"><p>Loading matches...</p></div>;
  }

  if (!currentUser) {
    return <div className="container mx-auto py-8 text-center"><p>Please login to see your matches.</p></div>;
  }
  
  if (!currentUser.profileSetupComplete) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Please complete your profile setup to see matches.</p>
        <Button className="mt-4" onClick={() => router.push("/profile/setup")}>Setup Profile</Button>
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Your Skill Matches</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Connect with users who have complementary skills.
        </p>
      </div>

      {/* Removed filter bar section */}
      {/* 
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by skill or name..." className="pl-10 w-full" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="newest">New Users</SelectItem>
            <SelectItem value="mutual">Mutual Matches</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full md:w-auto" onClick={handleApplyFilters}>
          <Filter className="mr-2 h-4 w-4" /> Apply Filters
        </Button>
      </div>
      */}

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No matches found yet.</p>
          <p className="mt-2">Try adjusting your 'Teach' or 'Learn' skills in your profile to find new connections!</p>
          <Button className="mt-4" onClick={() => router.push("/profile")}>Update Profile</Button>
        </div>
      )}
      
    </div>
  );
}
