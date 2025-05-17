export interface Skill {
  id: string;
  name: string;
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type InterestLevel = 'Just curious' | 'Serious about learning';

export interface UserSkill extends Skill {
  level: SkillLevel | InterestLevel; 
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  teachSkills: UserSkill[];
  learnSkills: UserSkill[];
  isProfilePublic: boolean;
}

export interface Match {
  id: string;
  user: Pick<UserProfile, 'id' | 'name' | 'profilePictureUrl' | 'bio'>;
  matchingTeachSkills: Skill[]; // Skills the matched user can teach you
  matchingLearnSkills: Skill[]; // Skills you can teach the matched user
}

export type PairingRequestStatus = 'pending' | 'accepted' | 'declined' | 'cancelled';

export interface PairingRequest {
  id: string;
  user: Pick<UserProfile, 'id' | 'name' | 'profilePictureUrl'>;
  skill: Skill; 
  message?: string;
  status: PairingRequestStatus;
  timestamp: string; // ISO date string
  type: 'incoming' | 'outgoing';
  requestedSkillFocus: string; 
}

export const predefinedSkills: Skill[] = [
  { id: 'ps1', name: 'JavaScript' },
  { id: 'ps2', name: 'Python' },
  { id: 'ps3', name: 'Graphic Design' },
  { id: 'ps4', name: 'Yoga' },
  { id: 'ps5', name: 'Cooking' },
  { id: 'ps6', name: 'Music Production' },
  { id: 'ps7', name: 'Creative Writing' },
  { id: 'ps8', name: 'Data Analysis' },
];

export const proficiencyLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
export const interestLevels: InterestLevel[] = ['Just curious', 'Serious about learning'];
