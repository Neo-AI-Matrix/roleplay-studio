'use client';

import { useState, useEffect } from 'react';
import { getStats, formatHours, UserStats } from '@/lib/session-storage';

export function SidebarProgress() {
  const [stats, setStats] = useState<UserStats>({
    totalSessions: 0,
    totalPracticeTimeSeconds: 0,
    averageScore: 0,
    scenarioStats: {}
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStats(getStats());
  }, []);

  if (!mounted) {
    return (
      <div className="bg-navy-light border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 bg-white/10 rounded w-24 animate-pulse" />
              <div className="h-4 bg-white/10 rounded w-8 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Session milestones matching achievements
  const sessionMilestones = [
    { target: 5, name: 'Getting Warmed Up', icon: '🔥' },
    { target: 10, name: 'Dedicated Learner', icon: '📚' },
    { target: 25, name: 'Committed', icon: '💪' },
    { target: 50, name: 'Training Expert', icon: '🎓' },
  ];

  // Find the next milestone to work toward
  const nextMilestone = sessionMilestones.find(m => stats.totalSessions < m.target);
  const prevMilestoneTarget = sessionMilestones
    .filter(m => stats.totalSessions >= m.target)
    .pop()?.target || 0;

  const progressPercent = nextMilestone
    ? ((stats.totalSessions - prevMilestoneTarget) / (nextMilestone.target - prevMilestoneTarget)) * 100
    : 100;

  const scenariosCompleted = Object.keys(stats.scenarioStats || {}).length;

  return (
    <div className="bg-navy-light border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Sessions Completed</span>
          <span className="text-white font-semibold">{stats.totalSessions}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Average Score</span>
          <span className="text-white font-semibold">
            {stats.averageScore > 0 ? stats.averageScore.toFixed(1) : '--'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Time Trained</span>
          <span className="text-white font-semibold">
            {stats.totalPracticeTimeSeconds > 0 
              ? formatHours(stats.totalPracticeTimeSeconds) 
              : '0 min'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Scenarios Tried</span>
          <span className="text-white font-semibold">{scenariosCompleted}</span>
        </div>
        
        {/* Progress bar - tracks toward next achievement milestone */}
        {nextMilestone ? (
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="flex items-center gap-1">
                <span>{nextMilestone.icon}</span>
                <span>{nextMilestone.name} ({nextMilestone.target} sessions)</span>
              </span>
              <span>{stats.totalSessions}/{nextMilestone.target}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-violet to-cyan rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="pt-2 flex items-center gap-2 text-xs text-green-400">
            <span>🎓</span>
            <span>All session milestones achieved!</span>
          </div>
        )}
        
        {stats.totalSessions === 0 ? (
          <p className="text-xs text-gray-500">Complete your first session to start tracking progress</p>
        ) : stats.totalSessions < 5 ? (
          <p className="text-xs text-cyan-400">Great start! Keep practicing to improve.</p>
        ) : stats.averageScore >= 8 ? (
          <p className="text-xs text-green-400">Excellent performance! You're a natural.</p>
        ) : (
          <p className="text-xs text-gray-500">Keep practicing to improve your scores!</p>
        )}
      </div>
    </div>
  );
}
