import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs voice IDs - using Rachel (calm female) for angry customer
// The emotion comes from the text content, not the base voice
const VOICES = {
  'angry-customer': '21m00Tcm4TlvDq8ikWAM', // Rachel - female
  'sales-prospect': 'ErXwobaYiN019PkySvjV', // Antoni - male
  'default': '21m00Tcm4TlvDq8ikWAM'
};

export async function POST(request: NextRequest) {
  try {
    const { text, scenarioId } = await request.json();
    
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      );
    }

    const voiceId = VOICES[scenarioId as keyof typeof VOICES] || VOICES.default;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.4,        // Lower = more expressive/emotional
            similarity_boost: 0.8,
            style: 0.5,           // Add some style variation
            use_speaker_boost: true
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate speech' },
        { status: 500 }
      );
    }

    // Get the audio data as array buffer
    const audioBuffer = await response.arrayBuffer();
    
    // Return as audio/mpeg
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache'
      }
    });
    
  } catch (error) {
    console.error('Speech API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
