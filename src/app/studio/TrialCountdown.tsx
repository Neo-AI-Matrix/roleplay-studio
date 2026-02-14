"use client";

import { Clock, Sparkles } from "lucide-react";

interface TrialCountdownProps {
  trialEndsAt?: Date | null;
  isTrialing?: boolean;
}

export function TrialCountdown({ trialEndsAt, isTrialing = true }: TrialCountdownProps) {
  // If not trialing or no end date, don't show anything
  if (!isTrialing || !trialEndsAt) {
    return null;
  }

  const now = new Date();
  const endDate = new Date(trialEndsAt);
  const diffTime = endDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Trial ended = they're now a paying customer! Celebrate!
  if (daysLeft <= 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <div className="text-sm">
          <span className="text-emerald-400 font-medium">Welcome to Roleplay Studio!</span>
        </div>
      </div>
    );
  }

  // During trial - friendly green countdown
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
      <Clock className="w-4 h-4 text-emerald-400" />
      <div className="text-sm">
        <span className="text-emerald-400 font-medium">
          {daysLeft === 1 ? "1 day" : `${daysLeft} days`} left
        </span>
        <span className="text-gray-400 ml-1 hidden sm:inline">in trial</span>
      </div>
    </div>
  );
}

// Demo/placeholder version that shows mock trial data
// Remove this and use actual subscription data in production
export function TrialCountdownDemo() {
  // Mock: 7-day trial started 3 days ago = 4 days left
  const mockTrialEnd = new Date();
  mockTrialEnd.setDate(mockTrialEnd.getDate() + 4);
  
  return <TrialCountdown trialEndsAt={mockTrialEnd} isTrialing={true} />;
}
