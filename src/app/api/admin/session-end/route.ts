import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { logUsage } from '@/lib/usage-tracker';

// Called when a voice session ends to log actual usage
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    const { 
      agentId, 
      agentName, 
      scenarioId, 
      scenarioTitle, 
      durationSeconds, 
      charactersUsed 
    } = data;
    
    // Log the actual usage
    await logUsage({
      userId,
      type: 'elevenlabs',
      agentId,
      agentName,
      scenarioId,
      scenarioTitle,
      durationSeconds: durationSeconds || 0,
      charactersUsed: charactersUsed || estimateCharactersFromDuration(durationSeconds || 0),
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Session end log error:', error);
    return NextResponse.json(
      { error: 'Failed to log session' },
      { status: 500 }
    );
  }
}

// Estimate characters based on duration if not provided
// Average speaking rate: ~150 words/min, ~5 chars/word = ~750 chars/min
function estimateCharactersFromDuration(seconds: number): number {
  const minutes = seconds / 60;
  return Math.round(minutes * 750);
}
