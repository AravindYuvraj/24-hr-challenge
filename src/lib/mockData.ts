
import type { UserProfile, Match, PairingRequest, Skill, UserSkill } from '@/types';

export const mockSkills: Skill[] = [
  { id: '1', name: 'Web Development' },
  { id: '2', name: 'Graphic Design' },
  { id: '3', name: 'Yoga Instruction' },
  { id: '4', name: 'Spanish Language' },
  { id: '5', name: 'Python Programming' },
  { id: '6', name: 'Creative Writing' },
];

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user1',
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    bio: 'Loves coding and teaching. Always eager to learn new things!',
    location: 'New York, USA',
    timezone: 'EST',
    teachSkills: [
      { id: '1', name: 'Web Development', level: 'Advanced' },
      { id: '5', name: 'Python Programming', level: 'Intermediate' },
    ],
    learnSkills: [
      { id: '3', name: 'Yoga Instruction', level: 'Serious about learning' },
      { id: '6', name: 'Creative Writing', level: 'Just curious' },
    ],
    isProfilePublic: true,
    profileSetupComplete: true, // Alice has completed setup
  },
  {
    id: 'user2',
    name: 'Bob The Builder',
    email: 'bob@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man smiling',
    bio: 'Passionate about design and fitness. Looking to pick up some tech skills.',
    teachSkills: [
      { id: '2', name: 'Graphic Design', level: 'Advanced' },
      { id: '3', name: 'Yoga Instruction', level: 'Intermediate' },
    ],
    learnSkills: [
      { id: '1', name: 'Web Development', level: 'Serious about learning' },
    ],
    isProfilePublic: true,
    profileSetupComplete: true, // Bob has completed setup
  },
  {
    id: 'user3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'person thinking',
    bio: 'Writer and language enthusiast. Can help with your stories!',
    teachSkills: [
      { id: '6', name: 'Creative Writing', level: 'Advanced' },
      { id: '4', name: 'Spanish Language', level: 'Advanced' },
    ],
    learnSkills: [
      { id: '5', name: 'Python Programming', level: 'Serious about learning' },
    ],
    isProfilePublic: false,
    profileSetupComplete: true, // Charlie has completed setup
  },
];

export const mockMatches: Match[] = [
  {
    id: 'match1',
    user: { id: 'user2', name: 'Bob The Builder', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'man smiling', bio: 'Passionate about design and fitness.' },
    matchingTeachSkills: [{ id: '2', name: 'Graphic Design' }, {id: '3', name: 'Yoga Instruction'}], // Bob can teach Alice Yoga
    matchingLearnSkills: [{ id: '1', name: 'Web Development' }], // Alice can teach Bob Web Dev
  },
  {
    id: 'match2',
    user: { id: 'user3', name: 'Charlie Brown', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person thinking', bio: 'Writer and language enthusiast.' },
    matchingTeachSkills: [{ id: '6', name: 'Creative Writing' }], // Charlie can teach Alice Creative Writing
    matchingLearnSkills: [{ id: '5', name: 'Python Programming' }], // Alice can teach Charlie Python
  },
];

export const mockPairingRequests: PairingRequest[] = [
  {
    id: 'req1',
    user: { id: 'user2', name: 'Bob The Builder', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'man smiling' },
    skill: { id: '3', name: 'Yoga Instruction' },
    requestedSkillFocus: 'Yoga Instruction',
    message: 'Hey Alice, I saw you want to learn Yoga. I can teach you!',
    status: 'pending',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    type: 'incoming',
  },
  {
    id: 'req2',
    user: { id: 'user3', name: 'Charlie Brown', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person thinking' },
    skill: { id: '5', name: 'Python Programming' },
    requestedSkillFocus: 'Python Programming',
    message: 'Hi Charlie, I can help you with Python. Let me know if you are interested.',
    status: 'pending',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    type: 'outgoing',
  },
  {
    id: 'req3',
    user: { id: 'user1', name: 'Alice Wonderland', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'woman portrait' },
    skill: { id: '1', name: 'Web Development' },
    requestedSkillFocus: 'Web Development',
    status: 'accepted',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    type: 'incoming',
  },
];

// Current logged-in user for demo purposes - THIS IS THE USER WHO LOGS IN
export const currentMockUser: UserProfile = mockUserProfiles[0]; // Alice, who has completed setup
