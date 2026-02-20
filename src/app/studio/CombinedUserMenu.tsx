'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import { 
  Settings, 
  User, 
  LogOut, 
  ChevronDown,
  CreditCard,
  Trophy,
  Shield
} from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { getProfile, UserProfile } from '@/lib/profile-storage';

export function CombinedUserMenu() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileModalTab, setProfileModalTab] = useState<'profile' | 'preferences' | 'achievements' | 'billing'>('profile');
  const [hasProfile, setHasProfile] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Load profile and check if completed
  useEffect(() => {
    const loadedProfile = getProfile();
    setProfile(loadedProfile);
    setHasProfile(!!loadedProfile?.preferredName || !!loadedProfile?.interests?.length);
  }, [showProfileModal]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut({ redirectUrl: '/' });
  };

  const handleOpenProfile = (tab: 'profile' | 'preferences' | 'achievements' | 'billing' = 'profile') => {
    setIsOpen(false);
    setProfileModalTab(tab);
    setShowProfileModal(true);
  };

  const handleManageAccount = () => {
    setIsOpen(false);
    // Open Clerk's profile but customize to focus on security
    openUserProfile({
      appearance: {
        elements: {
          // Hide the profile section header since we handle that
          profileSection__profile: { display: 'none' },
          profilePage__profile: { display: 'none' },
        }
      }
    });
  };

  return (
    <>
      <div className="relative z-[9999]" ref={menuRef}>
        {/* Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <div className="relative">
            {/* Priority: 1) Custom photo, 2) Custom emoji, 3) Clerk image, 4) Fallback */}
            {profile?.avatarType === 'photo' && profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.preferredName || user?.firstName || 'User'}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full ring-2 ring-electric-blue object-cover"
              />
            ) : profile?.avatarType === 'emoji' && profile?.avatarEmoji ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center ring-2 ring-electric-blue">
                <span className="text-xl">{profile.avatarEmoji}</span>
              </div>
            ) : user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.firstName || 'User'}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full ring-2 ring-electric-blue"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center ring-2 ring-electric-blue">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
            {/* Notification dot for incomplete profile */}
            {!hasProfile && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-electric-blue rounded-full animate-pulse border-2 border-navy-light" />
            )}
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-navy-light border border-white/10 rounded-xl shadow-xl overflow-hidden z-[9999]">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-white/5">
              <p className="text-white font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-400 text-sm truncate">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* Profile Settings - Opens our custom modal */}
              <button
                onClick={() => handleOpenProfile('profile')}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Settings className="w-4 h-4 text-electric-blue" />
                <div className="flex-1">
                  <span>Profile Settings</span>
                  {!hasProfile && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-electric-blue/20 text-electric-blue rounded">
                      New
                    </span>
                  )}
                </div>
              </button>

              {/* Billing - Opens directly to billing tab */}
              <button
                onClick={() => handleOpenProfile('billing')}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <CreditCard className="w-4 h-4 text-cyan" />
                <span>Billing & Plans</span>
              </button>

              {/* Achievements - Opens directly to achievements tab */}
              <button
                onClick={() => handleOpenProfile('achievements')}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Achievements</span>
              </button>

              <div className="my-2 border-t border-white/10" />

              {/* Manage Account - Opens Clerk's account manager */}
              <button
                onClick={handleManageAccount}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Shield className="w-4 h-4 text-violet" />
                <div>
                  <span>Security & Account</span>
                  <p className="text-xs text-gray-500">Password, 2FA, sessions</p>
                </div>
              </button>

              <div className="my-2 border-t border-white/10" />

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        initialTab={profileModalTab}
      />
    </>
  );
}
