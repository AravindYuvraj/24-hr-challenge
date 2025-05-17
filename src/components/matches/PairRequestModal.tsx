"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Match, Skill } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface PairRequestModalProps {
  match: Match;
  children: React.ReactNode; // Trigger element
}

export function PairRequestModal({ match, children }: PairRequestModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [message, setMessage] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const { toast } = useToast();

  const userToRequest = match.user;
  // Combine skills they can teach you and skills you can teach them for selection
  const availableSkills: { type: 'teach' | 'learn', skill: Skill }[] = [
    ...match.matchingTeachSkills.map(s => ({ type: 'teach' as 'teach', skill: s })),
    ...match.matchingLearnSkills.map(s => ({ type: 'learn' as 'learn', skill: s })),
  ];


  const handleSubmit = () => {
    if (!selectedSkill) {
      toast({
        title: "Error",
        description: "Please select a skill to focus on.",
        variant: "destructive",
      });
      return;
    }
    // Simulate sending request
    console.log({
      recipientId: userToRequest.id,
      skillId: selectedSkill,
      message,
      preferredTime,
    });
    toast({
      title: "Request Sent!",
      description: `Your pairing request to ${userToRequest.name} regarding ${availableSkills.find(s=>s.skill.id === selectedSkill)?.skill.name} has been sent.`,
    });
    setIsOpen(false);
    setSelectedSkill("");
    setMessage("");
    setPreferredTime("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle>Request to Pair with {userToRequest.name}</DialogTitle>
          <DialogDescription>
            Specify the skill and your availability.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skill" className="text-right">
              Skill Focus
            </Label>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger id="skill" className="col-span-3">
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                {availableSkills.map(({ type, skill }) => (
                  <SelectItem key={`${type}-${skill.id}`} value={skill.id}>
                    {skill.name} ({type === 'teach' ? `${userToRequest.name} teaches` : `You teach ${userToRequest.name}`})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional: Add a brief message (max 300 chars)"
              maxLength={300}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timeframe" className="text-right">
              Availability
            </Label>
            <Input
              id="timeframe"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              placeholder="e.g., Weekday evenings, Weekend mornings"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Send Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
