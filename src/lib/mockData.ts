
import type { UserProfile, Match, PairingRequest, Skill, UserSkill } from '@/types';

// Using predefined skills for IDs and names where appropriate for consistency
export const predefinedSkills: Skill[] = [
  { id: 'ps1', name: 'JavaScript' },
  { id: 'ps2', name: 'Python' },
  { id: 'ps3', name: 'Graphic Design' },
  { id: 'ps4', name: 'Yoga' },
  { id: 'ps5', name: 'Cooking' },
  { id: 'ps6', name: 'Music Production' },
  { id: 'ps7', name: 'Creative Writing' },
  { id: 'ps8', name: 'Data Analysis' },
  { id: 'ps9', name: 'Public Speaking' },
  { id: 'ps10', name: 'Node.js' },
  { id: 'ps11', name: 'Figma' },
  { id: 'ps12', name: 'Spoken French' },
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
    id: 'user4', // Dana
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
  },
  {
    id: 'user5', // Eve
    name: 'Eve Adamson',
    email: 'eve@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman nature',
    bio: 'Music producer and language learner.',
    teachSkills: [
      { id: 'ps6', name: 'Music Production', level: 'Advanced' },
      { id: 'ps12', name: 'Spoken French', level: 'Intermediate' },
    ],
    learnSkills: [
      { id: 'ps11', name: 'Figma', level: 'Serious about learning' },
      { id: 'ps9', name: 'Public Speaking', level: 'Just curious'},
    ],
    isProfilePublic: true,
    profileSetupComplete: true,
  },
  {
    id: 'user6', // Frank
    name: 'Frank Castle',
    email: 'frank@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'man serious',
    bio: 'Frontend developer interested in backend technologies.',
    teachSkills: [
      { id: 'ps11', name: 'Figma', level: 'Intermediate' },
      { id: 'ps1', name: 'JavaScript', level: 'Advanced' },
    ],
    learnSkills: [
      { id: 'ps10', name: 'Node.js', level: 'Serious about learning' },
      { id: 'ps2', name: 'Python', level: 'Intermediate'},
    ],
    isProfilePublic: true,
    profileSetupComplete: true,
  },
  {
    id: 'user7', // Grace
    name: 'Grace Hopper',
    email: 'grace@example.com',
    profilePictureUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman computer',
    bio: 'Pioneer in programming, loves to share knowledge.',
    teachSkills: [
      { id: 'ps2', name: 'Python', level: 'Advanced' },
      { id: 'ps10', name: 'Node.js', level: 'Advanced' },
    ],
    learnSkills: [
      { id: 'ps5', name: 'Cooking', level: 'Just curious' },
      { id: 'ps12', name: 'Spoken French', level: 'Serious about learning'},
    ],
    isProfilePublic: true,
    profileSetupComplete: true,
  }
];

// currentMockUser (Alice)
// Teaches: JavaScript (ps1), Python (ps2)
// Learns: Yoga (ps4), Creative Writing (ps7)

export const mockMatches: Match[] = []; // Dashboard generates matches dynamically


export const mockPairingRequests: PairingRequest[] = [
  {
    id: 'req1',
    user: mockUserProfiles[1], // Bob
    skill: { id: 'ps4', name: 'Yoga' },
    requestedSkillFocus: 'Yoga',
    message: 'Hey Alice, I saw you want to learn Yoga. I can teach you! Available weekday evenings.',
    status: 'pending',
    timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    type: 'incoming',
  },
  {
    id: 'req2',
    user: mockUserProfiles[2], // Charlie
    skill: { id: 'ps2', name: 'Python' },
    requestedSkillFocus: 'Python',
    message: 'Hi Charlie, I can help you with Python. Let me know if you are interested. Weekends work best for me.',
    status: 'pending',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    type: 'outgoing',
  },
  {
    id: 'req3',
    user: mockUserProfiles[3], // Dana
    skill: { id: 'ps1', name: 'JavaScript' },
    requestedSkillFocus: 'Advanced JavaScript Concepts',
    message: "Let's discuss advanced JS topics. I'm free on Tuesday or Thursday afternoon.",
    status: 'accepted',
    // Scheduled for tomorrow (approx)
    timestamp: new Date(Date.now() + 86400000 * 1 - 3600000 * 5).toISOString(), // tomorrow around 5 hours ago from now to put it in 'today'
    type: 'incoming',
  },
   {
    id: 'req4',
    user: mockUserProfiles[4], // Eve
    skill: { id: 'ps6', name: 'Music Production' },
    requestedSkillFocus: 'Music Production Basics',
    message: "Looking forward to our music production session! I've prepared some examples.",
    status: 'accepted',
    // Scheduled for 3 days from now
    timestamp: new Date(Date.now() + 86400000 * 3 + 3600000 * 3).toISOString(), // 3 days from now, +3 hours
    type: 'outgoing',
  },
  {
    id: 'req5',
    user: mockUserProfiles[5], // Frank
    skill: { id: 'ps11', name: 'Figma' },
    requestedSkillFocus: 'Figma for UI/UX',
    message: "Can't wait to learn Figma with you!",
    status: 'accepted',
    // Also scheduled for tomorrow (approx), different time
    timestamp: new Date(Date.now() + 86400000 * 1 + 3600000 * 2).toISOString(), // tomorrow, +2 hours
    type: 'incoming',
  },
];

// Current logged-in user for demo purposes - THIS IS THE USER WHO LOGS IN
export const currentMockUser: UserProfile = mockUserProfiles[0]; // Alice
    

    
