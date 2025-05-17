
"use client";

import { create } from 'zustand';
import type { UserProfile } from '@/types';
// Removed currentMockUser import as it's not directly used here for initialization logic

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateUserProfile: (updatedProfile: Partial<UserProfile>) => void;
  completeProfileSetup: () => void; // New action
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
  updateUserProfile: (updatedProfile) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...updatedProfile } });
    }
  },
  completeProfileSetup: () => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, profileSetupComplete: true } });
    }
  }
}));
