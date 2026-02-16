import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs voice IDs
// Male voices: Josh, Antoni, Arnold, Adam, Sam
// Female voices: Rachel, Bella, Elli, Domi

const VOICE_IDS = {
  // Male voices
  josh: 'TxGEqnHWrfWFTfGW9XjX',
  antoni: 'ErXwobaYiN019PkySvjV',
  arnold: 'VR6AewLTigWG4xSOukaG',
  adam: 'pNInz6obpgDQGcFmaJgB',
  sam: 'yoZ06aMxZJJ28mfd3POQ',
  // Female voices
  rachel: '21m00Tcm4TlvDq8ikWAM',
  bella: 'EXAVITQu4vr4xnSDxMaL',
  elli: 'MF3mGyEYCl7XYWbV9V6O',
  domi: 'AZnzlk1XvdvUeBnXmlld',
};

// Scenario to voice mapping - matched to persona gender
const SCENARIO_VOICES: Record<string, string> = {
  // ============ SUPPORT SCENARIOS ============
  'angry-customer': VOICE_IDS.rachel,           // Margaret Chen (female)
  'angry-customer-billing': VOICE_IDS.josh,     // Derek Morrison (male)
  'confused-user': VOICE_IDS.sam,               // Tom Bradley (male)
  'demanding-client': VOICE_IDS.bella,          // Victoria Hayes (female)
  
  // ============ SALES - DISCOVERY ============
  'sales-discovery': VOICE_IDS.antoni,          // David Morrison (male)
  'cautious-prospect': VOICE_IDS.adam,          // Robert Chen (male)
  'chatty-executive': VOICE_IDS.rachel,         // Patricia Donovan (female)
  'technical-buyer': VOICE_IDS.arnold,          // Dr. Michael Torres (male)
  
  // ============ SALES - OBJECTION HANDLING ============
  'skeptical-cfo': VOICE_IDS.arnold,            // Richard Thompson (male)
  'busy-decision-maker': VOICE_IDS.domi,        // Jennifer Walsh (female)
  'price-shopper': VOICE_IDS.adam,              // Marcus Price (male)
  
  // ============ SALES - UPSELL ============
  'upsell-opportunity': VOICE_IDS.elli,         // Sarah Mitchell (female)
  'happy-customer-upsell': VOICE_IDS.domi,      // Amanda Foster (female)
  'budget-conscious-upsell': VOICE_IDS.josh,    // Frank Deluca (male)
  'growth-focused-upsell': VOICE_IDS.bella,     // Rachel Okonkwo (female)
  
  // ============ HR SCENARIOS ============
  'asking-for-raise': VOICE_IDS.bella,          // Karen Mitchell (female)
  'underperforming-employee': VOICE_IDS.sam,    // Jason Peters (male)
  'difficult-coworker': VOICE_IDS.adam,         // Steve Collins (male)
  'termination-conversation': VOICE_IDS.rachel, // Lisa Chen (female)
  
  // ============ COMMUNICATION SCENARIOS ============
  'team-pitch': VOICE_IDS.josh,                 // Mark Davidson (male)
  'stakeholder-update': VOICE_IDS.domi,         // Diana Reeves (female)
  'all-hands-presentation': VOICE_IDS.antoni,   // Alex Torres (male)
  'public-speaking-qa': VOICE_IDS.sam,          // Jordan Blake (male)
  
  // ============ LEADERSHIP SCENARIOS ============
  'giving-feedback': VOICE_IDS.adam,            // Sam Parker (male)
  'coaching-conversation': VOICE_IDS.josh,      // Taylor Morgan (male)
  'executive-presence': VOICE_IDS.bella,        // Catherine Walsh (female)
  'leading-change': VOICE_IDS.arnold,           // Jamie Chen (male)
};

// Default voices by gender (fallback)
const DEFAULT_MALE_VOICE = VOICE_IDS.josh;
const DEFAULT_FEMALE_VOICE = VOICE_IDS.rachel;

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

    // Get the voice for this scenario, or fall back to male default
    const voiceId = SCENARIO_VOICES[scenarioId] || DEFAULT_MALE_VOICE;

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
