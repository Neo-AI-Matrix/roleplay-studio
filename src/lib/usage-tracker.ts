import { promises as fs } from 'fs';
import path from 'path';

const USAGE_FILE = path.join(process.cwd(), 'data', 'usage.json');

export interface UsageEntry {
  id: string;
  timestamp: string;
  userId: string;
  userEmail?: string;
  type: 'elevenlabs' | 'openai';
  // For ElevenLabs
  agentId?: string;
  agentName?: string;
  charactersUsed?: number;
  durationSeconds?: number;
  // For OpenAI
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
  // Session info
  scenarioId?: string;
  scenarioTitle?: string;
}

export interface UsageSummary {
  totalElevenLabsCharacters: number;
  totalElevenLabsDurationMinutes: number;
  totalOpenAIInputTokens: number;
  totalOpenAIOutputTokens: number;
  totalSessions: number;
  byUser: Record<string, {
    elevenLabsCharacters: number;
    elevenLabsDurationMinutes: number;
    openAIInputTokens: number;
    openAIOutputTokens: number;
    sessions: number;
    lastActive: string;
  }>;
  byDay: Record<string, {
    elevenLabsCharacters: number;
    openAITokens: number;
    sessions: number;
  }>;
  estimatedCosts: {
    elevenLabs: number;
    openAI: number;
    total: number;
  };
}

// Ensure data directory exists
async function ensureDataDir(): Promise<void> {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
}

// Read usage data
export async function getUsageData(): Promise<UsageEntry[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(USAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet
    return [];
  }
}

// Log usage entry
export async function logUsage(entry: Omit<UsageEntry, 'id' | 'timestamp'>): Promise<void> {
  await ensureDataDir();
  const data = await getUsageData();
  
  const newEntry: UsageEntry = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    ...entry,
  };
  
  data.push(newEntry);
  await fs.writeFile(USAGE_FILE, JSON.stringify(data, null, 2));
}

// Get usage summary
export async function getUsageSummary(startDate?: Date, endDate?: Date): Promise<UsageSummary> {
  const data = await getUsageData();
  
  // Filter by date range if provided
  let filtered = data;
  if (startDate || endDate) {
    filtered = data.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      if (startDate && entryDate < startDate) return false;
      if (endDate && entryDate > endDate) return false;
      return true;
    });
  }
  
  const summary: UsageSummary = {
    totalElevenLabsCharacters: 0,
    totalElevenLabsDurationMinutes: 0,
    totalOpenAIInputTokens: 0,
    totalOpenAIOutputTokens: 0,
    totalSessions: 0,
    byUser: {},
    byDay: {},
    estimatedCosts: {
      elevenLabs: 0,
      openAI: 0,
      total: 0,
    },
  };
  
  // Track unique sessions
  const sessions = new Set<string>();
  
  for (const entry of filtered) {
    const dayKey = entry.timestamp.split('T')[0];
    const userId = entry.userId || 'anonymous';
    
    // Initialize user record
    if (!summary.byUser[userId]) {
      summary.byUser[userId] = {
        elevenLabsCharacters: 0,
        elevenLabsDurationMinutes: 0,
        openAIInputTokens: 0,
        openAIOutputTokens: 0,
        sessions: 0,
        lastActive: entry.timestamp,
      };
    }
    
    // Initialize day record
    if (!summary.byDay[dayKey]) {
      summary.byDay[dayKey] = {
        elevenLabsCharacters: 0,
        openAITokens: 0,
        sessions: 0,
      };
    }
    
    if (entry.type === 'elevenlabs') {
      const chars = entry.charactersUsed || 0;
      const duration = (entry.durationSeconds || 0) / 60;
      
      summary.totalElevenLabsCharacters += chars;
      summary.totalElevenLabsDurationMinutes += duration;
      summary.byUser[userId].elevenLabsCharacters += chars;
      summary.byUser[userId].elevenLabsDurationMinutes += duration;
      summary.byDay[dayKey].elevenLabsCharacters += chars;
    } else if (entry.type === 'openai') {
      const input = entry.inputTokens || 0;
      const output = entry.outputTokens || 0;
      
      summary.totalOpenAIInputTokens += input;
      summary.totalOpenAIOutputTokens += output;
      summary.byUser[userId].openAIInputTokens += input;
      summary.byUser[userId].openAIOutputTokens += output;
      summary.byDay[dayKey].openAITokens += input + output;
    }
    
    // Track sessions
    const sessionKey = `${userId}-${entry.scenarioId}-${dayKey}`;
    if (!sessions.has(sessionKey)) {
      sessions.add(sessionKey);
      summary.totalSessions++;
      summary.byUser[userId].sessions++;
      summary.byDay[dayKey].sessions++;
    }
    
    // Update last active
    if (entry.timestamp > summary.byUser[userId].lastActive) {
      summary.byUser[userId].lastActive = entry.timestamp;
    }
  }
  
  // Calculate estimated costs
  // ElevenLabs: ~$0.30/1000 characters for Scale tier (Conversational AI)
  // OpenAI GPT-4o-mini: $0.15/$0.60 per 1M tokens (input/output)
  summary.estimatedCosts.elevenLabs = (summary.totalElevenLabsCharacters / 1000) * 0.30;
  summary.estimatedCosts.openAI = 
    (summary.totalOpenAIInputTokens / 1_000_000) * 0.15 +
    (summary.totalOpenAIOutputTokens / 1_000_000) * 0.60;
  summary.estimatedCosts.total = summary.estimatedCosts.elevenLabs + summary.estimatedCosts.openAI;
  
  return summary;
}

// Get ElevenLabs usage from their API
export async function getElevenLabsUsage(): Promise<{
  characterCount: number;
  characterLimit: number;
  usagePercentage: number;
} | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return null;
  
  try {
    // Get current month's usage
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/usage/character-stats?start_unix=${startOfMonth.getTime()}&end_unix=${endOfMonth.getTime()}`,
      {
        headers: {
          'xi-api-key': apiKey,
        },
      }
    );
    
    if (!response.ok) {
      console.error('ElevenLabs usage API error:', await response.text());
      return null;
    }
    
    const data = await response.json();
    
    // Also get subscription info for limits
    const subResponse = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: {
        'xi-api-key': apiKey,
      },
    });
    
    if (!subResponse.ok) {
      return null;
    }
    
    const subData = await subResponse.json();
    
    return {
      characterCount: subData.character_count || 0,
      characterLimit: subData.character_limit || 0,
      usagePercentage: subData.character_limit > 0 
        ? (subData.character_count / subData.character_limit) * 100 
        : 0,
    };
  } catch (error) {
    console.error('Error fetching ElevenLabs usage:', error);
    return null;
  }
}
