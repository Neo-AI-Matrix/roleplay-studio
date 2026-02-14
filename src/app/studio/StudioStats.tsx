'use client';

import { useState, useEffect } from 'react';
import { getStats, formatHours } from '@/lib/session-storage';
import { MessageSquare, Clock, Target, TrendingUp } from 'lucide-react';

export function StudioStats() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalPracticeTimeSeconds: 0,
    averageScore: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadedStats = getStats();
    setStats(loadedStats);
  }, []);

  if (!mounted) {
    // Return placeholder during SSR
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<MessageSquare className="w-6 h-6" />}
          label="Sessions Completed"
          value="--"
          trend="Loading..."
        />
        <StatCard 
          icon={<Clock className="w-6 h-6" />}
          label="Practice Time"
          value="--"
          trend="Loading..."
        />
        <StatCard 
          icon={<Target className="w-6 h-6" />}
          label="Avg. Score"
          value="--"
          trend="Loading..."
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          label="Improvement"
          value="--"
          trend="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        icon={<MessageSquare className="w-6 h-6" />}
        label="Sessions Completed"
        value={stats.totalSessions.toString()}
        trend={stats.totalSessions === 0 ? "Start practicing!" : `${stats.totalSessions} total`}
      />
      <StatCard 
        icon={<Clock className="w-6 h-6" />}
        label="Practice Time"
        value={stats.totalPracticeTimeSeconds > 0 ? formatHours(stats.totalPracticeTimeSeconds) : "0 min"}
        trend={stats.totalPracticeTimeSeconds === 0 ? "Start a session!" : "Keep going!"}
      />
      <StatCard 
        icon={<Target className="w-6 h-6" />}
        label="Avg. Score"
        value={stats.averageScore > 0 ? stats.averageScore.toFixed(1) : "--"}
        trend={stats.averageScore >= 8 ? "Excellent!" : stats.averageScore >= 6 ? "Good progress" : stats.averageScore > 0 ? "Keep improving" : "Complete a session"}
      />
      <StatCard 
        icon={<TrendingUp className="w-6 h-6" />}
        label="Best Practices"
        value={stats.averageScore > 0 ? `${Math.round(stats.averageScore * 10)}%` : "--"}
        trend={stats.averageScore >= 8 ? "Outstanding!" : "Track your progress"}
      />
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  trend: string; 
}) {
  return (
    <div className="bg-navy-light border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-electric-blue/20 rounded-lg text-electric-blue">
          {icon}
        </div>
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500">{trend}</p>
    </div>
  );
}
