import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs voice IDs - Updated February 2026
// Verified from ElevenLabs API /v1/voices endpoint

const VOICE_IDS = {
  // Male voices
  roger: 'CwhRBWXzGAHq8TQ4Fs17',     // Laid-Back, Casual, Resonant
  charlie: 'IKne3meq5aSn9XLyUdCD',   // Deep, Confident, Energetic
  george: 'JBFqnCBsd6RMkjVDRZzb',    // Warm, Captivating Storyteller
  callum: 'N2lVS1w4EtoT3dr4eOWO',    // Husky Trickster
  river: 'SAz9YHcvj6GT2YYXdXww',     // Relaxed, Neutral, Informative
  harry: 'SOYHLrjzK2X1ezoPC6cr',     // Fierce Warrior
  liam: 'TX3LPaxmHKxFdv7VOQHJ',      // Energetic, Social Media
  will: 'bIHbv24MWmeRgasZH58o',      // Relaxed Optimist
  eric: 'cjVigY5qzO86Huf0OWal',      // Smooth, Trustworthy
  chris: 'iP95p4xoKVk53GoZ742B',     // Charming, Down-to-Earth
  brian: 'nPczCjzI2devNBz1zQrb',     // Deep, Resonant, Comforting
  daniel: 'onwK4e9ZLuTAKqWW03F9',    // Steady Broadcaster
  adam: 'pNInz6obpgDQGcFmaJgB',      // Dominant, Firm
  // Female voices
  sarah: 'EXAVITQu4vr4xnSDxMaL',     // Mature, Reassuring, Confident
  laura: 'FGY2WhTYpPnrIDTdsKH5',     // Enthusiast, Quirky Attitude
  alice: 'Xb7hH8MSUJpSbSDYk0k2',     // Clear, Engaging Educator
  matilda: 'XrExE9yKIg1WjnnlVkGX',   // Knowledgeable, Professional
  jessica: 'cgSgspJ2msm6clMCkdW9',   // Playful, Bright, Warm
  bella: 'hpp4J3VqNfWAUOO0d1Us',     // Professional, Bright, Warm
  lily: 'pFZP5JQG7iQjIQuC4Bku',      // Velvety Actress
};

// Scenario to voice mapping - matched to persona gender and personality
const SCENARIO_VOICES: Record<string, string> = {
  // ============ SUPPORT SCENARIOS ============
  'angry-customer': VOICE_IDS.sarah,            // Margaret Chen (female) - mature, reassuring fits frustrated customer
  'angry-customer-billing': VOICE_IDS.charlie,  // Derek Morrison (male) - deep, confident
  'confused-user': VOICE_IDS.will,              // Tom Bradley (male) - relaxed optimist
  'demanding-client': VOICE_IDS.matilda,        // Victoria Hayes (female) - professional, demanding
  
  // ============ SALES - DISCOVERY ============
  'sales-discovery': VOICE_IDS.george,          // David Morrison (male) - warm, captivating
  'cautious-prospect': VOICE_IDS.adam,          // Robert Chen (male) - dominant, firm (cautious)
  'chatty-executive': VOICE_IDS.laura,          // Patricia Donovan (female) - enthusiast, quirky
  'technical-buyer': VOICE_IDS.brian,           // Dr. Michael Torres (male) - deep, resonant
  
  // ============ SALES - OBJECTION HANDLING ============
  'skeptical-cfo': VOICE_IDS.daniel,            // Richard Thompson (male) - steady broadcaster
  'busy-decision-maker': VOICE_IDS.jessica,     // Jennifer Walsh (female) - playful but professional
  'price-shopper': VOICE_IDS.eric,              // Marcus Price (male) - smooth, trustworthy
  
  // ============ SALES - UPSELL ============
  'upsell-opportunity': VOICE_IDS.bella,        // Sarah Mitchell (female) - professional, bright, warm
  'happy-customer-upsell': VOICE_IDS.jessica,   // Amanda Foster (female) - playful, bright
  'budget-conscious-upsell': VOICE_IDS.roger,   // Frank Deluca (male) - laid-back, casual
  'growth-focused-upsell': VOICE_IDS.alice,     // Rachel Okonkwo (female) - clear, engaging
  
  // ============ HR SCENARIOS ============
  'asking-for-raise': VOICE_IDS.matilda,        // Karen Mitchell (female) - professional, demanding boss
  'underperforming-employee': VOICE_IDS.chris,  // Jason Peters (male) - charming but defensive
  'difficult-coworker': VOICE_IDS.callum,       // Steve Collins (male) - husky, tricky
  'termination-conversation': VOICE_IDS.lily,   // Lisa Chen (female) - velvety, emotional
  
  // ============ COMMUNICATION SCENARIOS ============
  'team-pitch': VOICE_IDS.river,                // Mark Davidson (male) - relaxed, neutral (skeptical)
  'stakeholder-update': VOICE_IDS.sarah,        // Diana Reeves (female) - mature, confident executive
  'all-hands-presentation': VOICE_IDS.liam,     // Alex Torres (male) - energetic
  'public-speaking-qa': VOICE_IDS.charlie,      // Jordan Blake (male) - deep, confident
  
  // ============ LEADERSHIP SCENARIOS ============
  'giving-feedback': VOICE_IDS.will,            // Sam Parker (male) - relaxed, needs coaching
  'coaching-conversation': VOICE_IDS.chris,     // Taylor Morgan (male) - charming, coachable
  'executive-presence': VOICE_IDS.matilda,      // Catherine Walsh (female) - professional executive
  'leading-change': VOICE_IDS.harry,            // Jamie Chen (male) - fierce, resistant
};

// Default voices by gender (fallback)
const DEFAULT_MALE_VOICE = VOICE_IDS.george;
const DEFAULT_FEMALE_VOICE = VOICE_IDS.sarah;

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
    
    // Debug logging
    console.log('[Speech API] scenarioId:', scenarioId);
    console.log('[Speech API] voiceId:', voiceId);
    console.log('[Speech API] mapped?:', !!SCENARIO_VOICES[scenarioId]);

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
