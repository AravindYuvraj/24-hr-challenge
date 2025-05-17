
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/hooks/use-auth-store";
import { predefinedSkills, proficiencyLevels, interestLevels, type UserProfile as UserProfileType, type UserSkill, type SkillLevel, type InterestLevel } from "@/types";
import { SkillTag } from "./SkillTag";
import { PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

// Combine proficiency and interest levels for Zod enum validation
const allPossibleLevels = [...proficiencyLevels, ...interestLevels] as const;

const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Skill name is required."),
  level: z.enum(allPossibleLevels, { errorMap: () => ({ message: "Please select a valid level." }) }),
});

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  profilePictureUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  bio: z.string().max(200, { message: "Bio must not exceed 200 characters." }).optional(),
  location: z.string().optional(),
  timezone: z.string().optional(),
  teachSkills: z.array(skillSchema).max(3, "You can add up to 3 skills to teach."),
  learnSkills: z.array(skillSchema).max(3, "You can add up to 3 skills to learn."),
  isProfilePublic: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { user, updateUserProfile } = useAuthStore();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      profilePictureUrl: user?.profilePictureUrl || "",
      bio: user?.bio || "",
      location: user?.location || "",
      timezone: user?.timezone || "",
      teachSkills: user?.teachSkills ? user.teachSkills.map(skill => ({
        id: skill.id,
        name: skill.name,
        level: skill.level as typeof allPossibleLevels[number], 
      })) : [],
      learnSkills: user?.learnSkills ? user.learnSkills.map(skill => ({
        id: skill.id,
        name: skill.name,
        level: skill.level as typeof allPossibleLevels[number], 
      })) : [],
      isProfilePublic: user?.isProfilePublic ?? true,
    },
  });

  const { fields: teachFields, append: appendTeach, remove: removeTeach } = useFieldArray({
    control: form.control,
    name: "teachSkills",
  });

  const { fields: learnFields, append: appendLearn, remove: removeLearn } = useFieldArray({
    control: form.control,
    name: "learnSkills",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile update data:", data);
    if (user) {
      const profileToUpdate: Partial<UserProfileType> = {
        ...data,
        teachSkills: data.teachSkills.map(s => ({...s, level: s.level as SkillLevel | InterestLevel})),
        learnSkills: data.learnSkills.map(s => ({...s, level: s.level as SkillLevel | InterestLevel})),
      };
      updateUserProfile(profileToUpdate);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });
    }
  }
  
  // For new skill selection
  const [selectedPredefinedTeachSkillId, setSelectedPredefinedTeachSkillId] = React.useState("");
  const [newCustomTeachSkillName, setNewCustomTeachSkillName] = React.useState("");
  const [newTeachLevel, setNewTeachLevel] = React.useState<string>(""); 
  
  const [selectedPredefinedLearnSkillId, setSelectedPredefinedLearnSkillId] = React.useState("");
  const [newCustomLearnSkillName, setNewCustomLearnSkillName] = React.useState("");
  const [newLearnLevel, setNewLearnLevel] = React.useState<string>("");

  const handleAddTeachSkill = () => {
    if (teachFields.length >= 3) {
      toast({ title: "Limit Reached", description: "You can add a maximum of 3 teach skills.", variant: "destructive" });
      return;
    }

    let skillToAdd: { id: string; name: string; level: string } | null = null;

    if (newCustomTeachSkillName.trim() && newTeachLevel) {
      skillToAdd = {
        id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // Unique ID for custom skill
        name: newCustomTeachSkillName.trim(),
        level: newTeachLevel,
      };
    } else if (selectedPredefinedTeachSkillId && newTeachLevel) {
      const predefined = predefinedSkills.find(s => s.id === selectedPredefinedTeachSkillId);
      if (predefined) {
        skillToAdd = {
          id: predefined.id,
          name: predefined.name,
          level: newTeachLevel,
        };
      }
    }

    if (skillToAdd) {
      if (teachFields.some(sf => sf.name.toLowerCase() === skillToAdd!.name.toLowerCase())) {
          toast({ title: "Duplicate Skill", description: `"${skillToAdd.name}" is already in your teach list.`, variant: "destructive" });
          return;
      }
      appendTeach({ id: skillToAdd.id, name: skillToAdd.name, level: skillToAdd.level as typeof allPossibleLevels[number] });
      setNewCustomTeachSkillName("");
      setSelectedPredefinedTeachSkillId("");
      setNewTeachLevel("");
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please provide a skill (custom or predefined) and select a proficiency level.",
        variant: "destructive",
      });
    }
  };

  const handleAddLearnSkill = () => {
    if (learnFields.length >= 3) {
      toast({ title: "Limit Reached", description: "You can add a maximum of 3 learn skills.", variant: "destructive" });
      return;
    }
    
    let skillToAdd: { id: string; name: string; level: string } | null = null;

    if (newCustomLearnSkillName.trim() && newLearnLevel) {
      skillToAdd = {
        id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: newCustomLearnSkillName.trim(),
        level: newLearnLevel,
      };
    } else if (selectedPredefinedLearnSkillId && newLearnLevel) {
      const predefined = predefinedSkills.find(s => s.id === selectedPredefinedLearnSkillId);
      if (predefined) {
        skillToAdd = {
          id: predefined.id,
          name: predefined.name,
          level: newLearnLevel,
        };
      }
    }

    if (skillToAdd) {
      if (learnFields.some(sf => sf.name.toLowerCase() === skillToAdd!.name.toLowerCase())) {
        toast({ title: "Duplicate Skill", description: `"${skillToAdd.name}" is already in your learn list.`, variant: "destructive" });
        return;
      }
      appendLearn({ id: skillToAdd.id, name: skillToAdd.name, level: skillToAdd.level as typeof allPossibleLevels[number]});
      setNewCustomLearnSkillName("");
      setSelectedPredefinedLearnSkillId("");
      setNewLearnLevel("");
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please provide a skill (custom or predefined) and select an interest level.",
        variant: "destructive",
      });
    }
  };


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">Manage Your Profile</CardTitle>
        <CardDescription>Update your personal information and skills to help others find you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Basic Information</h3>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Image 
                  src={form.watch("profilePictureUrl") || "https://placehold.co/100x100.png"} 
                  alt={user?.name || "User"} 
                  width={100} 
                  height={100} 
                  className="rounded-full aspect-square object-cover flex-shrink-0"
                  data-ai-hint={user?.dataAiHint || "person placeholder"}
                />
                 <FormField
                  control={form.control}
                  name="profilePictureUrl"
                  render={({ field }) => (
                    <FormItem className="flex-grow w-full">
                      <FormLabel>Profile Picture URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/your-image.png" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio / Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us a little about yourself (max 200 characters)" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., City, Country" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Zone</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., PST, GMT+2" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Skills You Can Teach Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Skills You Can Teach (Max 3)</h3>
               <div className="space-y-2">
                {teachFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 p-2 border rounded-md bg-secondary/30">
                    <SkillTag skill={field as UserSkill} variant="teach" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTeach(index)} className="ml-auto text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {teachFields.length < 3 && (
                <div className="flex flex-col gap-3 p-3 border rounded-md border-dashed">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    <div>
                      <Label htmlFor="selectedPredefinedTeachSkillId">Select Predefined Skill</Label>
                      <Select value={selectedPredefinedTeachSkillId} onValueChange={setSelectedPredefinedTeachSkillId} disabled={!!newCustomTeachSkillName}>
                        <SelectTrigger id="selectedPredefinedTeachSkillId">
                          <SelectValue placeholder="Choose from list" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedSkills.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="newCustomTeachSkillName">Or Enter Custom Skill</Label>
                      <Input 
                        id="newCustomTeachSkillName" 
                        placeholder="e.g., Advanced Figma" 
                        value={newCustomTeachSkillName}
                        onChange={(e) => setNewCustomTeachSkillName(e.target.value)}
                        disabled={!!selectedPredefinedTeachSkillId}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newTeachLevel">Proficiency Level</Label>
                    <Select value={newTeachLevel} onValueChange={setNewTeachLevel}>
                      <SelectTrigger id="newTeachLevel" className="w-full">
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" onClick={handleAddTeachSkill} variant="outline" className="w-full mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Teach Skill
                  </Button>
                </div>
              )}
               <FormMessage>{form.formState.errors.teachSkills?.message || form.formState.errors.teachSkills?.root?.message}</FormMessage>
            </div>
            
            <Separator />

            {/* Skills You Want to Learn Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Skills You Want to Learn (Max 3)</h3>
              <div className="space-y-2">
                {learnFields.map((field, index) => (
                   <div key={field.id} className="flex items-center gap-2 p-2 border rounded-md bg-secondary/30">
                    <SkillTag skill={field as UserSkill} variant="learn" />
                     <Button type="button" variant="ghost" size="icon" onClick={() => removeLearn(index)} className="ml-auto text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {learnFields.length < 3 && (
                 <div className="flex flex-col gap-3 p-3 border rounded-md border-dashed">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    <div>
                      <Label htmlFor="selectedPredefinedLearnSkillId">Select Predefined Skill</Label>
                      <Select value={selectedPredefinedLearnSkillId} onValueChange={setSelectedPredefinedLearnSkillId} disabled={!!newCustomLearnSkillName}>
                        <SelectTrigger id="selectedPredefinedLearnSkillId">
                          <SelectValue placeholder="Choose from list" />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedSkills.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="newCustomLearnSkillName">Or Enter Custom Skill</Label>
                      <Input 
                        id="newCustomLearnSkillName" 
                        placeholder="e.g., Beginner Node.js" 
                        value={newCustomLearnSkillName}
                        onChange={(e) => setNewCustomLearnSkillName(e.target.value)}
                        disabled={!!selectedPredefinedLearnSkillId}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newLearnLevel">Interest Level</Label>
                    <Select value={newLearnLevel} onValueChange={setNewLearnLevel}>
                      <SelectTrigger id="newLearnLevel" className="w-full">
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        {interestLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" onClick={handleAddLearnSkill} variant="outline" className="w-full mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Learn Skill
                  </Button>
                </div>
              )}
              <FormMessage>{form.formState.errors.learnSkills?.message || form.formState.errors.learnSkills?.root?.message}</FormMessage>
            </div>

            <Separator />

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Profile Settings</h3>
                <FormField
                control={form.control}
                name="isProfilePublic"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">Public Profile</FormLabel>
                        <FormDescription>
                        Allow other users to discover your profile and skills.
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            </div>


            <Button type="submit" size="lg" className="w-full md:w-auto">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

