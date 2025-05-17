
"use client";

import { MatchCard } from "@/components/matches/MatchCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ListFilter, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/use-auth-store";
import { mockUserProfiles } from "@/lib/mockData";
import type { UserProfile, Match, Skill as AppSkill } from "@/types";
import React, { useEffect, useState, useMemo } from "react";

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [skillTypeFilter, setSkillTypeFilter] = useState<"all" | "they-teach" | "you-teach">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all"); // Placeholder

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
      const matchingTeachSkills: AppSkill[] = []; // Skills potentialProfile teaches that currentUser learns
      potentialProfile.teachSkills.forEach((teachSkill) => {
        if (
          currentUser.learnSkills.some(
            (learnSkill) => learnSkill.name.toLowerCase() === teachSkill.name.toLowerCase()
          )
        ) {
          matchingTeachSkills.push({ id: teachSkill.id, name: teachSkill.name });
        }
      });

      const matchingLearnSkills: AppSkill[] = []; // Skills currentUser teaches that potentialProfile learns
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

  const filteredMatches = useMemo(() => {
    let currentFilteredMatches = [...matches];

    // Search Term Filter
    if (searchTerm) {
      currentFilteredMatches = currentFilteredMatches.filter(match => {
        const term = searchTerm.toLowerCase();
        const userNameMatch = match.user.name.toLowerCase().includes(term);
        const userBioMatch = match.user.bio?.toLowerCase().includes(term) || false;
        const teachSkillsMatch = match.matchingTeachSkills.some(skill => skill.name.toLowerCase().includes(term));
        const learnSkillsMatch = match.matchingLearnSkills.some(skill => skill.name.toLowerCase().includes(term));
        return userNameMatch || userBioMatch || teachSkillsMatch || learnSkillsMatch;
      });
    }

    // Skill Type Filter
    if (skillTypeFilter === "they-teach") {
      currentFilteredMatches = currentFilteredMatches.filter(match => match.matchingTeachSkills.length > 0);
    } else if (skillTypeFilter === "you-teach") {
      currentFilteredMatches = currentFilteredMatches.filter(match => match.matchingLearnSkills.length > 0);
    }

    // Category Filter (Placeholder - actual filtering requires data model changes)
    if (categoryFilter !== "all") {
      // Placeholder: console.log("Category filter selected:", categoryFilter, "Actual filtering needs data model update.");
      // To make this functional, skills would need a 'category' property,
      // and this logic would check against that.
    }

    return currentFilteredMatches;
  }, [matches, searchTerm, skillTypeFilter, categoryFilter]);


  if (isLoading) {
    return <div className="container mx-auto py-8 text-center"><p>Finding skill connections for you...</p></div>;
  }

  if (!currentUser) {
    return <div className="container mx-auto py-8 text-center"><p>Please login to see your skill connections.</p></div>;
  }
  
  if (!currentUser.profileSetupComplete) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Let's set up your profile to find skill connections!</p>
        <Button className="mt-4" onClick={() => router.push("/profile/setup")}>Setup Profile</Button>
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Discover Skill Connections</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          People you can learn from and teach, based on your skills.
        </p>
      </div>
      
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by skill, name, or bio..." 
            className="pl-10 w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={skillTypeFilter} onValueChange={(value) => setSkillTypeFilter(value as "all" | "they-teach" | "you-teach")}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Skill Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skill Connections</SelectItem>
            <SelectItem value="they-teach">They Teach You</SelectItem>
            <SelectItem value="you-teach">You Teach Them</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            {/* Note: Actual category filtering requires skills to have a category property in the data model. */}
          </SelectContent>
        </Select>
      </div>

      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">No connections found for your current filters.</p>
          <p className="mt-2">Try adjusting your search, filters, or update your 'Teach' or 'Learn' skills in your profile!</p>
          <Button className="mt-4" onClick={() => router.push("/profile")}>Update Profile</Button>
        </div>
      )}
      
    </div>
  );
}
