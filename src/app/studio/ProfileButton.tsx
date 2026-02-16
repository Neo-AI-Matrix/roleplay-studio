'use client';

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { getProfile } from '@/lib/profile-storage';

export function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const profile = getProfile();
    setHasProfile(!!profile?.preferredName || !!profile?.interests?.length);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        title="Profile Settings"
      >
        <Settings className="w-5 h-5" />
        {!hasProfile && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-electric-blue rounded-full animate-pulse" />
        )}
      </button>
      <ProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
