'use client';

import { useState, useEffect } from 'react';
import { X, BarChart3, TrendingUp, Clock, Target, Award, Calendar } from 'lucide-react';
import { getStats, getSessions, formatHours, UserStats, SessionRecord } from '@/lib/session-storage';
import { getScenario } from '@/lib/scenarios';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsModal({ isOpen, onClose }: AnalyticsModalProps) {
  const [stats, setStats] = useState<UserStats>({
    totalSessions: 0,
    totalPracticeTimeSeconds: 0,
    averageScore: 0,
    scenarioStats: {}
  });
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setStats(getStats());
      setSessions(getSessions());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const recentSessions = [...sessions]
    .sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())
    .slice(0, 5);

  const topScenarios = Object.entries(stats.scenarioStats || {})
    .map(([scenarioId, data]) => ({
      scenarioId,
      ...data,
      scenario: getScenario(scenarioId)
    }))
    .filter(s => s.scenario)
    .sort((a, b) => b.bestScore - a.bestScore)
    .slice(0, 5);

  const bestScore = sessions.length > 0 
    ? Math.max(...sessions.map(s => s.score)) 
    : 0;

  const worstScore = sessions.length > 0 
    ? Math.min(...sessions.filter(s => s.completed).map(s => s.score)) 
    : 0;

  const improvementRate = sessions.length >= 3
    ? (() => {
        const sortedSessions = [...sessions].sort((a, b) => 
          new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
        );
        const firstThree = sortedSessions.slice(0, 3).reduce((sum, s) => sum + s.score, 0) / 3;
        const lastThree = sortedSessions.slice(-3).reduce((sum, s) => sum + s.score, 0) / 3;
        return ((lastThree - firstThree) / firstThree * 100).toFixed(0);
      })()
    : null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-navy-light border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-electric-blue/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-electric-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Full Analytics</h2>
              <p className="text-sm text-gray-400">Your complete training performance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Data Yet</h3>
              <p className="text-gray-400">Complete your first training session to see analytics.</p>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatBox
                  icon={<Target className="w-5 h-5" />}
                  label="Total Sessions"
                  value={stats.totalSessions.toString()}
                  color="cyan"
                />
                <StatBox
                  icon={<Clock className="w-5 h-5" />}
                  label="Total Time"
                  value={formatHours(stats.totalPracticeTimeSeconds)}
                  color="violet"
                />
                <StatBox
                  icon={<Award className="w-5 h-5" />}
                  label="Average Score"
                  value={stats.averageScore.toFixed(1)}
                  color="yellow"
                />
                <StatBox
                  icon={<TrendingUp className="w-5 h-5" />}
                  label="Best Score"
                  value={bestScore.toString()}
                  color="green"
                />
              </div>

              {/* Score Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Score Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Best Score</span>
                      <span className="text-green-400 font-bold text-lg">{bestScore}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Average Score</span>
                      <span className="text-white font-bold text-lg">{stats.averageScore.toFixed(1)}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Lowest Score</span>
                      <span className="text-orange-400 font-bold text-lg">{worstScore}/10</span>
                    </div>
                    {improvementRate && (
                      <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <span className="text-gray-400">Improvement</span>
                        <span className={`font-bold text-lg ${
                          parseInt(improvementRate) > 0 ? 'text-green-400' : 
                          parseInt(improvementRate) < 0 ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {parseInt(improvementRate) > 0 ? '+' : ''}{improvementRate}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Training Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Scenarios Tried</span>
                      <span className="text-white font-semibold">{Object.keys(stats.scenarioStats || {}).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Avg. Session Length</span>
                      <span className="text-white font-semibold">
                        {stats.totalSessions > 0 
                          ? formatHours(Math.round(stats.totalPracticeTimeSeconds / stats.totalSessions))
                          : '--'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Completed Sessions</span>
                      <span className="text-white font-semibold">
                        {sessions.filter(s => s.completed).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Scenarios */}
              {topScenarios.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Scenarios by Best Score</h3>
                  <div className="space-y-2">
                    {topScenarios.map(({ scenarioId, bestScore, sessionsCompleted, scenario }) => (
                      <div 
                        key={scenarioId}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-violet/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-violet">{bestScore}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{scenario?.title || scenarioId}</p>
                            <p className="text-xs text-gray-500">{sessionsCompleted} sessions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm font-semibold ${
                            bestScore >= 8 ? 'text-green-400' : 
                            bestScore >= 6 ? 'text-yellow-400' : 'text-orange-400'
                          }`}>
                            {bestScore >= 8 ? 'Excellent' : bestScore >= 6 ? 'Good' : 'Needs Work'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Sessions */}
              {recentSessions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Sessions</h3>
                  <div className="space-y-2">
                    {recentSessions.map((session) => (
                      <div 
                        key={session.id}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-white font-medium">{session.scenarioTitle}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(session.endTime).toLocaleDateString()} • {formatHours(session.durationSeconds)}
                            </p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          session.score >= 8 ? 'bg-green-500/20 text-green-400' : 
                          session.score >= 6 ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {session.score}/10
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'cyan' | 'violet' | 'yellow' | 'green';
}) {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 text-cyan-400',
    violet: 'bg-violet/20 text-violet',
    yellow: 'bg-yellow-500/20 text-yellow-400',
    green: 'bg-green-500/20 text-green-400'
  };

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}
