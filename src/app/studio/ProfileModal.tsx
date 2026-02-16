'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import {
  X,
  Camera,
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Target,
  Bell,
  Trophy,
  Check,
  Loader2,
  Lock,
  ChevronDown
} from 'lucide-react';
import {
  UserProfile,
  getProfile,
  saveProfile,
  initializeProfile,
  interestOptions,
  trainingGoalOptions,
  skillLevelOptions,
  emojiOptions,
  defaultProfile
} from '@/lib/profile-storage';
import { getSessions, getStats, SessionRecord } from '@/lib/session-storage';
import { achievements, calculateEarnedAchievements } from '@/lib/achievements';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'achievements'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && user) {
      const existingProfile = getProfile();
      const initializedProfile = initializeProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress,
        imageUrl: user.imageUrl,
      });
      
      setProfile(existingProfile || initializedProfile);
      const loadedSessions = getSessions();
      const stats = getStats();
      setSessions(loadedSessions);
      setEarnedAchievements(calculateEarnedAchievements(stats, loadedSessions));
    }
  }, [isOpen, user]);

  const handleSave = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    
    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    saveProfile(profile);
    setIsSaving(false);
    onClose();
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    setProfile({ ...profile, ...updates });
  };

  const toggleInterest = (value: string) => {
    if (!profile) return;
    const interests = profile.interests.includes(value)
      ? profile.interests.filter(i => i !== value)
      : [...profile.interests, value];
    updateProfile({ interests });
  };

  const toggleTrainingGoal = (value: string) => {
    if (!profile) return;
    const trainingGoals = profile.trainingGoals.includes(value)
      ? profile.trainingGoals.filter(g => g !== value)
      : [...profile.trainingGoals, value];
    updateProfile({ trainingGoals });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({
        avatarType: 'photo',
        avatarUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const selectEmoji = (emoji: string) => {
    updateProfile({
      avatarType: 'emoji',
      avatarEmoji: emoji,
    });
    setShowEmojiPicker(false);
  };

  if (!isOpen || !profile) return null;

  const earnedAchievements = calculateAchievements(sessions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-navy-light border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-electric-blue border-b-2 border-electric-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'preferences'
                ? 'text-electric-blue border-b-2 border-electric-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'achievements'
                ? 'text-electric-blue border-b-2 border-electric-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 inline mr-2" />
            Achievements
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-navy border-2 border-white/20 flex items-center justify-center">
                    {profile.avatarType === 'photo' && profile.avatarUrl ? (
                      <Image
                        src={profile.avatarUrl}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">{profile.avatarEmoji || '👤'}</span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center hover:bg-electric-blue/80 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-2">Choose your avatar</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
                    >
                      😊 Select Emoji
                      <ChevronDown className={`w-4 h-4 transition-transform ${showEmojiPicker ? 'rotate-180' : ''}`} />
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
                    >
                      📷 Upload Photo
                    </button>
                  </div>
                  {showEmojiPicker && (
                    <div className="mt-3 p-3 bg-navy rounded-lg border border-white/10 grid grid-cols-8 gap-2">
                      {emojiOptions.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => selectEmoji(emoji)}
                          className={`w-8 h-8 text-xl rounded hover:bg-white/10 transition-colors ${
                            profile.avatarEmoji === emoji && profile.avatarType === 'emoji'
                              ? 'bg-electric-blue/20 ring-2 ring-electric-blue'
                              : ''
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Preferred Name</label>
                  <input
                    type="text"
                    value={profile.preferredName}
                    onChange={(e) => updateProfile({ preferredName: e.target.value })}
                    placeholder="How should we call you?"
                    className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-electric-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => updateProfile({ firstName: e.target.value })}
                    className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-electric-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => updateProfile({ lastName: e.target.value })}
                    className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-electric-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                    Email <Lock className="w-3 h-3 text-gray-500" />
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full bg-navy/50 border border-white/5 rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Contact support to change email</p>
                </div>
              </div>

              {/* Phone Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Mobile Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={profile.mobilePhone}
                      onChange={(e) => updateProfile({ mobilePhone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-electric-blue"
                    />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Work Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={profile.workPhone}
                      onChange={(e) => updateProfile({ workPhone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-electric-blue"
                    />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Company / Organization</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => updateProfile({ company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-electric-blue"
                    />
                    <Building className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Job Title</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.jobTitle}
                      onChange={(e) => updateProfile({ jobTitle: e.target.value })}
                      placeholder="Customer Success Manager"
                      className="w-full bg-navy border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-electric-blue"
                    />
                    <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              {/* Interests */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">What areas are you interested in?</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleInterest(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        profile.interests.includes(option.value)
                          ? 'bg-electric-blue text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                      {profile.interests.includes(option.value) && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">We&apos;ll use this to show you relevant scenarios</p>
              </div>

              {/* Training Goals */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">What skills do you want to improve?</label>
                <div className="flex flex-wrap gap-2">
                  {trainingGoalOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => toggleTrainingGoal(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        profile.trainingGoals.includes(option.value)
                          ? 'bg-violet text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                      {profile.trainingGoals.includes(option.value) && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">What&apos;s your experience level?</label>
                <div className="grid grid-cols-3 gap-3">
                  {skillLevelOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateProfile({ skillLevel: option.value as UserProfile['skillLevel'] })}
                      className={`p-4 rounded-xl text-left transition-colors ${
                        profile.skillLevel === option.value
                          ? 'bg-electric-blue/20 border-2 border-electric-blue'
                          : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                      }`}
                    >
                      <p className={`font-medium ${
                        profile.skillLevel === option.value ? 'text-electric-blue' : 'text-white'
                      }`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div>
                <label className="block text-sm text-gray-400 mb-3">Notification Preferences</label>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white text-sm">Email Notifications</p>
                        <p className="text-xs text-gray-500">New scenarios and tips</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.emailNotifications}
                      onChange={(e) => updateProfile({ emailNotifications: e.target.checked })}
                      className="w-5 h-5 rounded bg-navy border-white/20 text-electric-blue focus:ring-electric-blue"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white text-sm">Weekly Progress Reports</p>
                        <p className="text-xs text-gray-500">Summary of your training activity</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={profile.weeklyReports}
                      onChange={(e) => updateProfile({ weeklyReports: e.target.checked })}
                      className="w-5 h-5 rounded bg-navy border-white/20 text-electric-blue focus:ring-electric-blue"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm mb-4">
                You&apos;ve earned {earnedAchievements.length} of {achievements.length} achievements
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                {achievements.map((achievement) => {
                  const isEarned = earnedAchievements.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-xl border transition-colors ${
                        isEarned
                          ? 'bg-electric-blue/10 border-electric-blue/30'
                          : 'bg-white/5 border-white/10 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`text-xl ${isEarned ? '' : 'grayscale'}`}>
                          {achievement.icon}
                        </span>
                        <div className="min-w-0">
                          <p className={`font-medium text-sm ${isEarned ? 'text-white' : 'text-gray-400'}`}>
                            {achievement.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{achievement.description}</p>
                          {isEarned && (
                            <p className="text-xs text-electric-blue mt-1 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Earned
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-navy/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-electric-blue hover:bg-electric-blue/90 disabled:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
