
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { mockUserProfiles } from "@/lib/mockData";
import type { UserProfile } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillTag } from "@/components/profile/SkillTag";
import { Search, SortAlphaDown, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PublicUserCard = ({ user }: { user: UserProfile }) => {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <UserAvatar user={{...user, dataAiHint: user.dataAiHint || 'person'}} className="h-16 w-16" />
        <div className="flex-grow">
          <CardTitle className="text-2xl text-primary">{user.name}</CardTitle>
          {user.bio && <CardDescription className="mt-1 text-sm line-clamp-2">{user.bio}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        {user.teachSkills.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold mb-1 text-foreground/80">
              Can Teach:
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.teachSkills.map((skill) => (
                <SkillTag key={`teach-${skill.id}`} skill={skill} variant="teach" />
              ))}
            </div>
          </div>
        )}
        {user.learnSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-1 text-foreground/80">
              Wants to Learn:
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.learnSkills.map((skill) => (
                <SkillTag key={`learn-${skill.id}`} skill={skill} variant="learn" />
              ))}
            </div>
          </div>
        )}
        {user.teachSkills.length === 0 && user.learnSkills.length === 0 && (
          <p className="text-sm text-muted-foreground">No skills listed yet.</p>
        )}
      </CardContent>
      {/* No "Request to Pair" button for public view */}
    </Card>
  );
};


export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "default">("default");
  const [skillFilter, setSkillFilter] = useState(""); // For specific skill search

  const publicProfiles = useMemo(() => {
    return mockUserProfiles.filter(profile => profile.isProfilePublic);
  }, []);

  const filteredAndSortedProfiles = useMemo(() => {
    let profiles = [...publicProfiles];

    // Filter by general search term (name or bio)
    if (searchTerm) {
      profiles = profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specific skill (teach or learn)
    if (skillFilter) {
      profiles = profiles.filter(profile => 
        profile.teachSkills.some(s => s.name.toLowerCase().includes(skillFilter.toLowerCase())) ||
        profile.learnSkills.some(s => s.name.toLowerCase().includes(skillFilter.toLowerCase()))
      );
    }
    
    // Sort
    if (sortBy === "name") {
      profiles.sort((a, b) => a.name.localeCompare(b.name));
    }

    return profiles;
  }, [publicProfiles, searchTerm, skillFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="py-6 bg-card shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4 sm:mb-0">
            <Users className="h-7 w-7" />
            SkillSwap Explore
          </Link>
          <Button asChild variant="outline">
            <Link href="/auth/login">Login to Connect</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="search-name-bio" className="block text-sm font-medium text-muted-foreground mb-1">Search by Name or Bio</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search-name-bio"
                  placeholder="Search by name or bio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
             <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-muted-foreground mb-1">Sort by</label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as "name" | "default")}>
                <SelectTrigger id="sort-by" className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Relevance</SelectItem>
                  <SelectItem value="name"><SortAlphaDown className="inline h-4 w-4 mr-2"/>Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
           <div className="mt-4">
              <label htmlFor="search-skill" className="block text-sm font-medium text-muted-foreground mb-1">Filter by Skill (Teach or Learn)</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search-skill"
                  placeholder="e.g., Python, Yoga..."
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
        </div>

        {filteredAndSortedProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProfiles.map((profile) => (
              <PublicUserCard key={profile.id} user={profile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">No users found matching your criteria.</p>
            <p className="mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
       <footer className="py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SkillSwap. Explore, Learn, Share.</p>
      </footer>
    </div>
  );
}
