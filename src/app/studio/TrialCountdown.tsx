"use client";

import { Clock, AlertTriangle } from "lucide-react";

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

  // If trial has expired, show expired state
  if (daysLeft <= 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <div className="text-sm">
          <span className="text-red-400 font-medium">Trial expired</span>
        </div>
      </div>
    );
  }

  // Determine urgency level
  const isUrgent = daysLeft <= 2;
  const isWarning = daysLeft <= 4;

  const bgColor = isUrgent 
    ? "bg-red-500/20 border-red-500/30" 
    : isWarning 
    ? "bg-amber-500/20 border-amber-500/30" 
    : "bg-electric-blue/20 border-electric-blue/30";

  const textColor = isUrgent 
    ? "text-red-400" 
    : isWarning 
    ? "text-amber-400" 
    : "text-electric-blue";

  const iconColor = isUrgent 
    ? "text-red-400" 
    : isWarning 
    ? "text-amber-400" 
    : "text-electric-blue";

  return (
    <div className={`flex items-center gap-2 px-3 py-2 border rounded-lg ${bgColor}`}>
      <Clock className={`w-4 h-4 ${iconColor}`} />
      <div className="text-sm">
        <span className={`font-medium ${textColor}`}>
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
