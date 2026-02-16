// Profile data storage utilities
// Uses localStorage for now - will migrate to database in production

export interface UserProfile {
  // Identity
  avatarType: 'photo' | 'emoji';
  avatarUrl?: string; // For uploaded photos
  avatarEmoji?: string; // Selected emoji
  preferredName: string;
  firstName: string;
  lastName: string;
  email: string; // Read-only
  
  // Contact
  mobilePhone: string;
  workPhone: string;
  
  // Professional
  company: string;
  jobTitle: string;
  
  // Preferences
  interests: string[]; // Sales, Support, HR, Communication, Leadership
  trainingGoals: string[]; // Handling Objections, De-escalation, etc.
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  
  // Notifications
  emailNotifications: boolean;
  weeklyReports: boolean;
  
  // Metadata
  updatedAt: string;
}

const STORAGE_KEY = 'roleplay-studio-profile';

export const defaultProfile: Partial<UserProfile> = {
  avatarType: 'emoji',
  avatarEmoji: '👤',
  preferredName: '',
  firstName: '',
  lastName: '',
  email: '',
  mobilePhone: '',
  workPhone: '',
  company: '',
  jobTitle: '',
  interests: [],
  trainingGoals: [],
  skillLevel: 'beginner',
  emailNotifications: true,
  weeklyReports: false,
};

export const interestOptions = [
  { value: 'sales', label: 'Sales', icon: '💰' },
  { value: 'support', label: 'Support', icon: '🎧' },
  { value: 'hr', label: 'HR', icon: '👥' },
  { value: 'communication', label: 'Communication', icon: '💬' },
  { value: 'leadership', label: 'Leadership', icon: '🎯' },
];

export const trainingGoalOptions = [
  { value: 'handling-objections', label: 'Handling Objections', icon: '🛡️' },
  { value: 'de-escalation', label: 'De-escalation', icon: '🕊️' },
  { value: 'active-listening', label: 'Active Listening', icon: '👂' },
  { value: 'closing-techniques', label: 'Closing Techniques', icon: '🤝' },
  { value: 'empathy', label: 'Building Empathy', icon: '❤️' },
  { value: 'product-knowledge', label: 'Product Knowledge', icon: '📚' },
  { value: 'time-management', label: 'Time Management', icon: '⏱️' },
  { value: 'conflict-resolution', label: 'Conflict Resolution', icon: '⚖️' },
];

export const skillLevelOptions = [
  { value: 'beginner', label: 'Beginner', description: 'New to customer interactions' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience, building skills' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced professional' },
];

export const emojiOptions = [
  '👤', '😊', '😎', '🤓', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', 
  '🦸', '🦹', '🧑‍🎓', '👨‍🏫', '👩‍🏫', '🧑‍💼', '🎯', '⭐',
  '🚀', '💪', '🔥', '✨', '🌟', '💎', '🏆', '🎖️'
];

export function getProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
  return null;
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  
  try {
    profile.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving profile:', error);
  }
}

export function initializeProfile(clerkUser: {
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  imageUrl?: string;
}): UserProfile {
  const existing = getProfile();
  
  const profile: UserProfile = {
    ...defaultProfile,
    ...existing,
    // Always sync these from Clerk
    firstName: clerkUser.firstName || existing?.firstName || '',
    lastName: clerkUser.lastName || existing?.lastName || '',
    email: clerkUser.email || existing?.email || '',
    // Use Clerk image if no custom avatar set
    avatarUrl: existing?.avatarType === 'photo' ? existing.avatarUrl : clerkUser.imageUrl,
    updatedAt: existing?.updatedAt || new Date().toISOString(),
  } as UserProfile;
  
  return profile;
}
