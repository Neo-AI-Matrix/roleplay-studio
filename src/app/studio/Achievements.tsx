'use client';

import { useState, useEffect } from 'react';
import { Trophy, Lock, CheckCircle } from 'lucide-react';
import { getStats, getSessions, UserStats, SessionRecord } from '@/lib/session-storage';
import { achievements, calculateEarnedAchievements } from '@/lib/achievements';

export function Achievements() {
  const [stats, setStats] = useState<UserStats>({
    totalSessions: 0,
    totalPracticeTimeSeconds: 0,
    averageScore: 0,
    scenarioStats: {}
  });
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStats(getStats());
    setSessions(getSessions());
  }, []);

  if (!mounted) {
    return (
      <div className="bg-navy-light border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Achievements
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div className="flex-1">
                <div className="h-4 bg-white/10 rounded w-24 mb-1" />
                <div className="h-3 bg-white/10 rounded w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const earnedIds = calculateEarnedAchievements(stats, sessions);
  const unlockedCount = earnedIds.length;

  // Show first 4 achievements, prioritizing unlocked ones
  const sortedAchievements = [...achievements].sort((a, b) => {
    const aUnlocked = earnedIds.includes(a.id);
    const bUnlocked = earnedIds.includes(b.id);
    if (aUnlocked && !bUnlocked) return -1;
    if (!aUnlocked && bUnlocked) return 1;
    return 0;
  });

  return (
    <div className="bg-navy-light border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Achievements
        </h3>
        <span className="text-sm text-gray-400">{unlockedCount}/{achievements.length}</span>
      </div>
      <div className="space-y-3">
        {sortedAchievements.slice(0, 4).map(achievement => {
          const unlocked = earnedIds.includes(achievement.id);
          return (
            <AchievementCard
              key={achievement.id}
              title={achievement.name}
              description={achievement.description}
              icon={achievement.icon}
              unlocked={unlocked}
            />
          );
        })}
      </div>
      {achievements.length > 4 && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          +{achievements.length - 4} more achievements to unlock
        </p>
      )}
    </div>
  );
}

function AchievementCard({ title, description, icon, unlocked }: {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
      unlocked 
        ? 'bg-yellow-500/10 border border-yellow-500/30' 
        : 'bg-white/5 opacity-60'
    }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        unlocked ? 'bg-yellow-500/20' : 'bg-white/10'
      }`}>
        {unlocked ? (
          <span className="text-xl">{icon}</span>
        ) : (
          <Lock className="w-4 h-4 text-gray-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${unlocked ? 'text-white' : 'text-gray-400'}`}>{title}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
      {unlocked && (
        <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
      )}
    </div>
  );
}
