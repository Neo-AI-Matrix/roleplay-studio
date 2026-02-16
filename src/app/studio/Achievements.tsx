'use client';

import { useState, useEffect } from 'react';
import { Trophy, Lock, CheckCircle } from 'lucide-react';
import { getStats, getSessions, UserStats, SessionRecord } from '@/lib/session-storage';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'fire';
  checkUnlocked: (stats: UserStats, sessions: SessionRecord[]) => boolean;
}

const achievements: Achievement[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Complete your first session',
    icon: 'trophy',
    checkUnlocked: (stats) => stats.totalSessions >= 1
  },
  {
    id: 'quick-learner',
    title: 'Quick Learner',
    description: 'Complete 5 sessions',
    icon: 'trophy',
    checkUnlocked: (stats) => stats.totalSessions >= 5
  },
  {
    id: 'dedicated-trainer',
    title: 'Dedicated Trainer',
    description: 'Practice for 1 hour total',
    icon: 'trophy',
    checkUnlocked: (stats) => stats.totalPracticeTimeSeconds >= 3600
  },
  {
    id: 'deescalation-pro',
    title: 'De-escalation Pro',
    description: 'Score 8+ on angry customer',
    icon: 'trophy',
    checkUnlocked: (stats) => {
      const angryCustomer = stats.scenarioStats?.['angry-customer'];
      return angryCustomer?.bestScore >= 8;
    }
  },
  {
    id: 'sales-starter',
    title: 'Sales Starter',
    description: 'Complete any sales scenario',
    icon: 'trophy',
    checkUnlocked: (stats, sessions) => {
      const salesScenarios = ['sales-discovery', 'skeptical-cfo', 'upsell-opportunity', 
        'busy-decision-maker', 'price-shopper', 'cautious-prospect', 'chatty-executive', 
        'technical-buyer', 'happy-customer-upsell'];
      return sessions.some(s => salesScenarios.includes(s.scenarioId) && s.completed);
    }
  },
  {
    id: 'perfect-score',
    title: 'Perfect 10',
    description: 'Score 10/10 on any scenario',
    icon: 'trophy',
    checkUnlocked: (stats, sessions) => sessions.some(s => s.score === 10)
  },
  {
    id: 'consistent-performer',
    title: 'Consistent Performer',
    description: 'Average score of 7+ across 5 sessions',
    icon: 'trophy',
    checkUnlocked: (stats) => stats.totalSessions >= 5 && stats.averageScore >= 7
  },
  {
    id: 'marathon-trainer',
    title: 'Marathon Trainer',
    description: 'Complete 10 sessions',
    icon: 'trophy',
    checkUnlocked: (stats) => stats.totalSessions >= 10
  }
];

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

  const unlockedCount = achievements.filter(a => a.checkUnlocked(stats, sessions)).length;

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
        {achievements.slice(0, 4).map(achievement => {
          const unlocked = achievement.checkUnlocked(stats, sessions);
          return (
            <AchievementCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
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

function AchievementCard({ title, description, unlocked }: {
  title: string;
  description: string;
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
          <CheckCircle className="w-5 h-5 text-yellow-500" />
        ) : (
          <Lock className="w-4 h-4 text-gray-500" />
        )}
      </div>
      <div>
        <p className={`font-medium ${unlocked ? 'text-white' : 'text-gray-400'}`}>{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      {unlocked && (
        <Trophy className="w-4 h-4 text-yellow-500 ml-auto" />
      )}
    </div>
  );
}
