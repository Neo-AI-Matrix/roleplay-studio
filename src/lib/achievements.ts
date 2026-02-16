// Unified achievements system
import { UserStats, SessionRecord } from './session-storage';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  checkUnlocked: (stats: UserStats, sessions: SessionRecord[]) => boolean;
}

export const achievements: Achievement[] = [
  // ============ SESSION MILESTONES ============
  {
    id: 'first-session',
    name: 'First Steps',
    description: 'Complete your first session',
    icon: '🎯',
    checkUnlocked: (stats) => stats.totalSessions >= 1
  },
  {
    id: 'five-sessions',
    name: 'Getting Warmed Up',
    description: 'Complete 5 sessions',
    icon: '🔥',
    checkUnlocked: (stats) => stats.totalSessions >= 5
  },
  {
    id: 'ten-sessions',
    name: 'Dedicated Learner',
    description: 'Complete 10 sessions',
    icon: '📚',
    checkUnlocked: (stats) => stats.totalSessions >= 10
  },
  {
    id: 'twenty-five-sessions',
    name: 'Committed',
    description: 'Complete 25 sessions',
    icon: '💪',
    checkUnlocked: (stats) => stats.totalSessions >= 25
  },
  {
    id: 'fifty-sessions',
    name: 'Training Expert',
    description: 'Complete 50 sessions',
    icon: '🎓',
    checkUnlocked: (stats) => stats.totalSessions >= 50
  },

  // ============ SCORE ACHIEVEMENTS ============
  {
    id: 'perfect-score',
    name: 'Perfect 10',
    description: 'Score 10/10 on any session',
    icon: '⭐',
    checkUnlocked: (_, sessions) => sessions.some(s => s.score === 10)
  },
  {
    id: 'high-scorer',
    name: 'High Achiever',
    description: 'Score 8+ on 5 different sessions',
    icon: '🏆',
    checkUnlocked: (_, sessions) => sessions.filter(s => s.score && s.score >= 8).length >= 5
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Score 10/10 three times',
    icon: '💎',
    checkUnlocked: (_, sessions) => sessions.filter(s => s.score === 10).length >= 3
  },
  {
    id: 'consistent-performer',
    name: 'Consistent Performer',
    description: 'Average score of 7+ across 10 sessions',
    icon: '📈',
    checkUnlocked: (stats) => stats.totalSessions >= 10 && stats.averageScore >= 7
  },

  // ============ CATEGORY ACHIEVEMENTS ============
  {
    id: 'category-explorer',
    name: 'Explorer',
    description: 'Complete scenarios in 3 different categories',
    icon: '🗺️',
    checkUnlocked: (_, sessions) => {
      const categories = new Set(sessions.map(s => getCategoryFromScenario(s.scenarioId)));
      return categories.size >= 3;
    }
  },
  {
    id: 'category-master',
    name: 'Category Champion',
    description: 'Complete scenarios in all 5 categories',
    icon: '👑',
    checkUnlocked: (_, sessions) => {
      const categories = new Set(sessions.map(s => getCategoryFromScenario(s.scenarioId)));
      return categories.size >= 5;
    }
  },
  {
    id: 'sales-starter',
    name: 'Sales Starter',
    description: 'Complete any sales scenario',
    icon: '💰',
    checkUnlocked: (_, sessions) => sessions.some(s => getCategoryFromScenario(s.scenarioId) === 'sales')
  },
  {
    id: 'support-hero',
    name: 'Support Hero',
    description: 'Complete 5 support scenarios',
    icon: '🎧',
    checkUnlocked: (_, sessions) => 
      sessions.filter(s => getCategoryFromScenario(s.scenarioId) === 'support').length >= 5
  },

  // ============ TIME ACHIEVEMENTS ============
  {
    id: 'hour-practiced',
    name: 'Hour of Power',
    description: 'Practice for 1 hour total',
    icon: '⏰',
    checkUnlocked: (stats) => stats.totalPracticeTimeSeconds >= 3600
  },
  {
    id: 'marathon-session',
    name: 'Deep Dive',
    description: 'Complete a session over 15 minutes',
    icon: '🏊',
    checkUnlocked: (_, sessions) => sessions.some(s => s.durationSeconds && s.durationSeconds >= 900)
  },
  {
    id: 'speed-round',
    name: 'Quick Thinker',
    description: 'Complete a session in under 3 minutes',
    icon: '⚡',
    checkUnlocked: (_, sessions) => sessions.some(s => s.durationSeconds && s.durationSeconds <= 180 && s.completed)
  },

  // ============ SPECIAL ACHIEVEMENTS ============
  {
    id: 'voice-master',
    name: 'Voice Pro',
    description: 'Complete 5 voice sessions',
    icon: '🎙️',
    checkUnlocked: (_, sessions) => sessions.filter(s => s.isVoice).length >= 5
  },
  {
    id: 'deescalation-pro',
    name: 'De-escalation Pro',
    description: 'Score 8+ on an angry customer scenario',
    icon: '🕊️',
    checkUnlocked: (_, sessions) => {
      const angryScenarios = ['angry-customer', 'angry-customer-billing'];
      return sessions.some(s => angryScenarios.includes(s.scenarioId) && s.score && s.score >= 8);
    }
  },
];

// Helper to determine category from scenario ID
function getCategoryFromScenario(scenarioId: string): string {
  const salesScenarios = [
    'sales-discovery', 'skeptical-cfo', 'upsell-opportunity', 
    'busy-decision-maker', 'price-shopper', 'cautious-prospect', 
    'chatty-executive', 'technical-buyer', 'happy-customer-upsell',
    'budget-conscious-upsell', 'growth-focused-upsell'
  ];
  const supportScenarios = [
    'angry-customer', 'angry-customer-billing', 'confused-user', 
    'demanding-client'
  ];
  const hrScenarios = [
    'asking-for-raise', 'underperforming-employee', 'difficult-coworker',
    'termination-conversation'
  ];
  const communicationScenarios = [
    'team-pitch', 'stakeholder-update', 'all-hands-presentation',
    'public-speaking-qa'
  ];
  const leadershipScenarios = [
    'giving-feedback', 'coaching-conversation', 'executive-presence',
    'leading-change'
  ];

  if (salesScenarios.includes(scenarioId)) return 'sales';
  if (supportScenarios.includes(scenarioId)) return 'support';
  if (hrScenarios.includes(scenarioId)) return 'hr';
  if (communicationScenarios.includes(scenarioId)) return 'communication';
  if (leadershipScenarios.includes(scenarioId)) return 'leadership';
  return 'other';
}

export function calculateEarnedAchievements(stats: UserStats, sessions: SessionRecord[]): string[] {
  return achievements
    .filter(a => a.checkUnlocked(stats, sessions))
    .map(a => a.id);
}

export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find(a => a.id === id);
}
