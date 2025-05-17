"use client";

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
import type { UserProfile as UserProfileType, UserSkill } from "@/types";
import { predefinedSkills, proficiencyLevels, interestLevels } from "@/types";
import { SkillTag } from "./SkillTag";
import { PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Skill name is required."),
  level: z.string().min(1, "Level is required."),
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
      teachSkills: user?.teachSkills || [],
      learnSkills: user?.learnSkills || [],
      isProfilePublic: user?.isProfilePublic || true,
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
      updateUserProfile(data as Partial<UserProfileType>);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });
    }
  }
  
  // For new skill selection
  const [newTeachSkill, setNewTeachSkill] = React.useState("");
  const [newTeachLevel, setNewTeachLevel] = React.useState<string>("");
  const [newLearnSkill, setNewLearnSkill] = React.useState("");
  const [newLearnLevel, setNewLearnLevel] = React.useState<string>("");

  const handleAddTeachSkill = () => {
    if (newTeachSkill && newTeachLevel && teachFields.length < 3) {
      const skillToAdd = predefinedSkills.find(s => s.id === newTeachSkill) || { id: newTeachSkill, name: newTeachSkill };
      appendTeach({ id: skillToAdd.id, name: skillToAdd.name, level: newTeachLevel });
      setNewTeachSkill("");
      setNewTeachLevel("");
    }
  };

  const handleAddLearnSkill = () => {
    if (newLearnSkill && newLearnLevel && learnFields.length < 3) {
      const skillToAdd = predefinedSkills.find(s => s.id === newLearnSkill) || { id: newLearnSkill, name: newLearnSkill };
      appendLearn({ id: skillToAdd.id, name: skillToAdd.name, level: newLearnLevel });
      setNewLearnSkill("");
      setNewLearnLevel("");
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
              <div className="flex items-center gap-4">
                <Image 
                  src={form.watch("profilePictureUrl") || "https://placehold.co/100x100.png"} 
                  alt={user?.name || "User"} 
                  width={100} 
                  height={100} 
                  className="rounded-full aspect-square object-cover"
                  data-ai-hint={user?.dataAiHint || "person placeholder"}
                />
                 <FormField
                  control={form.control}
                  name="profilePictureUrl"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Profile Picture URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/your-image.png" {...field} />
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
                      <Textarea placeholder="Tell us a little about yourself (max 200 characters)" {...field} />
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
                        <Input placeholder="e.g., City, Country" {...field} />
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
                        <Input placeholder="e.g., PST, GMT+2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

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
                <div className="flex flex-col md:flex-row gap-2 items-end p-3 border rounded-md border-dashed">
                  <div className="flex-grow w-full md:w-auto">
                    <Label htmlFor="newTeachSkill">Skill Name</Label>
                    <Select value={newTeachSkill} onValueChange={setNewTeachSkill}>
                      <SelectTrigger id="newTeachSkill">
                        <SelectValue placeholder="Select or type a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedSkills.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {/* Add input for custom skill if needed */}
                  </div>
                  <div className="flex-grow w-full md:w-auto">
                     <Label htmlFor="newTeachLevel">Proficiency</Label>
                    <Select value={newTeachLevel} onValueChange={setNewTeachLevel}>
                      <SelectTrigger id="newTeachLevel">
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" onClick={handleAddTeachSkill} variant="outline" className="w-full md:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Teach Skill
                  </Button>
                </div>
              )}
               <FormMessage>{form.formState.errors.teachSkills?.message || form.formState.errors.teachSkills?.root?.message}</FormMessage>
            </div>
            
            <Separator />

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
                <div className="flex flex-col md:flex-row gap-2 items-end p-3 border rounded-md border-dashed">
                   <div className="flex-grow w-full md:w-auto">
                     <Label htmlFor="newLearnSkill">Skill Name</Label>
                    <Select value={newLearnSkill} onValueChange={setNewLearnSkill}>
                      <SelectTrigger id="newLearnSkill">
                        <SelectValue placeholder="Select or type a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedSkills.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-grow w-full md:w-auto">
                    <Label htmlFor="newLearnLevel">Interest Level</Label>
                    <Select value={newLearnLevel} onValueChange={setNewLearnLevel}>
                      <SelectTrigger id="newLearnLevel">
                        <SelectValue placeholder="Select interest" />
                      </SelectTrigger>
                      <SelectContent>
                        {interestLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" onClick={handleAddLearnSkill} variant="outline" className="w-full md:w-auto">
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
