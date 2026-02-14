"use client";

import { useState, useEffect } from "react";
import { Clock, Sparkles, Loader2 } from "lucide-react";

interface TrialStatus {
  isTrialing: boolean;
  isSubscribed: boolean;
  trialStartedAt?: string;
  trialEndsAt?: string;
  daysLeft?: number;
  trialEnded?: boolean;
}

export function TrialCountdown() {
  const [status, setStatus] = useState<TrialStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrialStatus() {
      try {
        const response = await fetch('/api/trial');
        if (response.ok) {
          const data = await response.json();
          setStatus(data);
        }
      } catch (error) {
        console.error('Failed to fetch trial status:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrialStatus();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg">
        <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
      </div>
    );
  }

  // No status or error
  if (!status) {
    return null;
  }

  // User is a paid subscriber - don't show anything
  if (status.isSubscribed) {
    return null;
  }

  // Trial ended - welcome message (they've converted to paid)
  if (status.trialEnded) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <div className="text-sm">
          <span className="text-emerald-400 font-medium">Welcome to Roleplay Studio!</span>
        </div>
      </div>
    );
  }

  // Active trial - show countdown
  if (status.isTrialing && status.daysLeft !== undefined) {
    const daysLeft = status.daysLeft;
    
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

  return null;
}
