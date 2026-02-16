// Session storage for tracking practice sessions

export interface TranscriptEntry {
  role: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export interface SessionRecord {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  startTime: string;
  endTime: string;
  durationSeconds: number;
  transcript: TranscriptEntry[];
  score: number;
  scoreBreakdown: ScoreBreakdown;
  completed: boolean;
  isVoice?: boolean; // true for voice sessions, false/undefined for text
}

export interface ScoreBreakdown {
  usedCustomerName: boolean;
  showedEmpathy: boolean;
  tookOwnership: boolean;
  stayedCalm: boolean;
  askedClarifyingQuestions: boolean;
  offeredSolutions: boolean;
  providedClearNextSteps: boolean;
  closedProfessionally: boolean;
  handledVerification: boolean;
  deescalatedSuccessfully: boolean;
}

export interface UserStats {
  totalSessions: number;
  totalPracticeTimeSeconds: number;
  averageScore: number;
  scenarioStats: Record<string, {
    sessionsCompleted: number;
    bestScore: number;
    totalTime: number;
  }>;
}

const SESSIONS_KEY = 'roleplay_sessions';
const STATS_KEY = 'roleplay_stats';

// Get all sessions
export function getSessions(): SessionRecord[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save a session
export function saveSession(session: SessionRecord): void {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  updateStats(session);
}

// Get user stats
export function getStats(): UserStats {
  if (typeof window === 'undefined') {
    return {
      totalSessions: 0,
      totalPracticeTimeSeconds: 0,
      averageScore: 0,
      scenarioStats: {}
    };
  }
  const data = localStorage.getItem(STATS_KEY);
  return data ? JSON.parse(data) : {
    totalSessions: 0,
    totalPracticeTimeSeconds: 0,
    averageScore: 0,
    scenarioStats: {}
  };
}

// Update stats after a session
function updateStats(session: SessionRecord): void {
  const stats = getStats();
  
  stats.totalSessions += 1;
  stats.totalPracticeTimeSeconds += session.durationSeconds;
  
  // Recalculate average score
  const sessions = getSessions();
  const completedSessions = sessions.filter(s => s.completed);
  if (completedSessions.length > 0) {
    stats.averageScore = completedSessions.reduce((sum, s) => sum + s.score, 0) / completedSessions.length;
  }
  
  // Update scenario-specific stats
  if (!stats.scenarioStats[session.scenarioId]) {
    stats.scenarioStats[session.scenarioId] = {
      sessionsCompleted: 0,
      bestScore: 0,
      totalTime: 0
    };
  }
  
  const scenarioStat = stats.scenarioStats[session.scenarioId];
  scenarioStat.sessionsCompleted += 1;
  scenarioStat.totalTime += session.durationSeconds;
  if (session.score > scenarioStat.bestScore) {
    scenarioStat.bestScore = session.score;
  }
  
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// Analyze transcript and calculate score
export function calculateScore(transcript: TranscriptEntry[]): { score: number; breakdown: ScoreBreakdown } {
  const userMessages = transcript.filter(t => t.role === 'user').map(t => t.text.toLowerCase());
  const agentMessages = transcript.filter(t => t.role === 'agent').map(t => t.text.toLowerCase());
  const allUserText = userMessages.join(' ');
  
  const breakdown: ScoreBreakdown = {
    usedCustomerName: checkUsedCustomerName(allUserText),
    showedEmpathy: checkShowedEmpathy(allUserText),
    tookOwnership: checkTookOwnership(allUserText),
    stayedCalm: checkStayedCalm(userMessages, agentMessages),
    askedClarifyingQuestions: checkAskedQuestions(allUserText),
    offeredSolutions: checkOfferedSolutions(allUserText),
    providedClearNextSteps: checkProvidedNextSteps(allUserText),
    closedProfessionally: checkClosedProfessionally(userMessages),
    handledVerification: checkHandledVerification(allUserText),
    deescalatedSuccessfully: checkDeescalated(agentMessages)
  };
  
  // Calculate score (each item worth 1 point, total 10)
  const score = Object.values(breakdown).filter(Boolean).length;
  
  return { score, breakdown };
}

// Check functions for each best practice
function checkUsedCustomerName(text: string): boolean {
  return text.includes('margaret') || text.includes('ms. chen') || text.includes('mrs. chen');
}

function checkShowedEmpathy(text: string): boolean {
  const empathyPhrases = [
    'understand', 'frustrating', 'sorry', 'apologize', 
    'hear you', 'appreciate', 'must be', 'can see why',
    'that\'s not okay', 'shouldn\'t have happened'
  ];
  return empathyPhrases.some(phrase => text.includes(phrase));
}

function checkTookOwnership(text: string): boolean {
  const ownershipPhrases = [
    'i will', 'i\'ll', 'let me', 'i can', 'i\'m going to',
    'i want to help', 'i\'ll take care', 'i\'ll make sure',
    'personally', 'my responsibility'
  ];
  return ownershipPhrases.some(phrase => text.includes(phrase));
}

function checkStayedCalm(userMessages: string[], agentMessages: string[]): boolean {
  // Check if agent remained upset throughout (if so, user didn't stay calm)
  const lastAgentMessages = agentMessages.slice(-3);
  const stillAngry = lastAgentMessages.some(msg => 
    msg.includes('ridiculous') || msg.includes('unacceptable') || 
    msg.includes('switching banks') || msg.includes('had enough')
  );
  return !stillAngry || agentMessages.length < 3;
}

function checkAskedQuestions(text: string): boolean {
  const questionIndicators = [
    'can you tell me', 'could you', 'what happened',
    'when did', 'how long', 'is there', 'do you',
    'may i ask', 'help me understand', '?'
  ];
  return questionIndicators.filter(q => text.includes(q)).length >= 2;
}

function checkOfferedSolutions(text: string): boolean {
  const solutionPhrases = [
    'i can', 'we can', 'option', 'solution', 'fix',
    'resolve', 'prevent', 'make sure', 'going forward',
    'here\'s what', 'waive', 'credit', 'compensate'
  ];
  return solutionPhrases.some(phrase => text.includes(phrase));
}

function checkProvidedNextSteps(text: string): boolean {
  const nextStepPhrases = [
    'next step', 'what will happen', 'expect', 'follow up',
    'call you back', 'email', 'within', 'hours', 'days',
    'here\'s what i\'ll do', 'after this call'
  ];
  return nextStepPhrases.some(phrase => text.includes(phrase));
}

function checkClosedProfessionally(userMessages: string[]): boolean {
  if (userMessages.length === 0) return false;
  const lastMessages = userMessages.slice(-2).join(' ');
  const closingPhrases = [
    'thank', 'anything else', 'help with', 'take care',
    'have a', 'good day', 'appreciate', 'pleasure'
  ];
  return closingPhrases.some(phrase => lastMessages.includes(phrase));
}

function checkHandledVerification(text: string): boolean {
  const verificationPhrases = [
    'verify', 'confirm', 'security', 'pin', 'social',
    'last four', 'last five', 'account number', 'identity',
    'protect', 'make sure it\'s you'
  ];
  return verificationPhrases.some(phrase => text.includes(phrase));
}

function checkDeescalated(agentMessages: string[]): boolean {
  if (agentMessages.length < 4) return false;
  
  const earlyMessages = agentMessages.slice(0, Math.floor(agentMessages.length / 2));
  const lateMessages = agentMessages.slice(Math.floor(agentMessages.length / 2));
  
  const angryWords = ['frustrated', 'angry', 'ridiculous', 'unacceptable', 'had it', 'done'];
  const calmWords = ['thank', 'appreciate', 'understand', 'okay', 'sounds good', 'helpful'];
  
  const earlyAnger = earlyMessages.some(m => angryWords.some(w => m.includes(w)));
  const lateCalm = lateMessages.some(m => calmWords.some(w => m.includes(w)));
  
  return earlyAnger && lateCalm;
}

// Filler word detection
const FILLER_WORDS = [
  'um', 'uh', 'uhh', 'umm', 'ummm',
  'like',  // when used as filler, not comparison
  'you know',
  'i mean',
  'basically',
  'actually',
  'literally',
  'honestly',
  'right',  // when used as filler tag
  'so',     // when starting sentences
  'well',   // when used as filler
  'kind of',
  'sort of',
  'anyway',
  'whatever'
];

export interface FillerWordAnalysis {
  totalFillerWords: number;
  fillerWordCounts: Record<string, number>;
  fillerWordsPerMinute: number;
  rating: 'excellent' | 'good' | 'needs-work' | 'poor';
}

export function analyzeFillerWords(transcript: TranscriptEntry[], durationSeconds: number): FillerWordAnalysis {
  const userMessages = transcript.filter(t => t.role === 'user').map(t => t.text.toLowerCase());
  const allUserText = userMessages.join(' ');
  
  const fillerWordCounts: Record<string, number> = {};
  let totalFillerWords = 0;
  
  for (const filler of FILLER_WORDS) {
    // Use word boundary matching to avoid false positives
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = allUserText.match(regex);
    const count = matches ? matches.length : 0;
    
    if (count > 0) {
      fillerWordCounts[filler] = count;
      totalFillerWords += count;
    }
  }
  
  // Calculate filler words per minute
  const durationMinutes = Math.max(durationSeconds / 60, 1); // Avoid division by zero
  const fillerWordsPerMinute = totalFillerWords / durationMinutes;
  
  // Rate the performance
  let rating: FillerWordAnalysis['rating'];
  if (fillerWordsPerMinute < 1) {
    rating = 'excellent';
  } else if (fillerWordsPerMinute < 3) {
    rating = 'good';
  } else if (fillerWordsPerMinute < 6) {
    rating = 'needs-work';
  } else {
    rating = 'poor';
  }
  
  return {
    totalFillerWords,
    fillerWordCounts,
    fillerWordsPerMinute: Math.round(fillerWordsPerMinute * 10) / 10,
    rating
  };
}

// Format duration for display
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

// Format hours for display
export function formatHours(seconds: number): string {
  const hours = seconds / 3600;
  if (hours < 1) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  }
  return `${hours.toFixed(1)} hrs`;
}
