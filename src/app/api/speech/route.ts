import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs voice IDs mapped by scenario
// Male voices: Josh, Antoni, Arnold, Adam, Sam
// Female voices: Rachel, Bella, Elli, Domi

const SCENARIO_VOICES: Record<string, string> = {
  // Support - Female personas
  'angry-customer': '21m00Tcm4TlvDq8ikWAM',           // Rachel - Margaret Chen (female)
  'angry-customer-billing': 'EXAVITQu4vr4xnSDxMaL',  // Bella - Karen Mitchell (female)
  'confused-user': 'MF3mGyEYCl7XYWbV9V6O',           // Elli - Sarah Mitchell (female)
  'happy-customer-upsell': 'AZnzlk1XvdvUeBnXmlld',   // Domi - Lisa Chen (female)
  
  // Sales - Male personas
  'sales-discovery': 'ErXwobaYiN019PkySvjV',         // Antoni - David Morrison (male)
  'skeptical-cfo': 'VR6AewLTigWG4xSOukaG',           // Arnold - Richard Thompson (male)
  'demanding-client': 'TxGEqnHWrfWFTfGW9XjX',        // Josh - Tom Bradley (male)
  'upsell-opportunity': 'ErXwobaYiN019PkySvjV',      // Antoni - Derek Morrison (male)
  'busy-decision-maker': 'pNInz6obpgDQGcFmaJgB',     // Adam - Jason Peters (male)
  'price-shopper': 'yoZ06aMxZJJ28mfd3POQ',           // Sam - Steve Collins (male)
  'technical-buyer': 'VR6AewLTigWG4xSOukaG',         // Arnold - Dr. Michael Torres (male)
  
  // Sales - Female personas
  'cautious-prospect': 'MF3mGyEYCl7XYWbV9V6O',       // Elli - Jennifer Walsh (female)
  'chatty-executive': '21m00Tcm4TlvDq8ikWAM',        // Rachel - Victoria Hayes (female)
  'budget-conscious-upsell': 'EXAVITQu4vr4xnSDxMaL', // Bella - Amanda Foster (female)
  'growth-focused-upsell': 'AZnzlk1XvdvUeBnXmlld',   // Domi - Rachel Okonkwo (female)
  
  // Sales - Male personas continued
  'sales-prospect': 'TxGEqnHWrfWFTfGW9XjX',          // Josh - Marcus Price (male)
  
  // HR - Mixed
  'asking-for-raise': 'ErXwobaYiN019PkySvjV',        // Antoni - Robert Chen (male)
  'underperforming-employee': 'EXAVITQu4vr4xnSDxMaL', // Bella - Patricia Donovan (female)
  'difficult-coworker': 'TxGEqnHWrfWFTfGW9XjX',      // Josh - Frank Deluca (male)
  'termination-conversation': '21m00Tcm4TlvDq8ikWAM', // Rachel - (female manager delivering news)
  
  // Communication - Mixed
  'team-pitch': 'pNInz6obpgDQGcFmaJgB',              // Adam - Mark Davidson (male)
  'stakeholder-update': 'AZnzlk1XvdvUeBnXmlld',      // Domi - Diana Reeves (female)
  'all-hands-presentation': 'ErXwobaYiN019PkySvjV',  // Antoni - Alex Torres (male)
  'public-speaking-qa': 'TxGEqnHWrfWFTfGW9XjX',      // Josh - Jordan Blake (male)
  
  // Leadership - Mixed
  'giving-feedback': 'yoZ06aMxZJJ28mfd3POQ',         // Sam - Sam Parker (male)
  'coaching-conversation': 'pNInz6obpgDQGcFmaJgB',   // Adam - Taylor Morgan (male)
  'executive-presence': '21m00Tcm4TlvDq8ikWAM',      // Rachel - Catherine Walsh (female)
  'leading-change': 'VR6AewLTigWG4xSOukaG',          // Arnold - Jamie Chen (male)
};

// Default voices by gender (fallback)
const DEFAULT_MALE_VOICE = 'TxGEqnHWrfWFTfGW9XjX';   // Josh
const DEFAULT_FEMALE_VOICE = '21m00Tcm4TlvDq8ikWAM'; // Rachel

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
