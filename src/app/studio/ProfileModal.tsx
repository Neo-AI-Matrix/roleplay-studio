'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  ChevronDown,
  CreditCard,
  Receipt,
  ArrowUpCircle,
  ArrowDownCircle,
  XCircle,
  ExternalLink,
  Calendar,
  DollarSign
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
import { useSubscription } from '@/lib/use-subscription';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'achievements' | 'billing'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Stripe subscription data
  const { subscription, isLoading: isLoadingSubscription, openCheckout, openBillingPortal } = useSubscription();

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

  // Use portal to render outside of any stacking context
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 pb-4 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-navy-light border border-white/10 rounded-2xl w-full max-w-2xl max-h-[calc(100vh-6rem)] overflow-hidden flex flex-col">
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
          <button
            onClick={() => setActiveTab('billing')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'billing'
                ? 'text-electric-blue border-b-2 border-electric-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4 inline mr-2" />
            Billing
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {activeTab === 'billing' && (
            <div className="space-y-6">
              {isLoadingSubscription ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-electric-blue" />
                </div>
              ) : (
                <>
                  {/* Current Plan */}
                  <div className="bg-gradient-to-br from-electric-blue/20 to-violet/20 rounded-xl p-5 border border-electric-blue/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Current Plan</p>
                        <h3 className="text-2xl font-bold text-white">{subscription?.planName || 'Free Trial'}</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {subscription?.minutesPerMonth ? `${subscription.minutesPerMonth} minutes/month` : '100 minutes/month'}
                          {subscription?.currentPeriodEnd && (
                            <> • Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</>
                          )}
                        </p>
                        {subscription?.cancelAtPeriodEnd && (
                          <p className="text-sm text-yellow-400 mt-1">⚠️ Cancels at end of billing period</p>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        subscription?.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        subscription?.status === 'trialing' ? 'bg-electric-blue/20 text-electric-blue' :
                        subscription?.status === 'past_due' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {subscription?.status === 'active' ? 'Active' :
                         subscription?.status === 'trialing' ? 'Trial' :
                         subscription?.status === 'past_due' ? 'Past Due' :
                         'Free'}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {subscription?.plan === 'free' || !subscription?.hasSubscription ? (
                        <>
                          <button 
                            onClick={() => openCheckout('pro')}
                            className="flex-1 bg-electric-blue hover:bg-electric-blue/90 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <ArrowUpCircle className="w-4 h-4" />
                            Upgrade to Business
                          </button>
                          <a 
                            href="/product#pricing"
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Plans
                          </a>
                        </>
                      ) : (
                        <button 
                          onClick={openBillingPortal}
                          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Manage Subscription
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Usage This Month */}
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Usage This Month
                    </h4>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Minutes Used</span>
                        <span className="text-white font-medium">
                          {/* TODO: Get actual usage from your usage tracking */}
                          0 / {subscription?.minutesPerMonth || 100} min
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-electric-blue h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      {subscription?.currentPeriodEnd && (
                        <p className="text-xs text-gray-500 mt-2">
                          Resets on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  {subscription?.paymentMethod && (
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        Payment Method
                      </h4>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${
                              subscription.paymentMethod.brand === 'visa' ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
                              subscription.paymentMethod.brand === 'mastercard' ? 'bg-gradient-to-r from-red-600 to-yellow-500' :
                              subscription.paymentMethod.brand === 'amex' ? 'bg-gradient-to-r from-blue-800 to-blue-600' :
                              'bg-gray-600'
                            }`}>
                              {subscription.paymentMethod.brand.toUpperCase().slice(0, 4)}
                            </div>
                            <div>
                              <p className="text-white text-sm">•••• •••• •••• {subscription.paymentMethod.last4}</p>
                              <p className="text-xs text-gray-500">
                                Expires {subscription.paymentMethod.expMonth}/{subscription.paymentMethod.expYear}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={openBillingPortal}
                            className="text-electric-blue hover:text-electric-blue/80 text-sm transition-colors"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing History */}
                  {subscription?.invoices && subscription.invoices.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-gray-400" />
                        Billing History
                      </h4>
                      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                        <div className="divide-y divide-white/10">
                          {subscription.invoices.slice(0, 5).map((invoice) => (
                            <div key={invoice.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                              <div className="flex items-center gap-3">
                                <DollarSign className={`w-4 h-4 ${
                                  invoice.status === 'paid' ? 'text-green-400' : 'text-yellow-400'
                                }`} />
                                <div>
                                  <p className="text-white text-sm">{subscription.planName} - Monthly</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(invoice.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-white font-medium">${invoice.amount.toFixed(2)}</span>
                                {invoice.pdfUrl && (
                                  <a 
                                    href={invoice.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-electric-blue hover:text-electric-blue/80 text-sm transition-colors"
                                  >
                                    Invoice
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {subscription.invoices.length > 5 && (
                          <div className="p-3 bg-white/5 border-t border-white/10 text-center">
                            <button 
                              onClick={openBillingPortal}
                              className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                              View All Invoices →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Manage Subscription - Only show for paid users */}
                  {subscription?.hasSubscription && (
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-white font-medium mb-3">Manage Subscription</h4>
                      <div className="space-y-2">
                        <button 
                          onClick={openBillingPortal}
                          className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <ArrowDownCircle className="w-5 h-5 text-yellow-400" />
                            <div>
                              <p className="text-white text-sm">Change Plan</p>
                              <p className="text-xs text-gray-500">Upgrade or downgrade your subscription</p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                        </button>
                        <button 
                          onClick={openBillingPortal}
                          className="w-full text-left p-3 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-between group border border-transparent hover:border-red-500/30"
                        >
                          <div className="flex items-center gap-3">
                            <XCircle className="w-5 h-5 text-red-400" />
                            <div>
                              <p className="text-white text-sm">Cancel Subscription</p>
                              <p className="text-xs text-gray-500">Your access ends at billing period</p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
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

  // Render via portal to escape stacking context issues
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return modalContent;
}
