
import type { UserProfile, Match, PairingRequest, Skill, UserSkill } from '@/types';

// Using predefined skills for IDs and names where appropriate for consistency
export const mockSkills: Skill[] = [
  { id: 'ps1', name: 'JavaScript' },
  { id: 'ps2', name: 'Python' },
  { id: 'ps3', name: 'Graphic Design' },
  { id: 'ps4', name: 'Yoga' },
  { id: 'ps5', name: 'Cooking' },
  { id: 'ps6', name: 'Music Production' },
  { id: 'ps7', name: 'Creative Writing' },
  { id: 'ps8', name: 'Data Analysis' },
];

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user1', // Alice - often the currentMockUser
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    bio: 'Loves coding and teaching. Always eager to learn new things!',
    location: 'New York, USA',
    timezone: 'EST',
    teachSkills: [
      { id: 'ps1', name: 'JavaScript', level: 'Advanced' },
      { id: 'ps2', name: 'Python', level: 'Intermediate' },
    ],
    learnSkills: [
      { id: 'ps4', name: 'Yoga', level: 'Serious about learning' },
      { id: 'ps7', name: 'Creative Writing', level: 'Just curious' },
    ],
    isProfilePublic: true,
    profileSetupComplete: true,
  },
  {
    id: 'user2', // Bob
    name: 'Bob The Builder',
    email: 'bob@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man smiling',
    bio: 'Passionate about design and fitness. Looking to pick up some tech skills.',
    teachSkills: [
      { id: 'ps3', name: 'Graphic Design', level: 'Advanced' },
      { id: 'ps4', name: 'Yoga', level: 'Intermediate' },
    ],
    learnSkills: [
      { id: 'ps1', name: 'JavaScript', level: 'Serious about learning' },
      { id: 'ps8', name: 'Data Analysis', level: 'Just curious'},
    ],
    isProfilePublic: true,
    profileSetupComplete: true,
  },
  {
    id: 'user3', // Charlie
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'person thinking',
    bio: 'Writer and language enthusiast. Can help with your stories!',
    teachSkills: [
      { id: 'ps7', name: 'Creative Writing', level: 'Advanced' },
      { id: 'ps5', name: 'Cooking', level: 'Advanced' },
    ],
    learnSkills: [
      { id: 'ps2', name: 'Python', level: 'Serious about learning' },
      { id: 'ps6', name: 'Music Production', level: 'Intermediate'},
    ],
    isProfilePublic: false,
    profileSetupComplete: true,
  },
  {
    id: 'user4', // Dana - New user for more variety
    name: 'Dana Scully',
    email: 'dana@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman scientist',
    bio: 'Analytical mind, enjoys learning new practical skills.',
    teachSkills: [
      { id: 'ps8', name: 'Data Analysis', level: 'Advanced' },
      { id: 'custom1', name: 'Research Methods', level: 'Advanced'},
    ],
    learnSkills: [
      { id: 'ps5', name: 'Cooking', level: 'Serious about learning' },
      { id: 'ps3', name: 'Graphic Design', level: 'Just curious'},
    ],
    isProfilePublic: true,
    profileSetupComplete: true,
  }
];

// currentMockUser (Alice)
// Teaches: JavaScript (ps1), Python (ps2)
// Learns: Yoga (ps4), Creative Writing (ps7)

// This mockMatches is less important now that the dashboard generates matches dynamically,
// but can be kept for reference or testing other components if needed.
// For Alice (currentMockUser):
// Match with Bob:
//   Alice learns Yoga (ps4) from Bob. Bob teaches Yoga (ps4).
//   Bob learns JavaScript (ps1) from Alice. Alice teaches JavaScript (ps1).
// Match with Charlie:
//   Alice learns Creative Writing (ps7) from Charlie. Charlie teaches Creative Writing (ps7).
//   Charlie learns Python (ps2) from Alice. Alice teaches Python (ps2).
export const mockMatches: Match[] = [
  {
    id: 'match-alice-bob',
    user: { id: 'user2', name: 'Bob The Builder', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'man smiling', bio: 'Passionate about design and fitness.' },
    matchingTeachSkills: [{ id: 'ps4', name: 'Yoga' }], // Bob teaches Alice Yoga
    matchingLearnSkills: [{ id: 'ps1', name: 'JavaScript' }], // Alice teaches Bob JavaScript
  },
  {
    id: 'match-alice-charlie',
    user: { id: 'user3', name: 'Charlie Brown', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person thinking', bio: 'Writer and language enthusiast.' },
    matchingTeachSkills: [{ id: 'ps7', name: 'Creative Writing' }], // Charlie teaches Alice Creative Writing
    matchingLearnSkills: [{ id: 'ps2', name: 'Python' }], // Alice teaches Charlie Python
  },
];


export const mockPairingRequests: PairingRequest[] = [
  {
    id: 'req1',
    user: { id: 'user2', name: 'Bob The Builder', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'man smiling' },
    skill: { id: 'ps4', name: 'Yoga' }, // Bob offering Yoga to Alice
    requestedSkillFocus: 'Yoga',
    message: 'Hey Alice, I saw you want to learn Yoga. I can teach you!',
    status: 'pending',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    type: 'incoming', // This would be incoming for Alice
  },
  {
    id: 'req2',
    user: { id: 'user3', name: 'Charlie Brown', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'person thinking' },
    skill: { id: 'ps2', name: 'Python' }, // Alice offering Python to Charlie
    requestedSkillFocus: 'Python',
    message: 'Hi Charlie, I can help you with Python. Let me know if you are interested.',
    status: 'pending',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    type: 'outgoing', // This would be outgoing for Alice
  },
  {
    id: 'req3',
    user: { id: 'user1', name: 'Alice Wonderland', profilePictureUrl: 'https://placehold.co/100x100.png', dataAiHint: 'woman portrait' },
    skill: { id: 'ps1', name: 'JavaScript' }, // Someone requested JS from Alice
    requestedSkillFocus: 'JavaScript',
    status: 'accepted',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    type: 'incoming', // This would be incoming for Alice (if someone else sent it)
  },
];

// Current logged-in user for demo purposes - THIS IS THE USER WHO LOGS IN
export const currentMockUser: UserProfile = mockUserProfiles[0]; // Alice
    

    