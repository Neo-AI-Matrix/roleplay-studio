import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { agentId, scenarioId, scenarioTitle, agentName } = await request.json();
    
    // Get current user for usage tracking
    const { userId } = await auth();
    
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      );
    }

    // Get signed URL for WebSocket connection
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      return NextResponse.json(
        { error: 'Failed to get signed URL' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    // Log voice session start (duration will be updated when session ends)
    // We log this asynchronously to not block the response
    if (userId) {
      try {
        await fetch(`${request.nextUrl.origin}/api/admin/usage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            type: 'elevenlabs',
            agentId,
            agentName: agentName || 'Unknown',
            scenarioId,
            scenarioTitle: scenarioTitle || 'Unknown',
            // Initial log - will be updated with actual usage via session-end endpoint
            charactersUsed: 0,
            durationSeconds: 0,
          }),
        });
      } catch (logError) {
        console.error('Failed to log usage:', logError);
      }
    }
    
    return NextResponse.json({ signedUrl: data.signed_url });
    
  } catch (error) {
    console.error('Token API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
