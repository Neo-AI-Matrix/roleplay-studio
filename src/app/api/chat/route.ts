import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { logUsage } from '@/lib/usage-tracker';

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt, scenarioId, scenarioTitle } = await request.json();
    
    // Get current user for usage tracking
    const { userId } = await auth();
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || 'No response generated';
    
    // Log OpenAI usage
    if (userId && data.usage) {
      try {
        await logUsage({
          userId,
          type: 'openai',
          model: 'gpt-4o-mini',
          inputTokens: data.usage.prompt_tokens || 0,
          outputTokens: data.usage.completion_tokens || 0,
          scenarioId,
          scenarioTitle,
        });
      } catch (logError) {
        console.error('Failed to log OpenAI usage:', logError);
      }
    }

    return NextResponse.json({ message: aiMessage });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
